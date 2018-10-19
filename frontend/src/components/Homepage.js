import React, { Component } from 'react';
import CreateUser from './CreateUser';
import CreateChannel from './CreateChannel';
import AddVideo from './AddVideo';
import DisplayVideo from './DisplayVideo';
import styled from 'styled-components';
import axios from 'axios';
import ROOT_URL from './config';

const Creators = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addVidChannels: [],
      displayVidChannels: [],
    };
  }

  componentDidMount() {
    axios.get(`${ROOT_URL}/users`)
      .then(allUsers => {
        const { users } = allUsers.data;
        this.setState({ users });
      })
      .catch(err => console.log('err getting users' + err));
  }

  getChannels = (addPick, owner) => {
    const addOrPick = addPick === 'add' ? 'addVidChannels' : 'displayVidChannels';
    axios.get(`${ROOT_URL}/channels?owner=${owner}`)
      .then(allChannels => {
        const { channels } = allChannels.data;
        this.setState({ [addOrPick]: channels });
      });
  }

  render() {
    return (
      <div className='homepage'>
        <Creators>
          <CreateUser />
          <CreateChannel users={this.state.users}/>
          <AddVideo 
            users={this.state.users}
            channels={this.state.addVidChannels}
            getChannels={this.getChannels}
          />
        </Creators>
        <DisplayVideo 
          users={this.state.users}
          channels={this.state.displayVidChannels}
          getChannels={this.getChannels}
        />
      </div>
    );
  }
}

export default Homepage;
