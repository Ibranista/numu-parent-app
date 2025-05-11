import { selectChild } from "@/features/child/selector";
import { createChild } from "@/features/child/thunkApi";
import { selectConcerns } from "@/features/concerns/selector";
import { getConcerns } from "@/features/concerns/thunk.api";
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { childInitialState, childSchema } from "@/schema/childSchema";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import Toast from "react-native-toast-message";

export default function ChildScreen() {
  const dispatch = useAppDispatch();
  const childState = useAppSelector(selectChild);
  const concernsState = useAppSelector(selectConcerns);
  console.log("concernsState", concernsState?.concerns?.results);
  const { loading, error } = childState ?? {};
  const concernItems = concernsState?.concerns?.results.map((item) => ({
    id: item.id,
    name: item.title,
  }));
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const formik = useFormik({
    initialValues: childInitialState,
    validationSchema: childSchema,
    onSubmit: async (values, { resetForm }) => {
      const result = await dispatch(createChild(values));
      if (createChild.fulfilled.match(result)) {
        Toast.show({
          type: "success",
          text1: "Child created successfully!",
          position: "top",
          visibilityTime: 2000,
        });
        resetForm();
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to create child",
          text2: error || "Please try again.",
          position: "top",
        });
      }
    },
  });

  useEffect(() => {
    dispatch(getConcerns(1));
  }, [dispatch]);

  return (
    <View className="flex-1 justify-center bg-gray-900 px-6">
      <Text className="text-white text-3xl font-bold mb-6 text-center">
        Create Child Profile
      </Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#9CA3AF"
        className={`bg-gray-700 text-white text-lg p-4 rounded mb-2 ${
          formik.touched.name && formik.errors.name
            ? "border-2 border-red-500"
            : ""
        }`}
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
      />
      {formik.touched.name && formik.errors.name && (
        <Text className="text-red-500 text-base mb-2">
          {formik.errors.name}
        </Text>
      )}

      <View className="bg-gray-700 rounded mb-2">
        <Picker
          selectedValue={formik.values.gender}
          onValueChange={(itemValue) =>
            formik.setFieldValue("gender", itemValue)
          }
          style={{ color: "#fff", backgroundColor: "transparent" }}
          dropdownIconColor="#fff"
          mode="dropdown"
        >
          <Picker.Item label="Select Gender" value="" color="#9CA3AF" />
          <Picker.Item label="Male" value="male" color="#8450A0" />
          <Picker.Item label="Female" value="female" color="#8450A0" />
        </Picker>
      </View>
      {formik.touched.gender && formik.errors.gender && (
        <Text className="text-red-500 text-base mb-2">
          {formik.errors.gender}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className={`bg-gray-700 text-white text-lg p-4 rounded mb-2 justify-center ${
          formik.touched.birthDate && formik.errors.birthDate
            ? "border-2 border-red-500"
            : ""
        }`}
        style={{ marginBottom: 8 }}
      >
        <Text className="text-white text-lg">
          {formik.values.birthDate
            ? formik.values.birthDate
            : "Select Birth Date"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={
            formik.values.birthDate
              ? new Date(formik.values.birthDate)
              : new Date()
          }
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const iso = selectedDate.toISOString().split("T")[0];
              formik.setFieldValue("birthDate", iso);
            }
          }}
          maximumDate={new Date()}
        />
      )}
      {formik.touched.birthDate && formik.errors.birthDate && (
        <Text className="text-red-500 text-base mb-2">
          {formik.errors.birthDate}
        </Text>
      )}

      <View
        className={`bg-gray-700 rounded mb-2 p-2 ${
          formik.touched.concern_ids && formik.errors.concern_ids
            ? "border-2 border-red-500"
            : ""
        }`}
      >
        <MultiSelect
          hideTags
          items={concernItems}
          uniqueKey="id"
          displayKey="name"
          onSelectedItemsChange={(items) => {
            formik.setFieldValue("concern_ids", items);
          }}
          selectedItems={formik.values.concern_ids}
          selectText="Select Concerns"
          searchInputPlaceholderText="Search Concerns..."
          submitButtonText="Submit"
          styleDropdownMenuSubsection={{
            backgroundColor: "#1F2937",
          }}
          styleMainWrapper={{
            backgroundColor: "#1F2937",
          }}
          styleDropdownMenu={{
            backgroundColor: "#1F2937",
          }}
          styleTextDropdownSelected={{
            color: "#fff",
            fontSize: 16,
          }}
          styleTextDropdown={{
            color: "#fff",
            fontSize: 16,
          }}
          styleListContainer={{
            backgroundColor: "#1F2937",
          }}
          styleRowList={{
            backgroundColor: "#1F2937",
            borderRadius: 8,
          }}
          styleItemsContainer={{
            backgroundColor: "#1F2937",
            borderRadius: 8,
          }}
          styleIndicator={{
            backgroundColor: "#1F2937",
            borderRadius: 8,
          }}
          submitButtonColor="#8450A0"
          onChangeInput={(text) => console.log(text)}
        />
      </View>
      {formik.touched.concern_ids && formik.errors.concern_ids && (
        <Text className="text-red-500 text-base mb-2">
          {formik.errors.concern_ids as string}
        </Text>
      )}

      <TouchableOpacity
        disabled={loading}
        onPress={formik.handleSubmit as () => void}
        className={`w-full p-4 rounded items-center mt-2 ${
          loading ? "bg-purple-400 opacity-50" : "bg-purple-500"
        }`}
      >
        {loading ? (
          <Text className="text-white text-xl font-semibold">Creating...</Text>
        ) : (
          <Text className="text-white text-xl font-semibold">Create Child</Text>
        )}
      </TouchableOpacity>

      {error && <Text className="text-red-500 text-base mt-4">{error}</Text>}
    </View>
  );
}
