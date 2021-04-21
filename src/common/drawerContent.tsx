import { Dimensions } from 'react-native';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function DrawerContentComponent(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Log Out</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    opacity: 1,
    height: Dimensions.get('screen').height * 0.2,
  },
});

export default DrawerContentComponent;
