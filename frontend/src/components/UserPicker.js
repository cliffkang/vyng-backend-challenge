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
    listPrimaryText: 'First pick a user',
    listSecondaryText: '(click)',
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    const selectedUser = this.state.users[index].name;
    this.setState({ 
      selectedIndex: index, 
      anchorEl: null,
      listPrimaryText: 'User picked:',
      listSecondaryText: selectedUser
    }, () => {
      this.props.pickUser(selectedUser);
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
            aria-label="First pick a user (click)"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={this.state.listPrimaryText}
              secondary={this.state.listSecondaryText}
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
                key={`${user.name}${index}`}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {user.name}
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