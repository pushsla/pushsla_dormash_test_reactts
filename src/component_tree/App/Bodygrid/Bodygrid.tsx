import React, {useState} from "react";
import {Paper, Button} from "@mui/material";
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableGroupRow,
    GroupingPanel,
    DragDropProvider, Toolbar
} from "@devexpress/dx-react-grid-material-ui";
import {
    GroupingState,
    IntegratedGrouping,
    IntegratedPaging,
    PagingState,
    SelectionState,
} from "@devexpress/dx-react-grid";

import {useAppSelector, useAppDispatch} from "@data/hooks";
import {
    authRowAddAsync,
    authRows,
    DataTableAuthColumns,
    selectRow,
    deselectRow
} from "@data/DataSlice/DataSlice";
import {localeStruct} from "@data/LocaleSlice/LocaleSlice";


export const Bodygrid: React.FC<{}> = (props) => {
    const rows = useAppSelector(authRows);
    const locale = useAppSelector(localeStruct);
    const dispatch = useAppDispatch();

    const [rows_per_page] = useState([3, 5, 10, 15]);
    const [groups, setGroups] = useState([]);

    return(
        <Paper>
            <Grid columns={DataTableAuthColumns} rows={rows}>
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
            <Button variant={"contained"}>{locale.Common.addMessage}</Button>
        </Paper>
    );
};