import React from "react";

import {ActivityIndicator, StyleSheet, View} from "react-native";

export default function Loader() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#0000ff"/>
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    display: 'flex',
    marginTop: '50%'
  }
})
