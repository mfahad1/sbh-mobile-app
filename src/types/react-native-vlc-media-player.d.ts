declare module 'react-native-vlc-media-player' {
  type VLCPlayerProps = {
    style: object;
    videoAspectRatio: string;
    source: { url: string };
  };

  export function VLCPlayer(props: VLCPlayerProps): JSX.Element;
}
