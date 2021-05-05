import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './src/navigations/AppNavigator';
import SessionContextProvider from './src/contexts/session';
import { Provider } from 'react-redux';
import store from './src/redux/rootReducer';
import ApiLoader from './src/common/apiLoader';

const App = () => {
  return (
    <Provider store={store}>
      <SessionContextProvider>
        <SafeAreaView style={style.flex}>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </SafeAreaView>
      </SessionContextProvider>
    </Provider>
  );
};

export default App;

const style = StyleSheet.create({
  flex: { flex: 1 },
});
