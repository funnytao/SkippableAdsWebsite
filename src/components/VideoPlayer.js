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
const VideoPlayer = ({ source, controls=true, playing=false, loop=false }) => {
  let player = useRef();
  const videoContext = useContext(VideoContext);

  const [userData, setUserData] = useState({
    watched: 0,
    seeked: 0
  });

  const [lastPlayed, setLastPlayed] = useState(0);

  useEffect(() => {
    if (player) {
      console.log(player.current.getCurrentTime());
    }
  }, [player]);

  useEffect(() => {
    console.log(videoContext)
  }, [videoContext]);

  /**
   * Function to update wathced time
   */
  const setWatchedTime = () => setUserData(prev => ({
    ...prev,
    watched: prev.watched + Date.now() - lastPlayed
  }));

  return <ReactPlayer 
    ref={el => {player.current = el}}
    url={source}
    controls={controls}
    playing={playing}
    loop={loop}
    onPlay={() => setLastPlayed(Date.now())}
    onPause={setWatchedTime}
    onSeek={() => setUserData(prev => ({...prev, seeked: prev.seeked + 1}))}
    onEnded={() => console.log(userData)}
  />
}

VideoPlayer.propTypes = {
  source: PropTypes.string,
  controls: PropTypes.bool,
  playing: PropTypes.bool,
  loop: PropTypes.bool
};

export default VideoPlayer;
