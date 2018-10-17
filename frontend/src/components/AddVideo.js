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
    width: '100%',
  },
  button: {
    marginTop: '15px',
    width: '100%',
  },
  addTags: {
    display: 'flex',
    alignItems: 'center',
  },
});

class AddVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      currentTag: '',
      hashtags: [],
    };
  }

  handleSubmit = (event) => {
    this.setState({ name: this.state.name });
  }

  handleAdd = () => {
    const { hashtags } = this.state;
    hashtags.push(this.state.currentTag);
    this.setState({ currentTag: '', hashtags });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Add a Video</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form className={classes.form}>
              <TextField
                label="URL?"
                placeholder="what's the hyperlink?"
                value={this.state.url}
                className={classes.textField}
                margin="normal"
              />
              <div className={classes.addTags}>
                <TextField 
                  label='hashtags'
                  placeholder='add any relevant tags'
                  value={this.state.currentTag}
                  className={classes.textField}
                  margin='normal'
                />
                <Button 
                  className={classes.add} 
                  color='secondary' 
                  variant='contained' 
                  onClick={this.handleAdd}
                >
                  Add
                </Button>
                {this.state.hashtags.length ? this.state.hashtags.map((tag) => {
                  return (
                    <Button variant='outlined' color='secondary'>
                      #{tag}
                    </Button>
                  );
                }) : null}
              </div>
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

AddVideo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddVideo);
