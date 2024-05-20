import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { Card, CardContent, Button, Collapse, FormControl, Select, MenuItem, Toolbar, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


const handleDetail = (event) => {
  event.stopPropagation();
};

function createData(id, name_with_type, code, type) {
  return { id, name_with_type, code, type, path_with_type };
}


//PHÂN TRANG
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const headCells = [
  { id: '', numeric: false, disablePadding: true, label: 'STT' },
  { id: 'code', numeric: false, disablePadding: true, label: 'Mã' },
  { id: 'name_with_type', numeric: false, disablePadding: true, label: 'Tên Phường/ Xã' },
  { id: 'type', numeric: false, disablePadding: true, label: 'Loại' },
  { id: 'path_with_type', numeric: false, disablePadding: true, label: 'Chi Tiết' },
  { id: 'action', numeric: false, disablePadding: true, label: 'Action' },
];

const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 20,
  width: 1,
};

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => { onRequestSort(event, property); };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  const { rows } = props;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: ''
  });

  //MỞ DIALOG
  const handleClickOpen = () => {
    setOpen(true);
  };

  //ĐÓNG DIALOG
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  //GỌI API ĐỂ ADD DATA SAU KHI SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/data', formData);
      window.location.reload(); //load lại trang để hiện data mới
      handleClose(); // Đóng dialog sau khi thêm thành công
    } catch (error) {
      console.error('Error adding city:', error);
      // Xử lý lỗi nếu có
    }
  };


  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <>
        <Typography
          sx={{ flex: '1 1 100%' , ml : 2, mt: 1}}
          variant="h6"
          id="tableTitle"
          component="div"
        >      
          <h2> <AccountBalanceIcon /> &nbsp;&nbsp;Danh sách Trường học</h2>
        </Typography>
        
        {/* <Stack spacing={2} sx={{ width: 300 }} justifyContent={'center'}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={rows.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        </Stack> */}
      </>
      <React.Fragment>
        <Tooltip sx={{ mr : 5 }} title="Thêm Tỉnh/Thành phố">
          <IconButton>
            <AddLocationAltIcon  onClick={handleClickOpen}/>
          </IconButton>
        </Tooltip>
        {/* DIALOG VÀ FORM DÙNG ĐỂ ADD DATA */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Thêm mới 1 Tỉnh/Thành Phố</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nhập đầy đủ các trường thông tin dưới đây để thêm mới 1 bản ghi.
            </DialogContentText>
            <FormGroup>
              <FormControl>
                <TextField
                  autoFocus
                  required
                  margin="normal"
                  name="name"
                  label="Tên Tỉnh/Thành Phố"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  margin="normal"
                  name="code"
                  label="Mã Tỉnh/Thành Phố"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.code}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  margin="normal"
                  name="type"
                  label="Loại"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.type}
                  onChange={handleChange}
                />
              </FormControl>
              <DialogActions>
                <Button sx={{ mr: 1 }} variant="outlined" onClick={handleClose}>Hủy</Button>
                <Button variant="contained" onClick={handleSubmit} type="submit">Thêm</Button>
              </DialogActions>
            </FormGroup>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </Toolbar>
  );
}


EnhancedTableToolbar.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState(rows);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3003/wards');
      setRows(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilterRows(rows);
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const handleSearch = (searchTerm) => {
  //   const filtered = rows.filter((row) => {
  //     return row.name.toLowerCase().includes(searchTerm.toLowerCase());
  //   });
  //   setFilterRows(filtered);
  // };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/data/${selectedRowId}`);
      setRows(rows.filter((row) => row.id !== selectedRowId));
      setFilterRows(filterRows.filter((row) => row.id !== selectedRowId));
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Lỗi khi xoá dữ liệu:", error);
    }
  };
  const handleEdit = async () => {
    console.log("info: ", selectedRowData);
    try {

      // Gửi request API cập nhật thông tin đến JSON server
      await axios.put(`http://localhost:3001/data/${selectedRowId}`, selectedRowData);
      
      // Cập nhật thông tin trong rows và filterRows
      const updatedRows = rows.map(row =>
        row.id === selectedRowId ? selectedRowData : row
      );
      setRows(updatedRows);
      setFilterRows(updatedRows);
      setSelectedRowId(null);
      // Đóng dialog
      handleCloseEditDialog();
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      // Xử lý lỗi (nếu cần)
    }
  };
  const handleClickOpenEditDialog = (rowData) => {
    setSelectedRowData(rowData);
    setSelectedRowId(rowData.id);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleClickOpenDeleteDialog = (id) => {
    setOpenDeleteDialog(true);
    setSelectedRowId(id);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // BỘ LỌC
const [filterOpen, setFilterOpen] = useState(false);
const [provinces, setProvinces] = useState([]);
const [districts, setDistricts] = useState([]);
const [wards, setWards] = useState([]);
const [filteredDistricts, setFilteredDistricts] = useState([]);
const [filteredWards, setFilteredWards] = useState([]);
const [selectedProvince, setSelectedProvince] = useState('');
const [selectedDistrict, setSelectedDistrict] = useState('');
const [selectedWard, setSelectedWard] = useState('');
const [filteredResults, setFilteredResults] = useState([]);
const [filteredTableData, setFilteredTableData] = useState([]);


const boxRef = useRef(null);

// LẤY KẾT QUẢ TỈNH/ THÀNH PHỐ CHO BỘ LỌC
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/data');
      setProvinces(response.data.map(({ _id, code, name_with_type }) => ({ id: _id, code, name: name_with_type })));
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  fetchData();
}, []);

// LẤY KẾT QUẢ QUẬN HUYỆN CHO BỘ LỌC
useEffect(() => {
  if (selectedProvince) {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/districts?provinceCode=${selectedProvince}`);
        setDistricts(response.data.map(({ id, code, parent_code, name_with_type }) => ({ id, code, parent_code, name: name_with_type })));
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    fetchDistricts();
  } else {
    setDistricts([]);
  }
}, [selectedProvince]);

useEffect(() => {
  if (selectedDistrict) {
    const fetchWards = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/wards?districtCode=${selectedDistrict}`);
        setWards(response.data.map(({ id, code, parent_code, name_with_type }) => ({ id, code, parent_code, name: name_with_type })));
      } catch (error) {
        console.error('Error fetching wards:', error);
      }
    };

    fetchWards();
  } else {
    setWards([]);
  }
}, [selectedDistrict]);

// Dựa vào city.code === district.parent_code  để lấy ra quận liên quan đến tỉnh thành đó
useEffect(() => {
  if (selectedProvince) {
    const filtered = districts.filter(({ parent_code }) => parent_code === selectedProvince);
    setFilteredDistricts(filtered);
  } else {
    setFilteredDistricts([]);
  }
}, [selectedProvince, districts]);

// Dựa vào district.parent_code === ward.parent_code  để lấy ra phường xã quan đến quận đó
useEffect(() => {
  if (selectedDistrict) {
    const filtered = wards.filter(({ parent_code }) => parent_code === selectedDistrict);
    setFilteredWards(filtered);
  } else {
    setFilteredWards([]);
  }
}, [selectedDistrict, wards]);

const handleProvinceChange = (event) => {
  const provinceCode = event.target.value;
  setSelectedProvince(provinceCode);
  setSelectedDistrict('');
  setSelectedWard('');
};

const handleDistrictChange = (event) => {
  const districtCode = event.target.value;
  setSelectedDistrict(districtCode);
  setSelectedWard('');
};

const handleWardChange = (event) => {
  const wardCode = event.target.value;
  setSelectedWard(wardCode);
};

const handleToggle = () => {
  setFilterOpen((prev) => !prev);
};

const handleClickOutside = (event) => {
  if (boxRef.current && !boxRef.current.contains(event.target)) {
    if (!event.target.closest('.MuiSelect-root') && !event.target.closest('.MuiMenu-list')) {
      setFilterOpen(false);
    }
  }
};

useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

const handleApplyFilter = () => { 
  let filteredRows = rows;

  if (selectedProvince) {
    const filteredDistricts = districts.filter(({ parent_code }) => parent_code === selectedProvince);
    setFilteredDistricts(filteredDistricts);

    if (selectedDistrict) {
      const filteredWards = wards.filter(({ parent_code }) => parent_code === selectedDistrict);
      setFilteredWards(filteredWards);

      if (selectedWard) {
        filteredRows = rows.filter(row => row.parent_code === selectedWard);
      } else {
        filteredRows = rows.filter(row => filteredWards.some(ward => ward.parent_code === row.parent_code));
      }
    } else {
      filteredRows = rows.filter(row => filteredDistricts.some(district => district.parent_code === row.parent_code));
    }
  } else {
    setFilteredDistricts([]);
    setFilteredWards([]);
  }

  setFilteredResults(filteredRows);
  setFilterRows(filteredRows);
  setOpen(false); // Đóng box lọc khi áp dụng filter
};


return (
  <Typography
    sx={{ flex: '1 1 100%', ml: 2, mt: 1 }}
    variant="h6"
    id="tableTitle"
    component="div"
  >
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar rows={rows} />
        <div style={{ position: 'relative' }}>
      <Toolbar>
        <Button variant="contained" color="primary" size="big" onClick={handleToggle}>
          <FilterAltIcon /> Lọc
        </Button>
      </Toolbar>
      <Collapse in={filterOpen}>
        <Box
          ref={boxRef}
          sx={{
            position: 'absolute',
            left: '5px',
            zIndex: 1,
            width: '350px',
            padding: 0,
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Card>
            <CardContent>
              <Stack spacing={2} direction="column">
                <h3><HomeWorkIcon /> Lọc theo Khu vực </h3>
                <FormControl variant="outlined" size="big">
                  <Select
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <span>Tất cả các tỉnh</span>
                    </MenuItem>
                    {provinces.map(({ id, code, name }) => (
                      <MenuItem key={id} value={code}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" size="big" disabled={!selectedProvince}>
                  <Select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <span>Tất cả các quận/huyện</span>
                    </MenuItem>
                    {filteredDistricts.map(({ id, name, code }) => (
                      <MenuItem key={id} value={code}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" size="big" disabled={!selectedDistrict}>
                  <Select
                    value={selectedWard}
                    onChange={handleWardChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <span>Tất cả các xã/phường</span>
                    </MenuItem>
                    {filteredWards.map(({ id, name, code }) => (
                      <MenuItem key={id} value={code}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </CardContent>
            <CardContent>
              <Stack spacing={2} direction="column">
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                  <Button variant="contained" color="secondary" size="big" onClick={() =>  setFilterRows(rows)}>Xóa lọc</Button>
                  <Button variant="contained" color="primary" size="big" onClick={() => handleApplyFilter([])}>Áp dụng</Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Collapse>
    </div>
        <TableContainer sx={{ flex: '1 1 100%', ml: 3, mt: 0 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody >
              {filterRows.length > 0 ? (
                filterRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell component="th" scope="row" padding="none">{row.code}</TableCell>
                    <TableCell align="left">{row.name_with_type}</TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.path_with_type}</TableCell>
                    <TableCell align="left">
                      <Button sx={{ mr: 1 }} variant="contained" color="secondary" size="small" onClick={() => handleClickOpenEditDialog(row)}>Sửa</Button>
                      <Button sx={{ mr: 1 }} onClick={() => handleClickOpenDeleteDialog(row.id)} variant="contained" color="error" size="small">Xoá</Button>
                      {/* DIALOG XÁC NHẬN XOÁ */}
                      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                        <DialogTitle>Xác nhận xoá</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Bạn có chắc chắn muốn xoá?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button variant="outlined" onClick={handleCloseDeleteDialog}>Hủy</Button>
                          <Button variant="contained" onClick={handleDelete}>Xoá</Button>
                        </DialogActions>
                      </Dialog>
                      {/* DIALOG VÀ FORM DÙNG ĐỂ ADD DATA */}
                      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                        <DialogTitle>Cập nhật thông tin Tỉnh/Thành Phố</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Nhập đầy đủ các trường thông tin dưới đây để thêm mới 1 bản ghi.
                          </DialogContentText>
                          <FormGroup>
                            <FormControl>
                              <TextField
                                autoFocus
                                required
                                margin="normal"
                                name="name"
                                label="Tên Tỉnh/Thành Phố"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={selectedRowData?.name || ''}
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl>
                              <TextField
                                required
                                margin="normal"
                                name="code"
                                label="Mã Tỉnh/Thành Phố"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={selectedRowData?.code || ''}
                                onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl>
                              <TextField
                                required
                                margin="normal"
                                name="type"
                                label="Loại"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={selectedRowData?.type || ''}
                                onChange={handleChange}
                              />
                            </FormControl>
                            <DialogActions>
                              <Button sx={{ mr: 1 }} variant="outlined" onClick={handleCloseEditDialog}>Hủy</Button>
                              <Button variant="contained" onClick={handleEdit} type="submit">Cập nhật</Button>
                            </DialogActions>
                          </FormGroup>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No results found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filterRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </Box>
  </Typography>
);


}