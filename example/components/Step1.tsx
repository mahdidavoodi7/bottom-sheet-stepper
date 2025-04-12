import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const Step1: React.FC<Props> = ({ onNext, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Options</Text>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.8}
          style={styles.xButton}
        >
          <Feather size={16} name="x" />
        </TouchableOpacity>
      </View>
      <View style={styles.gap}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onNext}
          style={styles.button}
        >
          <Feather size={18} name="lock" />
          <Text style={styles.buttonText}>View Private Key</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, styles.dangerButton]}
        >
          <Feather size={18} name="alert-octagon" color={'#D6153B'} />
          <Text style={[styles.buttonText, styles.dangerButtonText]}>
            Remove Wallet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'SpaceMonoBold',
    fontWeight: 'bold',
    fontSize: 20,
  },
  xButton: {
    backgroundColor: '#ececec',
    width: 32,
    height: 32,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ececec',
    height: 48,
    borderRadius: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'SpaceMonoBold',
  },
  dangerButton: {
    backgroundColor: '#FECDD5',
  },
  dangerButtonText: {
    color: '#D6153B',
  },
  gap: { gap: 8 },
});

export default Step1;
