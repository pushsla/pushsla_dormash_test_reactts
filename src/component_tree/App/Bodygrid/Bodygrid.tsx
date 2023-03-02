import React, {useState} from "react";
import {Paper, Button, Card, Divider, Stack, Typography} from "@mui/material";
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

import {useAppSelector, useAppDispatch} from "@data/hooks";
import {
    authRows,
    authColumns,
    IDataTableAuthRow,
    authDataStatus,
    authRowAdded,
    authRowAddAsync
} from "@data/DataSlice/DataSlice";
import {localeSlice} from "@data/LocaleSlice/LocaleSlice";

import "./Bodygrid.sass"
import {BodygridModifyform} from "@components/App/Bodygrid/Modifyform/Bodygrid__modifyform";

export const Bodygrid: React.FC<{}> = (props) => {
    const rows = useAppSelector(authRows);
    const columns = useAppSelector(authColumns);
    const locale = useAppSelector(localeSlice);
    const dataStatus = useAppSelector(authDataStatus);

    const dispatch = useAppDispatch();

    const [rows_per_page] = useState([3, 5, 10, 15]);
    const [groups, setGroups] = useState([]);

    const modifyformSubmitted = (row: IDataTableAuthRow) => {
        dispatch(authRowAddAsync(row));
    }

    return(
        <article className="Bodygrid">
            <Paper>
                <Typography>{dataStatus}</Typography>
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
            </Paper>
        </article>
    );
};