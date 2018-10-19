import React from 'react';
import YouTube from 'react-youtube';
 
class YouTubeEmbed extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };
 
    return (
      <div>
        {this.props.video ? 
          <YouTube
            videoId={this.props.video}
            opts={opts}
            onReady={this._onReady}
          />
        : null}
      </div>
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
  }
}

export default YouTubeEmbed;
