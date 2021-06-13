import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import LogoSVG from '../../assets/icons/logo.svg';
import adjust from '../../common/adjustPixel';
import ButtonGradient from '../../common/buttons';
import CircleLayout from '../../common/circleLayout';
import AppText from '../../common/Text/Text';

export default function GetStartedScreen({ navigation }: any): JSX.Element {
  return (
    <CircleLayout>
      <View style={style.container}>
        <View style={style.logo}>
          <LogoSVG width={adjust(100)} />
        </View>
        <AppText type="medium" fontSize={25} textAlign="center">
          Welcome to SBH Alumni App!
        </AppText>
        <AppText textAlign="center" color="#454f84" fontSize={13} lineHeight={25}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu
          aliquet, molest.
        </AppText>
        <ButtonGradient text="Get Started" onPress={() => navigation.navigate('RecoveryTimeline')} />
      </View>
    </CircleLayout>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    flex: 1,
  },
  logo: {
    height: adjust(100),
  }
});
