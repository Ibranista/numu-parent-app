import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Loader() {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator animating={true} size="large" color="#9b59b6" />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
