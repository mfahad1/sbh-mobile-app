import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/core';
import * as React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CravingFaceSVG from '../../assets/icons/cravingFace.svg';
import { CardRow } from '../../common/cardRow';
import { OrangeLinearGradient } from '../../common/linerGradients';
import MediaViewer from '../../common/mediaViewer';
import { addHttpsInUrl } from '../../common/utlis';
// import RewardL3PNG from '../../assets/images/rewardsL3.png';
import { SessionContext } from '../../contexts/session';
import { useAppSelector } from '../../hooks/redux';
import { FilterMediaType } from '../../services/coach';
import { colors } from '../../styles/colors';
import { getGuidesAction, resetLearnCollection, setActiveGuide } from './redux/coach';

export default function LearnTab({ navigate, type }: any): JSX.Element {
  const [, dispatch] = React.useContext(SessionContext);
  const [showMedia, setShowMedia] = React.useState(false);
  const [filterType, setFilterType] = React.useState<FilterMediaType>();
  const actionDispatcher = useDispatch();
  const guides = useAppSelector((state) => state.coach.guides);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setShowMedia(true);
      console.log({ type });

      if (guides.maxLimit !== 0) {
        actionDispatcher(getGuidesAction({ guideType: type }));
      }
      return () => {
        setShowMedia(false);
        actionDispatcher(resetLearnCollection());
      };
    }, [type]),
  );

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
    }

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

  const pickerValueChange = (pickerType: FilterMediaType) => {
    setFilterType(pickerType);
    actionDispatcher(resetLearnCollection());
    actionDispatcher(getGuidesAction({ type: pickerType }));
  };

  const header = () => {
    if (!guides.learn_primary) {
      return null;
    }

    return (
      <>
        {videOrFace()}
        <View style={style.headerRow}>
          <Text style={style.moreGuide}>{type ? 'Content would be helpful' : 'More Guides'}</Text>
          <View>
            <Picker style={style.headerRowPicker} selectedValue={filterType} onValueChange={pickerValueChange}>
              {Object.keys(FilterMediaType).map((key) => (
                <Picker.Item label={key} value={FilterMediaType[key]} />
              ))}
            </Picker>
          </View>
        </View>
      </>
    );
  };

  const onEndReached = () => {
    if (guides.maxLimit > 0) {
      actionDispatcher(getGuidesAction({ page: guides.page + 1, guideType: type }));
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerRowPicker: {
    width: 130,
  },
  moreGuide: {
    fontWeight: 'bold',
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
