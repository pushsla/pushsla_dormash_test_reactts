/**
 * Reactive component used to add new rows to the Bodygrid's Table => add new objects to DataSlice
 */

//*module
import React, {useState} from "react";
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, MenuItem,
    Select, Stack,
    TextField
} from "@mui/material";
//*local
import {useAppSelector} from "@data/hooks";
import {localeSlice} from "@data/LocaleSlice/LocaleSlice";
import {authColumns, authMetacolumns, IDataTableAuthRow, IDataTableMetacolumn} from "@data/DataSlice/DataSlice";


//An interface any props object passed to BodygridModifyform must implement
export interface IBodygridModifyformProps{
    onFormSubmit?: (row: IDataTableAuthRow) => void;
}

//Initial state of newly created row in BodygridModifyform
const initialRowState: IDataTableAuthRow = {
    email: "",
    gender: "?",
    password: "",
    timestamp: "",
}

/**
 * Modifyform is presented as openButton and Modal Dialog.
 * Input fields for modal dialog are being automatically retrieved from authColumns&authMetacolumns from DataSlice
 * @param props - IBodygridModifyformProps
 */
export const BodygridModifyform: React.FC<IBodygridModifyformProps> = (props) => {
    //Localisation strings
    const locale = useAppSelector(localeSlice);
    //Metadata about DataSlice object fields (interpreted as columns)
    const metacols = useAppSelector(authMetacolumns);
    //DataSlice object field definitions for devexpress Table
    const cols = useAppSelector(authColumns);
    //State of Model Dialog
    const [isOpen, setOpen] = useState(false);
    //State of new row creation form
    const [row, setRow] = useState<IDataTableAuthRow>(structuredClone(initialRowState));

    //How to handle open action of Dialog
    const handleOpen = () => {
        setOpen(true);
    }
    //How to handle close action of Dialog
    const handleClose = () => {
        setOpen(false);
    }
    //How to handle apply action of Dialog
    const handleApply = () => {
        handleClose();
        if (props.onFormSubmit) props.onFormSubmit(structuredClone(row));
        setRow(structuredClone(initialRowState));
    }
    //How to handle decline action of Dialog
    const handleDecline = () => {
        handleClose();
        setRow(structuredClone(initialRowState));
    }

    /**
     * Service function to retrieve Metacolumn definition for specified column
     * Search is performed by comparing col_name with <meta>.column_name (col_name should be 'column.name' from column)
     * @param col_name - name of column (from cols appselector ('name' field))
     * @return IDataTableMetacolumn definition for column with specified name or UNDEFINED if meta was not found
     */
    function getMetaFor(col_name: string): IDataTableMetacolumn | undefined{
        let fetched = metacols.filter(meta => meta.column_name === col_name);
        if (fetched.length === 0) return undefined;
        return fetched[0];
    }

    return(
        <div>
            <Button onClick={handleOpen}>{locale.Common.addMessage}</Button>

            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{locale.Dialogs.addDialog.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{locale.Dialogs.addDialog.body}</DialogContentText>
                    <Stack spacing={'1.3rem'}>
                        {cols.map((col, idx) => {
                            const meta = getMetaFor(col.name);
                            if (meta === undefined) return;
                            if (meta.auto_assigned) return;

                            switch (meta.input_type) {
                                case "password":
                                    return (
                                      <TextField
                                          key={idx}
                                          id={`bodygrid__modifyform_password${idx}`}
                                          type='password'
                                          required={meta.required}
                                          label={col.title}
                                          value={row[meta.column_name as keyof IDataTableAuthRow]}
                                          onChange={(e) => setRow((prevState) => (
                                              {...prevState, [meta.column_name as keyof IDataTableAuthRow]: e.target.value}
                                          ))}
                                      />
                                    );
                                case "select":
                                    if (!meta.allowed) break;
                                    return (
                                        <Select
                                            key={idx}
                                            id={`bodygrid__modifyform_select${idx}`}
                                            required={meta.required}
                                            label={col.title}
                                            value={row[meta.column_name as keyof IDataTableAuthRow]}
                                            onChange={(e) => setRow((prevState) => (
                                                {...prevState, [meta.column_name as keyof IDataTableAuthRow]: e.target.value}
                                            ))}
                                        >
                                            {meta.allowed.map((variant, vidx) => (
                                                <MenuItem
                                                    id={`bodygrid__modifyform_select${idx}_variant${vidx}`}
                                                    key={vidx}
                                                    value={variant}
                                                >
                                                    {variant}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    );
                                case "date":
                                    return(
                                        <TextField
                                            key={idx}
                                            id={`bodygrid__modifyform_date${idx}`}
                                            type='date'
                                            required={meta.required}
                                            label={col.title}
                                            value={row[meta.column_name as keyof IDataTableAuthRow]}
                                            onChange={(e) => setRow((prevState) => (
                                                {...prevState, [meta.column_name as keyof IDataTableAuthRow]: e.target.value}
                                            ))}
                                        />
                                    );
                                case "email":
                                    return (
                                        <TextField
                                            key={idx}
                                            id={`bodygrid__modifyform_email${idx}`}
                                            type='email'
                                            required={meta.required}
                                            label={col.title}
                                            value={row[meta.column_name as keyof IDataTableAuthRow]}
                                            onChange={(e) => setRow((prevState) => (
                                                {...prevState, [meta.column_name as keyof IDataTableAuthRow]: e.target.value}
                                            ))}
                                        />
                                    )
                                case "text":
                                    return (
                                        <TextField
                                            key={idx}
                                            id={`bodygrid__modifyform_text${idx}`}
                                            type='text'
                                            required={meta.required}
                                            label={col.title}
                                            value={row[meta.column_name as keyof IDataTableAuthRow]}
                                            onChange={(e) => setRow((prevState) => (
                                                {...prevState, [meta.column_name as keyof IDataTableAuthRow]: e.target.value}
                                            ))}
                                        />
                                    );
                                default:
                                    console.log(`BodygridModifyform: unhandled input_type for ${meta}`);
                                    return;
                            }
                        })}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleApply}>{locale.Dialogs.addDialog.apply}</Button>
                    <Button onClick={handleDecline}>{locale.Dialogs.addDialog.decline}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}