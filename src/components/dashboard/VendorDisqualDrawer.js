import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {
  Typography,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1, 
    padding: '1em',
    backgroundColor: 'rgb(255,163,163)'
  },
});

export default function VendorDisqualDrawer(props) {
  const classes = useStyles();

  const list = () => (
    <div
      className={classes.root}
      role="presentation"
      onClick={props.handeDisqualDrawer}
      onKeyDown={props.handleDisqualDrawer}
    >
      <Typography align='center' variant="h5">
        Vendor Disqualifying Items 
      </Typography>
      <Typography paragraph align='center' variant="h5">
        (Vendors CAN NOT sell the following items) 
      </Typography>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <Typography 
            paragraph
            align="center" variant='body1'>No CBD</Typography>
          <Typography align="center" variant='body1'>Counterfeit Logo Products, Fake Designer Products, Sports Teams</Typography>    
        </Grid> 
        <Grid item xs={6}>
          <Typography 
            paragraph
            align="center" variant='body1'>Weapons of any type</Typography>   
          <Typography align="center" variant='body1'>Alcohol, Tobacco, Vaping Products</Typography>
       </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor='bottom'
        open={props.open}
        onClose={props.handleDisqualDrawer}
        onOpen={props.handleDisqualDrawer}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}