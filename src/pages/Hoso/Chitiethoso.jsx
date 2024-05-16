import React, { useState, useEffect } from 'react';
import { State, City } from 'country-state-city';
import { Stack, FormControl, Select, MenuItem } from '@mui/material';

const VietnamLocationFilter = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filterProvince, setFilterProvince] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');

  useEffect(() => {
    const vietnamProvinces = State.getStatesOfCountry('VN');
    setProvinces(vietnamProvinces);
  }, []);

  const handleProvinceChange = (e) => {
    const stateCode = e.target.value;
    setFilterProvince(stateCode);
    const districts = City.getCitiesOfState('VN', stateCode);
    setDistricts(districts);
    setFilterDistrict('');
  };

  const handleDistrictChange = (e) => {
    setFilterDistrict(e.target.value);
    setFilterWard(e.target.value);
  };

  return (
    <Stack spacing={2} direction="row">
      <FormControl variant="outlined">
        <Select value={filterProvince} onChange={handleProvinceChange} displayEmpty>
          <MenuItem value="">
            <span>Tất cả các tỉnh</span>
          </MenuItem>
          {provinces.map((province) => (
            <MenuItem key={province.isoCode} value={province.isoCode}>
              {province.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined">
        <Select value={filterDistrict} onChange={handleDistrictChange} displayEmpty disabled={!filterProvince}>
          <MenuItem value="">
            <span>Tất cả các quận/huyện</span>
          </MenuItem>
          {districts.map((district) => (
            <MenuItem key={district.id} value={district.id}>
              {district.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Stack>
  );
};

export default VietnamLocationFilter;
