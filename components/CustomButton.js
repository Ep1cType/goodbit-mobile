import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

export default function CustomButton({onPress, id, style, text, color}) {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress(id)}>
        <View style={style}>
          <Text style={{
            color: color
          }}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
