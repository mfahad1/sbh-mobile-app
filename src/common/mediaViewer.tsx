import { useFocusEffect } from '@react-navigation/core';
import * as React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import AppText from './Text/Text';
import VideoPlayer from './videoPlayer';

export enum MediaType {
  text = 'text',
  video = 'video',
  audio = 'audio',
  image = 'image',
}

type MediaViewerType = {
  image: string;
  image_landscape: string;
  resourceUrl: string;
  type: Partial<MediaType>;
  text: string;
};

export default function MediaViewer({ type, resourceUrl, image_landscape, text }: Partial<MediaViewerType>) {
  const [showMedia, setShowMedia] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setShowMedia(true);
      return () => {
        setShowMedia(false);
      };
    }, []),
  );
  if ([MediaType.video, MediaType.audio].includes(type)) {
    return showMedia ? <VideoPlayer uri={resourceUrl} type={type} img={image_landscape} /> : null;
  }

  return <Image style={style.imgPng} source={{ uri: image_landscape }} />;
}

const style = StyleSheet.create({
  videoContainer: {
    borderRadius: 30,
    height: Dimensions.get('screen').height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 0,
  },
  video: {
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
  text: {
    backgroundColor: 'black',
    borderRadius: 30,
    height: Dimensions.get('screen').height * 0.3,
    padding: 30,
    paddingVertical: 30,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 20,
    marginTop: 0,
  },
});
