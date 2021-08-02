import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from '../common/bottomBar';

import CounterScreen from '../modules/Counter/Counter.screen';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { SessionContext } from '../contexts/session';
import CoachScreen from '../modules/Coach/Coach.screen';
import SoberScreen from '../modules/Counter/SoberForm';
import LearnDetail from '../modules/Coach/components/Learn.detail';
import ChallengeDetail from '../modules/Coach/components/ChallengeDetail.detail';
import QuoteScreen from '../modules/Quote/Quote.screen';
import QuoteDetail from '../modules/Quote/components/Quote.detail';
import HistoryScreen from '../modules/History/History.screen';
import Relapsed from '../modules/Counter/components/Relapsed';
import LearnCategory from '../modules/Counter/components/LearnCategory';
import RecoveryTimelineScreen from '../modules/RecoveryTimeline/RecoveryTimeline.screen';
import AnxietyHistory from '../modules/History/AnxietyHistory.screen';
import AnxietyDetail from '../modules/History/components/AnxietyDetails';

const Tab = createBottomTabNavigator();

const IntakeComponent = () => <RecoveryTimelineScreen intake={true} />;

export default function BottomTabNavigator(): JSX.Element {
  const isDrawerOpen = useIsDrawerOpen();
  const [, dispatch] = React.useContext(SessionContext);

  React.useEffect(() => {
    dispatch({ type: 'TOGGLE_DRAWER', isDrawerOpen });
  }, [isDrawerOpen]);

  return (
    <Tab.Navigator initialRouteName="Home" tabBar={(_props): JSX.Element => <BottomBar {..._props} />}>
      <Tab.Screen name="Home" component={CounterScreen} />
      <Tab.Screen name="Coach" component={CoachScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Motivation" component={QuoteScreen} />
      <Tab.Screen name="Feedback" component={SoberScreen} />
      <Tab.Screen name="LearnDetail" component={LearnDetail} />
      <Tab.Screen name="ChallengeDetail" component={ChallengeDetail} />
      <Tab.Screen name="QuoteDetail" component={QuoteDetail} />
      <Tab.Screen name="Relapsed" component={Relapsed} />
      <Tab.Screen name="LearnCategory" component={LearnCategory} />
      <Tab.Screen name="Intake" component={IntakeComponent} />
      <Tab.Screen name="AnxietyHistory" component={AnxietyHistory} />
      <Tab.Screen name="AnxietyDetail" component={AnxietyDetail} />
    </Tab.Navigator>
  );
}
