import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import {
  renderButton,
  renderInputField,
  renderText,
} from "../common/DisplayComponent";

const FormUserSocialMedia = ({
  state,
  handleChange,
  handleNextStep,
  handleBackStep,
}) => {
  return (
    <Paper style={styles.steps}>
      <Box mt={2} mb={2}>
        {renderText({
          label: "Social Media",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Box>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "twitter",
            label: "Twitter URL",
            required: false,
            onChange: handleChange,
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderInputField({
            state,
            name: "facebook",
            label: "Facebook URL",
            required: false,
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
            required: false,
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
        <Box ml={2}>
          {renderButton({ 
            label: "Next", 
            disabled: state.disableNext,
            onClick: handleNextStep })}
        </Box>
      </Grid>
    </Paper>
  );
};


export default FormUserSocialMedia;