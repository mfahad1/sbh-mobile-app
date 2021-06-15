import React, { useState, useRef } from 'react';
import { Dimensions, StyleSheet, Image, View } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { MediaType } from './mediaViewer';

const VideoPlayer = ({ uri, type, img }: { img: string; uri: string; type: MediaType }) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const onSeek = (seek) => {
    videoPlayer?.current.seek(seek);
  };

  const onPaused = (playerState) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer?.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    // Uncomment this line if you choose repeat=false in the video player
    // setPlayerState(PLAYER_STATES.ENDED);
  };

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <View style={styles.container}>
      {type === MediaType.video && <Image style={styles.imgPng} source={{ uri: img }} />}
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onError={e => console.error("video error:::::", e)}
        paused={paused}
        ref={(ref) => (videoPlayer.current = ref)}
        resizeMode="cover"
        source={{
          uri,
        }}
        repeat
        style={type === MediaType.video ? styles.mediaPlayer : styles.audioPlayer}
        volume={100.0}
        fullscreen={isFullScreen}
      />
      <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        mainColor="orange"
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        onFullScreen={() => setIsFullScreen(!isFullScreen)}
        containerStyle={type === MediaType.video ? styles.mediaControlsVideo : styles.mediaControlsAudio}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height * 0.3,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    height: Dimensions.get('screen').height * 0.3,
  },
  audioPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    height: Dimensions.get('screen').height * 0.09,
  },
  mediaControlsAudio: {
    height: Dimensions.get('screen').height * 0.07,
  },
  mediaControlsVideo: {
    height: Dimensions.get('screen').height * 0.3,
  },
  imgPng: {
    borderRadius: 15,
    height: Dimensions.get('screen').height * 0.3,
    width: Dimensions.get('screen').width * 0.9,
    paddingHorizontal: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default VideoPlayer;
