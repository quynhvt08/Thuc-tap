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

  const [totalHosos, setTotalHosos] = useState(0);
  const [newHososThisYear, setNewHososThisYear] = useState(0);
  const [percentageUp_Hoso, setPercentageUp_Hoso] = useState(0);

  const [totalHosos_passed, setTotalHosos_passed] = useState(0);
  const [totalHosos_allpassed, setTotalHosos_allpassed] = useState([0]); // State for passed hosos
  const [newHososThisYear_passed, setNewHososThisYear_passed] = useState(0);
  const [newHososLastYear_passed, setNewHososLastYear_passed] = useState(0);
  const [percentageUp_Hoso_passed, setPercentageUp_Hoso_passed] = useState(0);

  const [totalHosos_notpassed, setTotalHosos_notpassed] = useState(0);
  const [totalHosos_notallpassed, setTotalHosos_notallpassed] = useState([0]); // State for passed hosos
  const [newHososThisYear_notpassed, setNewHososThisYear_notpassed] = useState(0);
  const [newHososLastYear_notpassed, setNewHososLastYear_notpassed] = useState(0);
  const [percentageUp_Hoso_notpassed, setPercentageUp_Hoso_notpassed] = useState(0);

  // TRƯỜNG
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

  // TỔNG HỒ SƠ
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3007/hoso');
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
      const newTotalHosos = newHososThisYear;
      const oldTotalHoso = totalHosos - newHososThisYear;
      console.log("so ho so hien tai: " + newTotalHosos);
      console.log("tong ho so truong cu: " + oldTotalHoso);
      var percentageUp_Hoso = ((newTotalHosos - oldTotalHoso) / oldTotalHoso) * 100;
      if (percentageUp_Hoso < 0) {
        percentageUp_Hoso = 0;
      }
      // Gán phần trăm tăng thêm cho state
      setPercentageUp_Hoso(percentageUp_Hoso);
    }
  }, [totalHosos, newHososThisYear]);

// HỒ SƠ ĐẬU
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3007/hoso');
          setTotalHosos_passed(response.data.length);
          // console.log(response.data);
          const currentYear = new Date().getFullYear();
          const newHososCount_passed = response.data.filter(hoso => hoso.status === 'Đậu' && new Date(hoso.createdAt).getFullYear() === currentYear).length;
          setNewHososThisYear_passed(newHososCount_passed);

          const lastYear = currentYear - 1;
          const newHososCount_passed1 = response.data.filter(hoso => hoso.status === 'Đậu' && new Date(hoso.createdAt).getFullYear() === lastYear).length;
          setNewHososLastYear_passed(newHososCount_passed1);

          const newHososCount_passed2 = response.data.filter(hoso => hoso.status === 'Đậu');
          setTotalHosos_allpassed(newHososCount_passed2);
  
          // console.log(newSchoolsCount);
        } catch (error) {
          console.error('Error fetching total hoso:', error);
        }
      };
  
      fetchData();
    }, []);
    useEffect(() => {
      if (newHososThisYear_passed !== 0 && newHososLastYear_passed !== 0) {
        const newTotalHosos_passed = newHososThisYear_passed + newHososLastYear_passed;
        const oldTotalHoso_passed = newHososLastYear_passed;
        console.log("so ho dau so hien tai: " + newTotalHosos_passed);
        console.log("tong ho so truong cu: " + oldTotalHoso_passed);
        var percentageUp_Hoso_passed = ((newTotalHosos_passed - oldTotalHoso_passed) / oldTotalHoso_passed) * 100;
        if (percentageUp_Hoso_passed < 0) {
          percentageUp_Hoso_passed = 0;
        }
        // Gán phần trăm tăng thêm cho state
        setPercentageUp_Hoso_passed(percentageUp_Hoso_passed);
      }
    }, [totalHosos_passed, newHososThisYear_passed]);

// HỒ SƠ RỚT
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3007/hoso');
      setTotalHosos_notpassed(response.data.length);
      // console.log(response.data);
      const currentYear = new Date().getFullYear();
      const newHososCount_notpassed = response.data.filter(hoso => hoso.status === 'Rớt' && new Date(hoso.createdAt).getFullYear() === currentYear).length;
      setNewHososThisYear_notpassed(newHososCount_notpassed);

      const lastYear = currentYear - 1;
      const newHososCount_notpassed1 = response.data.filter(hoso => hoso.status === 'Rớt' && new Date(hoso.createdAt).getFullYear() === lastYear).length;
      setNewHososLastYear_notpassed(newHososCount_notpassed1);

      const newHososCount_passed2 = response.data.filter(hoso => hoso.status === 'Rớt');
      setTotalHosos_notallpassed(newHososCount_passed2);

      // console.log(newSchoolsCount);
    } catch (error) {
      console.error('Error fetching total hoso:', error);
    }
  };

  fetchData();
}, []);
useEffect(() => {
  if (newHososThisYear_notpassed !== 0 && newHososLastYear_notpassed !== 0) {
    const newTotalHosos_notpassed = newHososThisYear_notpassed + newHososLastYear_notpassed;
    const oldTotalHoso_notpassed = newHososLastYear_notpassed;
    console.log("so ho so hien tai: " + newTotalHosos_notpassed);
    console.log("tong ho so truong cu: " + oldTotalHoso_notpassed);
    var percentageUp_Hoso_notpassed = ((newTotalHosos_notpassed - oldTotalHoso_notpassed) / oldTotalHoso_notpassed) * 100;
    if (percentageUp_Hoso_notpassed < 0) {
      percentageUp_Hoso_notpassed = 0;
    }
    // Gán phần trăm tăng thêm cho state
    setPercentageUp_Hoso_notpassed(percentageUp_Hoso_notpassed);
  }
}, [totalHosos_notpassed, newHososThisYear_notpassed]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Trường học</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số lượng trường học" count={totalSchools.toString()} percentage={percentageUp.toFixed(2)} extra={`${newSchoolsThisYear.toString()}`} />
      </Grid>

       {/* row 2 */}
       <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Hồ sơ</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số lượng hồ sơ" count={totalHosos.toString()} percentage={percentageUp_Hoso.toFixed(2)} extra={`${newHososThisYear.toString()}`} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số lượng hồ sơ đậu" count={totalHosos_allpassed.length} percentage={percentageUp_Hoso_passed.toFixed(2)} extra={`${newHososThisYear_passed.toString()}`} />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Tổng số lượng hồ sơ rớt" count={totalHosos_notallpassed.length} percentage={percentageUp_Hoso_notpassed.toFixed(2)} extra={`${newHososThisYear_notpassed.toString()}`} />
      </Grid>
    </Grid>
    
  );
}
