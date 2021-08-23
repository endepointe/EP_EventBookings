import React, { useEffect } from "react";
import { Box, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import { renderText } from "../common/DisplayComponent";

import { navigate } from 'gatsby';

// display a success message and then send the user to their dashboard
const Success = ({ data }) => {

  useEffect(() => {
    navigate('/app/dashboard');
  });

  return (
    <Paper style={styles.steps}>
      <Box mt={2} mb={2}>
        {renderText({
          label: "Your Submitted Data",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Box>

      {JSON.stringify(data, null, 4)}
    </Paper>
  );
}

export default Success;