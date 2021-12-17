import {StyleSheet, Text, View, SafeAreaView, Button, Alert, TextInput} from "react-native";
import {useSelector} from "react-redux";

export default function PostItem({title, body}) {
  return (
    <View style={styles.postItem}>
      <Text style={styles.postItem__title}>{title}</Text>
      <Text>{body}</Text>
      <TextInput />
    </View>
  )
}

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: '#F3F4F9',
    padding: 20,
    marginTop: 10,
    borderRadius: 25,
    display: "flex",
  },
  postItem__title: {
    fontSize: 20,
    color: '#2a1f1f',
    // textAlign: 'center',
    marginBottom: 5,
  }
})
