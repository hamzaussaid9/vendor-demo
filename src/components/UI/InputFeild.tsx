import { Clear, Done } from '@mui/icons-material';
import { InputAdornment, MenuItem, TextField, Tooltip } from '@mui/material';
import React from 'react'
import { IInputFeild } from '../../models/ui.model';

const InputFeild: React.FC<IInputFeild> = ({
    name, getFieldProps, isSubmitting, errors, touched, margin, rows, size, type, variant, fullWidth, label, select, options
}) => {
    return (
        <React.Fragment>
            <Tooltip placement="top-end" disableHoverListener title={`${!errors[name] ? '' : errors[name]}`} arrow>
                <TextField
                    label={label}
                    variant={variant}
                    rows={rows ? rows : 1}
                    multiline={(rows && rows > 1) ? true : false}
                    {...getFieldProps(name)}
                    type={type ? type : "text"}
                    margin={margin ? margin : "none"}
                    size={size ? size : "medium"}
                    error={Boolean(touched[name] && errors[name])}
                    fullWidth={fullWidth ? fullWidth : false}
                    disabled={isSubmitting ? isSubmitting : false}
                    select={select ? select : false}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {touched[name] ? errors[name] ? <Clear color="error" /> : <Done color="primary" /> : ''}
                        </InputAdornment>
                    }}
                >
                    {
                        (select && options !== undefined) ? options.map((option,index) =><MenuItem key={index} value={option}>{option}</MenuItem>)
                            : null
                    }
                </TextField>
            </Tooltip>
        </React.Fragment>
    );
}

export default InputFeild;