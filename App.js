import {Alert, StyleSheet} from "react-native";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {NavigationContainer} from "@react-navigation/native";
import {MyStack} from "./router/MyStack";

export default function App() {

  const handleButtonPress = () => {
    Alert.alert("Создание нового поста", "Какое то сообщение", [
      {text: "Отменить"},
      {text: "Создать"}
    ])
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/*<SafeAreaView style={styles.container}>*/}
          <MyStack />

          {/*<MainScreen />*/}

          {/*<Text>Список постов:</Text>*/}
          {/*<Button title={'Создать новый пост'} onPress={handleCreateNewPost} />*/}
          {/*<StatusBar style="auto"/>*/}
        {/*</SafeAreaView>*/}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // paddingTop: 50,
    // backgroundColor: "#fff",
  },
});
