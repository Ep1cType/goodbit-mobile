import {StyleSheet} from "react-native";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";

import {MyStack} from "./router/MyStack";

import {store} from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <MyStack />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});
