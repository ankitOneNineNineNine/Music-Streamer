import React from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import notify from './../../../utils/notify';

const options = {
    defaultPlayIndex: 0,
    theme: 'dark',
    clearPriorAudioLists: true,
    autoPlayInitLoadPlayList: true,
   
    preload: true,
    remember: true,
    remove: false,
    defaultPosition: {
        top: 100,
        right: 10,
    },
    mode: 'full',
    once: false,
    autoPlay: true,
    toggleMode: true,
    showMiniModeCover: true,
    showMiniProcessBar: true,
    drag: true,
    seeked: true,
    showProgressLoadBar: true,
    showPlay: true,
    showReload: true,
    showDownload: true,
    showPlayMode: true,
    defaultVolume: 1,
    playModeShowTime: 600,
    loadAudioErrorPlayNext: true,
    autoHiddenCover: false,
    spaceBar: true,
    onAudioDownload() {
        notify.showSuccess('audio downloaded')
    },


}
var audioInstance = null
export default function AudioPlayer({playlist, savefile}){
    return (
        <ReactJkMusicPlayer {...options} audioLists={playlist} getAudioInstance={instance => audioInstance = instance} customDownloader={savefile} />
    )
}