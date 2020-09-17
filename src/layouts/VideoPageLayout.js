import React, {useState} from 'react';
import VideoUnit from '../components/VideoUnit';

import MAIN_VIDEO from '../static/main_video.mp4';
import ADS_VIDEO from '../static/ads_1.mp4';

import classes from './VideoPageLayout.module.scss';

console.log(classes)

/**
 * Layout for the main page
 * @returns {component} main page layout
 */
const VideoPageLayout = () => {
    return (
        <div className={classes.videoPageWrapper}>
            <VideoUnit />
            <VideoUnit />
        </div>
    );
}

export default VideoPageLayout;