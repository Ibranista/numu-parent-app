import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../Card";
import ProgressBar from "./progressBar";

interface StepThreeProps {
  onBack: () => void;
  onNext: (birthDate: Date) => void;
  initialBirthDate?: Date | null;
}

export default function StepThree({
  onBack,
  onNext,
  initialBirthDate = null,
}: StepThreeProps) {
  const [date, setDate] = React.useState<Date | null>(initialBirthDate);
  const [show, setShow] = React.useState(false);

  const handleChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <Card title="When was your child born?" subTitle="Birth Date">
      <ProgressBar step={3} totalSteps={5} />
      <TouchableOpacity style={styles.dateInput} onPress={() => setShow(true)}>
        <Text style={{ color: date ? "#222" : "#aaa" }}>
          {date ? date.toDateString() : "Select birth date"}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.navButton} onPress={onBack}>
          <Text style={styles.navButtonText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, { marginLeft: 8 }]}
          onPress={() => date && onNext(date)}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
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
