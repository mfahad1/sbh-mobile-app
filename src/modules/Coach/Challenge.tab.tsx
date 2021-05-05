import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, FlatList } from 'react-native';
import { GreenDarkLinearGradient, GreyLinearGradient } from '../../common/linerGradients';
import { colors } from '../../styles/colors';
import RewardPNG from '../../assets/images/rewards.png';
import { CardRow } from './Learn.tab';
import AppText from '../../common/Text/Text';
import { SessionContext } from '../../contexts/session';
import { useDispatch } from 'react-redux';
import { getChallengesAction, setActiveChallenge } from './redux/coach';
import { useAppSelector } from '../../hooks/redux';

export default function ChallengeTab({ navigate }: any): JSX.Element {
  const [, dispatch] = React.useContext(SessionContext);
  const actionDispatcher = useDispatch();

  const challenges = useAppSelector((state) => state.coach.challenges);

  React.useEffect(() => {
    actionDispatcher(getChallengesAction());
  }, []);

  const navigateTo = (id: string) => {
    console.log({ id11: challenges });
    console.log({ id11: id });
    dispatch({ type: 'SET_HEADER_TEXT', headerText: 'New Challenge' });
    actionDispatcher(setActiveChallenge({ id }));
    navigate('ChallengeDetail');
  };

  const header = () => (
    <>
      <GreenDarkLinearGradient gradientStyle={style.headerCard}>
        <View>
          <GreyLinearGradient gradientStyle={style.newTag}>
            <AppText color="#009c65" fontSize={10} type="bold" textAlign="center">
              New
            </AppText>
          </GreyLinearGradient>
          <Text style={style.headerInfo}>3 Months Sobriety Check-in Streak</Text>
        </View>
        <Image style={style.imagePng} source={RewardPNG} />
      </GreenDarkLinearGradient>
      <Text style={style.moreGuide}>Challenges</Text>
    </>
  );

  const onEndReached = () => actionDispatcher(getChallengesAction({ page: challenges.page + 1 }));

  return (
    <FlatList
      ListHeaderComponent={header}
      data={challenges.challenges_collection}
      onEndReached={onEndReached}
      contentContainerStyle={style.center}
      keyExtractor={(item, i) => item.id + i}
      renderItem={({ item }) => <CardRow navigate={() => navigateTo(item.id)} ImageSource={{ uri: item.image }} heading={item.name} content={item.text} />}
    />
  );
}

const style = StyleSheet.create({
  headerCard: {
    borderRadius: 30,
    height: Dimensions.get('screen').height * 0.3,
    paddingHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  newTag: {
    backgroundColor: colors.white,
    borderRadius: 50,
    width: 50,
    color: '#009c65',
    fontSize: 12,
    textAlign: 'center',
    padding: 3,
  },
  moreGuide: {
    fontWeight: 'bold',
  },

  headerInfo: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 18,
    width: Dimensions.get('screen').width * 0.5,
  },

  center: {
    paddingHorizontal: 20,
  },
  imagePng: {
    width: Dimensions.get('screen').width * 0.25,
    resizeMode: 'contain',
  },
});
