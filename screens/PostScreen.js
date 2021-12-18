import {StyleSheet, Text, View, SafeAreaView, Button, Alert, FlatList, ActivityIndicator} from "react-native";
import {useSelector} from "react-redux";
import PostItem from "../components/PostItem";
import {useEffect, useState} from "react";
import MainScreenHeader from "../components/MainScreenHeader";
import {useRoute} from "@react-navigation/native";

export default function PostScreen() {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
  }, [])



  return (
    <View>
      <Text>Пост номер {route.params}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})
