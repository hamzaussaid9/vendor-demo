import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { loginAsyncThunk } from '../../components/slices/auth.slice';
import { useAppDispatch } from '../../custom-hooks/useReduxActions';


const Layout: React.FC = () => {
  const [open, setOpen] = useState<true | false>(false);
  const handleOpen = () => setOpen((open)=> !open);
  const Dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    let response;
    if (token)
      response = await Dispatch(loginAsyncThunk(token))
    else
      navigate('/auth');
    console.log(response);
  }
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, [navigate])
  return (
    <React.Fragment>
      <div style={{display:"flex"}}>
        <Header showHandler={true} handleSideBarOpen={handleOpen} />
        <Sidebar open={open} handleOpen={handleOpen} />
        <Grid sx={{margin:'85px 0px 0px 0px', padding:'0px 15px 15px 15px'}} container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Outlet />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default Layout