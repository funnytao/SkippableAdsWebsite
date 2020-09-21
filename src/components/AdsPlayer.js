/* eslint-disable no-console */
import React, {useRef, useEffect, useState, useContext} from 'react';
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
  const { setAdsWatched, setPlayingAds, adsWatched, setPlayingVideo, sendUserData } = useContext(VideoContext);
  const [startAt, setStartAt] = useState(0);

  const resumeVideo = skipped => {
    setPlayingAds(false);
    setAdsWatched(true);
    setPlayingVideo(true);
    console.log(`Ads played for - ${Date.now() - startAt}ms`);
    sendUserData({
        watched: Date.now() - startAt,
        skipped
    })
  }

  return <>
    <ReactPlayer 
      ref={el => {player.current = el}}
      url={source}
      onPlay={() => setStartAt(Date.now())}
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
