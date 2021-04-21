import * as React from 'react';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import HamburgerSVG from '../assets/icons/hamburger.svg';
import HamburgerBlackSVG from '../assets/icons/hamburgerBlack.svg';
import BackArrowPNG from '../assets/images/backArrow.png';
import { SessionContext } from '../contexts/session';

type AppHeaderType = {
  stackProps: StackHeaderProps;
};

function AppHeader(props: AppHeaderType): JSX.Element | null {
  const { stackProps } = props;
  const [{ isDrawerOpen, headerText, currentPage: screen }, dispatch] = React.useContext(SessionContext);

  const openDrawer = () => {
    if (headerText) {
      const hist = stackProps.scene.route.state.routes[0].state.history;
      stackProps.navigation.dispatch(
        CommonActions.navigate({
          name: hist[hist.length - 2].key.split('-')[0],
        }),
      );
      dispatch({ type: 'SET_HEADER_TEXT', headerText: '' });
      return;
    }
    stackProps.navigation.dispatch(DrawerActions.toggleDrawer);
  };

  if (isDrawerOpen) {
    return null;
  }

  let headerTextStyle = styles.headerText;
  let ButtonIcon = headerText ? <Image style={styles.backArrow} source={BackArrowPNG} /> : <HamburgerSVG />;

  if (screen === 'Counter') {
    headerTextStyle = { ...headerTextStyle, ...{ color: 'black' } };
    ButtonIcon = <HamburgerBlackSVG />;
  }

  return (
    <View style={styles.headerContainer}>
      <Pressable onPressIn={openDrawer}>{ButtonIcon}</Pressable>
      <Text style={headerTextStyle}>{headerText ? headerText : screen}</Text>
    </View>
  );
}

export default AppHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  headerTextBlack: {
    color: 'black',
  },
  backArrow: {
    marginHorizontal: 10,
    marginRight: 20,
  },
});
