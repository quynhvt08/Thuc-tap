import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';
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
import FormControl from '@mui/material/FormControl';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
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
  { id: 'name', numeric: false, disablePadding: true, label: 'Tên Tỉnh/Thành Phố' },
  { id: 'type', numeric: false, disablePadding: true, label: 'Loại' },
  { id: 'name_with_type', numeric: false, disablePadding: true, label: 'Chi Tiết' },
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
    type: ''
  });

  //MỞ / ĐÓNG DIALOG
  const handleClickOpen = () => {
    setOpen(true);
  };

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

  //POSTDATA
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/data', formData);
      const newEntry = response.data;
      setRows(prevRows => {
        const updatedRows = [...prevRows, newEntry].map(item => {
          if (item.type === 'tinh') {
            return { ...item, type: 'Tỉnh' };
          } else if (item.type === 'thanh-pho') {
            return { ...item, type: 'Thành phố' };
          }
          return item;
        });
        return updatedRows;
      });
      handleClose();
    } catch (error) {
      console.error('Lỗi khi thêm tỉnh/thành phố:', error);
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
        type: item.type === 'tinh' ? 'Tỉnh' : item.type === 'thanh-pho' ? 'Thành phố' : item.type,
      }));

      try {
        await Promise.all(processedData.map(item => axios.post('http://localhost:3001/data', item)));
        const response = await axios.get('http://localhost:3001/data');
        const updatedRows = response.data.map(item => ({
          ...item,
          type: item.type === 'tinh' ? 'Tỉnh' : item.type === 'thanh-pho' ? 'Thành phố' : item.type,
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
        <Typography
          sx={{ flex: '1 1 100%' , ml : 2, mt: 1}}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <h2> <LocationCityOutlinedIcon/>  &nbsp; Danh sách Tỉnh/Thành Phố</h2>
        </Typography>
        <FormGroup sx={{ mr: 5 }}>
          <FormControl >
            <TextField
              name="name"
              label="Nhập để tìm kiếm.."
              type="text"
              fullWidth
              // size='small'
              variant="outlined"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </FormControl>
        </FormGroup>
        
      <React.Fragment>
        <Tooltip sx={{ mr : 1 }} title="Thêm 1 Tỉnh/Thành phố">
          <IconButton onClick={handleClickOpen}>
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState(rows);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  //GET DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:3001/data');
        const processedData = result.data.map(item => {
          if (item.type === 'tinh') {
            return { ...item, type: 'Tỉnh' };
          } else if (item.type === 'thanh-pho') {
            return { ...item, type: 'Thành phố' };
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
      await axios.put(`http://localhost:3001/data/${selectedRowId}`, selectedRowData);
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
        <TableContainer  sx={{ flex: '1 1 100%' , ml : 4, mr : 2 }} >
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
            <TableBody sx={{ maxWidth: '100%', overflowX: 'auto' }}>
              {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell sx={{ width : '5%' }}>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell component="th" scope="row" padding="none" >{row.code}</TableCell>
                      <TableCell align="left" >{row.name}</TableCell>
                      <TableCell align="left" >{row.type}</TableCell>
                      <TableCell align="left" >{row.name_with_type}</TableCell>
                      <TableCell align="left" sx={{ width : '20%' }}>
                        <Button sx={{ mr: 1 }} variant="contained" color="secondary" size="small" onClick={() => handleClickOpenEditDialog(row)}>Sửa</Button>
                        <Button onClick={() => handleClickOpenDeleteDialog(row.id)} variant="contained" color="error" size="small">Xoá</Button>
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
                                  // value={formData.name}
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
                                  // value={formData.code}
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
                                  // value={formData.type}
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
                  );
                })}
              {filterRows.length === 0 && (
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
