/* eslint-disable no-console */
import React, {useRef, useCallback, useContext} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'
import VideoContext from './VideoContext';

/**
 * Video player component
 * @param {object} props video player props
 * @returns {component} VideoPlayer
 */
const VideoPlayer = ({ source, adsTime }) => {
  let player = useRef();
  // The context is used to share values between parents and children
  const { setPlayingAds, adsWatched, playingVideo, setPlayingVideo } = useContext(VideoContext);

  const onProgress = useCallback(({ playedSeconds }) => {
    console.log(playedSeconds)
    if (adsTime > 0 && !adsWatched && playedSeconds >= adsTime) {
        console.log('playingAds');
        setPlayingAds(true);
        setPlayingVideo(false);
    }
  }, [adsWatched]);

  return <>
    <ReactPlayer 
      ref={el => {player.current = el}}
      url={source}
      playing={playingVideo}
      onPlay={() => {
        if (adsTime === 0 && !adsWatched) {
          setPlayingAds(true);
          setPlayingVideo(false);
        }
      }}
      onProgress={onProgress}
    />
    <button onClick={() => setPlayingVideo(prev => !prev)}>{playingVideo ? 'Pause' : 'Play'}</button>
  </>
}

VideoPlayer.propTypes = {
  source: PropTypes.string,
  playing: PropTypes.bool,
  adsTime: PropTypes.number,
};

export default VideoPlayer;
