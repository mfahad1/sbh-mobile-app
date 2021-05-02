import * as React from 'react';
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { GreenLinearGradient } from '../../common/linerGradients';
import CurvedLayout from '../../common/curvedLayout';
import { colors } from '../../styles/colors';
import SadSVG from '../../assets/icons/sad.svg';
import MehSVG from '../../assets/icons/meh.svg';
import HappySVG from '../../assets/icons/happy.svg';
import SadActiveSVG from '../../assets/icons/sadActive.svg';
import MehActiveSVG from '../../assets/icons/mehActive.svg';
import HappyActiveSVG from '../../assets/icons/happyActive.svg';
import AppText from '../../common/Text/Text';
import ButtonGradient, { ButtonType } from '../../common/buttons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../common/formik/input';
import Toast from 'react-native-simple-toast';
import { sobrietyCheck } from '../../services/sobriety';

function showGradientOrNormal(value: number, selected = false, setValueActive: (val: number) => void): JSX.Element {
  if (selected) {
    return (
      <TouchableOpacity onPress={() => setValueActive(value)}>
        <GreenLinearGradient gradientStyle={{ ...style.cardIconTextView, ...style.cardIconActiveView }}>
          <AppText color="white" type="medium" fontSize={17}>
            {value}
          </AppText>
        </GreenLinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => setValueActive(value)} style={style.cardIconTextView}>
      <AppText type="medium" textAlign="center" fontSize={17} color="#69768d">
        {value}
      </AppText>
    </TouchableOpacity>
  );
}

function showGradientOrNormalIcon(NormalSvg: React.ElementType, ActiveSvg: React.ElementType, selected = false, value: string, setElementActive: (val: string) => void): JSX.Element {
  if (selected) {
    return (
      <TouchableOpacity onPress={() => setElementActive(value)}>
        <GreenLinearGradient gradientStyle={style.cardImageIcon}>
          <ActiveSvg />
        </GreenLinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => setElementActive(value)}>
      <View style={style.cardImageIcon}>
        <NormalSvg />
      </View>
    </TouchableOpacity>
  );
}

export default function SoberScreen({ navigation }: any): JSX.Element {
  const [feeling, setFeeling] = React.useState('Happy');
  const [anxious, setAnxious] = React.useState(1);
  const [depressed, setDepressed] = React.useState(1);
  const [craving, setCraving] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const initialValues = {
    note: '',
  };
  const validationSchema = Yup.object().shape({
    note: Yup.string().required('Required').label('Note'),
  });

  const onSubmit = async (payload: { note: string }) => {
    try {
      setLoading(true);
      await sobrietyCheck({
        ...payload,
        feeling,
        anxious,
        depressed,
        craving,
      });
      Toast.showWithGravity('Success', Toast.SHORT, Toast.BOTTOM);
      navigation.navigate('History');
    } catch (e) {
      Toast.showWithGravity(e.message || 'Error', Toast.SHORT, Toast.BOTTOM);
      navigation.navigate('Counter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CurvedLayout>
      <View style={style.container}>
        <ScrollView contentContainerStyle={style.center}>
          <View style={style.intro}>
            <AppText type="medium" fontSize={22} color="white">
              Nice Effort!
            </AppText>
            <AppText type="medium" textAlign="center" color="white">
              You completed another day on your journey of recovery
            </AppText>
          </View>
          <View style={style.rowCard}>
            <AppText type="medium" fontSize={12}>
              How are you feeling?
            </AppText>
            <View style={{ ...style.cardIconView, ...style.cardIconViewSpaceAround }}>
              {showGradientOrNormalIcon(
                () => (
                  <HappySVG style={style.icon} />
                ),
                () => (
                  <HappyActiveSVG style={style.icon} />
                ),
                feeling === 'Happy',
                'Happy',
                setFeeling,
              )}
              {showGradientOrNormalIcon(
                () => (
                  <MehSVG style={style.icon} />
                ),
                () => (
                  <MehActiveSVG style={style.icon} />
                ),
                feeling === 'Neutral',
                'Neutral',
                setFeeling,
              )}
              {showGradientOrNormalIcon(
                () => (
                  <SadSVG style={style.icon} />
                ),
                () => (
                  <SadActiveSVG style={style.icon} />
                ),
                feeling === 'Sad',
                'Sad',
                setFeeling,
              )}
            </View>
          </View>
          <View style={style.rowCard}>
            <AppText type="medium" fontSize={12}>
              Are you feeling anxious today?
            </AppText>
            <View style={style.cardIconView}>
              {showGradientOrNormal(1, anxious === 1, setAnxious)}
              {showGradientOrNormal(2, anxious === 2, setAnxious)}
              {showGradientOrNormal(3, anxious === 3, setAnxious)}
              {showGradientOrNormal(4, anxious === 4, setAnxious)}
              {showGradientOrNormal(5, anxious === 5, setAnxious)}
            </View>
          </View>
          <View style={style.rowCard}>
            <AppText type="medium" fontSize={12}>
              Are you feeling depressed today?
            </AppText>
            <View style={style.cardIconView}>
              {showGradientOrNormal(1, depressed === 1, setDepressed)}
              {showGradientOrNormal(2, depressed === 2, setDepressed)}
              {showGradientOrNormal(3, depressed === 3, setDepressed)}
              {showGradientOrNormal(4, depressed === 4, setDepressed)}
              {showGradientOrNormal(5, depressed === 5, setDepressed)}
            </View>
          </View>
          <View style={style.rowCard}>
            <AppText type="medium" fontSize={12}>
              Are you feeling cravings today?
            </AppText>
            <View style={style.cardIconView}>
              {showGradientOrNormal(1, craving === 1, setCraving)}
              {showGradientOrNormal(2, craving === 2, setCraving)}
              {showGradientOrNormal(3, craving === 3, setCraving)}
              {showGradientOrNormal(4, craving === 4, setCraving)}
              {showGradientOrNormal(5, craving === 5, setCraving)}
            </View>
          </View>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => { }}>
            {({ values, isValid, dirty }) => (
              <>
                <View style={style.rowCard}>
                  <AppText type="medium" fontSize={12}>
                    Add a Note
                  </AppText>
                  <View style={style.cardIconView}>
                    <InputField name="note" inputProps={{ placeholder: 'Write here...' }} />
                  </View>
                </View>
                <View style={style.btnGroup}>
                  <View style={style.btn}>
                    <ButtonGradient type={ButtonType.danger} text="Cancel" onPress={() => navigation.navigate('Counter')} />
                  </View>
                  <View style={style.btn}>
                    <ButtonGradient loading={loading} text="Submit" onPress={() => onSubmit(values)} disabled={!isValid || !dirty} />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </CurvedLayout>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    marginTop: 100,
  },
  center: {},

  rowCard: {
    backgroundColor: colors.white,
    borderRadius: 30,
    width: Dimensions.get('screen').width * 0.85,
    padding: 30,
    marginVertical: 20,
    alignSelf: 'center',
    elevation: 10,
  },
  intro: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  cardIconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardIconViewSpaceAround: {
    justifyContent: 'flex-start',
  },
  cardIconTextView: {
    color: 'black',
    backgroundColor: colors.inputColor,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 15,
    fontSize: 20,
    justifyContent: 'center',
  },
  cardIconActiveView: {
    color: colors.white,
  },
  cardImageIcon: {
    backgroundColor: colors.inputColor,
    padding: 20,
    borderRadius: 15,
    marginRight: 20,
  },
  btnGroup: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  btn: {
    width: '50%',
    alignSelf: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
});
