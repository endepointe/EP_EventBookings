import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Box, Grid, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import {
  renderButton,
  renderDownloadButton,
  renderText,
} from "../common/DisplayComponent";

const FormUserFileUpload = ({
    state, 
    handleDownload,
    handleChange, handleNextStep, handleBackStep}) => {

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
  console.log('graphql data', data.allFile.edges);
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
            label: "Download",
            color: "default",
            onClick: handleDownload(data.allFile.edges[0].node),
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
          disabled: state.disableNext, 
          onClick: handleNextStep })}</Box>
      </Grid>
    </Paper>
  );
}


export default FormUserFileUpload;