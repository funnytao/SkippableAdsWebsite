import React from 'react';
import queryString from 'query-string';
import VideoUnit from '../components/VideoUnit';

import MAIN_VIDEO from '../static/main_video.mp4';
import ADS_VIDEO from '../static/taotest.mp4';

import classes from './VideoPageLayout.module.scss';

/**
 * Layout for the main page
 * @returns {component} main page layout
 */
const VideoPageLayout = () => {
    const { adTime = 0, skippable } = queryString.parse(window.location.search);

    return (
        <div className={classes.videoPageWrapper}>
            <VideoUnit videoSource={MAIN_VIDEO} adsSource={ADS_VIDEO} adsTime={Number(adTime)} skippable={Boolean(skippable)} />
        </div>
    );
}

export default VideoPageLayout;