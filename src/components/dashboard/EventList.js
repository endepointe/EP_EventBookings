import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from './EventCard';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const EventList = () => {
  const classes = useStyles();
  const events = useSelector(state => state.eventList);
  console.log("events: ", typeof events);
  const renderEvents = Object.entries(events).map(event => (
    // console.log(event[0], event[1])
    <Grid item xs={12} md={6} key={event[0]}>
      <EventCard 
        className={classes.paper}
        event={event[1]}/> 
    </Grid>
  )); 

  return (
     <div className={classes.root}>
      <Grid container spacing={5}>
        {renderEvents}
      </Grid>
    </div>
  )
}