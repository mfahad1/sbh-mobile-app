import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../modules/Auth/Login.screen';
import GetStartedScreen from '../modules/Welcome/GetStarted.screen';
import RecoveryTimelineScreen from '../modules/RecoveryTimeline/RecoveryTimeline.screen';

const Stack = createStackNavigator();

export default function AuthNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="RecoveryTimeline" component={RecoveryTimelineScreen} />
    </Stack.Navigator>
  );
}
