import React, {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {getAllEvents} from '../../state/eventListSlice';
import EventCard from './EventCard';

// import EventListDrawer from './EventListDrawer';
// import EventListModal from './EventListModal';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const EventList = () => {
  const events = useSelector(getAllEvents);
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  
  useEffect(() => {
    console.log(events);
  }, [events]);

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  const renderEvents = Object.entries(events).map(event => (
    // console.log(event[0], event[1])
    <Grid item xs={12} md={6} key={event[0]}>
      <EventCard 
        toggleModal={toggleModal}
        className={classes.paper}
        event={event[1]}/> 
    </Grid>
  )); 

  return (
    <> 
      <CssBaseline/>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          {renderEvents}
        </Grid>
      </Container>
      {/* <EventListModal 
        event={event}
        open={openModal} toggleModal={toggleModal}/>
      <EventListDrawer/> */}
    </>
  )
}