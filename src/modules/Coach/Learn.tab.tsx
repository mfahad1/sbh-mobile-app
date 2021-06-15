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
import { useFocusEffect } from '@react-navigation/core';
import { addHttpsInUrl } from '../../common/utlis';

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
          <AppText type="medium" fontSize={12} numberOfLines={5}>
            {heading}
          </AppText>
        )}
        {content && (
          <AppText fontSize={10} numberOfLines={3}>
            {content}
          </AppText>
        )}
        {children && children}
      </View>
    </TouchableOpacity>
  );
}

export default function LearnTab({ navigate, type }: any): JSX.Element {
  const [, dispatch] = React.useContext(SessionContext);
  const [showMedia, setShowMedia] = React.useState(false);
  const actionDispatcher = useDispatch();
  React.useEffect(() => {
    if (guides.maxLimit !== 0) {
      actionDispatcher(getGuidesAction());
    }
  }, [actionDispatcher]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setShowMedia(true);
      return () => {
        setShowMedia(false);
      };
    }, []),
  );

  const guides = useAppSelector((state) => state.coach.guides);

  console.log({ guides });

  const navigateTo = (id: string) => {
    dispatch({ type: 'SET_HEADER_TEXT', headerText: 'Soberity Guide 01' });
    actionDispatcher(setActiveGuide({ id }));
    navigate('LearnDetail');
  };

  const videOrFace = () => {
    if (!guides.learn_primary) {
      return null;
    }
    if (type) {
      return (
        <OrangeLinearGradient gradientStyle={[style.headerCard]}>
          <View style={style.headerCenter}>
            <CravingFaceSVG />
          </View>
        </OrangeLinearGradient>
      );
    }

    if (!showMedia) {
      return null;
    };

    return (
      <MediaViewer
        type={guides.learn_primary.type}
        resourceUrl={addHttpsInUrl(guides.learn_primary.resourceUrl)}
        image_landscape={addHttpsInUrl(guides.learn_primary.image_landscape)}
        image={addHttpsInUrl(guides.learn_primary.image)}
        text={guides.learn_primary.text}
      />
    );
  };

  const header = () => {
    if (!guides.learn_primary) {
      return null;
    }

    return (
      <>
        {videOrFace()}
        <Text style={style.moreGuide}>{type ? 'Content would be helpful' : 'More Guides'}</Text>
      </>
    );
  };

  const onEndReached = () => {
    console.log('eddnded::', { guides });
    if (guides.maxLimit > 0) {
      actionDispatcher(getGuidesAction({ page: guides.page + 1 }));
    }
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={header}
        data={guides.learn_collection}
        onEndReached={onEndReached}
        contentContainerStyle={style.center}
        keyExtractor={(item, i) => item.id + i}
        renderItem={({ item }) => <CardRow navigate={() => navigateTo(item.id)} ImageSource={{ uri: addHttpsInUrl(item.image) }} heading={item.name} content={item.text} />}
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

    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 0,
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
    paddingTop: 40,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  rowCardMainContent: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    paddingRight: Dimensions.get('screen').width * 0.3,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    alignItems: 'center',
  },
  imagePng: {
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 10,
    width: Dimensions.get('screen').width * 0.3,
  },
  center: {
    paddingHorizontal: 20,
  },
  headerCenter: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
