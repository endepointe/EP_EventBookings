import React, {useEffect} from 'react';
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

  useEffect(() => {
    // console.log(props.user);
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <div>put a logo here</div>
      <div>put a logo here</div>
      <div>put a logo here</div>
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
            user={props.user}
            path="/dashboard/account"/>
          <VendorCheckout 
            user={props.user}
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
