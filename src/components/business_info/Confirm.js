import React, {useEffect} from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { styles } from "../common/styles";
import {
  renderButton,
  renderInputField,
  renderText,
} from "../common/DisplayComponent";

// data: {
//   firstName: '',
//   lastName: '',
//   email: this.props.user.email,
//   phoneNumber: '',
//   militaryBranch: '',
//   militaryStatus: '',
//   companyName: '', 
//   websiteUrl: '',
//   description: '',
//   twitter: '',
//   instagram: '',
//   facebook: '',
//   linkedin: '',
//   forms: {
//     aafes: {
//       pdf: null,
//     },
//     w9: {
//       pdf: null,
//     },
//     visitorPass: {
//       pdf: null,
//     },
//     photoRelease: {
//       pdf: null,
//     },
//     companyLogo: {
//       image: null,
//     },
//     proofOfStatus: {
//       image: null,
//     },
//     vendorHeadshot: {
//       image: null,
//     }
//   }
// },

const Confirm = ({
    state, 
    handleSave, handleBackStep}) => {
  
  useEffect(() => {
    console.log(state);
  }, [state.saving]);

  return (
    <>
      {!state.saving ?
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
                readOnly: true,
                onChange: null,
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderInputField({
                state,
                name: "lastName",
                label: "Last Name",
                required: true,
                readOnly: true,
                onChange: null,
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
                readOnly: true,
                onChange: null,
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderInputField({
                state,
                name: "email",
                label: "Email",
                type: "email",
                required: true,
                readOnly: true,
                onChange: null,
              })}
            </Grid>
          </Grid>
          <Grid container component={Box} justifyContent='flex-end' mt={2} p={2}>
            <Box ml={2}>
              {renderButton({
                label: "Back",
                color: "default",
                disabled: state.disableBack,
                onClick: handleBackStep,
              })}
            </Box>
            <Box ml={2}>{renderButton({ 
              label: "Save", 
              disabled: false, 
              onClick: handleSave })}</Box>
          </Grid>
        </Paper>
      :     
        <Grid container component={Box} justifyContent='center' mt={2} p={2}>
          <Loader type="Bars" color="#3f51b5" height={80} width={80} />
        </Grid>
      }
    </>
  );
}

export default Confirm;