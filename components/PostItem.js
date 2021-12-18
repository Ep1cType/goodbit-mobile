import {StyleSheet, Text, View, SafeAreaView, Button, Alert, TextInput, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import {useLinkTo, Link, useNavigation} from "@react-navigation/native";

export default function PostItem({
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

  const linkTo = useLinkTo();
  const navigation = useNavigation();

  const onPressButton = () => {
    navigation.navigate("Posts", id);
  };

  return (
    // <Link to={{ screen: 'Posts', params: { id: id } }}>
    <View style={styles.postItem}>
      <View style={styles.postItem__header}>
        <Button title="edit" onPress={() => onEditMode(id)}/>

        {
          isEditMode && id === postID
            ?
            <TextInput multiline={true} value={postTitle} onChangeText={setPostTitle}/>
            :
            <Text style={styles.postItem__title}>{title}</Text>
        }
        <TouchableOpacity onPress={() => onPostDelete(id)}>
          <View style={{
            backgroundColor: "#939bf4",
            // borderRadius: '50%',
            borderRadius: 10,
            width: 25,
            height: 25,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Text>X</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{
        marginBottom: 5
      }}>
        {
          isEditMode && id === postID
            ?
            <TextInput multiline={true} value={postBody} onChangeText={setPostBody}/>
            :
            <Text caretHidden={true} style={styles.postItem__text}>{body}</Text>
        }
      </View>
      <Button title="Comments" onPress={onPressButton}/>
      {/*<TextInput />*/}
    </View>
    // </Link>
  );
}

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 10,
    borderRadius: 25,
    display: "flex",
  },
  postItem__header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,

  },
  postItem__title: {
    fontSize: 20,
    color: "#2a1f1f",
    // textAlign: 'center',

  },
  postItem__text: {
    color: "#9daec2"
  }
});
