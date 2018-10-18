import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Snackbar from './Snackbar'
import ROOT_URL from './config';

const styles = theme => ({
  root: {
    width: '400px',
  },
  heading: {
    fontSize: '25px',
    fontWeight: theme.typography.fontWeightRegular,
    color: '#424242',
  },
  textField: {
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    marginTop: '15px',
    width: '100%',
    marginBottom: '72px',
  },
});

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Create a User',
      name: '',
      open: false,
      snackbar: false,
      snackbarMsg: '',
    };
  }

  handleClick = () => this.setState({ open: !this.state.open });

  handleChange = (event) => this.setState({ name: event.target.value });

  handleSubmit = () => {
    axios.post(`${ROOT_URL}/user`, { name: this.state.name })
      .then(createdUser => {
        const { name } = createdUser.data['user successfully registered'];
        this.setState({ 
          title: `user created: ${name}`,
          open: false,
          snackbar: true,
          snackbarMsg: 'user successfully registered',
        });
      })
      .catch(err => this.setState({ snackbar: true, snackbarMsg: 'err' + err }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={this.state.open}>
          <ExpansionPanelSummary 
            onClick={this.handleClick} 
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>{this.state.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form className={classes.form}>
              <TextField
                label="Username?"
                placeholder="names must be unique"
                value={this.state.name}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
              />
              <Button 
                className={classes.button} 
                color='primary' 
                variant='contained' 
                onClick={this.handleSubmit}
              >
                Save
              </Button>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {this.state.snackbar ? 
          <Snackbar message={this.state.snackbarMsg}/>
        : null }
      </div>
    );
  };
};

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateUser);
