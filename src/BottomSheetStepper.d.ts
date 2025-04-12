import React from 'react';
import { type ViewStyle, type StyleProp } from 'react-native';
export type StepComponentProps = {
    onNextPress: () => void;
    onBackPress: () => void;
    onEnd?: () => void;
};
export type BottomSheetStepperRef = {
    present: () => void;
    dismiss: () => void;
};
export type BottomSheetStepperProps = {
    steps: ((props: StepComponentProps) => React.ReactNode)[];
    style?: StyleProp<ViewStyle>;
    bottomInset?: number;
    horizontalInset?: number;
};
declare const BottomSheetStepper: React.ForwardRefExoticComponent<BottomSheetStepperProps & React.RefAttributes<BottomSheetStepperRef>>;
export default BottomSheetStepper;
