import React, { Component } from 'react';
import { checkInput } from '../../utils/checks';
import {upload} from '../../utils/FileInterface';
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Paper,
  withStyles,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import FormUserContactInfo from './FormUserContactInfo';
import FormUserBusinessDetails from './FormUserBusinessDetails';
import FormUserSocialMedia from './FormUserSocialMedia';
import FormUserFileUpload from './FormUserFileUpload';
import Confirm from './Confirm';
import Success from './Success';
import { renderText } from "../common/DisplayComponent";
import { styles } from "../common/styles";

import FullScreenDialog from './FullScreenDialog';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      // },
      data: {
        firstName: 'ende',
        lastName: 'point',
        email: this.props.user.email,
        phoneNumber: '12334567889',
        militaryBranch: '',
        militaryStatus: '',
        companyName: 'Endepointe', 
        websiteUrl: 'endepointe.com',
        description: 'all the things built here',
        twitter: '',
        instagram: '',
        facebook: '',
        linkedin: '',
        forms: {
          aafes: {
            pdf: null,
          },
          w9: {
            pdf: null,
          },
          visitorPass: {
            pdf: null,
          },
          photoRelease: {
            pdf: null,
          }
        }
      },
      errors: {},
      steps: [
        {label: "Contact Info"},
        {label: "Business Info"},
        {label: "Social Media"},
        {label: "Form Upload"},
        {label: "Confirmation"},
        {label: "Success"}
      ],
      step: 0,
      disableNext: true
    };
  }

  componentDidMount() {
    console.log('component ready');
    // console.log(this.state);
  }

  render() {
    const {classes} = this.props;
    const {open} = this.props;
    const {user} = this.props;
    // this function will be called after the user has filled out the
    // required information (everything but the pdf forms)
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('submit form');
    }

    // Handle fields change
    const handleChange = ({target}) => {
      const { step, data, errors } = this.state;
      // target.value.length <= 3
      //   ? (errors[target.name] = `${target.name} have at least 3 letters`)
      //   : (errors[target.name] = '');
      data[target.name] = target.value;
      console.log(data[target.name]);
      this.setState({data, errors});
      this.setState({disableNext: checkInput(step, data)})
    };

    const handleNextStep = () => {
      let {step, data} = this.state;
      step += 1;
      this.setState({step, disableNext: checkInput(step, data)});
    };

    const handleBackStep = () => {
      let {step, data} = this.state;
      step -= 1;
      this.setState({step, disableNext: checkInput(step, data)});
    };

    const handleDownload = (file) => {
      console.log('file to download: ', file);
      const link = document.createElement('a');
      link.download = file.relativePath; 
      link.href = file.publicURL;
      link.click();
    }

    const handleFileUpload = (file, name) => {
      const {data} = this.state;
      console.log(data.forms, name);
      console.log('this will take all the pdfs in state and upload them to their destination');
      switch (name) {
        case 'AAFES':
          data.forms.aafes = file;
        break;
        case 'W9':
          data.forms.w9 = file;
        break;
        case 'Visitor Pass':
          data.forms.visitorPass = file;
        default:
        case 'Photo Release':
          data.forms.photoRelease = file;
        break;
      }
      this.setState({data});
    }

    const getStepContent = (step) => {
      switch (step) {
        case 0:
          return (
            <FormUserContactInfo
              state={this.state}
              user={user}
              handleChange={handleChange}
              handleNextStep={handleNextStep} />
          );
        case 1: 
          return (
            <FormUserBusinessDetails 
              state={this.state}
              handleChange={handleChange}
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep} />
          );
        case 2:
          return (
            <FormUserSocialMedia 
              state={this.state}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep}/>
          );
        case 3:
          return (
            <FormUserFileUpload
              state={this.state}
              handleFileUpload={handleFileUpload}
              handleDownload={handleDownload}
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep} />
          );
        case 4: 
          return (
            <Confirm 
              state={this.state}
              handleNextStep={handleNextStep}
              handleBackStep={handleBackStep} />
          );
        case 5:
          return (
            <Success />
          )
        default:
          return (<div>step form</div>);
      }
    };

    return (
      <FullScreenDialog open={open}>
        <Grid container className={classes.formContainer}>
          <Grid item xs={12} sm={7}>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <Paper component={Box} mb={1}>
                <Box pt={2}>
                  {renderText({
                    type: "h6",
                    color: "primary",
                    label: "Event Bookings Signup Form",
                    align: "center",
                  })}
                </Box>
                <Stepper activeStep={this.state.step} alternativeLabel>
                  {this.state.steps.map((item) => (
                    <Step key={item.label}>
                      <StepLabel>{item.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
              {getStepContent(this.state.step)}
            </form>
          </Grid>
        </Grid>
      </FullScreenDialog>
    );
  }
}

UserForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

//https://github.com/GreatCoderss/reactMultiStepForm/tree/main/src/component/Steps
export default withStyles(styles)(UserForm);