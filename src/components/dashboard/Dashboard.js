import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from '../../state/userSlice';
import { Router, Link as ReachLink } from "@reach/router"
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavToolBar from './NavToolBar';
import {EventList} from './EventList';
import VendorCheckout from './VendorCheckout';
import vgaLogo from '../../assets/vga_logo_200x179.png';

// for layout ideas until components are made
let Account = () => <div>Account Page</div>

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: 'rgb(21,97,173)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logo: {
    // flex: 1,
  },
  logoContainer: {
    marginBottom: '0',
    display: 'flex',
    justifyContent: 'center',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing(3),
  },
  reachLink: {
    textDecoration: 'none', 
    color: 'inherit',
  }, 
  avatarSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

const Dashboard = (props) => {

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    console.log(props.user);

    async function findHubspotUser() {
      let res = await fetch(`${process.env.EXPRESS_API_HOST}/hubspot/find/user`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: props.user.email})
      })
      let User = await res.json();
      console.log("find user: ", User);
      if (!User.error) {
        dispatch(loadUser(
          User.data.properties.firstname,
          User.data.properties.lastname,
          User.data.properties.email,
          User.data.properties.phone,
          User.data.properties.branch_of_service_affiliation,
          User.data.properties.military_status,
          User.data.properties.company,
          User.data.properties.website,
          User.data.properties.description_of_business,
          User.data.properties.twitter_profile,
          User.data.properties.instagram,
          User.data.properties.facebook_profile,
          User.data.properties.linkedin_profile
        ))
      }
    }
    // if a user has not been loaded into state yet...
    if (user.email.length === 0) {
      findHubspotUser();
    }
  }, [props.user]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.logoContainer}>
        <ReachLink to="/">
          <img 
            className={classes.logo}
            src={vgaLogo} alt="veterans-grow-america-home-page" />
        </ReachLink>      
      </div>
      {/* <div className={classes.toolbar} /> */}
      <Divider />
      <List>
        <ReachLink 
          className={classes.reachLink}
          to="/dashboard/events">
          <ListItem button>
            <ListItemIcon>
              <EventIcon /> 
            </ListItemIcon>
            <ListItemText primary={'Events'} />
          </ListItem>
        </ReachLink>
      </List>
      <Divider />
      <List>
        {/* <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={'Files'} />
        </ListItem> */}

        {/* <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={'Messages'} />
        </ListItem> */}

        <ReachLink 
          className={classes.reachLink}
          to="/dashboard/account">
          <ListItem button>
            <ListItemIcon>
              <Avatar 
                className={classes.avatarSmall}
                src={props.user.picture}
                alt={props.user.name} />
            </ListItemIcon>
            <ListItemText primary={'Account'} />
          </ListItem>
        </ReachLink>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <NavToolBar user={props.user} />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <EventList path="/dashboard/events" />
          <Account 
            path="/dashboard/account"/>
          <VendorCheckout 
            user={user}
            path="/dashboard/vendor-checkout"/>
        </Router>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
