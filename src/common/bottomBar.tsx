/**
 * import modules and files
 */

import React, { useEffect } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GreenLinearGradient } from '../common/linerGradients';

import CounterSVG from '../assets/icons/footer/counter.svg';
import CounterFillSVG from '../assets/icons/footer/counter-fill.svg';
import CouchSVG from '../assets/icons/footer/coach.svg';
import CouchFillSVG from '../assets/icons/footer/coach-fill.svg';
import HistorySVG from '../assets/icons/footer/history.svg';
import HistoryFillSVG from '../assets/icons/footer/history.fill.svg';
import QuoteSVG from '../assets/icons/footer/quotes.svg';
import QuoteFillSVG from '../assets/icons/footer/quotes-fill.svg';
import IntakeSVG from '../assets/icons/footer/intake.svg';
import IntakeFillSVG from '../assets/icons/footer/intake-fill.svg';
import { SessionContext } from '../contexts/session';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useAppSelector } from '../hooks/redux';

type currentStateOfButtonProps = {
  currentScreen?: string;
  wantedScreen: string;
  NormalSvg: React.ElementType;
  ActiveSvg: React.ElementType;
};

const currentStateOfButton = ({ currentScreen, wantedScreen, NormalSvg, ActiveSvg }: currentStateOfButtonProps) => {
  if (currentScreen === wantedScreen) {
    return (
      <View style={styles.activeBtn}>
        <GreenLinearGradient gradientStyle={styles.activeBox}>
          <View style={styles.iconView}>
            <ActiveSvg />
          </View>
        </GreenLinearGradient>
        <Text adjustsFontSizeToFit style={{ ...styles.iconViewText, ...styles.iconTextActive }}>
          {wantedScreen}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.iconView}>
      <NormalSvg />
      <Text adjustsFontSizeToFit style={styles.iconViewText}>
        {wantedScreen}
      </Text>
    </View>
  );
};

const BottomBar = (props: any) => {
  const { navigation } = props;
  const [{ headerText }, dispatch] = React.useContext(SessionContext);
  const user = useAppSelector((state) => state.counter.user);

  const gotoView = (view: string) => {
    navigation.navigate(view);
  };

  const screen = getFocusedRouteNameFromRoute(props);

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_PAGE', currentPage: screen });
  }, [screen]);

  if (headerText) {
    return null;
  }

  return (
    <View style={styles.bottomBarContainer}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
        {currentStateOfButton({
          currentScreen: screen,
          wantedScreen: 'Home',
          NormalSvg: CounterSVG,
          ActiveSvg: CounterFillSVG,
        })}
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Coach')}>
        {currentStateOfButton({
          currentScreen: screen,
          wantedScreen: 'Coach',
          NormalSvg: CouchSVG,
          ActiveSvg: CouchFillSVG,
        })}
      </TouchableWithoutFeedback>

      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        {currentStateOfButton({
          currentScreen: screen,
          wantedScreen: 'History',
          NormalSvg: HistorySVG,
          ActiveSvg: HistoryFillSVG,
        })}
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={() => gotoView('Motivation')}>
        {currentStateOfButton({
          currentScreen: screen,
          wantedScreen: 'Motivation',
          NormalSvg: QuoteSVG,
          ActiveSvg: QuoteFillSVG,
        })}
      </TouchableWithoutFeedback>

      {user.inTake && (
        <TouchableWithoutFeedback onPress={() => gotoView('Intake')}>
          {currentStateOfButton({
            currentScreen: screen,
            wantedScreen: 'Intake',
            NormalSvg: IntakeSVG,
            ActiveSvg: IntakeFillSVG,
          })}
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomBarContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    elevation: 20,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  iconView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconViewText: {
    fontSize: 10,
    marginTop: 5,
  },
  iconTextActive: {
    fontWeight: 'bold',
  },
  activeBox: {
    padding: 10,
  },
  activeBtn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
