import { StyleSheet } from "react-native";
export const gradientColors = ["#4C80D7", "#42C9A6", "#FDD050"];
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9E9E9",
    flex: 1,
  },

  header: {
    height: 200,
    width: "100%",
    backgroundColor: "#EAFFF5",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
  },

  titleHeaderContainer: {
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  image: {
    padding: 2,
    width: 100,
    height: 100,
  },
  legendBoton: {
    borderWidth: 1,
    backgroundColor: "#FF8C42",
    width: 120,
    borderRadius: 5,
    marginLeft: 10,
  },
  textBoton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFF",
    textAlign: "center",
    margin: 2,
  },
  buscador: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 10,
  },
  studenCard: {},
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5,
  },
  studentItem: {
    flex: 1,
    alignItems: "center",
    margin: 2,
  },
  error: {
    color: "tomato",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  tarjet: {
    marginBottom: 3,
    borderWidth: 1,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageTarjet: {
    padding: 2,
    width: 80,
    height: 80,
  },
  radius: {
    borderWidth: 1,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonActive: {},
  buttonDissable: {},
});
