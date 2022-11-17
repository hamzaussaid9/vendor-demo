import { AlertProps } from '@mui/material';
import { useSnackbar } from 'notistack'
import React from 'react'

const useHandleAlert = (message: string, alertType:AlertProps["severity"]) => {
    const { enqueueSnackbar } = useSnackbar();
    enqueueSnackbar(message,{
        variant: alertType,
        anchorOrigin: { vertical: "bottom", horizontal: "right" }
    })
}

export default useHandleAlert;