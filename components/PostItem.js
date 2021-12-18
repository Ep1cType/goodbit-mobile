import {StyleSheet, Text, View, SafeAreaView, Button, Alert, TextInput, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import {useLinkTo, Link, useNavigation} from "@react-navigation/native";

export default function PostItem(
  {
    id,
    title,
    body,
    onPostDelete,
    isEditMode,
    postBody,
    setPostBody,
    postTitle,
    setPostTitle,
    onEditMode,
    postID
  }) {

  const navigation = useNavigation();

  const onPressButton = () => {
    navigation.navigate("Posts", id);
  };

  const titleValue = isEditMode && id === postID ? postTitle : title;
  const bodyValue = isEditMode && id === postID ? postBody : body;
  const editableInput = isEditMode && id === postID;
  const button = isEditMode && id === postID;

  return (
    <View style={styles.postItem}>
      <View style={styles.postItem__header}>
        {/*//TODO: КНОПКИ УДАЛЕНИЯ И РЕДАКТИРОВАНИЯ*/}
        {/*{*/}
        {/*  isEditMode && id === postID*/}
        {/*    ?*/}
        {/*    <Button title="save" onPress={() => onEditMode(id)}/>*/}
        {/*    :*/}
        {/*    <Button title="edit" onPress={() => onEditMode(id)}/>*/}
        {/*}*/}
        <View style={styles.title}>
          <TextInput styles={styles.title__value} editable={editableInput} multiline={true} value={titleValue} onChangeText={setPostTitle}/>
        </View>
        <TouchableOpacity onPress={() => onPostDelete(id)}>
          <View style={{
            backgroundColor: "#939bf4",
            // borderRadius: '50%',
            borderRadius: 10,
            width: 20,
            height: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Text>X</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{
        marginBottom: 5
      }}>
        <TextInput editable={editableInput} multiline={true} value={bodyValue} onChangeText={setPostBody}/>
      </View>
      <Button title="Comments" onPress={onPressButton}/>
    </View>
  );
}

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 10,
    borderRadius: 25,
    display: "flex",
    flexDirection: "column"
  },
  postItem__header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,

  },
  title: {
    display: 'flex',
    width: '90%'
  },
  title__value: {
    fontSize: 20,
    color: "#9daec2",

    // textAlign: 'center',

  },
  postItem__text: {
    color: "#2a1f1f"
  }
});
