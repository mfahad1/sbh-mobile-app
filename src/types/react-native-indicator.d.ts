declare module 'react-native-indicator' {
  type DotsLoaderProps = {
    size: number;
    color: string;
    betweenSpace: number;
    frequency: number;
  };

  export function DotsLoader(props: DotsLoaderProps): JSX.Element;
  type PulseLoaderProps = {
    size: number;
    color: string;
    betweenSpace?: number;
    frequency: number;
  };

  export function PulseLoader(props: PulseLoaderProps): JSX.Element;
  type OpacityDotsLoaderProps = {
    size?: number;
    color: string;
    betweenSpace?: number;
    speed: number;
  };

  export function OpacityDotsLoader(props: OpacityDotsLoaderProps): JSX.Element;
}
