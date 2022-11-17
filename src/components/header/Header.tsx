import { Adb, Menu as OpenMenu, Search } from '@mui/icons-material'
import { AppBar, Avatar, Box, Container, Divider, IconButton, Menu, MenuItem, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/useReduxActions';
import { IHeader } from '../../models/layout.model';
import { logout } from '../slices/auth.slice';

const drawerWidth: number = 240;

const Header: React.FC<IHeader> = ({ showHandler, handleSideBarOpen }) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);
    const [open, setopen] = useState<true | false>(false);
    const dispatch = useAppDispatch();
    const handleClose = () => setopen(false);
    const handleOpen = () => setopen(true);
    const userLogout = () => {
        handleClose();
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/auth');
        enqueueSnackbar("logout successfull", {
            variant: "info",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
        });
    }
    return (
        <AppBar color={'transparent'} sx={{
            backgroundColor:'rgba(255,255,255,0.9)',
            width: { md: `calc(100% -${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
        }} position='fixed' elevation={6}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Stack width='100%' direction='row' justifyContent={'space-between'}>
                        <div style={{ display: 'flex' }}>
                            <IconButton sx={{ display: { md: 'none', sm: 'block', xs: 'block' }, mr: 2 }} onClick={handleSideBarOpen} size='small' color='inherit'>
                                <OpenMenu fontSize='large' />
                            </IconButton>
                            {
                                !auth.isLoggedIn &&
                                <React.Fragment>
                                    <Adb sx={{ mr: 1, mt: 0.5 }} />
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            mr: 2,
                                            fontFamily: 'monospace',
                                            textShadow: '0px 0px 3px black',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        LOGO
                                    </Typography>
                                </React.Fragment>
                            }
                        </div>
                        {
                            auth.isLoggedIn ?
                                <Box>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                                            <Avatar alt="random" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu sx={{ mt: 5 }} open={open} onClose={handleClose} keepMounted transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Typography variant='body2' component='div' margin='15px'>
                                            Hello {auth.user?.name}!
                                        </Typography>
                                        <Divider sx={{mb: '10px'}} />
                                        <MenuItem sx={{ minWidth: '100px' }} onClick={userLogout}>
                                            Log out
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                : ''
                        }
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;