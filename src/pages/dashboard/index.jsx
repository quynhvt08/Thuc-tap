import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// ==============================|| DASHBOARD - DEFAULT ||============================== //
export default function DashboardDefault() {
  //TRƯỜNG HỌC
  const [totalSchools, setTotalSchools] = useState(0);
  const [newSchoolsThisYear, setNewSchoolsThisYear] = useState(0);
  const [percentageUp, setPercentageUp] = useState(0);
  //HỒ SƠ
  const [totalHosos, setTotalHosos] = useState(0);
  const [newHososThisYear, setNewHososThisYear] = useState(0);
  const [percentageUp_Hoso, setPercentageUp_Hoso] = useState(0);
  //HỒ SƠ ĐẬU
  const [totalHosos_passed, setTotalHosos_passed] = useState(0);
  const [newHososThisYear_passed, setNewHososThisYear_passed] = useState(0);
  const [percentageUp_Hoso_passed, setPercentageUp_Hoso_passed] = useState(0);
  //HỒ SƠ RỚT
  const [totalHosos_fail, setTotalHosos_fail] = useState(0);
  const [newHososThisYear_fail, setNewHososThisYear_fail] = useState(0);
  const [percentageUp_Hoso_fail, setPercentageUp_Hoso_fail] = useState(0);

  // TRƯỜNG
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/schools');
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
      
      var percentageUp = ((newTotalSchool - oldTotalSchool) / oldTotalSchool) * 100;
      if (percentageUp < 0) {
        percentageUp = 0;
      }
      // Gán phần trăm tăng thêm cho state
      setPercentageUp(Math.round(percentageUp * 10) / 10);
    }
  }, [totalSchools, newSchoolsThisYear]);

  // TỔNG HỒ SƠ
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/hoso');
        setTotalHosos(response.data.length);
        // console.log(response.data);
        const currentYear = new Date().getFullYear();
        const newHososCount = response.data.filter(hoso => new Date(hoso.createdAt).getFullYear() === currentYear).length;
        setNewHososThisYear(newHososCount);

        // console.log(newSchoolsCount);
      } catch (error) {
        console.error('Error fetching total hoso:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (totalHosos !== 0 && newHososThisYear !== 0) {
      const newTotalHosos = totalHosos;
      const oldTotalHoso = totalHosos - newHososThisYear;
      var percentageUp_Hoso = ((newTotalHosos - oldTotalHoso) / oldTotalHoso) * 100;
      if (percentageUp_Hoso < 0) {
        percentageUp_Hoso = 0;
      }
      // Gán phần trăm tăng thêm cho state
      setPercentageUp_Hoso(Math.round(percentageUp_Hoso * 10) / 10);
    }
  }, [totalHosos, newHososThisYear]);

  // HỒ SƠ ĐẬU
  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/hoso');
            const passedHosos = response.data.filter(item => item.status === 'Đậu');
            // console.log("passed: ", passedHosos);
            setTotalHosos_passed(passedHosos.length);
            const currentYear = new Date().getFullYear();
            const newHosoPassedCount = passedHosos.filter(hoso => new Date(hoso.createdAt).getFullYear() === currentYear).length;
            // console.log("passedthisyear: ", newHosoPassedCount);

            setNewHososThisYear_passed(newHosoPassedCount);
          } catch (error) {
            console.error('Error fetching total hoso:', error);
          }
        };
        fetchData();
  }, []);
  useEffect(() => {
        if (totalHosos_passed !== 0 && newHososThisYear_passed !== 0) {
          const newTotalHosos_passed = totalHosos_passed;
          const oldTotalHoso_passed = totalHosos_passed - newHososThisYear_passed;

          var percentageUp_Hoso_passed = ((newTotalHosos_passed - oldTotalHoso_passed) / oldTotalHoso_passed) * 100;
          if (percentageUp_Hoso_passed < 0) {
            percentageUp_Hoso_passed = 0;
          }
          // Gán phần trăm tăng thêm cho state
          setPercentageUp_Hoso_passed(Math.round(percentageUp_Hoso_passed * 10) / 10);
        }
      }, [totalHosos_passed, newHososThisYear_passed]);

  // HỒ SƠ RỚT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/hoso');
        const failHosos = response.data.filter(item => item.status === 'Rớt');
        setTotalHosos_fail(failHosos.length);
        // console.log(response.data);
        const currentYear = new Date().getFullYear();
        const newHososCount_fail = response.data.filter(hoso => hoso.status === 'Rớt' && new Date(hoso.createdAt).getFullYear() === currentYear).length;
        setNewHososThisYear_fail(newHososCount_fail);

      } catch (error) {
        console.error('Error fetching total hoso:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (totalHosos_fail !== 0 && newHososThisYear_fail !== 0) {
      const newTotalHosos_fail = totalHosos_fail;
      const oldTotalHoso_fail = totalHosos_fail - newHososThisYear_fail;
      
      var percentageUp_Hoso_fail = ((newTotalHosos_fail - oldTotalHoso_fail) / oldTotalHoso_fail) * 100;
      if (percentageUp_Hoso_fail < 0) {
        percentageUp_Hoso_fail = 0;
      }
      // Gán phần trăm tăng thêm cho state
      setPercentageUp_Hoso_fail(percentageUp_Hoso_fail);
    }
  }, [totalHosos_fail, newHososThisYear_fail]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Trường học</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số lượng trường học" count={totalSchools.toString()} percentage={percentageUp} extra={`${newSchoolsThisYear.toString()}`} />
      </Grid>

       {/* row 2 */}
       <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Hồ sơ</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số lượng hồ sơ" count={totalHosos.toString()} percentage={percentageUp_Hoso} extra={`${newHososThisYear.toString()}`} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số lượng hồ sơ đậu" count={totalHosos_passed.toString()} percentage={percentageUp_Hoso_passed} extra={`${newHososThisYear_passed.toString()}`} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số lượng hồ sơ rớt" count={totalHosos_fail.toString()} percentage={percentageUp_Hoso_fail} extra={`${newHososThisYear_fail.toString()}`} />
      </Grid>
    </Grid>
    
  );
}
