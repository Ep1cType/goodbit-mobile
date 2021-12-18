import {Button, StyleSheet, Text, View, Keyboard, ScrollView, Alert, RefreshControl} from "react-native";
import React, {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import PostServices from "../services/postServices";
import {useDispatch, useSelector} from "react-redux";
import {postActions} from "../store/post/postActions";
import CommentItem from "../components/CommentItem";
import Form from "../components/Form";
import Loader from "../components/Loader";

export default function PostScreen() {
  const route = useRoute();
  const dispatch = useDispatch();

  const {commentList} = useSelector(state => state.post);

  const [post, setPost] = useState({});

  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [isError, setIsError] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [commentId, setCommentId] = useState("");

  useEffect(() => {
    if (refreshing) {
      setIsLoading(true);
      PostServices.getPost(route.params)
        .then((response) => {
          setPost(response.data);
          PostServices.getCommentList()
            .then((response) => {
              const commentList = response.data.filter(comment => comment.postId === route.params);
              dispatch(postActions.setCommentList(commentList));
              setIsLoading(false);
            })
        })
        .catch(() => {
          setIsError("Не удалось загрузить подробную информацию о посте");
        })
        .finally(() => {
          setRefreshing(false);
          setIsLoading(false);
        });
    }
  }, [refreshing]);

  const onCommentDelete = (id) => {
    console.log("АЙДИ КОММЕНТА", id);
    PostServices.deleteComment(id)
      .then(() => {
        dispatch(postActions.deleteComment(id));
      })
      .catch(() => {
        alert("Не удалось удалить комментарий");
      });
  };

  const onCommentEdit = () => {
    const newComment = {
      postId: route.params,
      text: commentValue,
    };
    PostServices.editComment(commentId, newComment)
      .then((response) => {
        dispatch(postActions.editComment(commentId, response.data));
      })
      .catch(() => {
        alert("Не удалось отредактировать комментарий");
      })
      .finally(() => {
        setCommentValue("");
        setCommentId("");
        setIsEditMode(false);
      });
  };

  const onEditMode = (id) => {
    const selectedComment = commentList.find((comment) => comment.id === id);
    setCommentValue(selectedComment.text);
    setCommentId(selectedComment.id);
    setIsEditMode(true);
  };

  const openCommentDeleteModal = (id) => {
    Alert.alert("Вы действительно хотите удалить комментарий ?", "", [
      {text: "Отмена"},
      {text: "Да", onPress: () => onCommentDelete(id)}
    ]);
  };

  const onCommentCreate = () => {
    if (commentValue.length > 2) {
      let comment = {
        id: Math.floor((Math.random()*10000) + 1),
        postId: route.params,
        text: commentValue
      };
      PostServices.createComment(comment)
        .then((response) => {
          dispatch(postActions.createComment(response.data));
          setCommentValue("");
        })
        .catch(() => {
          alert("Не удалось создать комментарий");
        })
        .finally(() => {
          Keyboard.dismiss();
        });
    } else {
      alert("Комментарий слишком маленький");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
  };


  if (isLoading) {
    return (
      <Loader/>
    );
  }

  if (isError) {
    return (
      <Text style={styles.error}>{isError}</Text>
    );
  }

  return (
    <View style={styles.postScreen}>
      <View style={styles.postScreen__content}>
        <Text style={styles.postScreen__title}>{post.title}</Text>
        <Text style={styles.postScreen__body}>{post.body}</Text>
      </View>
      <View style={styles.commentForm}>
        <Form multiline={true} editable={!isEditMode} label="Введите комментарий:" onChange={setCommentValue}
              value={isEditMode ? "" : commentValue}/>
        <Button title="send" onPress={onCommentCreate}/>
      </View>
      <Text style={styles.comment__label}>Комментарии:</Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={styles.scrollView}
      >
        <View>
          {commentList.length ? commentList.map((comment) => (
              <CommentItem
                key={comment.id}
                onCommentEdit={onCommentEdit}
                onEditMode={onEditMode}
                id={comment.id}
                comment={comment.text}
                commentId={commentId}
                commentValue={commentValue}
                setCommentValue={setCommentValue}
                isEditMode={isEditMode}
                openCommentDeleteModal={openCommentDeleteModal}
              />
            ))
            :
            <Text>Комментариев не найдено</Text>
          }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    textAlign: "center",
    marginTop: 40,
  },
  postScreen: {
    display: "flex",
    backgroundColor: "#f4f6f8",
    height: "100%",
    padding: 20,
  },
  postScreen__content: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10
  },
  postScreen__title: {
    marginBottom: 10,
    fontSize: 20,
  },
  postScreen__body: {
    fontSize: 16,
  },
  commentForm: {
    marginBottom: 20
  },
  comment__label: {
    fontSize: 18
  },
  scrollView: {
    height: "100%"
  }
});
