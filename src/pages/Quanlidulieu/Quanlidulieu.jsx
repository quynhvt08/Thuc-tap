import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function createData(id, Mahoso, Tohopxettuyen, Tongdiem, school, city) {
  return { id, Mahoso, Tohopxettuyen, Tongdiem, school, city };
}

const rows = [
  createData(1, 'HS01', 'A00', '25.6', 'THPT Nguyễn Huệ', 'Bà Rịa Vũng Tàu'),
  createData(2, 'HS02', 'A01', '26.7', 'THPT Lê Quý Đôn', 'Hà Nội'),
  createData(3, 'HS03', 'D01', '24.2', 'THPT Vũng Tàu', 'TP Hồ Chí Minh'),
  createData(4, 'HS04', 'A00', '22.6', 'THPT Trần Nguyên Hãn', 'TP Hồ Chí Minh'),
  createData(5, 'HS05', 'A01', '27.5', 'THPT Đinh Tiên Hoàng', 'Bà Rịa Vũng Tàu'),
  createData(6, 'HS06', 'A00', '21.8', 'THPT Nguyễn Huệ', 'Bà Rịa Vũng Tàu'),
  createData(7, 'HS07', 'A01', '20.5', 'THPT Nguyễn Huệ', 'Hà Nội'),
];

const cities = [
  'Bà Rịa Vũng Tàu',
  'Hà Nội',
  'TP Hồ Chí Minh',
  'Đà Nẵng',
  'Hải Phòng',
  // Add more cities here
];

const squareButtonStyle = {
  minWidth: '36px',
  height: '36px',
  borderRadius: '0.35em',
  padding: '10px',
};

function EnhancedTable() {
    
  const [filterCity, setFilterCity] = useState('');
  
  const handleCityChange = (event) => {
    setFilterCity(event.target.value);
  };

  const handleDetail = (id) => {
    // Implement your detail handling logic here
    console.log('Chi tiết hồ sơ', id);
  };

  const filteredRows = rows.filter(row =>
    filterCity === '' || row.city === filterCity
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            <Stack direction="row" spacing={2} alignItems="center">
            <FilterAltIcon /> {/* Biểu tượng lọc ở đây */} Lọc
            <Select
              value={filterCity}
              onChange={handleCityChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Select city' }}
            >
              <MenuItem value="">
                <span>Tất cả các tỉnh thành</span>
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>Mã hồ sơ</TableCell>
                <TableCell>Tổ hợp</TableCell>
                <TableCell>Điểm</TableCell>
                <TableCell>Trường học</TableCell>
                <TableCell>Thành phố/Tỉnh</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.Mahoso}</TableCell>
                  <TableCell>{row.Tohopxettuyen}</TableCell>
                  <TableCell>{row.Tongdiem}</TableCell>
                  <TableCell>{row.school}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      style={squareButtonStyle}
                      onClick={() => handleDetail(row.id)}
                    >
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default EnhancedTable;