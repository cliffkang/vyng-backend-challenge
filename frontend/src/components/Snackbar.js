import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class SnackbarTemp extends React.Component {
  state = {
    open: true,
    message: this.props.message,
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.message ? 
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.message}</span>}
            action={
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            }
          />
        : null }
      </div>
    );
  }
}

SnackbarTemp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SnackbarTemp);
