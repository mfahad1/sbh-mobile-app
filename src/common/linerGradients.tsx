import * as React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export function GreenLinearGradient({ gradientStyle, children }: { gradientStyle?: object; children: React.ReactChild }): JSX.Element {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#94da4c', '#49c265', '#10b179']} style={{ ...style.linearGradient, ...gradientStyle }}>
      {children}
    </LinearGradient>
  );
}

export function GreyLinearGradient({ gradientStyle, children }: { gradientStyle?: object; children: React.ReactChild }): JSX.Element {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ffffff', '#c4d8f8', '#94b9f1']} style={{ ...style.linearGradient, ...gradientStyle }}>
      {children}
    </LinearGradient>
  );
}

export function BlueLinearGradient({ gradientStyle, children }: { gradientStyle?: object; children: React.ReactChild }): JSX.Element {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#96bcff', '#6d9fea', '#518cdd']} style={{ ...style.linearGradient, ...gradientStyle }}>
      {children}
    </LinearGradient>
  );
}

export function GreenDarkLinearGradient({ gradientStyle, children }: { gradientStyle?: object; children: React.ReactChild | React.ReactChild[] }): JSX.Element {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#15b377', '#4cc464', '#79d154', '#8fd84d']} style={{ ...style.linearGradient, ...gradientStyle }}>
      {children}
    </LinearGradient>
  );
}

export function OrangeLinearGradient({ gradientStyle, children }: { gradientStyle?: object; children: React.ReactChild | React.ReactChild[] }): JSX.Element {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f17d00', '#f28000', '#f79000', '#f87c0a']} style={{ ...style.linearGradient, ...gradientStyle }}>
      {children}
    </LinearGradient>
  );
}

export function PinkLinearGradient({ gradientStyle, children }: { gradientStyle?: object; children: React.ReactChild | React.ReactChild[] }): JSX.Element {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ec0037', '#e83d65', '#eb4e72', '#ed5577']} style={{ ...style.linearGradient, ...gradientStyle }}>
      {children}
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  linearGradient: {
    borderRadius: 10,
  },
});
