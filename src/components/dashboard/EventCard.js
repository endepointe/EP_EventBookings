import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 140,
  },
  contentHeight: {
    minHeight: 125, 
  },
  nameHeight: {
    display: 'inline-block',
    height: 50 
  },
  summary: {
    minHeight: 60, 
  }
});

export default function EventCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.event.logo}
          title=""
        />
        <CardContent className={classes.contentHeight}>
          <Typography 
            className={classes.nameHeight}
            gutterBottom variant="h5" component="h2">
            {props.event.name}
          </Typography>
          <Typography variant="body1" component="p">
            {props.event.venue}
          </Typography>
          <Typography variant="body2" component="p">
            {new Date(props.event.start.local).toLocaleDateString()}
            {', '}
            {new Date(props.event.start.local).toLocaleTimeString()}
          </Typography>
          <Typography 
            className={classes.summary}
            variant="body2" color="textSecondary" component="p">
            {props.event.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Become a Vendor
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}