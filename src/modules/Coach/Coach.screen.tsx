import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { GreyLinearGradient } from '../../common/linerGradients';
import CurvedLayout from '../../common/curvedLayout';
import { colors } from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LearnTab from './Learn.tab';
import ChallengeTab from './Challenge.tab';
import AppText from '../../common/Text/Text';

function showGradientOrNormal(value: TabValue, selected = false, setRating: (val: TabValue) => void): JSX.Element {
  if (selected) {
    return (
      <TouchableOpacity onPress={() => setRating(value)}>
        <GreyLinearGradient gradientStyle={style.tabButton}>
          <AppText type="bold" color={colors.textActive} fontSize={12}>
            {value}
          </AppText>
        </GreyLinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={style.tabButton} onPress={() => setRating(value)}>
      <AppText type="bold" color={colors.textActive} fontSize={12} color={colors.white}>
        {value}
      </AppText>
    </TouchableOpacity>
  );
}
enum TabValue {
  Learn = 'Learn',
  Challenges = 'Challenges',
}
export default function CoachScreen({ navigation }: any): JSX.Element {
  const [activeTab, setActiveTab] = React.useState(TabValue.Learn);

  return (
    <CurvedLayout>
      <View style={style.container}>
        <View style={style.tabbar}>
          {showGradientOrNormal(TabValue.Learn, activeTab === TabValue.Learn, setActiveTab)}
          {showGradientOrNormal(TabValue.Challenges, activeTab === TabValue.Challenges, setActiveTab)}
        </View>
        {activeTab === TabValue.Learn && <LearnTab navigate={navigation.navigate} />}
        {activeTab === TabValue.Challenges && <ChallengeTab navigate={navigation.navigate} />}
      </View>
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    flex: 1,
    marginTop: 100,
  },

  tabbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  tabButton: {
    paddingHorizontal: '10%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 10,
  },
});
