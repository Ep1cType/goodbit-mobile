import {StyleSheet, Text, View, SafeAreaView, Button, Alert} from "react-native";
import {useSelector} from "react-redux";

export default function Header() {
  const {postList} = useSelector(state => state.post)
  return (
    <View style={styles.header}>
      <Text style={styles.header__text}>Список постов:</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    height: 100,
    backgroundColor: 'grey',
  },
  header__text: {
    fontSize: 18,
    color: '#2a1f1f',
    textAlign: 'center',
  }
})
