import React, {useState, useEffect} from "react";
import { useStaticQuery, graphql } from "gatsby";
import { DropzoneDialog } from 'material-ui-dropzone';
import { AttachFile, PictureAsPdf } from '@material-ui/icons';
import { Box, Grid, Paper } from "@material-ui/core";
import {Alert} from '@material-ui/lab';
import { styles } from "../common/styles";
import {makeStyles} from '@material-ui/core/styles';
import {
  renderButton,
  renderDownloadButton,
  renderUploadButton,
  renderText,
} from "../common/DisplayComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  }
}))
const handlePreviewIcon = (fileObject, classes) => {
  const {type} = fileObject.file
  const iconProps = {
    className : classes.image,
  }

  switch (type) {
    case "application/pdf":
      return <PictureAsPdf {...iconProps} />
    default:
      return <AttachFile {...iconProps} />
  }
}

const FormUserFileUpload = ({
    state, 
    handleDownload,
    handleFileUpload,
    handleNextStep, handleBackStep}) => {

  const classes = useStyles();

  const [openUpload, setOpenUpload] = useState(false);

  const [fileName, setFileName] = useState('');

  const [aafes, setAafes] = useState({
    pdf: null,
    name: '',
    set: false,
  });
  const [w9, setW9] = useState({
    pdf: null,
    name: '',
    set: false
  });
  const [visitorPass, setVisitorPass] = useState({
    pdf: null,
    name: '',
    set: false
  });
  const [photoRelease, setPhotoRelease] = useState({
    pdf: null,
    name: '',
    set: false
  });
  const [companyLogo, setCompanyLogo] = useState({
    image: null,
    name: '',
    set: false
  });
  const [proofOfStatus, setProofOfStatus] = useState({
    image: null,
    name: '',
    set: false
  });
  const [vendorHeadshot, setVendorHeadshot] = useState({
    image: null,
    name: '',
    set: false
  });


  const data = useStaticQuery(graphql`
    {
      allFile(filter: { sourceInstanceName: { eq: "data" } }) {
        edges {
          node {
            relativePath
            extension
            publicURL
          }
        }
      }
    }
  `);
  // console.log('graphql data', data.allFile.edges);
  
  // update the state passed in from UserForm
  useEffect(() => {
    console.log('current state in step 4: ', state);
    if (aafes.set) {
      console.log('updated aafes: ', aafes);
      handleFileUpload(aafes.pdf, aafes.name);
    }

    if (w9.set) {
      console.log('updated w9: ', w9);
      handleFileUpload(w9.pdf, w9.name);
    }

    if (visitorPass.set) {
      console.log('updated visitor pass: ', visitorPass);
      handleFileUpload(visitorPass.pdf, visitorPass.name);
    }

    if (photoRelease.set) {
      console.log('updated photo release: ', photoRelease);
      handleFileUpload(photoRelease.pdf, photoRelease.name);
    }

    if (companyLogo.set) {
      console.log('updated company logo: ', companyLogo);
      handleFileUpload(companyLogo.image, companyLogo.name);
    }

    if (proofOfStatus.set) {
      console.log('updated proof of status: ', proofOfStatus);
      handleFileUpload(proofOfStatus.image, proofOfStatus.name);
    }

    if (vendorHeadshot.set) {
      console.log('updated vendor headshot: ', vendorHeadshot);
      handleFileUpload(vendorHeadshot.image, vendorHeadshot.name);
    }
  }, [aafes,w9,photoRelease,visitorPass,companyLogo,proofOfStatus,vendorHeadshot]);

  const openUploadDialog = (name) => {
    console.log('file to upload: ', name);
    switch (name) {
      case 'a':
        setFileName('AAFES Application');
      break;
      case 'w':
        setFileName('W9');
      break;
      case 'v':
        setFileName("Visitor Pass");
      break;
      case 'r':
        setFileName('Photo Release');
      break;
      case 'l':
        setFileName('Company Logo');
      break;
      case 'p':
        setFileName('Proof of Status');
      break;
      case 'h':
        setFileName('Vendor Headshot');
      break;
      default:
        setFileName('');
      break;
    }
    setOpenUpload(true); 
  }

  const closeUploadDialog = () => {
    setOpenUpload(false); 
  }

  const saveFile = (file) => {
    switch (fileName) {
      case 'AAFES Application':
        setAafes({
          pdf: file[0],
          name: 'AAFES',
          set: true,
        });
      break;
      case 'W9':
        setW9({
          pdf: file[0],
          name: 'W9',
          set: true,
        });
      break;
      case 'Visitor Pass':
        setVisitorPass({
          pdf: file[0],
          name: 'Visitor Pass',
          set: true,
        });
      break;
      case 'Photo Release':
        setPhotoRelease({
          pdf: file[0],
          name: 'Photo Release',
          set: true,
        });
      break;
      case 'Company Logo':
        setCompanyLogo({
          image: file[0],
          name: 'Company Logo',
          set: true,
        });
      break;
      case 'Proof of Status':
        setProofOfStatus({
          image: file[0],
          name: 'Proof of Status',
          set: true,
        });
      break;
      case 'Vendor Headshot':
        setVendorHeadshot({
          image: file[0],
          name: 'Vendor Headshot',
          set: true,
        });
      break;
      default:
      break;
    }
    setOpenUpload(false);
  }

  return (
    <Paper style={styles.steps}>
      <Box mt={2} mb={2}>
        {renderText({
          label: "Complete the following forms:",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Box>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        { !aafes.set ?
          <>
            <Grid item xs={6} sm={6}>
              {renderDownloadButton({
                label: "Download AAFES Application",
                color: "default",
                onClick: () => handleDownload(data.allFile.edges[3].node),
              })}
            </Grid>
            <Grid item xs={6} sm={6}>
              {renderUploadButton({
                label: "Upload AAFES Application",
                color: "default",
                onClick: () => openUploadDialog('a'),
              })}
            </Grid>
          </>
          : 
          <div className={classes.root}>
            <Alert serverity="success">Saved AAFES Application</Alert>
          </div>
        }
      </Grid>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        { !w9.set ?
          <>
            <Grid item xs={6} sm={6}>
              {renderDownloadButton({
                label: "Download W9",
                color: "default",
                onClick: () => handleDownload(data.allFile.edges[2].node),
              })}
            </Grid>
            <Grid item xs={6} sm={6}>
              {renderUploadButton({
                label: "Upload W9",
                color: "default",
                onClick: () => openUploadDialog('w'),
              })}
            </Grid>
          </>
          : 
          <div className={classes.root}>
            <Alert serverity="success">Saved W9</Alert>
          </div>
        }
      </Grid>
 
      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        { !visitorPass.set ?
          <>
            <Grid item xs={6} sm={6}>
              {renderDownloadButton({
                label: "Download AAFES Visitor Pass",
                color: "default",
                onClick: () => handleDownload(data.allFile.edges[1].node),
              })}
            </Grid>
            <Grid item xs={6} sm={6}>
              {renderUploadButton({
                label: "Upload AAFES Visitor Pass",
                color: "default",
                onClick: () => openUploadDialog('v'),
              })}
            </Grid>
          </>
          : 
          <div className={classes.root}>
            <Alert serverity="success">Saved AAFES Visitor's Pass</Alert>
          </div>
        }
      </Grid>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        { !photoRelease.set ?
          <>
            <Grid item xs={6} sm={6}>
              {renderDownloadButton({
                label: "Download Photo Release Form",
                color: "default",
                onClick: () => handleDownload(data.allFile.edges[0].node),
              })}
            </Grid>
            <Grid item xs={6} sm={6}>
              {renderUploadButton({
                label: "Upload Photo Release Form",
                color: "default",
                onClick: () => openUploadDialog('r'),
              })}
            </Grid>
          </>
          : 
          <div className={classes.root}>
            <Alert serverity="success">Saved Photo Release Form</Alert>
          </div>
        }
      </Grid>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        { !companyLogo.set ?
          <>
            <Grid item xs={12}>
              {renderUploadButton({
                label: "Upload Company Logo",
                color: "default",
                onClick: () => openUploadDialog('l'),
              })}
            </Grid>
          </>
          : 
          <div className={classes.root}>
            <Alert serverity="success">Saved Company Logo</Alert>
          </div>
        }
      </Grid>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        { !proofOfStatus.set ?
          <>
            <Grid item xs={12} sm={6}>
              {renderUploadButton({
                label: "Upload Proof of Status",
                color: "default",
                onClick: () => openUploadDialog('p'),
              })}
            </Grid>
          </>
          : 
          <div className={classes.root}>
            <Alert serverity="success">Saved Proof of Status</Alert>
          </div>
        }
      </Grid>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        { !vendorHeadshot.set ?
          <>
            <Grid item xs={12} sm={6}>
              {renderUploadButton({
                label: "Upload Vendor Headshot",
                color: "default",
                onClick: () => openUploadDialog('h'),
              })}
            </Grid>
          </>
          : 
          <div className={classes.root}>
            <Alert serverity="success">Saved Vendor Headshot</Alert>
          </div>
        }
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

      <DropzoneDialog
        open={openUpload}
        dialogTitle={`Upload your ${fileName} form`}
        onSave={saveFile}
        acceptedFiles={['application/pdf']}
        showPreviews={true}
        getPreviewIcon={handlePreviewIcon}
        filesLimit={1}
        maxFileSize={65000000}
        onClose={closeUploadDialog}
      />
    </Paper>
  );
}


export default FormUserFileUpload;