import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

export default function Form({label, value, onChange, multiline, editable}) {
  return (
    <View style={styles.form}>
      <Text style={styles.form__label}>{label}</Text>
      <TextInput
        multiline={multiline}
        value={value}
        onChangeText={onChange}
        editable={editable}
        style={styles.form__input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    display: "flex",
    alignItems: 'flex-start',
    marginBottom: 10
  },
  form__label: {
    fontSize: 16,
    marginBottom: 5
  },
  form__input: {
    backgroundColor: "#9daec2",
    width: "100%",
    borderRadius: 5,
    padding: 5,
    display: "flex",
    flexWrap: "wrap",
  }
})
