import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppHeader from '../common/header';
import DrawerNavigator from './DrawerNavigator';
import localStorageService from '../common/localStorage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = React.useState<string>();

  React.useEffect(() => {
    const caller = async () => {
      const auth = await localStorageService.get('Authorization');
      if (auth) {
        setInitialRoute('DrawerNavigation');
      }
      setInitialRoute('Auth');
    };

    caller();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
        }}
        initialRouteName={initialRoute}>
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigator}
          options={() => ({
            header: (props) => <AppHeader stackProps={props} />,
          })}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={(): any => ({
            header: () => null,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
