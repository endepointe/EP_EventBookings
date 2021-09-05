import React, {useEffect,useState} from 'react'
// see note in the ./event_data/events.js file
import {events} from './event_data/events';
import {navigate} from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardMedia,
  Container,
  Grid,
  Hidden,
  Typography} from '@material-ui/core'; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap', 
  },
  header: {
    marginBottom: '2.5rem'
  },
  media: {
    width: '100%',
    height: 140,
    marginBottom: '2rem',
  }
}));

export default function VendorCheckout(props) {
  const classes = useStyles();
  const {event} = props.location.state;
  const [content, setContent] = useState({});

  useEffect(() => {
    console.log(event)
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === event.id ) {
        setContent(events[i].content);
        break;
      } 
    }
    console.log(content)
    if (props.location.state === null) {
      navigate('dashboard'); 
    }
  }, [content, props.location.state, event.id]);

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} className={classes.header}>
        <Hidden only={['md','lg','xl']}>
          <CardMedia 
            className={classes.media}
            image={event.logo} title={event.name} />
        </Hidden>
        <Typography 
          gutterBottom
          variant="h4">{event.name}</Typography>
        <Typography 
          gutterBottom 
          variant="h5">{event.summary}</Typography> 
        
      </Grid>
      <Grid container spacing={3} className={classes.container}>
        <Grid xs={12} sm={12} md={8}>
          {Object.entries(content).map((c,i) => (
            <Typography paragraph key={i}>{c[1]}</Typography> 
          ))} 
        </Grid>
        <Hidden only={["xs","sm"]}>
          <Grid xs={4}>
            <CardMedia 
              className={classes.media}
              image={event.logo} title={event.name} /> 
          </Grid>
        </Hidden>
      </Grid>
    </Container> 
  )
}