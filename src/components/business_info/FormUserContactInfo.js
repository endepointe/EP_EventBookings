import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import {
  renderButton,
  renderInputField,
  renderSelect,
  renderText,
} from "../common/DisplayComponent";
// for user phone number
//https://github.com/s-yadav/react-number-format

const FormUserContactInfo = ({state, handleChange, handleNextStep}) => {

  return (
    <Paper style={styles.steps}>
      <Box mt={2} mb={2}>
        {renderText({
          label: "Please Fill personal Data",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Box>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "firstName",
            label: "First Name",
            required: true,
            onChange: handleChange,
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "lastName",
            label: "Last Name",
            required: true,
            onChange: handleChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12}>
          {renderSelect({
            state,
            name: "militaryBranch",
            label: "Branch of Service",
            required: true,
            options: [
              { key: "Army", value: "Army" },
              { key: "Navy", value: "Navy" },
              { key: "Air Force", value: "Air Force" },
              { key: "Coast Guard", value: "Coast Guard" },
            ],
            onChange: handleChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12}>
          {renderSelect({
            state,
            name: "militaryStatus",
            label: "Military Status",
            required: true,
            options: [
              { key: "Active duty", value: "Active duty" },
              { key: "Reserves", value: "Reserves" },
              { key: "Spouse", value: "Spouse" },
              { key: "Retired", value: 'Retired'},
            ],
            onChange: handleChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "phoneNumber",
            label: "Phone",
            required: true,
            onChange: handleChange,
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            onChange: handleChange,
          })}
        </Grid>
      </Grid>

      <Grid container component={Box} justifyContent='flex-end' mt={2} p={2}>
        {renderButton({ 
          label: "Next", 
          onClick: handleNextStep, 
          disabled: state.disableNext })}
      </Grid>
    </Paper>
  );
}

export default FormUserContactInfo;