import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  title: {
    backgroundColor: '#42A5F5',
    border: '2px solid lightgrey',
    padding: '10px',
  }
};

function Instructions(props) {
  const { classes } = props;
  return (
    <Typography className={classes.title}>
      <strong>Instructions: </strong>{props.message}
    </Typography>
  );
}

Instructions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Instructions);
