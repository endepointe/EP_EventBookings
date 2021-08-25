import React from 'react';
import { 
  Button, 
  MenuItem, 
  TextField, 
  Typography } from "@material-ui/core";

export const renderText = ({ type, label, color, ...rest }) => (
  <Typography variant={type} color={color} {...rest}>
    {label}
  </Typography>
);

export const renderInputField = ({ name, label, type, state, onChange, required }) => {
  const { data, errors } = state;
  return (
    <TextField
      label={label}
      type={type ? type : "text"}
      variant='outlined'
      color='primary'
      size='small'
      fullWidth={true}
      name={name}
      value={data[name]}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      required={required}
      onChange={onChange}
    />
  );
};

export const renderTextareaField = ({ name, label, type, state, onChange}) => {
  const {data, errors} = state;
  return (
    <TextField
      label={label}
      type={type ? type : "text"}
      variant='outlined'
      color='primary'
      size='small'
      fullWidth={true}
      name={name}
      value={data[name]}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      multiline={true}
      minRows={3}
      maxRows={5}
      onChange={onChange}
    />
  )
}

export const renderSelect = ({ name, label, options, state, required, onChange }) => {
  const { data, errors } = state;
  return (
    <TextField
      select
      label={label}
      variant='outlined'
      color='primary'
      size='small'
      fullWidth={true}
      name={name}
      value={data[name]}
      error={errors[name] ? true : false}
      helperText={errors[name] ? errors[name] : ""}
      required={required}
      onChange={onChange}>
      {options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.key}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const renderDownloadButton = ({ 
    label, 
    variant, 
    color, 
    file,
    fullWidth, 
    onClick 
  }) => (

  <Button
    variant={variant ? variant : "outlined"}
    color={color ? color : "primary"}
    fullWidth={fullWidth ? fullWidth : false}
    onClick={onClick}>
    {label}
  </Button>
);

export const renderUploadButton = ({ 
    label, 
    variant, 
    color, 
    file,
    fullWidth, 
    onClick 
  }) => (

  <Button
    variant={variant ? variant : "outlined"}
    color={color ? color : "primary"}
    fullWidth={fullWidth ? fullWidth : false}
    onClick={onClick}>
    {label}
  </Button>
);
export const renderButton = ({ 
    label, 
    variant, 
    color, 
    fullWidth, 
    disabled,
    onClick 
  }) => (

  <Button
    variant={variant ? variant : "outlined"}
    color={color ? color : "primary"}
    fullWidth={fullWidth ? fullWidth : false}
    disabled={disabled}
    onClick={onClick}>
    {label}
  </Button>
);