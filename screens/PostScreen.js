import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import PostServices from "../services/postServices";
import {useDispatch, useSelector} from "react-redux";
import {postActions} from "../store/post/postActions";

export default function PostScreen() {
  const route = useRoute();
  const dispatch = useDispatch();
  const {commentList} = useSelector(state => state.post);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [post, setPost] = useState({})

  useEffect(() => {
    setIsLoading(true)
    PostServices.getPost(route.params)
      .then((response) => {
        setPost(response.data);
        PostServices.getCommentList()
          .then((response) => {
            const commentList = response.data.filter(comment => comment.postId === route.params);
            console.log(commentList)
            dispatch(postActions.setCommentList(commentList))
            // console.log(response.data)
            setIsLoading(false)
          })
          .catch((err) => {

          })
      })
      .catch((err) => {

      })
      .finally(() => {

      })
  }, [])



  return (
    <View style={{
      display: 'flex',
      backgroundColor: '#f4f6f8',
      height: '100%',
      padding: 20,

    }}>
      <View style={{
        backgroundColor: '#fff',
        marginBottom: 10,
      }}>
        <Text style={{
          marginBottom: 10,
          fontSize: 20,
        }}>{post.title}</Text>
        <Text style={{
          fontSize: 16,
        }}>{post.body}</Text>
      </View>

      {isLoading
        ?
        <Text>LOADING...</Text>
        :
        <View style={{
          backgroundColor: '#fff'
        }}>
          {commentList.length && commentList.map((comment) => (
            <Text key={comment.id}>{comment.text}</Text>
          ))}
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({

})
