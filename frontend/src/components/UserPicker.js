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
    backgroundColor: '#9FA8DA',
  },
});

class UserPicker extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 1,
    users: this.props.users,
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
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
            aria-label="First pick a user (click)"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="First pick a user"
              secondary='(click)'
            />
          </ListItem>
        </List>
        {this.props.users ? 
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {this.state.users.map((user, index) => (
              <MenuItem
                key={user}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {user}
              </MenuItem>
            ))}
          </Menu>
        : null }
      </div>
    );
  }
}

UserPicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPicker);