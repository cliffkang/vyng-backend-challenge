import React from 'react';
import UserPicker from './UserPicker';
import ChannelPicker from './ChannelPicker';
import DisplayTags from './DisplayTags';
import styled from 'styled-components';

const Displayer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pickers {
    display: flex;
  }
`;

class DisplayVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtags: ['zion t', 'ziont', 'iu', 'primary', 'hyukok', 'hyuok band'],
      users: ['cliff', 'art'],
      channels: ['kpop', 'bhangra', 'rock'],
      videos: []
    };
  };

  render() {
    return (
      <Displayer>
        <div className='pickers'>
          <UserPicker users={this.state.users}/>
          <ChannelPicker channels={this.state.channels}/>
        </div>
        <DisplayTags hashtags={this.state.hashtags}/>
        {/* <YouTubeEmbed />
        <YouTubeVids videos={this.state.videos}/> */}
      </Displayer>
    )
  }
}

export default DisplayVideo;