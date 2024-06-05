import { Link } from 'react-router-dom';
import hcmueLogo from '../../images/hcmue.png';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <img src={hcmueLogo} alt="HCMUE Logo" style={{ width: '100px', marginBottom: '20px' }} />       
          </Stack>
          <Typography variant="h3" align="center">Quản lý hồ sơ xét tuyển</Typography>
          
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
