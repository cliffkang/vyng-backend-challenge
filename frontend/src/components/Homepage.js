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
    };
  }

  componentDidMount() {
    axios.get(`${ROOT_URL}/users`)
      .then(allUsers => {
        const { users } = allUsers.data;
        this.setState({ users });
      });
  }

  render() {
    return (
      <div className='homepage'>
        <Creators>
          <CreateUser />
          <CreateChannel users={this.state.users}/>
          <AddVideo />
        </Creators>
        <DisplayVideo />
      </div>
    );
  }
}

export default Homepage;
