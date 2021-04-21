import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import ProfileSVG from '../../assets/icons/person-fill.svg';
import LogoSVG from '../../assets/icons/logo.svg';
import ButtonGradient from '../../common/buttons';
import CircleLayout from '../../common/circleLayout';
import AppText from '../../common/Text/Text';
import { loginService } from '../../services/login';
import { Formik } from 'formik';
import { InputField } from '../../common/formik/input';
import * as Yup from 'yup';
import { isObjectEmpty } from '../../common/utlis';
import { loginAction } from './redux/auth';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import Toast from 'react-native-simple-toast';

type LoginType = {
  email: string;
  password: string;
};

export default function LoginScreen({ navigation }: any): JSX.Element {
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    const {
      login: { success, first_login },
      error,
    } = auth;
    if (success) {
      if (first_login) {
        navigation.navigate('GetStarted');

        return;
      }
      Toast.showWithGravity('Success', Toast.LONG, Toast.BOTTOM);

      navigation.navigate('DrawerNavigation', { screen: 'Counter' });
    }

    if (error) {
      Toast.showWithGravity(error.message || 'Error', Toast.SHORT, Toast.BOTTOM);
    }
  }, [auth, navigation]);

  const onSubmit = async (payload: LoginType) => {
    dispatch(loginAction(payload));
  };

  const initialValues = {
    email: 'naveenc@sunshinebh.com',
    password: 'naveen123',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Required').label('Email'),
    password: Yup.string().required('Required').label('Password'),
  });

  return (
    <CircleLayout>
      <>
        <View style={style.alignCenter}>
          <LogoSVG />
          <AppText type="bold" fontSize={35}>
            SBH
          </AppText>
          <AppText type="medium" color="#454f84">
            Alumni App
          </AppText>
        </View>
        <View style={style.elevation}>
          <View style={style.cardContent}>
            <AppText type="bold" fontSize={20}>
              Log In
            </AppText>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => { }}>
              {({ values, errors }) => (
                <>
                  <InputField name="email" svg={() => <ProfileSVG />} inputProps={{ placeholder: 'Enter Email...' }} />
                  <InputField name="password" svg={() => <ProfileSVG />} inputProps={{ placeholder: 'Enter Password...' }} />
                  <ButtonGradient loading={auth.loading} text="Sign In" onPress={() => onSubmit(values)} disabled={!isObjectEmpty(errors)} />
                </>
              )}
            </Formik>
          </View>
        </View>
      </>
    </CircleLayout>
  );
}

const style = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 0.9,
    paddingVertical: 20,
  },

  elevation: {
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 30,
  },
});
