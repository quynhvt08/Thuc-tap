import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function YourComponent() {
  const [open, setOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [district, setDistrict] = useState('');
  const [districtType, setDistrictType] = useState('');

  useEffect(() => {
    // Gọi API để lấy dữ liệu các tỉnh/thành phố
    axios.get('http://localhost:3001/data')
      .then(response => {
        // Lưu trữ dữ liệu vào state
        setCities(response.data);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleDistrictTypeChange = (event) => {
    setDistrictType(event.target.value);
  };

  return (
    <div>
      {/* IconButton với biểu tượng AddLocationAltIcon */}
      <IconButton onClick={handleClickOpen} style={{ color: 'blue' }}>
        <AddLocationAltIcon />
      </IconButton>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h2>Thêm địa điểm mới  <AddLocationAltIcon /></h2></DialogTitle>
        <DialogContent sx={{ width: 500 }}>      
          <form>
            <h4>Chọn tỉnh/thành phố :</h4>
            <FormControl fullWidth >
              <InputLabel id="city-select-label">Chọn tỉnh/thành phố</InputLabel>
              <Select
                labelId="city-select-label"
                id="city-select"
                value={selectedCity}
                label="Chọn tỉnh/thành phố"
                onChange={handleCityChange}
              >
                {/* Danh sách các tỉnh/thành phố */}
                {cities.map(city => (
                  <MenuItem key={city.id} value={city.id}>
                    {` ${city.code} -  ${city.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <h4>Quận/Huyện :</h4>
            <TextField
              fullWidth
              label="Tên quận/huyện"
              value={district}
              onChange={handleDistrictChange}
              sx={{ marginBottom: 2 }}
            />

            {/* Chọn loại quận/huyện */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="district-type-label">Chọn loại</InputLabel>
              <Select
                labelId="district-type-label"
                id="district-type-select"
                value={districtType}
                label="Chọn loại"
                onChange={handleDistrictTypeChange}
              >
                <MenuItem value={'quận'}>Quận</MenuItem>
                <MenuItem value={'huyện'}>Huyện</MenuItem>
              </Select>
            </FormControl>

            {/* Nhập chi tiết */}
            <TextField
              fullWidth
              label="Nhập chi tiết"
              multiline
              rows={4}
              sx={{ marginBottom: 2 }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Hủy</Button>
          <Button onClick={handleClose} color="primary" autoFocus>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default YourComponent;
