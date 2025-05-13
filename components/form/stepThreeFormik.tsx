import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // You can also use Entypo, FontAwesome, etc.

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
        }}
        onPress={() => setShow(true)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: value ? "#222" : "#aaa" }}>
            {value ? new Date(value).toDateString() : "Select birth date"}
          </Text>
          <Icon name="calendar" size={20} color="#888" />
        </View>
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
