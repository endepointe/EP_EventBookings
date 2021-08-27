import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import {
  renderButton,
  renderInputField,
  renderSelect,
  renderText,
} from "../common/DisplayComponent";


const Confirm = ({
    state, 
    handleChange,
    handleNextStep, handleBackStep}) => {

  return (
    <Paper style={styles.steps}>
      <Box mt={2} mb={2}>
        {renderText({
          label: "Verify your information",
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
        <Box ml={2}>
          {renderButton({
            label: "Back",
            color: "default",
            onClick: handleBackStep,
          })}
        </Box>
        <Box ml={2}>{renderButton({ 
          label: "Next", 
          disabled: false, 
          onClick: handleNextStep })}</Box>
      </Grid>
    </Paper>
  );
}

export default Confirm;