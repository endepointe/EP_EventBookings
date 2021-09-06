import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { PersonPinSharp } from '@material-ui/icons';

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
    height: '80%',
    maxHeight: '97vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
      <h2 id="simple-modal-title">package name</h2>
      <p id="simple-modal-description">
        get this data from stripe
      </p>
      <div>
        {props.products.map((product, idx) => (
          <div key={idx}>
            <p>{product.product.name}</p>
            {/* <ul>
            {Object.entries(product[1].metadata).map((item, i) => (
              <li key={i}>{item[1]}</li> 
            ))}
            </ul> */}
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