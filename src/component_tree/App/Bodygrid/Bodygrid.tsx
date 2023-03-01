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

const tableMessages = {
  noData: 'Пусто :)',
};
const groupingPanelMessages = {
  groupByColumn: 'Перетащите столбец, чтобы выполнить группировку',
};
const pagingPanelMessages = {
  showAll: 'Все',
  rowsPerPage: 'Строк на странице',
  info: () => '',
};


export const Bodygrid: React.FC<{}> = (props) => {
    const rows = useAppSelector(authRows);
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

                <Table messages={tableMessages}/>

                <TableHeaderRow showGroupingControls/>
                <TableGroupRow/>
                <Toolbar/>

                <PagingPanel pageSizes={rows_per_page} messages={pagingPanelMessages}/>
                <GroupingPanel showGroupingControls messages={groupingPanelMessages}/>
            </Grid>
            <Button variant={"contained"}>Добавить запись</Button>
        </Paper>
    );
};