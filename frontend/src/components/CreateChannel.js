import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UserPicker from './UserPicker';

const styles = theme => ({
  root: {
    width: '400px',
  },
  heading: {
    fontSize: '25px',
    fontWeight: theme.typography.fontWeightRegular,
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
      name: '',
    };
  }

  handleSubmit = (event) => {
    this.setState({ name: this.state.name });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Create a Channel</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.container}>
            <UserPicker />
            <form className={classes.form}>
              <TextField
                label="Channel name?"
                placeholder="what kind of content..."
                value={this.state.name}
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
      </div>
    );
  };
};

CreateChannel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateChannel);
