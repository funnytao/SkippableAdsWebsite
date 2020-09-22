import React, {useRef, useContext} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'
import VideoContext from './VideoContext';

/**
 * Video player component
 * @param {object} props video player props
 * @returns {component} VideoPlayer
 */
const AdsPlayer = ({ source, playing=false, skippable=false }) => {
  let player = useRef();
  // The context is used to share values between parents and children
  const { setAdsWatched, setPlayingAds, setPlayingVideo, sendUserData } = useContext(VideoContext);

  const resumeVideo = skipped => {
    console.log(`Ads played for - ${player.current.getCurrentTime()}ms`);
    sendUserData({
        watched: player.current.getCurrentTime(),
        skipped
    });
    setPlayingAds(false);
    setAdsWatched(true);
    setPlayingVideo(true);
  }

  return <>
    <ReactPlayer 
      ref={el => {player.current = el}}
      url={source}
      playing={playing}
      onEnded={() => resumeVideo(false)}
    />
    {skippable && <button onClick={() => resumeVideo(true)}>
        Skip
    </button>}
  </>
}

AdsPlayer.propTypes = {
  source: PropTypes.string,
  playing: PropTypes.bool,
  skippable: PropTypes.bool
};

export default AdsPlayer;
