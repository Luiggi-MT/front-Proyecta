import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ConnectApi } from "../class/Connect.Api/ConnectApi";
import Header from "../components/Header";
import Buscador from "../components/Buscador";
import { Students } from "../class/Interface/Students";
import { styles } from "../styles/styles";
import { View, Text } from "react-native";
import TarjetaDescipcion from "../components/TarjetaDescripcion";
import Boton from "../components/Boton";
export default function GestionEstudiantes({
  navigation,
}: {
  navigation: any;
}) {
  const api = new ConnectApi();
  const [students, setStudents] = useState<Students[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const [busqueda, setBusqueda] = useState(false);
  const [message, setMessage] = useState("");
  const atras = () => {
    navigation.goBack();
  };
  const handleBuscadorPress = (searchText: string) => {
    if (searchText.length === 0) {
      setBusqueda(false);
      api.getStudents(0, 3).then((data) => {
        setStudents(data.students || []);
        setOffset(data.offset);
        setLimit(data.cout);
      });
    } else {
      api.getEstudentByName(searchText, 0, 3).then((data) => {
        setBusqueda(true);
        if (data.students || []) {
          setStudents(data.students || []);
          setOffset(data.offset);
          setLimit(data.count);
          setMessage(searchText);
        } else {
          setStudents([]);
          setOffset(0);
          setLimit(0);
        }
      });
    }
  };
  const handleAtrasPress = () => {
    if (busqueda) {
      api
        .getEstudentByName(message, offset - 2 * api.getLimit(), 3)
        .then((data) => {
          setStudents(data.students);
          setOffset(data.offset);
          setLimit(data.count);
        });
    } else {
      api.getStudents(offset - 2 * api.getLimit(), 3).then((data) => {
        setStudents(data.students);
        setOffset(data.offset);
        setLimit(data.count);
      });
    }
  };
  const handleSiguientePress = () => {
    if (busqueda) {
      api.getEstudentByName(message, offset, 3).then((data) => {
        setStudents(data.students);
        setOffset(data.offset);
        setLimit(data.count);
      });
    } else {
      api.getStudents(offset, 3).then((data) => {
        setStudents(data.students);
        setOffset(data.offset);
        setLimit(data.count);
      });
    }
  };
  const handleDescripcionPress = (student) => {
    navigation.replace("DescripcionEstudiante", { student });
  };
  const handleCreaPress = () => {
    navigation.navigate("CrearEstudiante");
  };

  useEffect(() => {
    api.getStudents(0, 3).then((data) => {
      setStudents(data.students || []);
      setOffset(data.offset);
      setLimit(data.count);
    });
  }, []);
  return (
    <SafeAreaProvider>
      <Header
        uri="volver"
        nameBottom="Atrás"
        navigation={() => atras()}
        nameHeader={api.getComponent("GestionDeEstudiantes.png")}
        uriPictograma="estudiante"
      />
      <Buscador
        nameBuscador="Buscar estudiante"
        onPress={handleBuscadorPress}
      />
      <View style={[styles.content, styles.shadow]}>
        {students && students.length > 0 ? (
          <>
            {students.map((student) => (
              <TarjetaDescipcion
                key={student.username}
                name={student.username}
                uri={api.getFoto(student.foto)}
                description="Ver alumno"
                navigation={() => handleDescripcionPress(student)}
              />
            ))}
            <View style={styles.navigationButtons}>
              <Boton
                uri="atras"
                onPress={handleAtrasPress}
                dissable={offset <= 0}
              />
              <Boton
                uri="delante"
                onPress={handleSiguientePress}
                dissable={offset >= limit}
              />
            </View>
          </>
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            No se ha encontrado alumno
          </Text>
        )}
      </View>
      <Boton uri="mas" nameBottom="Crear alumno" onPress={handleCreaPress} />
    </SafeAreaProvider>
  );
}
