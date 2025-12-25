import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/Header";
import { ConnectApi } from "../class/Connect.Api/ConnectApi";
import { FlatList, Image, Text, View } from "react-native";
import { styles } from "../styles/styles";
import * as ImagePicker from "expo-image-picker";
import Boton from "../components/Boton";

export default function EstablecerContraseña({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { student } = route.params;

  const [view, setView] = useState<number>(0);

  const [maxContraseñas, setMaxContraseñas] = useState<number>(5);
  const [maxDistractorias, setMaxDistractorias] = useState<number>(5);
  const [password, setPassword] = useState<{ uri: string; codigo: string }[]>(
    []
  );
  const [distractors, setDistractors] = useState<
    { uri: string; codigo: string }[]
  >([]);
  const [disablePassword, setDisablePassword] = useState<boolean>(false);
  const [disableDistractors, setDisableDistractors] = useState<boolean>(false);

  const seleccionarImagen = async (isPassword: boolean) => {
    if (isPassword) {
      setMaxContraseñas(maxContraseñas - 1);
    }
    if (!isPassword) {
      setMaxDistractorias(maxDistractorias - 1);
    }
    if (isPassword && maxContraseñas === 0) {
      setDisablePassword(true);
      return;
    }
    if (!isPassword && maxDistractorias === 0) {
      setDisableDistractors(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = {
        uri: result.assets[0].uri,
        codigo: `img_${Date.now()}`,
      };
      if (isPassword) {
        setPassword([...password, newImage]);
      } else {
        setDistractors([...distractors, newImage]);
      }
    }
  };
  const api = new ConnectApi();

  const atras = () => {
    navigation.goBack();
  };
  const handleSiguientePress = () => {
    setView(1);
  };
  const handleAtrasPress = () => {
    setView(0);
  };

  return (
    <SafeAreaProvider>
      <Header
        uri="volver"
        nameBottom="Atrás"
        navigation={() => atras()}
        nameHeader={api.getComponent("EstablecerPass.png")}
        uriPictograma="olvideContraseña"
      />
      {view === 0 ? (
        <>
          <View style={[styles.content, styles.shadow]}>
            <Text>Subir imagen máximo {maxContraseñas}: </Text>
            <View>
              <FlatList
                data={password}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <Image
                    key={index}
                    source={{ uri: item.uri }}
                    style={{ width: 100, height: 100, margin: 5 }}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                  <Text style={styles.error}>
                    No se han seleccionado imagenes
                  </Text>
                }
                scrollEnabled={false}
              />
            </View>
            {!disablePassword && (
              <View style={[styles.buttons, { width: "40%" }]}>
                <Boton
                  uri="mas"
                  nameBottom="Añadir imagen"
                  onPress={() => seleccionarImagen(true)}
                />
              </View>
            )}
          </View>
          <View style={styles.navigationButtons}>
            <View></View>
            <Boton uri="delante" onPress={handleSiguientePress} />
          </View>
        </>
      ) : (
        <>
          <View style={[styles.content, styles.shadow]}>
            <Text>Subir imagenes distractoras máximo {maxDistractorias}: </Text>
            <View>
              <FlatList
                data={distractors}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <Image
                    key={index}
                    source={{ uri: item.uri }}
                    style={{ width: 100, height: 100, margin: 5 }}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                  <Text style={styles.error}>
                    No se han seleccionado imagenes
                  </Text>
                }
                scrollEnabled={false}
              />
            </View>
            {!disableDistractors && (
              <View style={[styles.buttons]}>
                <Boton
                  uri="mas"
                  nameBottom="Añadir imagen"
                  onPress={() => seleccionarImagen(false)}
                />
              </View>
            )}
          </View>
          <View style={styles.navigationButtons}>
            <Boton uri="atras" onPress={handleAtrasPress} />
            <View>
              <Boton uri="ok" nameBottom="Guardar cambios" onPress={() => {}} />
            </View>
          </View>
        </>
      )}
    </SafeAreaProvider>
  );
}
