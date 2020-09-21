import React, {useState} from 'react';
import VideoUnit from '../components/VideoUnit';

import MAIN_VIDEO from '../static/main_video.mp4';
import ADS_VIDEO from '../static/taotest.mp4';

import classes from './VideoPageLayout.module.scss';

console.log(classes)

/**
 * Layout for the main page
 * @returns {component} main page layout
 */
const VideoPageLayout = () => {
    return (
        <div className={classes.videoPageWrapper}>
            <VideoUnit videoSource={MAIN_VIDEO} adsSource={ADS_VIDEO} adsTime={5} skippable />
            <VideoUnit videoSource={MAIN_VIDEO} adsSource={ADS_VIDEO} adsTime={0} skippable />
            <VideoUnit videoSource={MAIN_VIDEO} adsSource={ADS_VIDEO} adsTime={0} />
        </div>
    );
}

export default VideoPageLayout;