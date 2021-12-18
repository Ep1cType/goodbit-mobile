import React, {useEffect, useState} from "react";
import {Alert, Button, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import PostItem from "../components/PostItem";
import {postActions} from "../store/post/postActions";
import PostServices from "../services/postServices";
import CreatePostModal from "../components/CreatePostModal";
import Loader from "../components/Loader";

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
        .catch(() => {
          alert("Ошибка загрузки постов")
        })
        .finally(() => {
          setRefreshing(false);
          setIsLoading(false);
        });
    }
  }, [refreshing]);

  const onPostDelete = (id) => {
    PostServices.deletePost(id)
      .then(() => {
        dispatch(postActions.deletePost(id))
      })
      .catch(() => {
        alert("Не удалось удалить пост")
      })
  }

  const openPostDeleteModal = (id) => {
    Alert.alert("Вы действительно хотите удалить пост ?", "", [
      {text: "Отмена"},
      {text: "Да", onPress: () => onPostDelete(id)}
    ]);
  };

  const openPostCreateModal = () => {
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
        .catch(() => {
          alert("Не удалось создать пост")
        })
        .finally(() => {
          setModalVisible(false);
        })
    } else {
      alert("Заголовок поста слишком маленький")
    }
  }

  const onEditPost = () => {
    const newPost = {
      title: postTitle,
      body: postBody
    }
    PostServices.editPost(postID, newPost)
      .then((response) => {
        dispatch(postActions.editPost(postID, response.data))
      })
      .catch(() => {
        alert("Не удалось отредактировать пост")
      })
      .finally(() => {
        setPostID("");
        setPostTitle("");
        setPostBody("");
        setIsEditMode(false);
      })
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
      <Button title="Создать новый пост" onPress={openPostCreateModal}/>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {isLoading
          ?
            <Loader />
            :
            <>
              {postList.length ? postList.map((post) => (
                <PostItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  openPostDeleteModal={openPostDeleteModal}
                  setPostTitle={setPostTitle}
                  setPostBody={setPostBody}
                  postTitle={postTitle}
                  postBody={postBody}
                  isEditMode={isEditMode}
                  onEditMode={onEditMode}
                  postID={postID}
                  onEditPost={onEditPost}
                />
              ))
                :
                <Text>Постов не найдено</Text>
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
    height: '100%'
  }
});
