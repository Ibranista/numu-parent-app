import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Card from "../Card";
import ProgressBar from "./progressBar";

type TGender = "male" | "female" | "";
interface StepTwoProps {
  onBack: () => void;
  onNext: (gender: TGender) => void;
  initialGender?: TGender;
}

export default function StepTwo({
  onBack,
  onNext,
  initialGender = "",
}: StepTwoProps) {
  const [gender, setGender] = React.useState<TGender>(initialGender);

  return (
    <Card title="Now, select your child's gender." subTitle="Gender">
      <ProgressBar step={2} totalSteps={3} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 25,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={[
            {
              flexDirection: "column",
              alignItems: "center",
              padding: 10,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: gender === "male" ? "#8e44ad" : "#ccc",
              width: 90,
              backgroundColor: gender === "male" ? "#f7efff" : "#fff",
            },
          ]}
          onPress={() => setGender("male")}
        >
          <Icon
            name="male"
            size={24}
            color={gender === "male" ? "#8e44ad" : "#999"}
          />
          <Text style={{ marginTop: 5, fontWeight: "500" }}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              flexDirection: "column",
              alignItems: "center",
              padding: 10,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: gender === "female" ? "#8e44ad" : "#ccc",
              width: 90,
              backgroundColor: gender === "female" ? "#f7efff" : "#fff",
            },
          ]}
          onPress={() => setGender("female")}
        >
          <Icon
            name="female"
            size={24}
            color={gender === "female" ? "#8e44ad" : "#999"}
          />
          <Text style={{ marginTop: 5, fontWeight: "500" }}>Female</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.navButton, { marginRight: 8 }]}
          onPress={onBack}
        >
          <Text style={styles.navButtonText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => gender && onNext(gender)}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 80,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
