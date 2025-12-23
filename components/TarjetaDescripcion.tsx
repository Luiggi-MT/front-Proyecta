import { Image, Text, View } from "react-native";
import Boton from "./Boton";
import { styles } from "../styles/styles";

export default function TarjetaDescipcion({
  uri,
  name,
  description,
  navigation,
}: {
  uri: string;
  name: string;
  description: string;
  navigation: () => void;
}) {
  return (
    <View style={styles.tarjet}>
      <Image
        style={[styles.imageTarjet, styles.radius]}
        source={{ uri: uri }}
      />
      <Text style={styles.name}>{name}</Text>
      <Boton nameBottom={description} onPress={navigation} />
    </View>
  );
}
