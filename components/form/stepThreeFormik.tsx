import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function StepThreeFormik({ value, error, onChange }: any) {
  const [show, setShow] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginTop: 20,
          marginBottom: 10,
          alignItems: "center",
        }}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: value ? "#222" : "#aaa" }}>
          {value ? new Date(value).toDateString() : "Select birth date"}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={(_e, selectedDate) => {
            setShow(false);
            if (selectedDate)
              onChange(selectedDate.toISOString().split("T")[0]);
          }}
          maximumDate={new Date()}
        />
      )}
      {error && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {error}
        </Text>
      )}
    </>
  );
}
