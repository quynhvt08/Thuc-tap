import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, Collapse, Stack, FormControl, Select, MenuItem, Toolbar, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

const FilterComponent = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [open, setOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showFilteredResults, setShowFilteredResults] = useState(false); // State để kiểm soát việc hiển thị kết quả lọc

  const boxRef = useRef(null);

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
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      if (!event.target.closest('.MuiSelect-root') && !event.target.closest('.MuiMenu-list')) {
        setOpen(false);
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
    if (selectedProvince) {
      const filtered = districts.filter(({ parent_code }) => parent_code === selectedProvince);
      setFilteredDistricts(filtered);
      setFilteredResults(filtered);
    } else {
      setFilteredDistricts([]);
      setFilteredResults([]);
    }
    // Xóa các giá trị đã chọn trước đó và hiển thị kết quả lọc
    setSelectedDistrict('');
    setSelectedWard('');
    setShowFilteredResults(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Toolbar>
        <Button variant="contained" color="primary" size="big" onClick={handleToggle}>
          <FilterAltIcon /> Lọc
        </Button>
      </Toolbar>
      <Collapse in={open}>
        <Box
          ref={boxRef}
          sx={{
            position: 'absolute',
            left: '8px',
            zIndex: 1,
            width: '350px',
            padding: 0,
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Card>
            <CardContent>
              <Stack spacing={2} direction="column">
                <h3><HomeWorkIcon/>  Lọc theo Khu vực </h3>
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
                  <Button variant="contained" color="secondary" size="big" onClick={() => setFilteredResults([])}>Xóa lọc</Button>
                  <Button variant="contained" color="primary" size="big" onClick={handleApplyFilter}>Áp dụng</Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Collapse>
      {/* Hiển thị kết quả đã lọc */}
      {showFilteredResults && (
        <div style={{ marginTop: '20px' }}>
          <h3>Kết quả đã lọc:</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Chỉnh sửa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResults.map((result, index) => (
                  <TableRow key={result.id}>
                    <TableCell>{index + 1}</TableCell> {/* Số thứ tự tăng dần */}
                    <TableCell>{result.name}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleEdit(result)}>Chỉnh sửa</Button> {/* Button chỉnh sửa */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;

