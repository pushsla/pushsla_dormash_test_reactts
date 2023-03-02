/**
 * Reactive component used to display current state of DataSlice
 */

//*module
import React, {useState} from "react";
import {LinearProgress, Paper, Stack} from "@mui/material";
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableGroupRow,
    GroupingPanel,
    DragDropProvider, Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import {
    GroupingState,
    IntegratedGrouping,
    IntegratedPaging,
    PagingState,
} from "@devexpress/dx-react-grid";
//*local
import {useAppSelector, useAppDispatch} from "@data/hooks";
import {localeSlice} from "@data/LocaleSlice/LocaleSlice";
import "./Bodygrid.sass"
import {BodygridModifyform} from "@components/App/Bodygrid/Modifyform/Bodygrid__modifyform";
import {
    authRows,
    authColumns,
    IDataTableAuthRow,
    authDataStatus,
    authRowAddAsync
} from "@data/DataSlice/DataSlice";

/**
 * Data table based on DataSlice storage slice
 * @param props: {}
 */
export const Bodygrid: React.FC<{}> = (props) => {
    //Collection of objects presented in DataSlice as main data samples
    const rows = useAppSelector(authRows);
    //Collection of column definitions used by devexpress Table ro present 'rows'
    const columns = useAppSelector(authColumns);
    //Localization strings definitions
    const locale = useAppSelector(localeSlice);
    //Status of async data exchange (fake here on timeout)
    const dataStatus = useAppSelector(authDataStatus);
    //DataSlice dispatcher
    const dispatch = useAppDispatch();
    //How many rows should be displayed per devexpress Table page
    const [rows_per_page] = useState([3, 5, 10, 15]);
    //Grouping config for devexpress Table page
    const [groups, setGroups] = useState([]);

    /**
     * EventHandler for BodygridModifyform being raised on 'onFormSubmit'
     * @param row - retrieved from BodygridModifyform submission
     */
    const modifyformSubmitted = (row: IDataTableAuthRow) => {
        dispatch(authRowAddAsync(row));
    }

    return(
        <article className="Bodygrid">
            <Paper>
                {dataStatus !== 'ready' && <LinearProgress/>}
                <Stack direction={"column"} spacing={"2rem"}>
                    <Grid columns={columns} rows={rows}>
                        <DragDropProvider/>

                        <PagingState defaultCurrentPage={0} defaultPageSize={rows_per_page[0]}/>
                        <GroupingState defaultGrouping={groups}/>

                        <IntegratedPaging/>
                        <IntegratedGrouping/>

                        <Table messages={locale.Bodygrid.tableMessages}/>

                        <TableHeaderRow showGroupingControls/>
                        <TableGroupRow/>
                        <Toolbar/>

                        <PagingPanel pageSizes={rows_per_page} messages={locale.Bodygrid.pagingPanelMessages}/>
                        <GroupingPanel showGroupingControls messages={locale.Bodygrid.groupingPanelMessages}/>
                    </Grid>
                    <BodygridModifyform onFormSubmit={modifyformSubmitted}/>
                </Stack>
                {dataStatus !== 'ready' && <LinearProgress/>}
            </Paper>
        </article>
    );
};