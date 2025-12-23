import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/Header";
import { ConnectApi } from "../class/Connect.Api/ConnectApi";
import { Profesor } from "../class/Interface/Profesor";
import { View } from "react-native";
import { styles } from "../styles/styles";
import Boton from "../components/Boton";
export default function PerfilScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { profesor }: { profesor: Profesor } = route.params;
  const atras = () => {
    navigation.goBack();
  };
  const salir = () => {
    const respose = api.logoutUser();
    if (respose) navigation.navigate("Home");
  };
  const api = new ConnectApi();
  return (
    <SafeAreaProvider style={styles.container}>
      <Header
        uri="volver"
        nameBottom="Atrás"
        navigation={() => atras()}
        nameHeader={api.getComponent("Perfil.png")}
        uriPictograma="perfil"
      />
      <View style={[styles.content, styles.shadow]}>
        <Boton
          uri={profesor.foto}
          nameBottom="Cambiar foto de perfil"
          arasaacService={false}
          onPress={() => {}}
        />
        <Boton uri="olvideContraseña" nameBottom="Cambiar Contraseña" />
        <Boton uri="salir" nameBottom="Salir" onPress={() => salir()} />
      </View>
    </SafeAreaProvider>
  );
}
