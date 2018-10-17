import React, { Component } from 'react';
import CreateUser from './CreateUser';
import CreateChannel from './CreateChannel';
import AddVideo from './AddVideo';
import DisplayVideo from './DisplayVideo';
import styled from 'styled-components';

const Creators = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='homepage'>
        <Creators>
          <CreateUser />
          <CreateChannel />
          <AddVideo />
        </Creators>
        <DisplayVideo />
      </div>
    );
  }
}

export default Homepage;
