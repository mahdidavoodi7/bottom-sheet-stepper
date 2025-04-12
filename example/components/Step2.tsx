import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type Props = {
  onBack: () => void;
  onNext: () => void;
  onEnd?: () => void;
};

const Step2: React.FC<Props> = ({ onBack, onNext }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <View style={styles.gap}>
            <Feather name="credit-card" size={40} color={'#B9B9B9'} />
            <Text style={styles.title}>Private Key</Text>
          </View>
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.8}
            style={styles.xButton}
          >
            <Feather size={16} name="x" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          Your Private key is the key used to back up your wallet. Keep it
          secret and secure all the times.
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.rowCenter}>
          <Feather name="lock" color={'#4c4c4c'} size={16} />
          <Text style={styles.tip}>Keep private key safe</Text>
        </View>
        <View style={styles.rowCenter}>
          <Feather name="upload-cloud" color={'#4c4c4c'} size={16} />
          <Text style={styles.tip}>Don't share with anyone else</Text>
        </View>
        <View style={styles.rowCenter}>
          <Feather name="alert-triangle" color={'#4c4c4c'} size={16} />
          <Text style={styles.tip}>If you lose it we can't recover</Text>
        </View>
      </View>
      <View style={styles.rowButtons}>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.8}
          style={styles.button2}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNext}
          activeOpacity={0.8}
          style={[styles.button2, styles.revealButton]}
        >
          <Feather color={'white'} name="eye-off" size={16} />
          <Text style={styles.revealText}>Reveal</Text>
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
  rowContainer: { gap: 12, marginTop: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 20,
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
  subtitle: {
    fontSize: 14,
    fontFamily: 'SpaceMono',
    color: '#4c4c4c',
    marginTop: 12,
  },
  tip: {
    flex: 1,
    paddingLeft: 8,
    fontFamily: 'SpaceMono',
    color: '#4c4c4c',
  },
  button2: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#ececec',
    flexDirection: 'row',
    gap: 12,
  },
  cancelText: {
    fontFamily: 'SpaceMonoBold',
    fontSize: 14,
  },
  revealButton: {
    backgroundColor: '#02B3FF',
  },
  revealText: {
    fontFamily: 'SpaceMonoBold',
    fontSize: 14,
    color: 'white',
  },
  gap: { gap: 8 },
});

export default Step2;
