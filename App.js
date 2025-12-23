import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConnectApi } from "./class/Connect.Api/ConnectApi";

import HomeScreen from "./Views/HomeScreen";
import Profesorado from "./Views/Profesorado";
import LoginAlumno from "./Views/LoginAlumno";
import AdminScreen from "./Views/AdminScreen";
import ProfesorScreen from "./Views/ProfesorScreen";
import PerfilScreen from "./Views/PerfilScreen";

const Stack = createNativeStackNavigator();
const api = new ConnectApi();

function Splash() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Cargando sesión...</Text>
    </View>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [userData, setUserData] = useState({
    foto: null,
    username: null,
  });

  const checkSession = async () => {
    try {
      const response = await api.checkSession();

      if (!response.ok) {
        setInitialRoute("Home");
        setUserData({ foto: null, username: null });
      } else {
        setUserData({ foto: response.foto ?? null, username: response.username ?? null });

        if (response.tipo === "admin") setInitialRoute("AdminScreen");
        else if (response.tipo === "profesor") setInitialRoute("ProfesorScreen");
        else setInitialRoute("Home");
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setInitialRoute("LoginAlumno");
      setUserData({ foto: null, username: null });
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (initialRoute === null) {
    return <Splash />;
  }
  const linking = {
    prefixes: ['http://localhost:8081'], 
    config: {
      screens: {
        Home: {
          path: '', 
        }, 
        Profesorado: {
          path: 'profesorado',
        },
        AdminScreen: {
          path: 'admin', 
          parse: {
            profesor : () => undefined,
          },
        }
      },
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} initialParams={userData} />
        <Stack.Screen name="Profesorado" component={Profesorado} />
        <Stack.Screen name="LoginAlumno" component={LoginAlumno} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} initialParams={{profesor : userData}} />
        <Stack.Screen name="ProfesorScreen" component={ProfesorScreen} initialParams={userData} />
        <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
