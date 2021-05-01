import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import CircleRadiiSVG from '../../assets/icons/circleRadiiCounter.svg';
import adjust from '../../common/adjustPixel';
import ButtonGradient, { ButtonType } from '../../common/buttons';
import CircleLayout from '../../common/circleLayout';
import AppText from '../../common/Text/Text';
import { useAppSelector } from '../../hooks/redux';
import NeedHelpModal from './components/NeedHelpModal';
import { getUserAction } from './redux/counter';

export default function CounterScreen({ navigation }: any): JSX.Element {
  const [needHelp, setNeedHelp] = React.useState(false);
  const user = useAppSelector((state) => state.counter.user);
  const actionDispatcher = useDispatch();

  React.useEffect(() => {
    actionDispatcher(getUserAction());
  }, [actionDispatcher]);

  return (
    <CircleLayout>
      <View style={style.container}>
        <View style={style.head}>
          <AppText type="medium" fontSize={27} textAlign="center">
            Congrats you're sober for
          </AppText>
        </View>
        <View style={style.counterCircleRadiiView}>
          
          
        

        <View style={style.circleRadii}>
            <CircleRadiiSVG />
        </View>

        <View style={style.counterView}>
            <Text style={style.counterText}>{user.days_sober}</Text>
            <Text style={style.counterSubText}>DAYS</Text>
        </View>

        </View>
        <View style={style.btnGroup}>
          <View style={style.btn}>
            <ButtonGradient disabled={!user.isEditable || user.days_sober === 0} text="I Am Sober Today" onPress={() => navigation.navigate('Feedback')} />
          </View>
          <ButtonGradient type={ButtonType.danger} text="I Need Help" onPress={() => setNeedHelp(true)} />
        </View>
        {needHelp && (
          <NeedHelpModal
            disableRelapsed={user.days_sober === 0}
            setModalVisible={setNeedHelp}
            navigate={(screen: string, params?: { [key: string]: string }) => {
              navigation.navigate(screen, { ...params });
              setNeedHelp(false);
            }}
          />
        )}
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
    marginTop: 40,
  },
  head: {
    height: Dimensions.get('screen').height * 0.13,
  },
  
  counterSubText: {
    fontFamily: 'Sailec Bold',
    fontSize: adjust(15),
    color: '#69768d',
    includeFontPadding: false,
  },
  circleRadii: {
    position: 'absolute',
    justifyContent: 'center',


  },

  counterView: {
    borderRadius: Dimensions.get('screen').width / 2,
    elevation: 20,
    backgroundColor: '#f1f5ff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').height * 0.14,
    height: Dimensions.get('screen').height * 0.14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  counterText: {
    fontFamily: 'Sailec Black',
    fontSize: adjust(30),
    includeFontPadding: false,
  },

  counterCircleRadiiView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGroup: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
});
