import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token'))
      navigate('/');
  }, [navigate])
  return (
    <React.Fragment>
      <Header showHandler={false} handleSideBarOpen={()=>{}} />
      <Grid sx={{marginTop: '100px'}} container>
        <Grid item xs={0} sm={0} md={4} lg={6} xl={6}>

        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
          <Outlet />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AuthLayout;