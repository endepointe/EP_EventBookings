import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

// may use an appbar on later versions
// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: 'relative',
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
// }));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({children, ...props}) {
  // const classes = useStyles();
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog fullScreen 
        // open={open} onClose={handleClose} 
        open={props.open}
        TransitionComponent={Transition}>
        {children}
      </Dialog>
    </div>
  );
}

/*
<AppBar className={classes.appBar}>
  <Toolbar>
    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
      <CloseIcon />
    </IconButton>
    <Button autoFocus color="inherit" onClick={handleClose}>
      save
    </Button>
  </Toolbar>
</AppBar>
*/