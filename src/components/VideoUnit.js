import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import VideoContext from './VideoContext';

import MAIN_VIDEO from '../static/main_video.mp4';
import ADS_VIDEO from '../static/ads_1.mp4';

/**
 * VideoUnit component
 * @param {object} props video unit props
 * @returns {component} VideoUnit component
 */
const VideoUnit = ({ source, adsSources, adsTimes }) => {
    const [playingAds, setPlayingAds] = useState(false);

    return (
        <VideoContext.Provider value={{ playingAds, setPlayingAds }}>
            <div style={{display: playingAds ? 'none' : 'block'}}>
                <VideoPlayer source={MAIN_VIDEO} playing={!playingAds} />
            </div>
            <div style={{display: !playingAds ? 'none' : 'block'}}>
                <VideoPlayer source={ADS_VIDEO} controls={false} playing={playingAds} loop />
            </div>
            <button onClick={() => setPlayingAds(prev => !prev)}>Switch</button>
        </VideoContext.Provider>
    );
}

export default VideoUnit;