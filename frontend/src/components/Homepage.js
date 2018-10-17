import React, { Component } from 'react';
import CreateUser from './CreateUser';
import CreateChannel from './CreateChannel';
import AddVideo from './AddVideo';
import styled from 'styled-components';

const Creators = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      </div>
    );
  }
}

export default Homepage;
