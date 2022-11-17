import { Adb, Dashboard, ManageAccounts, ShoppingCart, Store } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ISIdeBarList } from '../../models/layout.model';


const sideBarItems = [
  {
    text: 'Dashboard',
    icon: <Dashboard color="info" />,
    path: '/'
  },
  {
    text: 'Manage your Store',
    icon: <ManageAccounts color="info" />,
    path: '/manage-store'
  },
  {
    text: 'Items',
    icon: <Store color="info" />,
    path: '/store'
  },
  {
    text: 'Cart',
    icon: <ShoppingCart color="info" />,
    path: '/cart'
  }
];

const SideBarList: React.FC<ISIdeBarList> = ({ handleSideBarOpen }) => {
   const navigate = useNavigate();
   const location:string = useLocation().pathname;
    const locationPath:string = location.split('/')[1];
   const handleSidebarAction = (path: string) =>{
    handleSideBarOpen();
    navigate(path);
   }
  return (
    <React.Fragment>
      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} margin={'15px 0px'}>
        <Adb color="primary" sx={{ mr: 1, mt: 0.5 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            textShadow: '0px 0px 1px black',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#006699',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>
      </Stack>
      <Divider />
      <List sx={{overflowX: 'hidden'}}>
        {
          sideBarItems.map(item => {
            return <React.Fragment>
              <ListItem
                selected={locationPath === item.path.split('/')[1]}
                key={item.text}
                onClick={()=>handleSidebarAction(item.path)}
                sx={{
                  borderRadius: '15px',
                  margin: '10px'
                }} button>
                <ListItemIcon color='primary'>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#006699" }} />
              </ListItem>
            </React.Fragment>
          })
        }
      </List>
    </React.Fragment>
  )
}

export default SideBarList;