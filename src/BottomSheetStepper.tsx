import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Platform,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  ANIMATION_DURATION,
  ANIMATION_EASING,
  ANIMATION_CONFIGS,
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

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
  disablePanDownToClose?: boolean;
  disableBackDropPressToClose?: boolean;
};

const BottomSheetStepper = forwardRef<
  BottomSheetStepperRef,
  BottomSheetStepperProps
>(({ steps, style, bottomInset = 20, horizontalInset = 24, disablePanDownToClose, disableBackDropPressToClose }, ref) => {
  const [step, setStep] = useState(0);
  const height = useSharedValue(0);
  const transform = useSharedValue(0);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetRef.current?.present(),
    dismiss: () => bottomSheetRef.current?.dismiss(),
  }));

  const handleClose = useCallback(() => {
    transform.value = height.value;
    bottomSheetRef.current?.dismiss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transform]);

  const afterClosed = useCallback(() => {
    setTimeout(() => {
      height.value = 0;
      transform.value = 0;
      setStep(0);
    }, 200);
  }, [height, transform]);

  const handlePressNext = useCallback(() => {
    if (step + 1 >= steps.length) {
      handleClose();
    }
    setStep((prev) => prev + 1);
  }, [handleClose, step, steps.length]);

  const handlePressBack = useCallback(() => {
    if (step - 1 < 0) {
      handleClose();
    } else {
      setStep((prev) => prev - 1);
    }
  }, [handleClose, step]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height:
        Platform.OS === 'ios'
          ? withSpring(height.value, ANIMATION_CONFIGS)
          : withTiming(height.value, {
            duration: ANIMATION_DURATION,
            easing: ANIMATION_EASING,
          }),
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            Platform.OS === 'ios'
              ? withSpring(transform.value, ANIMATION_CONFIGS)
              : withTiming(transform.value, {
                duration: ANIMATION_DURATION,
                easing: ANIMATION_EASING,
              }),
        },
      ],
    };
  });

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={disableBackDropPressToClose ? undefined : handleClose}
      />
    ),
    [handleClose]
  );

  const renderContent = useCallback(() => {
    const StepComponent = steps[step];
    if (!StepComponent) return null;

    return (
      <Animated.View
        style={styles.animatedView}
        key={`step_${step}`}
        entering={FadeIn}
        exiting={FadeOut}
        onLayout={(e: { nativeEvent: { layout: { height: any } } }) => {
          const measuredHeight = e.nativeEvent.layout.height;
          height.value = measuredHeight;
        }}
      >
        {StepComponent({
          onNextPress: handlePressNext,
          onBackPress: handlePressBack,
          onEnd: handleClose,
        })}
      </Animated.View>
    );
  }, [handleClose, handlePressBack, handlePressNext, height, step, steps]);

  return (
    <BottomSheetModal
      detached
      ref={bottomSheetRef}
      enableDynamicSizing={true}
      maxDynamicContentSize={100}
      android_keyboardInputMode="adjustResize"
      style={{ marginHorizontal: horizontalInset }}
      handleStyle={styles.bottomSheetHandle}
      containerStyle={styles.bottomSheetContainer}
      backgroundStyle={styles.bottomSheetBackground}
      backdropComponent={renderBackdrop}
      onChange={(index: number) => (index === -1 ? afterClosed() : undefined)}
      enablePanDownToClose={disablePanDownToClose ? false : undefined}
    >
      <BottomSheetView
        style={[styles.bottomSheetView, { paddingBottom: bottomInset }]}
      >
        <Animated.View
          style={[styles.contentContainer, style, containerAnimatedStyle]}
        >
          <Animated.View style={[styles.animatedBox, animatedStyle]}>
            {renderContent()}
          </Animated.View>
        </Animated.View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
  },
  animatedBox: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedView: {
    flex: 1,
    position: 'absolute',
    width: '100%',
  },
  bottomSheetContainer: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
  },
  bottomSheetBackground: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
  },
  bottomSheetHandle: {
    display: 'none',
  },
  bottomSheetView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
});

BottomSheetStepper.displayName = 'BottomSheetStepper';

export default BottomSheetStepper;
