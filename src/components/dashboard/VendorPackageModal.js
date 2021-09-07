import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Modal,
  Typography
} from '@material-ui/core';

function getModalStyle() {

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    maxWidth: '768px',
    height: '99%',
    maxHeight: '97vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: 'auto',
  },
}));

export default function VendorPackageModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    console.log(props.products);
  });

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography id="simple-modal-title">Event Packages</Typography>
      <Typography id="simple-modal-description">
        Choose one:
      </Typography>
      <div>
        {props.products.map((product, idx) => (
          <div key={idx}>
            <Typography>{product.product.name}</Typography>
            {Object.entries(product.product.metadata).map((item, i) => (
              <Typography key={i}>{item[1]}</Typography> 
            ))}
          </div> 
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handlePackageModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}