import React, {useEffect,useState} from 'react'
// see note in the ./event_data/events.js file
import {events} from './event_data/events';
import {navigate} from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CardMedia,
  Container,
  Grid,
  Hidden,
  Typography} from '@material-ui/core'; 
import VendorPackageModal from './VendorPackageModal';
import VendorDisqualDrawer from './VendorDisqualDrawer';
// import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BlockIcon from '@material-ui/icons/Block';
import PackageTabs from './PackageTabs';
// import GoogleMapReact from 'google-map-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '2em',
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
  vendorPackageButton: {
    color: 'rgb(21,97,173)',
  },
  vendorDisqualButton: {
    color: 'rgb(212,34,34)',
  },
  map: {
    width: '100%',
    height: '500px',
    marginTop: '1em',
  }
}));

export default function VendorCheckout(props) {
  const classes = useStyles();
  const {event} = props.location.state;
  const [content, setContent] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [bottomDrawer, setBottomDrawer] = useState(false);

  useEffect(() => {
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
  },[]);

  
  const handlePackageModal = () => {
    setModalOpen(!modalOpen);
  }

  const handleDisqualDrawer = () => {
    setBottomDrawer(!bottomDrawer);
  }

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
      </Grid>

      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} sm={12} md={7} className={classes.description}>
          {Object.entries(content).map((c,i) => (
            <Typography paragraph key={i}>{c[1]}</Typography> 
          ))} 
        </Grid>

        <Hidden only={['md', 'lg', 'xl']}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
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

        <Hidden only={["xs","sm"]}>
          <Grid item xs={5}>
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
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={6}>
            <Typography paragraph align="left" variant="h5">
              Vendor Event Packages 
            </Typography>
            {/* <Button 
              className={classes.vendorPackageButton}
              variant="outlined"
              onClick={handlePackageModal}>
              <BusinessCenterIcon/> 
              Vendor Events Packages 
            </Button>  */}
          </Grid>
          {/* <Grid item xs={6}>
            <Button 
              className={classes.vendorDisqualButton}
              variant="outlined"
              onClick={handleDisqualDrawer}>
              <BlockIcon/> 
              Vendor Disqualifying Items
            </Button> 
          </Grid> */}
          <PackageTabs />
        </Grid>
      </Grid>
      
      <div className={classes.map}>
        google map
        {/* <GoogleMapReact 
          bootstrapURLKeys={{key: process.env.GOOGLE_MAP}}
          defaultCenter={
            {lat: event.latitude, lng: event.longitude}} /> */}
      </div>
      {/* <VendorPackageModal 
        products={products}
        open={modalOpen} handlePackageModal={handlePackageModal} /> */}
      <VendorDisqualDrawer 
        open={bottomDrawer} handleDisqualDrawer={handleDisqualDrawer} />
    </Container> 
  )
}