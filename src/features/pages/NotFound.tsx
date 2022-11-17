import { Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
    return (
        <React.Fragment>
            <Typography variant='h3' textAlign={'center'} color={'#006699'} >Error 404, Page Not Found</Typography>
            <Typography variant='body2' textAlign={'center'} color={'rgba(0,0,0,0.3)'}>The link may be broken, or the page may have been removed.</Typography>
            <img style={{
                width: '60%',
                height: '60%',
                display: 'block',
                margin: '0px auto 0px auto'
            }} src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="not found" />
        </React.Fragment>
    )
}

export default NotFound