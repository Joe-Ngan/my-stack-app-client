import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


function Input({name, label, handleChange, half, autoFocus, type, handleShowPassword }) {
    return (
        <Grid item xs={12} sm={half? 6 : 12}>
            <TextField 
            name={name} 
            label={label} 
            onChange={handleChange} 
            variant="outlined"
            fullWidth
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password'? {
                endAdornment:(
                    <InputAdornment>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }: null}
            />
        </Grid>
    )
}

export default Input
