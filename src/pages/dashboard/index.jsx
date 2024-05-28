import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {
  const [totalSchools, setTotalSchools] = useState(0);
  const [newSchoolsThisYear, setNewSchoolsThisYear] = useState(0);
  const [percentageUp, setPercentageUp] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3004/schools');
        setTotalSchools(response.data.length);
        // console.log(response.data);
        const currentYear = new Date().getFullYear();
        const newSchoolsCount = response.data.filter(school => new Date(school.createdAt).getFullYear() === currentYear).length;

        setNewSchoolsThisYear(newSchoolsCount);
        // console.log(newSchoolsCount);
      } catch (error) {
        console.error('Error fetching total schools:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (totalSchools !== 0 && newSchoolsThisYear !== 0) {
      const newTotalSchool = totalSchools;
      const oldTotalSchool = totalSchools - newSchoolsThisYear;
      console.log("so truong hien tai: " + newTotalSchool);
      console.log("tong so truong cu: " + oldTotalSchool);
      var percentageUp = ((newTotalSchool - oldTotalSchool) / oldTotalSchool) * 100;
      if (percentageUp < 0) {
        percentageUp = 0;
      }
      // Gán phần trăm tăng thêm cho state
      setPercentageUp(percentageUp);
    }
  }, [totalSchools, newSchoolsThisYear]);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số lượng trường học" count={totalSchools.toString()} percentage={percentageUp} extra={newSchoolsThisYear.toString()} />
      </Grid>
    </Grid>
  );
}
