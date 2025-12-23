import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/Header";
import { ConnectApi } from "../class/Connect.Api/ConnectApi";
import { styles } from "../styles/styles";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Boton from "../components/Boton";

export default function DescripcionEstudiante({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { student } = route.params;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("alfanumerica");
  const [items, setItems] = useState([
    { label: "Alfanumerica", value: "alfanumerica" },
    { label: "Pin", value: "pin" },
    { label: "Imagenes", value: "imagenes" },
  ]);

  const api = new ConnectApi();

  const atras = () => {
    navigation.goBack();
  };
  const seleccionaImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Se necesita permiso para acceder a la galeria");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };
  const handleTextChange = (input: string) => {
    setText(input);
  };
  const handlePasswordChange = (input: string) => {
    setPassword(input);
  };

  useEffect(() => {
    console.log(student);
  }, [student]);
  return (
    <SafeAreaProvider>
      <Header
        uri="volver"
        nameBottom="Atrás"
        navigation={() => atras()}
        nameHeader={api.getComponent("DescripcionDelEstudiante.png")}
        uriPictograma="estudiante"
      />
      <View style={[styles.content, styles.shadow]}>
        <TouchableOpacity onPress={seleccionaImagen}>
          <Text>Modificar foto:</Text>
          <Image
            style={[styles.imageTarjet, styles.radius]}
            source={{ uri: selectedImage || api.getFoto(student.foto) }}
          />
        </TouchableOpacity>
        <Text>Nombre de usuario:</Text>
        <TextInput
          style={[styles.buscador, styles.shadow]}
          onChangeText={handleTextChange}
          value={text}
          placeholder={student.username}
        />
        <Text>Tipo de contraseña:</Text>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={[styles.shadow, styles.buscador, { width: "50%" }]}
          />
        </View>
        <Text>Nueva contraseña:</Text>
        {value === "alfanumerica" ? (
          <TextInput
            style={[styles.buscador, styles.shadow]}
            onChangeText={handlePasswordChange}
            value={password}
          />
        ) : value === "pin" ? (
          <TextInput
            style={[styles.buscador, styles.shadow]}
            onChangeText={handlePasswordChange}
            value={password}
            keyboardType="number-pad"
          />
        ) : (
          <Boton
            uri="olvideContraseña"
            nameBottom="Establecer Contraseña"
            onPress={() => {}}
          />
        )}
        <View style={styles.navigationButtons}>
          <View></View>

          <Boton
            uri="delante"
            onPress={() => {
              navigation.navigate("DescripcionEstudianteAccesibilidad", {
                student,
              });
            }}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
}
