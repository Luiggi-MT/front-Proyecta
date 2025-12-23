import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import { ConnectApi } from "../class/Connect.Api/ConnectApi";

const api = new ConnectApi();

export default function BotonPerfil({
  item,
  navigation,
}: {
  item: any;
  navigation: any;
}) {
  return (
    <TouchableOpacity
      style={styles.studentItem}
      onPress={() => navigation.navigate("LoginAlumno", { student: item })}
    >
      <Image
        source={{ uri: api.getFoto(item.foto) }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{item.username}</Text>
    </TouchableOpacity>
  );
}
