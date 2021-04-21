import * as React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import AppText from './Text/Text';

export default function MediaViewer({ videoUri, imageUri, text }: { videoUri?: string; imageUri?: string; text?: string }) {
  if (videoUri) {
    return (
      <View style={style.videoContainer}>
        <Video
          source={{ uri: videoUri }} // Can be a URL or a local file.
          style={style.video}
          posterResizeMode="stretch"
          resizeMode="stretch"
          controls={true}
        />
      </View>
    );
  }

  if (imageUri) {
    return <Image style={style.imgPng} source={{ uri: imageUri }} />;
  }

  return (
    <View style={style.text}>
      {text && (
        <AppText color="white" type="boldItalic" fontSize={22}>
          {`"${text}"`}
        </AppText>
      )}
    </View>
  );
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 30,
    height: Dimensions.get('screen').height * 0.3,
  },
  imgPng: {
    resizeMode: 'contain',
    borderRadius: 25,
    height: Dimensions.get('screen').height * 0.3,
  },
  text: {
    backgroundColor: 'black',
    borderRadius: 30,
    height: Dimensions.get('screen').height * 0.35,
    padding: 30,
    paddingVertical: 30,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 20,
    marginTop: 0,
  },
});
