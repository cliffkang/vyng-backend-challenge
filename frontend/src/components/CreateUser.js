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
            <Typography className={classes.heading}>Create a User</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form className={classes.form}>
              <TextField
                label="Username?"
                placeholder="names must be unique"
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

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateUser);
