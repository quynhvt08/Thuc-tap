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
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import * as XLSX from 'xlsx';
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
  { id: 'name', numeric: false, disablePadding: true, label: 'Tên Quận/ Huyện' },
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
  const { rows, setRows, searchTerm, setSearchTerm} = props;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    path_with_type: ''
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
      const response = await axios.post('http://localhost:3002/districts', formData);
      // Cập nhật state với mục nhập mới
      const newEntry = response.data;
      setRows(prevRows => {
        const updatedRows = [...prevRows, newEntry].map(item => {
          if (item.type === 'quan') {
            return { ...item, type: 'Quận' };
          } else if (item.type === 'thanh-pho') {
            return { ...item, type: 'Thành phố' };
          } else if (item.type === 'thi-xa') {
            return { ...item, type: 'Thị xã' };
          } else if (item.type === 'huyen') {
            return { ...item, type: 'Huyện' };
          }
          return item;
        });
        return updatedRows;
      });
      handleClose(); // Đóng dialog sau khi thêm thành công
    } catch (error) {
      console.error('Lỗi khi thêm tỉnh/thành phố:', error);
      // Xử lý lỗi nếu có
    }
  };
  //IMPORT EXCEL
  const handleImportExcel = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Xử lý và định dạng dữ liệu jsonData
      const processedData = jsonData.map(item => ({
        ...item,
        type: item.type === 'quan' ? 'Quận' : item.type === 'huyen' ? 'Huyện' : item.type === 'thi-xa' ? 'Thị xã' : item.type,
      }));

      try {
        await Promise.all(processedData.map(item => axios.post('http://localhost:3002/districts', item)));
        const response = await axios.get('http://localhost:3002/districts');
        const updatedRows = response.data.map(item => ({
          ...item,
          type: item.type === 'quan' ? 'Quận' : item.type === 'huyen' ? 'Huyện' : item.type === 'thi-xa' ? 'Thị xã' : item.type,
        }));
        // console.log('updatedRows:', updatedRows);
        setRows(updatedRows);
      } catch (error) {
        console.error('Lỗi khi import dữ liệu từ Excel:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  //SEARCH
  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
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
          <h2> <MapsHomeWorkOutlinedIcon /> &nbsp;&nbsp;Danh sách Quận/Huyện</h2>
        </Typography>
        <FormGroup sx={{ mr : 5 }}>
          <FormControl >
            <TextField
              name="name"
              label="Nhập để tìm kiếm.."
              type="text"
              fullWidth
              variant="outlined"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </FormControl>
        </FormGroup>
      </>
      <React.Fragment>
        <Tooltip sx={{ mr : 1 }} title="Thêm Quận/Huyện">
          <IconButton  onClick={handleClickOpen}>
            <AddLocationAltIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip sx={{ mr : 1 }} title="Import Excel">
          <IconButton component="label">
            <PublishIcon />
            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: 'none' }}
              onChange={handleImportExcel}
            />
          </IconButton>
        </Tooltip>
        {/* DIALOG VÀ FORM DÙNG ĐỂ ADD DATA */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Thêm mới 1 Quận/Huyện</DialogTitle>
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
                  label="Tên Quận/Huyện"
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
                  label="Mã Quận/Huyện"
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
              <FormControl>
                <TextField
                  required
                  margin="normal"
                  name="path_with_type"
                  label="Chi tiết"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.path_with_type}
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState(rows);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  // GỌI API LẤY DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:3002/districts');
        const processedData = result.data.map(item => {
          if (item.type === 'quan') {
            return { ...item, type: 'Quận' };
          } else if (item.type === 'thanh-pho') {
            return { ...item, type: 'Thành phố' };
          } else if (item.type === 'thi-xa') {
            return { ...item, type: 'Thị xã' };
          } else if (item.type === 'huyen') {
            return { ...item, type: 'Huyện' };
          }
          return item;
        });
        setRows(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilterRows(rows);
  }, [rows]);
  //HANDLE SORT
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const sortedRows = React.useMemo(() => {
    return stableSort(filterRows, getComparator(order, orderBy));
  }, [filterRows, order, orderBy]);
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  //END OF HANDLE SORT

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
  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/districts/${selectedRowId}`);
      setRows(rows.filter((row) => row.id !== selectedRowId));
      setFilterRows(filterRows.filter((row) => row.id !== selectedRowId));
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Lỗi khi xoá dữ liệu:", error);
    }
  };
  const handleEdit = async () => {
    // console.log("info: ", selectedRowData);
    try {
      await axios.put(`http://localhost:3002/districts/${selectedRowId}`, selectedRowData);
      const updatedRows = rows.map(row =>
        row.id === selectedRowId ? selectedRowData : row
      );
      setRows(updatedRows);
      setFilterRows(updatedRows);
      setSelectedRowId(null);
      handleCloseEditDialog();
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
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

  useEffect(() => {
    if (selectedProvince) {
      const filtered = districts.filter(({ parent_code }) => parent_code === selectedProvince);
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedProvince, districts]);

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

   // Lọc kết quả
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
    setFilterOpen(false); // Đóng box lọc khi áp dụng filter
  };
  
  // Sử dụng nút "Xóa lọc"
  const handleClearFilter = () => {
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');
    setFilteredDistricts([]);
    setFilteredWards([]);
    setFilteredResults([]);
    setFilterRows(rows); // Đưa filterRows về dữ liệu gốc
    setOpen(false); // Đóng box lọc
  };


  //SEARCH
  useEffect(() => {
    const filteredRows = rows.filter((row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterRows(filteredRows);
  }, [searchTerm, rows]);
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', overflowX : 'auto' }}>
          <EnhancedTableToolbar rows={rows} setRows={setRows} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <div style={{ position: 'relative' }}>
            <Toolbar>
              <Button variant="contained" color="primary" size="small" onClick={handleToggle}>
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
                      <h3><MapsHomeWorkOutlinedIcon /> &nbsp;&nbsp;Lọc theo Khu vực </h3>
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
                        <Button variant="contained" color="secondary" size="big" onClick={handleClearFilter}>Xóa lọc</Button>
                        <Button variant="contained" color="primary" size="big" onClick={() => handleApplyFilter([])}>Áp dụng</Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Collapse>
          </div>
          <TableContainer sx={{ flex: '1 1 100%', ml: 4, mr: 2}}>
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
                  sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell sx={{ width : '5%' }}>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{row.code}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.path_with_type}</TableCell>
                      <TableCell align="left" sx={{ width : '20%' }}>
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
                        {/* DIALOG VÀ FORM DÙNG ĐỂ UPDATE DATA */}
                        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                          <DialogTitle>Cập nhật thông tin Quận/Huyện</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Sửa thông tin của trường bạn muốn thay đổi và nhấn nút cập nhật để cập nhật thông tin
                            </DialogContentText>
                            <FormGroup>
                              <FormControl>
                                <TextField
                                  autoFocus
                                  required
                                  margin="normal"
                                  name="name"
                                  label="Tên Quận/Huyện"
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
                                  label="Mã Quận/Huyện"
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
                              <FormControl>
                                <TextField
                                  required
                                  margin="normal"
                                  name="path_with_type"
                                  label="Chi tiết"
                                  type="text"
                                  fullWidth
                                  variant="outlined"
                                  value={selectedRowData?.path_with_type || ''}
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
  );
}