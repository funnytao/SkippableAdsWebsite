import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';
import AdsPlayer from './AdsPlayer';
import VideoContext from './VideoContext';

const token = "keylUb5OfeoOt36PF";

/**
 * VideoUnit component
 * @param {object} props video unit props
 * @returns {component} VideoUnit component
 */
const VideoUnit = ({ videoSource, adsSource, adsTime, skippable=false }) => {
    const [playingAds, setPlayingAds] = useState(false);
    const [adsWatched, setAdsWatched] = useState(false);
    const [playingVideo, setPlayingVideo] = useState(false);

    const sendUserData = ({watched, skipped}) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const data = {
            "records": [
                {
                    "fields": {
                        "Name": "taotest",
                        "Date": new Date(Date.now()).toISOString(),
                        "Watched": watched,
                        "Skipped": skipped,
                        "Skippable": skippable,
                        "StartAt": adsTime
                    }
                }
            ]
        }
        axios.post(
            'https://api.airtable.com/v0/appLLIY3Tt2ZQqHt8/Table%201?maxRecords=3&view=Grid%20view',
            data,
            config
        )
        .then(res => console.log(res, 'nice'))
        .catch(err => console.log(err));
    }

    return (
        // The provider wraps the VideoPlayers so that they can share values
        <VideoContext.Provider value={{ 
            setAdsWatched, setPlayingAds, setPlayingVideo, adsWatched, playingAds, playingVideo, sendUserData
        }}>
            <div style={{display: playingAds ? 'none' : 'block'}}>
                <VideoPlayer
                    source={videoSource}
                    type="video"
                    adsTime={adsTime}
                />
            </div>
            {playingAds && <div >
                <AdsPlayer
                    source={adsSource}
                    playing
                    skippable={skippable}
                />
            </div>}
        </VideoContext.Provider>
    );
}

VideoUnit.propTypes = {
    videoSource: PropTypes.string,
    adsSource: PropTypes.string,
    adsTime: PropTypes.number,
    skippable: PropTypes.bool
};

export default VideoUnit;