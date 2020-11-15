import React from 'react';
import queryString from 'query-string';
import VideoUnit from '../components/VideoUnit';

import { ADS_VIDEOS, MAIN_VIDEOS } from './VideoConstant';

import classes from './VideoPageLayout.module.scss';

/**
 * Layout for the main page
 * @returns {component} main page layout
 */
const VideoPageLayout = () => {
    const { adTime = 0, skippable, adId = 0, videoId = 0 } = queryString.parse(window.location.search);

    return (
        <div className={classes.videoPageWrapper}>
            <VideoUnit videoSource={MAIN_VIDEOS[videoId]} adsSource={ADS_VIDEOS[adId]} adsTime={Number(adTime)} skippable={Boolean(skippable)} />
        </div>
    );
}

export default VideoPageLayout;