import React from 'react';
import UserPicker from './UserPicker';
import ChannelPicker from './ChannelPicker';
import DisplayTags from './DisplayTags';
import YouTubeEmbed from './YouTubeEmbed';
import YouTubeVids from './YouTubeVids';
import Instructions from './Instructions';
import styled from 'styled-components';
import axios from 'axios';
import ROOT_URL from './config';

const Displayer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  .pickers {
    display: flex;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  .vids {
    display: flex;
    margin: 10px 0 20px 0;
  }
`;

class DisplayVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtags: [],
      users: this.props.users,
      channels: this.props.channels,
      videos: [],
      selected: 0,
      user: '',
      channel: '',
      video: '',
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.channels !== nextProps.channels) {
      return { channels: nextProps.channels };
    }
    if (prevState.users !== nextProps.users) {
      return { users: nextProps.users };
    }
    return null;
  }

  pickUser = (user) => {
    this.setState({ user }, () => {
      this.props.getChannels('display', this.state.user);
    });
  };

  pickChannel = (channel) => {
    const { hashtags } = channel;
    this.setState({ channel: channel.name, hashtags })
  };

  handleTagClick = (index) => (event) => {
    const tag = this.state.hashtags[index];
    axios.get(`${ROOT_URL}/hashtag?tag=${tag}`)
      .then((videosForHashtag) => {
        const { videos } = videosForHashtag.data;
        this.setState({ videos });
      });
  }

  handleVidClick = (youtubeId) => (event) => {
    this.setState({ video: youtubeId });
  }

  render() {
    return (
      <Displayer>
        <div className='pickers'>
          <Instructions message='To display a video, start here ->'/>
          {this.state.users.length ? 
            <UserPicker 
              users={this.state.users}
              pickUser={this.pickUser}
            />
          : null}
          {this.state.channels.length ? 
            <ChannelPicker 
              channels={this.state.channels}
              pickChannel={this.pickChannel}
            />
          : null}
        </div>
        <div className='tags'>
          {this.state.hashtags.length ? 
            <Instructions message='Pick a tag to select from video(s)'/>
          : null}
          <DisplayTags
            hashtags={this.state.hashtags}
            handleTagClick={this.handleTagClick}
          />
        </div>
        <div className='vids'>
          {this.state.videos.length ?
            <Instructions message='Finally, select a video!'/>
          : null}
          <YouTubeVids 
            videos={this.state.videos}
            handleVidClick={this.handleVidClick}
          />
        </div>
        <YouTubeEmbed video={this.state.video}/>
      </Displayer>
    )
  }
}

export default DisplayVideo;