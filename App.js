import {Alert, SafeAreaView, StyleSheet} from "react-native";
import Header from "./components/Header";
import {Provider} from "react-redux";
import {store} from "./store/store";
import MainPage from "./pages/MainPage";

export default function App() {

  const handleButtonPress = () => {
    Alert.alert("Создание нового поста", "Какое то сообщение", [
      {text: "Отменить"},
      {text: "Создать"}
    ])
  }


  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Header />
        <MainPage />

        {/*<Text>Список постов:</Text>*/}
        {/*<Button title={'Создать новый пост'} onPress={handleCreateNewPost} />*/}
        {/*<StatusBar style="auto"/>*/}
      </SafeAreaView>
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
