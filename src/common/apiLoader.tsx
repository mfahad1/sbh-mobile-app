import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RotationHoleLoader } from 'react-native-indicator';

export default function ApiLoader({ size = 50 }: { size: number }) {
  return (
    <View style={style.center}>
      <RotationHoleLoader speed={50} size={size} rotationSpeed={1000} />
    </View>
  );
}

export function ApiLoaderWrapper({ size = 50, children, loading }: { loading: boolean; size?: number; children: React.ReactChild | React.ReactChildren }): JSX.Element {
  if (loading) {
    return <ApiLoader size={size} />;
  }

  return <>{children}</>;
}

const style = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
