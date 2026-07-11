/**
 * Bottom Sheet Stepper · a free drop from Motionary
 * Famous app interactions in React Native + Expo · https://motionary.dev
 * MIT · feel free to steal
 */
import React from 'react';
import { type ViewStyle, type StyleProp } from 'react-native';
export type StepComponentProps<TShared = undefined> = {
    onNextPress: () => void;
    onBackPress: () => void;
    onEnd?: () => void;
    /**
     * Data shared across every step, passed straight through from the
     * `shared` prop. Typed via the `TShared` generic, which is inferred from
     * that prop, so steps read it without casting or per-step prop wiring.
     */
    shared: TShared;
};
export type BottomSheetStepperRef = {
    present: () => void;
    dismiss: () => void;
};
export type BottomSheetStepperProps<TShared = undefined> = {
    steps: ((props: StepComponentProps<TShared>) => React.ReactNode)[];
    /**
     * Data handed to every step render function via `shared`. Its type drives
     * the `TShared` generic, preserving inference across the whole flow.
     */
    shared?: TShared;
    /**
     * Zero-based index the flow opens on and returns to after it closes.
     * Kept separate from `shared` so navigation state and step data stay
     * independent for controlled / resumable flows. Defaults to `0`.
     */
    initialStep?: number;
    style?: StyleProp<ViewStyle>;
    bottomInset?: number;
    horizontalInset?: number;
    disablePanDownToClose?: boolean;
    disableBackDropPressToClose?: boolean;
};
/**
 * `forwardRef` erases the `TShared` generic, so we wrap the inner component
 * and cast back to a generic call signature. This keeps `shared` inference
 * flowing from the `shared` prop into every step render function.
 */
type BottomSheetStepperComponent = <TShared = undefined>(props: BottomSheetStepperProps<TShared> & {
    ref?: React.ForwardedRef<BottomSheetStepperRef>;
}) => React.ReactElement;
declare const _default: BottomSheetStepperComponent;
export default _default;
