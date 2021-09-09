import React, {useState,useEffect} from 'react';
import {getEventPackages} from '../../utils/stripe';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (<>{children}</>)}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1em',
    marginBottom: '2em',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxWidth: 560,
  },
  packageMetadata: {
    padding: '1.6em', 
    color: 'rgb(111,111,111)',
  }
}));

export default function PackageTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // later on, set these products in the redux store
    async function getPackages() {
      try {
        let data = await getEventPackages();  
        setPackages(data);
      } catch (err) {
        console.error(err);
      }
    } 
    getPackages();
    // unmount the data when changing tabs
    return () => {
      setPackages([]);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {packages?.map((item, idx) => (
            <Tab 
              key={idx} 
              label={item.product.name.slice(16)} {...a11yProps(idx)}/> 
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {packages?.map((item,idx) => (
          // console.log(item, idx)
          <TabPanel key={idx}
            value={value} 
            index={idx} 
            dir={theme.direction}>
              <Grid 
                className={classes.packageMetadata} 
                item xs={12}>
                <Typography paragraph variant='h6'>
                  Included in your package: 
                </Typography> 
                <List>
                  {
                    <ListItem>
                      <ListItemText
                        primary={'primary text'}
                        secondary={'Secondary text'}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          disabled
                          edge="end" aria-label="check-icon">
                          <CheckIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  }
                </List>
              </Grid>
          </TabPanel>
          // <TabPanel 
          //   value={value} index={0} dir={theme.direction}>
          //   <Grid item xs={12}
          //     className={classes.packageMetadata}>
          //     <Typography paragraph variand='h6'>
          //       Included in your package: 
          //     </Typography>
          //   </Grid>
          // </TabPanel>
        ))}
        {/* <TabPanel 
          value={value} index={0} dir={theme.direction}>
          <Grid item xs={12}
            className={classes.packageMetadata}>
            <Typography>{packages[0]?.price}</Typography>
            <Typography paragraph variand='h6'>
              Included in your package: 
            </Typography>
          </Grid>
        </TabPanel>
        <TabPanel 
          value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel 
          value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}