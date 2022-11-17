import { Drawer } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react';
import { ISideBar } from '../../models/layout.model';
import SideBarList from './SideBarList';


const useStyles = makeStyles({
    DrawerPaper: {
        width: 240
    }
})

const Sidebar:React.FC<ISideBar> = ({open,handleOpen}) => {
    const classes = useStyles();
  return (
    <React.Fragment>
        <Drawer  sx={{
            display: {xs: 'none', sm: 'none', md: 'block' },
            width: 240
        }}
        variant="permanent"
        open
        classes={{paper: classes.DrawerPaper}}
        >
            <SideBarList handleSideBarOpen={()=>{}} />
        </Drawer>
        <Drawer 
        variant='temporary'
        anchor='left'
        sx={{
            display: { xs: 'block', sm: 'block', md: 'none' }
        }}
        ModalProps={{
            keepMounted: true
        }}
        classes={{paper: classes.DrawerPaper}}
        open={open}
        onClose={handleOpen}
        >
            <SideBarList handleSideBarOpen={handleOpen} />
        </Drawer>
    </React.Fragment>
  )
}

export default Sidebar