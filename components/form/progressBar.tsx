import React from "react";
import { StyleSheet, View } from "react-native";

export default function ProgressBar({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) {
  const width = (step / (totalSteps - 1)) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${width}%` }]}>
        <View style={styles.circle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#6a1b9a",
    position: "relative",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  circle: {
    position: "absolute",
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderColor: "#6a1b9a",
    borderWidth: 2,
    top: -1,
  },
});
