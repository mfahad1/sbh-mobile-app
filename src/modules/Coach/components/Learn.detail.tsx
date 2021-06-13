import * as React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { OpacityDotsLoader } from 'react-native-indicator';
import CurvedLayout from '../../../common/curvedLayout';
import MediaViewer from '../../../common/mediaViewer';
import AppText from '../../../common/Text/Text';
import { addHttpsInUrl } from '../../../common/utlis';
import { useAppSelector } from '../../../hooks/redux';

export default function LearnDetail(): JSX.Element {
  const activeGuide = useAppSelector((state) => state.coach.activeGuide);

  if (!activeGuide) {
    return <OpacityDotsLoader color="white" speed={300} />;
  }

  return (
    <CurvedLayout>
      <View style={style.containerMain}>
        <View style={style.mediaContainer}>
          <MediaViewer
            type={activeGuide.type}
            resourceUrl={addHttpsInUrl(activeGuide.resourceUrl)}
            image_landscape={addHttpsInUrl(activeGuide.image_landscape)}
            image={addHttpsInUrl(activeGuide.image)}
            text={activeGuide.text}
          />
        </View>
        <ScrollView contentContainerStyle={style.content}>
          {/* <View style={style.headerCard} /> */}
          <View style={style.container}>
            <View style={style.header}>
              <AppText textAlign="center" type="bold" fontSize={20}>
                {activeGuide.name}
              </AppText>
            </View>
            <AppText fontSize={11} color="#454f84" textAlign="center" lineHeight={20}>
              {activeGuide.text}
            </AppText>
          </View>
        </ScrollView>
      </View>
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: Dimensions.get('screen').height * 0.15,
    flex: 1,
    borderRadius: 50,
    elevation: 20,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.9,
  },
  header: {
    paddingVertical: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerMain: {
    marginTop: Dimensions.get('screen').height * 0.1,
  },
  mediaContainer: {
    height: Dimensions.get('screen').height * 0.3,
  },
});
