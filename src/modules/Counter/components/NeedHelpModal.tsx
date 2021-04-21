import * as React from 'react';
import { Modal, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';

import ButtonGradient, { ButtonType } from '../../../common/buttons';
import { SessionContext } from '../../../contexts/session';

type NeedHelpModal = {
  setModalVisible: (flag: boolean) => void;
  navigate: (screen: string, params?: { [key: string]: string }) => void;
  disableRelapsed: boolean;
};

export default function NeedHelpModal({ setModalVisible, navigate, disableRelapsed }: NeedHelpModal): JSX.Element {
  const [, dispatch] = React.useContext(SessionContext);

  return (
    <Modal animationType="slide" transparent={true} visible={true} onRequestClose={() => setModalVisible(false)}>
      <View style={style.modalContainer}>
        <>
          <TouchableOpacity style={style.layoutClose} onPress={() => setModalVisible(false)} />
          <View style={style.modalContent}>
            <ButtonGradient
              disabled={disableRelapsed}
              buttonStyle={style.buttonStyle}
              text="I Have Relapsed"
              type={ButtonType.pink}
              onPress={() => {
                dispatch({ type: 'SET_HEADER_TEXT', headerText: 'I Have Relapsed' });

                navigate('Relapsed');
              }}
            />
            <ButtonGradient
              buttonStyle={style.buttonStyle}
              text="I am Feeling Anxious"
              type={ButtonType.primary}
              onPress={() => {
                dispatch({ type: 'SET_HEADER_TEXT', headerText: 'I am Feeling Anxious' });

                navigate('LearnCategory', { type: 'anxious' });
              }}
            />
            <ButtonGradient
              buttonStyle={style.buttonStyle}
              text="I am Feeling Depressed"
              type={ButtonType.primary}
              onPress={() => {
                dispatch({ type: 'SET_HEADER_TEXT', headerText: 'I am Feeling Depressed' });

                navigate('LearnCategory', { type: 'depressed' });
              }}
            />
            <ButtonGradient
              buttonStyle={style.buttonStyle}
              text="I am Craving"
              type={ButtonType.primary}
              onPress={() => {
                dispatch({ type: 'SET_HEADER_TEXT', headerText: 'I am Craving' });

                navigate('LearnCategory', { type: 'depressed' });
              }}
            />
          </View>
        </>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 61, 170, 0.35)',
    color: 'red',
    height: Dimensions.get('screen').height,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    alignItems: 'center',
    paddingVertical: 30,
  },
  buttonStyle: {
    marginBottom: 20,
  },
  layoutClose: {
    height: '100%',
  },
});
