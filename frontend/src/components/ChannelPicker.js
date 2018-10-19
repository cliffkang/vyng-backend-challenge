import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    minWidth: '250px',
    backgroundColor: '#F48FB1',
  },
});

class ChannelPicker extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 1,
    channels: this.props.channels,
    listPrimaryText: 'Then, pick a channel',
    listSecondaryText: '(click)',
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    const selectedChannel = this.state.channels[index];
    this.setState({ 
      selectedIndex: index,
      anchorEl: null,
      listPrimaryText: 'Channel picked:',
      listSecondaryText: selectedChannel.name,
    }, () => {
      this.props.pickChannel(selectedChannel);
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            color='primary'
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Then, pick a channel (click)"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={this.state.listPrimaryText}
              secondary={this.state.listSecondaryText}
            />
          </ListItem>
        </List>
        {this.props.channels ?
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
            {this.state.channels.map((channel, index) => (
                <MenuItem
                    key={`${channel.name}${index}`}
                    selected={index === this.state.selectedIndex}
                    onClick={event => this.handleMenuItemClick(event, index)}
                >
                    {channel.name}
                </MenuItem>
            ))}
            </Menu>
        : null }
      </div>
    );
  }
}

ChannelPicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChannelPicker);