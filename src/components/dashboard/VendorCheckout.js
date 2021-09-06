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
import GoogleMapReact from 'google-map-react';

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
  },
  description: {
    marginLeft: '0',
    paddingRight: '1.8rem', 
  },
  map: {
    width: '100%',
    height: '400px' 
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
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Typography 
            gutterBottom
            variant="h4">{event.name}</Typography>
          <Typography 
            gutterBottom 
            variant="h5">{event.summary}</Typography> 
        </Grid>
        {/* <Hidden only={['md', 'lg', 'xl']}>

        </Hidden> */}
      </Grid>

      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} sm={12} md={7} className={classes.description}>
          {Object.entries(content).map((c,i) => (
            <Typography paragraph key={i}>{c[1]}</Typography> 
          ))} 
        </Grid>
        <Hidden only={["xs","sm"]}>
          <Grid xs={5}>
            <CardMedia 
              className={classes.media}
              image={event.logo} title={event.name} /> 

            <Typography variant="h6">
              Date and time
            </Typography>
            <Typography variant="body1">
              {new Date(event.start.local).toLocaleDateString()}
            </Typography>
            <Typography paragraph variant="body1">
              {new Date(event.start.local).toLocaleTimeString()}
            </Typography>

            <Typography variant="h6">
              Location
            </Typography>
            <Typography variant="body1">
              {event.venue.name}
            </Typography>
            <Typography variant="body1">
              {event.venue.address?.address_1}
            </Typography>
            <Typography>
              {event.venue.address.city}, {' '}
              {event.venue.address.region} {" "}
              {event.venue.address.postal_code}
            </Typography>
          </Grid>
        </Hidden>
      </Grid>
      {/* <div className={classes.map}>
        <GoogleMapReact 
          bootstrapURLKeys={{key: process.env.GOOGLE_MAP}}
          defaultCenter={
            {lat: event.latitude, lng: event.longitude}} />
      </div> */}
    </Container> 
  )
}