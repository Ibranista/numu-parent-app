import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  tellUsBtn: {
    marginTop: 20,
    width: "80%",
    backgroundColor: "#8450A0",
    padding: 16,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  welcome: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: "center",
    color: "#1C1520",
  },
  info: {
    textAlign: "center",
    fontSize: 14,
    color: "#545056",
    marginBottom: 20,
  },
  stepNavContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    gap: 12,
  },

  stepNav: {
    fontSize: 18,
    color: "#888",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 4,
    overflow: "hidden",
  },
  backBtn: {
    backgroundColor: "#8e44ad",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  stepNavActive: {
    color: "#fff",
    backgroundColor: "#8e44ad",
    borderColor: "#8e44ad",
  },
});
