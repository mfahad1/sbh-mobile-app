import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import CurvedLayout from '../../common/curvedLayout';
import { colors } from '../../styles/colors';
import { CardRow } from '../Coach/Learn.tab';
import RewardL3PNG from '../../assets/images/rewardsL3.png';
import AppText from '../../common/Text/Text';
import { SessionContext } from '../../contexts/session';
import { useDispatch } from 'react-redux';
import { getQuotesAction, setActiveQuote } from './redux/quotes';
import { useAppSelector } from '../../hooks/redux';
import { Quote } from '../../services/quotes';

export default function QuoteScreen({ navigation }: any): JSX.Element {
  const [, dispatch] = React.useContext(SessionContext);
  const dispatchAction = useDispatch();

  const { quotes } = useAppSelector((state) => state.quotes);

  React.useEffect(() => {
    dispatchAction(getQuotesAction());
  }, [dispatchAction]);

  const navigateTo = (quote: Quote) => {
    dispatch({ type: 'SET_HEADER_TEXT', headerText: 'Quote' });
    dispatchAction(setActiveQuote({ id: quote.id }));
    navigation.navigate('QuoteDetail');
  };

  const onEndReached = () => {
    dispatchAction(getQuotesAction({ page: quotes.page + 1 }));
  };

  const header = () => {
    if (!quotes.quote_today) {
      return <View style={style.bannerContainer} />;
    }

    return (
      <View style={style.bannerContainer}>
        <View style={style.banner}>
          <AppText type="bold" color="white" fontSize={20}>
            Today's Quote
          </AppText>
          <View>
            <AppText type="italic" fontSize={10} color="rgba(255, 255, 255, 0.8)" textAlign="center" lineHeight={18}>
              {quotes.quote_today.text}
            </AppText>
            <AppText type="bold" color="rgba(255, 255, 255, 0.5)" fontSize={12} textAlign="center" paddingVertical={5}>
              <>― {quotes.quote_today.author}</>
            </AppText>
          </View>
        </View>
        <AppText type="bold">More Quotes</AppText>
      </View>
    );
  };

  return (
    <CurvedLayout>
      <FlatList
        ListHeaderComponent={header}
        data={quotes.quote_collection}
        onEndReached={onEndReached}
        contentContainerStyle={style.scrollViewContainer}
        renderItem={({ item }) => (
          <CardRow ImageSource={{ uri: item.image }} navigate={() => navigateTo(item)} content={item.text}>
            <AppText type="bold" color="rgba(69, 79, 132, 0.6)" fontSize={10}>
              <>―{item.author}</>
            </AppText>
          </CardRow>
        )}
      />
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  scrollViewContainer: {
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  bannerContainer: {
    marginTop: 60,
  },
  banner: {
    backgroundColor: 'black',
    borderRadius: 30,
    height: Dimensions.get('screen').height * 0.35,
    padding: 30,
    paddingVertical: 30,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
