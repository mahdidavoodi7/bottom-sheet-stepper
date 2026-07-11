# Bottom Sheet Stepper

The self-resizing, multi-step bottom sheet you see across modern fintech and crypto apps, rebuilt in React Native + Expo.

A free drop from **Motionary**. The whole flock lives at **https://motionary.dev**.

<p align="center">
  <img src="https://github.com/mahdidavoodi7/bottom-sheet-stepper/blob/main/preview.gif?raw=true" alt="Preview" />
</p>

## How it works

The whole trick is measuring each step and animating to it. Every step reports its height through `onLayout`, and Reanimated drives the sheet to that exact height (a spring on iOS, a timing curve on Android) so the card grows and shrinks to fit whatever is inside. Step content cross-fades with `FadeIn` and `FadeOut`, while `@gorhom/bottom-sheet` and `react-native-gesture-handler` handle the sheet, the backdrop, and pan-to-close. No Skia, no layout jank, just a floating card that resizes like it knows where it's going.

## Use it

Grab [`BottomSheetStepper.tsx`](src/BottomSheetStepper.tsx) and drop it into your project, then install the peer deps it leans on:

```bash
npm install react-native-reanimated react-native-gesture-handler @gorhom/bottom-sheet
```

Wrap your app once so the sheet has somewhere to live:

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

<GestureHandlerRootView style={{ flex: 1 }}>
  <BottomSheetModalProvider>
    <App />
  </BottomSheetModalProvider>
</GestureHandlerRootView>;
```

Hand it your steps and call `present()`:

```tsx
import { useRef } from "react";
import { View, Text, Button } from "react-native";
import BottomSheetStepper, {
  BottomSheetStepperRef,
  StepComponentProps,
} from "bottom-sheet-stepper";

const Step1 = ({ onNextPress }: StepComponentProps) => (
  <View>
    <Text>Step 1</Text>
    <Button title="Next" onPress={onNextPress} />
  </View>
);

const Step2 = ({ onBackPress, onEnd }: StepComponentProps) => (
  <View>
    <Text>Step 2</Text>
    <Button title="Back" onPress={onBackPress} />
    <Button title="Finish" onPress={onEnd} />
  </View>
);

const App = () => {
  const stepperRef = useRef<BottomSheetStepperRef>(null);

  return (
    <>
      <Button title="Open" onPress={() => stepperRef.current?.present()} />
      <BottomSheetStepper ref={stepperRef} steps={[Step1, Step2]} />
    </>
  );
};
```

Each step gets `onNextPress`, `onBackPress`, an optional `onEnd`, and whatever you hand it through `shared`. The sheet itself takes a few props if you want to tune it:

| Prop | Type | What it does |
| --- | --- | --- |
| `steps` | `((props: StepComponentProps<TShared>) => React.ReactNode)[]` | Your steps, in order |
| `shared` | `TShared` | Data passed to every step, typed and inferred from what you hand it |
| `initialStep` | `number` | Step index the flow opens on and resets to (default 0) |
| `style` | `StyleProp<ViewStyle>` | Style for the step container |
| `bottomInset` | `number` | Padding at the bottom (default 20) |
| `horizontalInset` | `number` | Side margin so the card floats (default 24) |
| `disablePanDownToClose` | `boolean` | Turn off swipe-to-close |
| `disableBackDropPressToClose` | `boolean` | Keep taps on the backdrop from closing it |

## Share data across steps

Steps are render functions, so pass a `shared` object and each one receives it, fully typed. No per-step prop wiring, no cloning elements internally, inference intact:

```tsx
// `user` is your own data — its type flows into every step, no annotation needed
<BottomSheetStepper
  ref={stepperRef}
  shared={{ user }}
  initialStep={0}
  steps={[
    ({ shared, onNextPress }) => (
      <AccountStep user={shared.user} onNext={onNextPress} />
    ),
    ({ shared, onEnd }) => (
      <ConfirmStep user={shared.user} onDone={onEnd} />
    ),
  ]}
/>;
```

`shared`'s type is inferred from what you pass, so `shared.user` is typed inside every step, no casts. Navigation state stays separate from it: `initialStep` just says where the flow opens and where it lands after closing, which keeps controlled and resumable flows easy to reason about.

You drive it through the ref with `present()` and `dismiss()`. Prefer a package over a copy? `npm install bottom-sheet-stepper` works too. That's it, it's built to be stolen from.

## Want the rest?

This one is free. If you want more, [motionary.dev](https://motionary.dev?utm_source=github&utm_medium=readme&utm_campaign=free_drop) has the full flock: single drops go for around $10, or grab the Lifetime All-Access pass and get every drop plus every future drop for one payment. In there you'll find things like the ChatGPT attachments menu, Apple Music lyrics, and the Flip Calendar.

## Want a drop that doesn't exist yet?

Open an issue and tell me which interaction you wish you had. The most-requested ones get built.

## License

MIT. Use it in anything, ship it, sell your app, no strings. If it saves you a day, a star helps other devs find this. 🐦‍⬛

Built by [@mehdi_made](https://x.com/mehdi_made)
