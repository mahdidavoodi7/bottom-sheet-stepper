<h1 align="center">
	bottom-sheet-stepper
</h1>

A lightweight and customizable step-based component for React Native, built on top of [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet). Perfect for building multi-step flows like wizards, onboarding screens, or custom forms — all in a sleek bottom sheet.

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="expo-image-compare is released under the MIT license." />
  <a href="https://www.npmjs.org/package/bottom-sheet-stepper">
    <img src="https://img.shields.io/npm/v/bottom-sheet-stepper" alt="Current npm package version." />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=mehdi_made">
    <img src="https://img.shields.io/twitter/follow/mehdi_made.svg?label=Follow%20@mehdi_made" alt="Follow @mehdi_made" />
  </a>
</p>

<p align="center">
  <img src="https://github.com/mahdidavoodi7/bottom-sheet-stepper/blob/main/preview.gif?raw=true" alt="Preview" />
</p>

## ✨ Features

- 🎯 Multi-step navigation with `onNextPress`, `onBackPress`, and optional `onEnd`
- 📱 Smooth animations with `react-native-reanimated`
- 🧩 Fully customizable styles and layout
- 🧠 Built-in height animation & cleanup handling
- 🔁 Programmatic control with `present()` and `dismiss()`



## 🚀 Installation

```bash
npm install bottom-sheet-stepper
# or
yarn add bottom-sheet-stepper
```

### Peer Dependencies

Make sure you have the following installed in your project:

```bash
npm install react-native-reanimated react-native-gesture-handler @gorhom/bottom-sheet
```

Then wrap your app with the necessary providers:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

<GestureHandlerRootView style={{ flex: 1 }}>
  <BottomSheetModalProvider>
    <App />
  </BottomSheetModalProvider>
</GestureHandlerRootView>
```


## 🧱 Usage

```tsx
import React, { useRef } from 'react';
import BottomSheetStepper, { BottomSheetStepperRef, StepComponentProps } from 'bottom-sheet-stepper';

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
      <Button title="Open Stepper" onPress={() => stepperRef.current?.present()} />

      <BottomSheetStepper
        ref={stepperRef}
        steps={[Step1, Step2]}
      />
    </>
  );
};
```





## 📘 API Reference

### Props

| Name              | Type                                                 | Description                                  |
|-------------------|------------------------------------------------------|----------------------------------------------|
| `steps`           | `((props: StepComponentProps) => React.ReactNode)[]` | Array of step render functions               |
| `style`           | `StyleProp<ViewStyle>`                               | Optional style applied to step container     |
| `bottomInset`     | `number`                                             | Padding at bottom of the sheet (default: 20) |
| `horizontalInset` | `number`                                             | Horizontal margin of the sheet (default: 24) |

### Step Props (`StepComponentProps`)

Passed to each step component:

```ts
type StepComponentProps = {
  onNextPress: () => void;
  onBackPress: () => void;
  onEnd?: () => void;
};
```



## 🔧 Imperative API

You can control the sheet externally via `ref`:

```ts
const ref = useRef<BottomSheetStepperRef>(null);

ref.current?.present();
ref.current?.dismiss();
```


## 🧪 Example Use Cases

- Onboarding flows
- Step-by-step data collection
- Multi-step modals
- Form wizards




## 🛠 Built With

- [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)




## 📄 License

Made with ❤️ by @mahdidavoodi7
