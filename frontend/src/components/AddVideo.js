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

import ROOT_URL from './config';
import UserPicker from './UserPicker';
import ChannelPicker from './ChannelPicker';
import Snackbar from './Snackbar';

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
  plusTags: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class AddVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      currentTag: '',
      title: 'Add a Video',
      channels: this.props.channels,
      users: this.props.users,
      user: '',
      channel: '',
      hashtags: [],
      open: false,
      snackbar: false,
      snackbarMsg: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.channels !== nextProps.channels) {
      return { channels: nextProps.channels };
    }
    if (prevState.users !== nextProps.users) {
      return { users: nextProps.users };
    }
    return null;
  }

  handleClick = () => this.setState({ open: !this.state.open });

  handleChange = name => event => this.setState({ [name]: event.target.value });

  handleSubmit = () => {
    const { url, channel, hashtags } = this.state;
    const youtubeId = url.match(/\?v=(.{9,12})&*/)[1];
    axios.post(`${ROOT_URL}/video`, { youtubeId, url, channel, hashtags })
      .then(createdVideo => {
        const { youtubeId } = createdVideo.data['video successfully saved'];
        this.setState({
          title: `Video added (ID): ${youtubeId}`,
          open: false,
          snackbar: true,
          snackbarMsg: 'video successfully added',
          url: '',
          currentTag: '',
          hashtags: [],
        })
      })
      .catch(err => this.setState({ snackbar: true, snackbarMsg: 'err: ' + err }));
  }

  handleAdd = () => {
    const { hashtags } = this.state;
    hashtags.push(this.state.currentTag);
    this.setState({ currentTag: '', hashtags });
  }

  pickUser = (user) => {
    this.setState({ user }, () => {
      this.props.getChannels('add', this.state.user);
    });
  };

  pickChannel = (channel) => this.setState({ channel: channel.name });

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
              {this.state.users.length ? 
                <UserPicker users={this.state.users} pickUser={this.pickUser}/> 
              : null}
              {this.state.channels.length ? 
                <ChannelPicker
                  channels={this.state.channels}
                  pickChannel={this.pickChannel}
                />
              : <div style={{ marginTop: '10px' }}>Need to pick a user before picking a channel</div>}
              <TextField
                label="URL?"
                placeholder="only YouTube links please!"
                value={this.state.url}
                onChange={this.handleChange('url')}
                className={classes.textField}
                margin="normal"
              />
              <div className={classes.plusTags}>
                <div className={classes.addTags}>
                  <TextField 
                    label='hashtags'
                    placeholder='add any relevant tags'
                    value={this.state.currentTag}
                    onChange={this.handleChange('currentTag')}
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
                </div>
                <div>
                  {this.state.hashtags.length ? 
                    this.state.hashtags.map((tag, i) => {
                      return (
                        <Button 
                          key={`${tag}${i}`} 
                          variant='outlined' 
                          color='secondary'
                        >
                          #{tag}
                        </Button>
                      );
                    }) 
                  : null}
                </div>
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
        {this.state.snackbar ?
          <Snackbar message={this.state.snackbarMsg} />
        : null}
      </div>
    );
  };
};

AddVideo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddVideo);
