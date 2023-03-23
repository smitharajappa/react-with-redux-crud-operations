import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeliveries,
  deleteDeliveries,
  loadDeliveries,
  getDeliveryById,
  editDeliveries,
} from "../../redux/actions";
import { Edit } from "@mui/icons-material";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { StyledDeliveries } from "./styled-component";
import { getComparator, stableSort } from "../../utils/sort";
import EnhancedTableHead from "./TableHead";
import EnhancedTableToolbar from "./TableToolbar";
import Search from "./Search";
import AddEvent from "./Modal";

const Deliveries = () => {
  const dispatch = useDispatch();
  const { deliveries, delivery } = useSelector((state) => state.delivery);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    vehicleType: "",
    amount: 0,
    grace: 0,
    amountUom: "",
    graceUom: "",
  });
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState(0);

  const onHandleClose = () => {
    setIsEdit(false);
    setOpen(false);
    setId(0);
    setEditData({
      vehicleType: "",
      amount: 0,
      grace: 0,
      amountUom: "",
      graceUom: "",
    });
  };

  const list = useMemo(() => {
    return (
      deliveries &&
      deliveries.filter((list) => {
        return list.vehicleType
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      })
    );
  }, [deliveries, searchValue]);

  const handleSearch = (event) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleAddEvent = (data) => {
    console.log({ data });
    if (data?.id === id) {
      dispatch(editDeliveries(id, data));
    } else {
      dispatch(addDeliveries(data));
    }
  };

  const handleEditEvent = (e,id) => {
    e.stopPropagation();
    if (id !== 0) {
      setId(id);
      dispatch(getDeliveryById(id));
      handleSetData();
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };
  const handleSetData = () => {
    if (isEdit) {
      setEditData(delivery);
      setOpen(true);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete ?")) {
      dispatch(deleteDeliveries(id));
    }
  };

  const handleAddEventModal = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setEditData(delivery);
  }, [open, delivery]);

  useEffect(() => {
    dispatch(loadDeliveries());
  }, [dispatch]);

  return (
    <StyledDeliveries>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <div className="search"></div>
          <TableContainer>
            <EnhancedTableToolbar />
            <Search value={searchValue} onChange={handleSearch} />
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={list.length}
              />
              <TableBody>
                {stableSort(list, getComparator(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        sx={{ cursor: "pointer" }}>
                        <TableCell align="left">{row.vehicleType}</TableCell>
                        <TableCell align="center">
                          {row.amount} / {row.amountUom}
                        </TableCell>
                        <TableCell align="center">
                          {row.grace} / {row.graceUom}
                        </TableCell>
                        <TableCell align="right">
                          <Edit
                            sx={{ color: "#a9e9fa" }}
                            fontSize="small"
                            onClick={(e) => handleEditEvent(e,row.id)}
                          />
                          <DeleteSharpIcon
                            sx={{ color: "#f24d53" }}
                            fontSize="small"
                            onClick={() => handleDelete(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <Box textAlign="end">
              <Button
                sx={{ borderRadius: "50px", margin: "10px" }}
                variant="outlined"
                onClick={(e) => handleAddEventModal(e)}>
                Add
              </Button>
            </Box>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <AddEvent
        isEdit={isEdit}
        open={open}
        handleClose={onHandleClose}
        data={isEdit ? editData : {}}
        onHandleFormSubmit={handleAddEvent}
      />
    </StyledDeliveries>
  );
};
export default Deliveries;
