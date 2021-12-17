import {StyleSheet, Text, View, SafeAreaView, Button, Alert, FlatList} from "react-native";
import {useSelector} from "react-redux";
import PostItem from "../components/PostItem";
import {useEffect} from "react";

export default function MainPage() {
  const {postList} = useSelector(state => state.post)

  useEffect(() => {

  }, [])

  const renderItem = ({item}) => (
    <PostItem title={item.title} body={item.body} />
  )

  return (
    <View>
      <FlatList data={postList} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  )
}

const styles = StyleSheet.create({

})
