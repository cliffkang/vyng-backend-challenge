import React from 'react';
import UserPicker from './UserPicker';
import styled from 'styled-components';

const Displayer = styled.div`
  width: '1200px';
  display: flex;
  justify-content: center;
`;

class DisplayVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <Displayer>
        <div className='pickers'>
          <UserPicker />
          {/* <ChannelPicker /> */}
        </div>
        {/* <DisplayTags />
        <YouTubeEmbed />
        <YouTubeVids /> */}
      </Displayer>
    )
  }
}

export default DisplayVideo;