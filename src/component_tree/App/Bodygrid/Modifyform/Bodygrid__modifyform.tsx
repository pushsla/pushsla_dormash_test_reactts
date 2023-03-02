import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, MenuItem,
    Select, SelectChangeEvent, Stack,
    TextField
} from "@mui/material";
import {useAppSelector} from "@data/hooks";
import {localeSlice} from "@data/LocaleSlice/LocaleSlice";
import {authColumns, authMetacolumns, IDataTableAuthRow, IDataTableMetacolumn} from "@data/DataSlice/DataSlice";
import {DateBox} from "devextreme-react";


export interface IBodygridModifyformProps{
    onFormSubmit?: (row: IDataTableAuthRow) => void;
}

const initialRowState: IDataTableAuthRow = {
    email: "",
    gender: "?",
    password: "",
    timestamp: "",
}

export const BodygridModifyform: React.FC<IBodygridModifyformProps> = (props) => {
    const locale = useAppSelector(localeSlice);
    const metacols = useAppSelector(authMetacolumns);
    const cols = useAppSelector(authColumns);

    const [isOpen, setOpen] = useState(false);
    const [row, setRow] = useState<IDataTableAuthRow>(structuredClone(initialRowState));

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleApply = () => {
        handleClose();
        if (props.onFormSubmit) props.onFormSubmit(structuredClone(row));
        setRow(structuredClone(initialRowState));
    }
    const handleDecline = () => {
        handleClose();
        setRow(structuredClone(initialRowState));
    }
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