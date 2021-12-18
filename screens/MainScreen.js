import React, {useEffect, useState} from "react";
import {ActivityIndicator, Alert, Button, RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import PostItem from "../components/PostItem";
import {postActions} from "../store/post/postActions";
import PostServices from "../services/postServices";
import CreatePostModal from "../components/CreatePostModal";

export default function MainScreen() {
  const dispatch = useDispatch();

  const {postList} = useSelector(state => state.post);

  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postID, setPostID] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if(refreshing) {
      setIsLoading(true);
      PostServices.getPostList()
        .then((response) => {
          dispatch(postActions.setPostList(response.data));
          console.log(response.data)
          setIsError("");
        })
        .catch((err) => {
          setIsError("Ошибка загрузки постов");
        })
        .finally(() => {
          setRefreshing(false);
          setIsLoading(false);
        });
    }
  }, [refreshing]);

  const onPostDelete = (id) => {
    Alert.alert("Вы действительно хотите удалить пост ?", "", [
      {text: "Отмена"},
      {text: "Да", onPress: () => dispatch(postActions.deletePost(id))}
    ]);
  };

  const openPostModal = () => {
    setIsEditMode(false);
    setPostTitle("");
    setPostBody("");
    setPostID("");
    setModalVisible(true);
  };

  const onPostCreate = () => {
    if(postTitle.length > 3) {
      let post = {
        id: Math.random().toString(36).substr(2, 9),
        title: postTitle,
        body: postBody
      }
      PostServices.createPost(post)
        .then((response) => {
          console.log(response.data);
          dispatch(postActions.createPost(response.data));
          setPostTitle("");
          setPostBody("");
        })
        .catch((err) => {

        })
        .finally(() => {
          setModalVisible(false);
        })
    }
  }

  const onEditMode = (id) => {
    const selectedPost = postList.find((post) => post.id === id);
    setPostTitle(selectedPost.title);
    setPostBody(selectedPost.body);
    setPostID(selectedPost.id);
    setIsEditMode(true);
  };

  const onRefresh = () => {
    setRefreshing(true);
  }

  return (
    <View style={styles.mainScreen}>
      <Button title="Создать новый пост" onPress={openPostModal}/>
        <ScrollView
          style={{height: '100%'}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {isLoading
          ?
            <ActivityIndicator size="large" color="#0000ff"/>

            :
            <>
              {postList && postList.map((post) => (
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
              ))
              }
            </>
          }
        </ScrollView>
      <CreatePostModal
        onPostCreate={onPostCreate}
        modalVisible={modalVisible}
        postBody={postBody}
        postTitle={postTitle}
        setModalVisible={setModalVisible}
        setPostBody={setPostBody}
        setPostTitle={setPostTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: "#f4f6f8"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
