import * as React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerContentComponent from '../common/drawerContent';
import SoberScreen from '../modules/Counter/SoberForm';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }: any) {
  return (
    <Drawer.Navigator drawerStyle={{ width: Dimensions.get('screen').width * 0.825 }} initialRouteName="BottomTabNavigator" drawerContent={(props: any) => <DrawerContentComponent navigation={navigation} {...props} />}>
      <Drawer.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      {/* <Drawer.Screen name="Sober" component={SoberScreen} /> */}
    </Drawer.Navigator>
  );
}
