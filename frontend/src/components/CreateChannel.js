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

import UserPicker from './UserPicker';
import Snackbar from './Snackbar';
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
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: '15px',
    marginBottom: '10px',
    width: '100%',
  },
});

class CreateChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: '',
      name: '',
      title: 'Create a Channel',
      open: false,
      snackbar: false,
      snackbarMsg: '',
      users: this.props.users,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.users !== nextProps.users) {
      return { users: nextProps.users };
    }
    return null;
  }

  pickUser = (owner) => this.setState({ owner });

  handleClick = () => this.setState({ open: !this.state.open });

  handleChange = (event) => this.setState({ name: event.target.value });

  handleSubmit = () => {
    const { name, owner } = this.state;
    axios.post(`${ROOT_URL}/channel`, { name, owner })
      .then(createdChannel => {
        const { name } = createdChannel.data['new channel saved properly'];
        this.setState({
          title: `channel created: ${name}`,
          open: false,
          snackbar: true,
          snackbarMsg: 'channel successfully created',
          name: '',
        });
      })
      .catch(err => this.setState({ snackbar: true, snackbarMsg: 'err' + err }));
  }

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
          <ExpansionPanelDetails className={classes.container}>
            {this.state.users.length ? 
              <UserPicker users={this.state.users} pickUser={this.pickUser}/> 
            : null}
            <form className={classes.form}>
              <TextField
                label="Channel name?"
                placeholder="what kind of content..."
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
          <Snackbar message={this.state.snackbarMsg} />
        : null}
      </div>
    );
  };
};

CreateChannel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateChannel);
