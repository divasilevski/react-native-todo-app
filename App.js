import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TodoState";
import { ScreenState } from "./src/context/screen/ScreenState";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/Fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/Fonts/Roboto-Bold.ttf"),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={console.warn}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}
