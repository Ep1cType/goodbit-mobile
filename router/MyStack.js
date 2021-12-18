import {createStackNavigator} from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import PostScreen from "../screens/PostScreen";

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator initialRouteName={'Main'}>
      <Stack.Screen name={"Main"} component={MainScreen} options={{title: "Список постов"}} />
      <Stack.Screen name={"Posts"} component={PostScreen} options={{title: "Пост"}} />
    </Stack.Navigator>
  )
}
