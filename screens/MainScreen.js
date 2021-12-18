import {StyleSheet, Text, View, SafeAreaView, Button, Alert, FlatList, ActivityIndicator, Modal, TextInput, Pressable, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import PostItem from "../components/PostItem";
import {useEffect, useState} from "react";
import MainScreenHeader from "../components/MainScreenHeader";
import {postActions} from "../store/posts/postActions";

export default function MainScreen() {
  const {postList} = useSelector(state => state.post);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postID, setPostID] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {

  }, [])

  const onPostDelete = (id) => {
    Alert.alert('Вы действительно хотите удалить пост ?', '', [
      {text: "Отмена"},
      {text: "Да", onPress: () => dispatch(postActions.deletePost(id))}
    ])
  }

  const onPostCreate = () => {
    setModalVisible(true)
  }

  const onEditMode = (id) => {
    const selectedPost = postList.find((post) => post.id === id);
    setPostTitle(selectedPost.title);
    setPostBody(selectedPost.body);
    setPostID(selectedPost.id);
    setIsEditMode(true);
  }


  // const renderItem = ({item}) => (
  //   <PostItem
  //     id={item.id}
  //     title={item.title}
  //     body={item.body}
  //     onPostDelete={onPostDelete}
  //     setPostTitle={setPostTitle}
  //     setPostBody={setPostBody}
  //     postTitle={postTitle}
  //     postBody={postBody}
  //     isEditMode={isEditMode}
  //     onEditMode={onEditMode}
  //     postID={postID}
  //   />
  // )

  return (
    <View style={styles.mainScreen}>
      {/*<MainScreenHeader />*/}
      <Button title="Создать новый пост" onPress={onPostCreate} />
      {isLoading
        ?
        <ActivityIndicator size="large" color="#0000ff" />
        :
        <ScrollView>
          {/*<FlatList data={postList} renderItem={renderItem} keyExtractor={item => item.id} />*/}
          {postList.map((post) => (
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              onPostDelete={onPostDelete}
              setPostTitle={setPostTitle}
              setPostBody={setPostBody}
              postTitle={postTitle}
              postBody={postBody}
              isEditMode={isEditMode}
              onEditMode={onEditMode}
              postID={postID}
            />
          ))}
        </ScrollView>
      }
      <Modal
        animationType="slide"

        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,

        }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
          <Text>Создание поста</Text>
          <View style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: 30,
          }}>
            <Text>Введите заголовок поста</Text>
            <TextInput
              value={postTitle}
              onChangeText={setPostTitle}
              style={{
              backgroundColor: '#9daec2',
              width: '80%',
              borderRadius: 5,
              padding: 5,
            }}
            />
          </View>
          <View style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <Text>Введите текст поста</Text>
            <TextInput
              multiline={true}
              value={postBody}
              onChangeText={setPostBody}
              style={{
              backgroundColor: '#9daec2',
              width: '80%',
              borderRadius: 5,
              padding: 5,
              display: 'flex',
              flexWrap: 'wrap',
            }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: '#f4f6f8'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
})
