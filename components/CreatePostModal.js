import {Button, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import Form from "./Form";

export default function CreatePostModal({ modalVisible, setModalVisible, onPostCreate, postBody, setPostBody, postTitle, setPostTitle }) {
  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,

        }}>
          <Pressable
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
          <Form label="Введите заголовок поста:" value={postTitle} onChange={setPostTitle} multiline={false} />
          <Form label="Введите текст поста:" value={postBody} onChange={setPostBody} multiline={true} />
          <Button title="Создать пост" onPress={onPostCreate} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonClose: {
    backgroundColor: "#ff0000",
    padding: 5,
    borderRadius: 5,
    marginBottom: 25,
  },

})
