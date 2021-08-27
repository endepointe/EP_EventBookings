import React, { useEffect } from "react";
import { Box, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import { renderText } from "../common/DisplayComponent";
import { navigate } from 'gatsby';

// display a success message and then send the user to their dashboard
const Success = ({ state }) => {

  useEffect(() => {
    // save data to hubspot and send the user to their dashboard
    // setTimeout(() => {
    //   navigate('/dashboard');
    // }, 5000)
    async function hubspot() {
      try {
        let response = await fetch('http://localhost:8001/hubspot/read');
        let data = await response.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    hubspot();
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

      {JSON.stringify(state, null, 4)}
    </Paper>
  );
}

export default Success;