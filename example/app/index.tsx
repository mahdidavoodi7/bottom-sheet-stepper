import { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Step1 from '@/components/Step1';
import Step2 from '@/components/Step2';

import BottomSheetStepper, {
  type BottomSheetStepperRef,
  type StepComponentProps,
} from 'bottom-sheet-stepper';

const Step1Wrapper = (props: StepComponentProps) => (
  <Step1 onNext={props.onNextPress} onBack={props.onBackPress} />
);
const Step2Wrapper = (props: StepComponentProps) => (
  <Step2
    onNext={props.onNextPress}
    onBack={props.onBackPress}
    onEnd={props.onEnd}
  />
);


export default function HomeScreen() {
  const stepperRef = useRef<BottomSheetStepperRef>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => stepperRef.current?.present()}
        style={styles.openButton}
      >
        <Text style={styles.openText}>open</Text>
      </TouchableOpacity>
      <BottomSheetStepper
        ref={stepperRef}
        steps={[Step1Wrapper, Step2Wrapper]}
        disableBackDropPressToClose
        disablePanDownToClose
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  openButton: {
    height: 48,
    width: 200,
    borderRadius: 12,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openText: {
    fontSize: 20,
    color: 'white',
  },
});
