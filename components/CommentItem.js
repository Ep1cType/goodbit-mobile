import {StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from "./CustomButton";

export default function CommentItem(
  {
    id,
    commentId,
    comment,
    openCommentDeleteModal,
    isEditMode,
    commentValue,
    setCommentValue,
    onEditMode,
    onCommentEdit
  }) {

  const editableInput = isEditMode && id === commentId;

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentItem__header}>
        {
          isEditMode && id === commentId
            ?
            <CustomButton id={id} color="#fff" onPress={onCommentEdit} text="save" style={styles.editButton} />
            :
            <CustomButton id={id} color="#fff" onPress={onEditMode} text="edit" style={styles.editButton} />
        }
        <CustomButton id={id} onPress={openCommentDeleteModal} text="X" style={styles.deleteButton} />
      </View>
      <View style={styles.comment__container}>
        {
          isEditMode && id === commentId
            ?
            <TextInput style={styles.input} editable={editableInput} multiline={true} value={commentValue} onChangeText={setCommentValue}/>
            :
            <Text>{comment}</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 10,
    borderRadius: 25,
    display: "flex",
    flexDirection: "column"
  },
  commentItem__header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: 'center',
    marginBottom: 5,

  },
  title: {
    display: "flex",
    width: "90%"
  },
  title__value: {
    fontSize: 20,
    color: "#9daec2",
  },
  postItem__text: {
    color: "#2a1f1f"
  },
  editButton: {
    backgroundColor: '#09a2f6',
    padding: 3,
    marginRight: 10,
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
  input: {
    backgroundColor: '#e2e2e2'
  },
  comment__container: {
    marginBottom: 5
  }
});
