import React from 'react';
import './video_viewer.scss';
import YouTube from 'react-youtube';

class VideoViewer extends React.Component {
  render() {
    const opts = {

      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div className="VideoViewer my-5">
      <YouTube
        videoId="2g811Eo7K8U"
        onReady={this._onReady}
      />
    </div>
    );
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
}

export default VideoViewer;
