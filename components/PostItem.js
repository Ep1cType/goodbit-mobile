import {Button, StyleSheet, TextInput, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

import CustomButton from "./CustomButton";

export default function PostItem(
  {
    id,
    title,
    body,
    openPostDeleteModal,
    isEditMode,
    postBody,
    setPostBody,
    postTitle,
    setPostTitle,
    onEditMode,
    postID,
    onEditPost
  }) {

  const navigation = useNavigation();

  const onPressButton = () => {
    navigation.navigate("Posts", id);
  };

  const titleValue = isEditMode && id === postID ? postTitle : title;
  const bodyValue = isEditMode && id === postID ? postBody : body;
  const editableInput = isEditMode && id === postID;
  const inputStyle = isEditMode && id === postID ? styles.postBody__edit : styles.postBody

  return (
    <View style={styles.postItem}>
      <View style={styles.postItem__header}>
        <View style={styles.title}>
          <TextInput styles={inputStyle} editable={editableInput} multiline={true} value={titleValue} onChangeText={setPostTitle}/>
        </View>
        {
          isEditMode && id === postID
            ?
            <CustomButton id={id} color="#fff" onPress={onEditPost} text="save" style={styles.editButton} />
            :
            <CustomButton id={id} color="#fff" onPress={onEditMode} text="edit" style={styles.editButton} />
        }
        <CustomButton id={id} onPress={openPostDeleteModal} text="X" style={styles.deleteButton} />
      </View>
      <View style={{
        marginBottom: 5
      }}>
        <TextInput style={inputStyle} editable={editableInput} multiline={true} value={bodyValue} onChangeText={setPostBody}/>
      </View>
      <Button title="Подробнее о посте" onPress={onPressButton}/>
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
    width: '80%'
  },
  title__value: {
    fontSize: 20,
    color: "#9daec2",
  },
  postItem__text: {
    color: "#2a1f1f"
  },
  deleteButton: {
    backgroundColor: "#939bf4",
    borderRadius: 10,
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: '#09a2f6',
    padding: 3,
    marginRight: 10,
  },
  postBody: {
    color: "rgb(42,31,31)"
  },
  postBody__edit: {
    color: "rgba(42,31,31,0.44)"
  }
});
