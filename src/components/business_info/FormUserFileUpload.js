import React, {useState} from "react";
import { useStaticQuery, graphql } from "gatsby";
import { DropzoneDialog } from 'material-ui-dropzone';
import { AttachFile, PictureAsPdf } from '@material-ui/icons';
import { Box, Grid, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import {
  renderButton,
  renderDownloadButton,
  renderUploadButton,
  renderText,
} from "../common/DisplayComponent";

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
    handleChange, handleNextStep, handleBackStep}) => {
  const [openUpload, setOpenUpload] = useState(false);
  const [files, setFiles] = useState([{file: null}]);

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

  const openUploadDialog = (name) => {
    setOpenUpload(true); 
  }

  const closeUploadDialog = () => {
    setOpenUpload(false); 
  }

  const saveFile = (file) => {
    console.log(file)
    setOpenUpload(false);
  }

  return (
    <Paper style={styles.steps}>
      <Box mt={2} mb={2}>
        {renderText({
          label: "Fill out the following forms:",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Box>

      <Grid container spacing={1} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6}>
          {renderDownloadButton({
            label: "Download 4200",
            color: "default",
            onClick: () => handleDownload(data.allFile.edges[0].node),
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderUploadButton({
            label: "Upload 4200",
            color: "default",
            onClick: () => openUploadDialog('4200'),
          })}
          <DropzoneDialog
            open={openUpload}
            onSave={saveFile}
            acceptedFiles={['application/pdf']}
            showPreviews={true}
            getPreviewIcon={handlePreviewIcon}
            filesLimit={1}
            maxFileSize={5000000}
            onClose={closeUploadDialog}
          />
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


export default FormUserFileUpload;