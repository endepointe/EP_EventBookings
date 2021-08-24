import React, { useEffect } from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import {
  renderButton,
  renderInputField,
  renderSelect,
  renderText,
  renderTextareaField,
} from "../common/DisplayComponent";

const FormUserBusinessDetails = ({
    state, handleChange, handleNextStep, handleBackStep}) => {

  useEffect(() => {
    console.log(state); 
  })

  return (
    <Paper style={styles.steps}>
      <Box mt={2} mb={2}>
        {renderText({
          label: "Tell us about your business:",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Box>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "companyName",
            label: "Company name",
            onChange: handleChange,
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "websiteUrl",
            label: "Website URL",
            required: true,
            onChange: handleChange,
          })}
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={12}>
          {renderTextareaField({
            state,
            name: "description",
            label: "Description of business",
            onChange: handleChange,
          })}
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "twitter",
            label: "Twitter URL",
            onChange: handleChange,
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "facebook",
            label: "Facebook URL",
            onChange: handleChange,
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "instagram",
            label: "Instgram URL",
            required: false,
            onChange: handleChange,
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "linkedin",
            label: "LinkedIn URL",
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
        <Box ml={2}>{renderButton({ label: "Next", onClick: handleNextStep })}</Box>
      </Grid>
    </Paper>
  );
}

export default FormUserBusinessDetails;