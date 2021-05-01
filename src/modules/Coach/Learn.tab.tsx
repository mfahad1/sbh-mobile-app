import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, ImageSourcePropType, FlatList } from 'react-native';
import { colors } from '../../styles/colors';
import CravingFaceSVG from '../../assets/icons/cravingFace.svg';
// import RewardL3PNG from '../../assets/images/rewardsL3.png';
import AppText from '../../common/Text/Text';
import { SessionContext } from '../../contexts/session';
import { OrangeLinearGradient } from '../../common/linerGradients';
import { useDispatch } from 'react-redux';
import { getGuidesAction, setActiveGuide } from './redux/coach';
import { useAppSelector } from '../../hooks/redux';
import MediaViewer from '../../common/mediaViewer';

type CardRowProps = {
  navigate: () => void;
  ImageSource: ImageSourcePropType;
  heading?: string;
  content?: string;
  children?: React.ReactChild | React.ReactChildren;
};
export function CardRow({ navigate, ImageSource, heading, content, children }: CardRowProps): JSX.Element {
  return (
    <TouchableOpacity style={style.rowCard} onPress={navigate}>
      <Image style={style.imagePng} source={ImageSource} />
      <View style={style.rowCardMainContent}>
        {heading && (
          <AppText type="medium" fontSize={12}>
            {heading}
          </AppText>
        )}
        {content && <AppText fontSize={10}>{content}</AppText>}
        {children && children}
      </View>
    </TouchableOpacity>
  );
}

export default function LearnTab({ navigate, type }: any): JSX.Element {
  const [, dispatch] = React.useContext(SessionContext);

  const actionDispatcher = useDispatch();
  React.useEffect(() => {
    actionDispatcher(getGuidesAction());
  }, [actionDispatcher]);

  const guides = useAppSelector((state) => state.coach.guides);

  console.log({ guides });

  const navigateTo = (id: string) => {
    dispatch({ type: 'SET_HEADER_TEXT', headerText: 'Soberity Guide 01' });
    actionDispatcher(setActiveGuide({ id }));
    navigate('LearnDetail');
  };

  const header = () => {
    if (!guides.learn_primary) {
      return null;
    }

    return (
      <>
        {type ? (
          <OrangeLinearGradient gradientStyle={{ ...style.headerCard, ...style.headerCenter }}>
            <CravingFaceSVG />
          </OrangeLinearGradient>
        ) : (
            <MediaViewer text={guides.learn_primary?.text} imageUri={guides.learn_primary?.image_landscape} videoUri={guides.learn_primary?.video_uri} />
          )}
        <Text style={style.moreGuide}>{type ? 'Content would be helpful' : 'More Guides'}</Text>
      </>
    );
  };

  const onEndReached = () => {
    console.log('eddnded::');
    actionDispatcher(getGuidesAction({ page: guides.page + 1 }));
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={header}
        data={guides.learn_collection}
        onEndReached={onEndReached}
        contentContainerStyle={style.center}
        keyExtractor={(item, i) => item.id + i}
        renderItem={({ item }) => (
          <CardRow
            navigate={() => navigateTo(item.id)}
            ImageSource={{ uri: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/04/mars_landscape/21916769-2-eng-GB/Mars_landscape_pillars.jpg' }}
            heading={item.name}
            content={item.text}
          />
        )}
      />
    </>
  );
}

const style = StyleSheet.create({
  headerCard: {
    backgroundColor: colors.cardGrey,
    borderRadius: 30,
    height: Dimensions.get('screen').height * 0.3,
    padding: 30,
    marginVertical: 20,
  },

  // newTag: {
  //   backgroundColor: colors.darkBlue,
  //   borderRadius: 50,
  //   width: 50,
  //   color: colors.white,
  //   fontSize: 12,
  //   textAlign: 'center',
  //   padding: 3,
  // },
  moreGuide: {
    fontWeight: 'bold',
  },
  rowCardMainContent: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    paddingRight: Dimensions.get('screen').width * 0.2,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  rowCard: {
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginVertical: 20,
    elevation: 10,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  imagePng: {
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  center: {
    paddingHorizontal: 20,
  },
  headerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
