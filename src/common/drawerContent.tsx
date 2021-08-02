import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './Text/Text';
import LogoutSVG from '../assets/icons/logout.svg';
import LogoSVG from '../assets/icons/logo1.svg';
import adjust from './adjustPixel';
import localStorageService from './localStorage';
import { useDispatch } from 'react-redux';
import { reset } from '../modules/Auth/redux/auth';

function DrawerContentComponent({ navigation }: any): JSX.Element {
  const actionDispatcher = useDispatch();


  const logout = () => {
    localStorageService.clear();
    actionDispatcher(reset());
    navigation.navigate('Auth', { screen: 'Login' });
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemCenter}>
        <LogoSVG width={adjust(50)} />
        <AppText type="bold" fontSize={15}>
          SBH Alumni App
        </AppText>
      </View>
      <TouchableOpacity style={styles.item} onPress={logout}>
        <LogoutSVG />
        <AppText type="bold">Logout </AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingRight: 200,
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    alignItems: 'center',
  },
  itemCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    paddingRight: 40,
  },
});

export default DrawerContentComponent;
