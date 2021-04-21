import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import CurvedLayout from '../../../common/curvedLayout';
import LearnTab from '../../Coach/Learn.tab';

export default function LearnCategory({ navigation, route }: any): JSX.Element {
  return (
    <CurvedLayout>
      <View style={style.container}>
        <LearnTab navigate={navigation.navigate} type={route.params.type} />
      </View>
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    flex: 1,
    marginTop: 100,
  },
});
