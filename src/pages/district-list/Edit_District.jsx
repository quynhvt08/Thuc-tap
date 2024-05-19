import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function Edit_District() {

    const [districts, setDistricts] = useState([]);

  useEffect(() => {fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/districts');
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const deleteDistrict = async (slug) => {
    try {
      await axios.delete(`http://localhost:3002/districts/${slug}`);
      fetchDistricts();
      console.log('District deleted successfully');
    } catch (error) {
      console.error('Error deleting district:', error);
    }
  };

  return (
    <div>
      <h1>List of Districts</h1>
      <ul>
        {districts.map(district => (
          <li key={district._id}>
            {district.name}
            {/* Thêm nút xóa với biểu tượng */}
            <button onClick={() => deleteDistrict(district.slug)}>
            <IconButton>
            <DeleteIcon />
           </IconButton>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Edit_District
