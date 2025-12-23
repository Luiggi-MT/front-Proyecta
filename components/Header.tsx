import React from "react";
import { View, Image } from "react-native";
import Boton from "./Boton";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/styles";
import { Arasaac } from "../class/Arasaac/getPictograma";

export default function Header({
  uri,
  uriPictograma,
  nameBottom,
  navigation,
  nameHeader,
  arasaacService = true,
}: {
  uri: string;
  uriPictograma?: string;
  nameBottom: string;
  navigation: () => void;
  nameHeader: string;
  arasaacService?: boolean;
}) {
  const ArasaacService = new Arasaac();
  return (
    <SafeAreaView style={styles.header}>
      <View style={{ alignItems: "flex-start", marginLeft: 10, flex: 1 }}>
        <Boton
          uri={uri}
          nameBottom={nameBottom}
          onPress={navigation}
          dissable={false}
          arasaacService={arasaacService}
        />
      </View>

      <View style={styles.titleHeaderContainer}>
        <Image
          source={{ uri: nameHeader }}
          style={[{ width: 220, height: 220 }, styles.shadow]}
        />
      </View>

      {uriPictograma ? (
        <Image
          source={{ uri: ArasaacService.getPictograma(uriPictograma) }}
          style={{ width: 80, height: 80 }}
        />
      ) : (
        <View style={{ flex: 1 }} />
      )}
    </SafeAreaView>
  );
}
