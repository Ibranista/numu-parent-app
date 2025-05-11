import { selectChild } from "@/features/child/selector";
import { createChild } from "@/features/child/thunkApi";
import { selectConcerns } from "@/features/concerns/selector";
import { getConcerns } from "@/features/concerns/thunk.api";
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { childInitialState, childSchema } from "@/schema/childSchema";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
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
  const [step, setStep] = useState(0); // 0: name, 1: gender, 2: birthDate, 3: concerns
  const steps = ["Name", "Gender", "Birth Date", "Concerns"];

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
        setStep(0);
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

  const validateStep = async () => {
    if (step === 0) {
      await formik.setFieldTouched("name", true);
      await formik.validateField("name");
      return !formik.errors.name;
    }
    if (step === 1) {
      await formik.setFieldTouched("gender", true);
      await formik.validateField("gender");
      return !formik.errors.gender;
    }
    if (step === 2) {
      await formik.setFieldTouched("birthDate", true);
      await formik.validateField("birthDate");
      return !formik.errors.birthDate;
    }
    if (step === 3) {
      await formik.setFieldTouched("concern_ids", true);
      await formik.validateField("concern_ids");
      return !formik.errors.concern_ids;
    }
    return false;
  };

  return (
    <View className="flex-1 justify-center bg-gray-900 px-6">
      {/* Step Circles */}
      <View className="flex-row justify-center items-center mb-6 mt-2">
        {steps.map((label, idx) => {
          const isCurrent = idx === step;
          const isCompleted = idx < step;
          const isClickable =
            idx <= step ||
            (idx > step &&
              Array.from({ length: idx }).every((_, i) => {
                if (i === 0) return !formik.errors.name && formik.values.name;
                if (i === 1)
                  return !formik.errors.gender && formik.values.gender;
                if (i === 2)
                  return !formik.errors.birthDate && formik.values.birthDate;
                return true;
              }));
          return (
            <TouchableOpacity
              key={label}
              disabled={!isClickable}
              onPress={async () => {
                if (idx === step) return;
                let canGo = true;
                for (let i = 0; i < idx; i++) {
                  if (i === 0) {
                    await formik.setFieldTouched("name", true);
                    await formik.validateField("name");
                    if (formik.errors.name || !formik.values.name) {
                      canGo = false;
                      setStep(i);
                      break;
                    }
                  }
                  if (i === 1) {
                    await formik.setFieldTouched("gender", true);
                    await formik.validateField("gender");
                    if (formik.errors.gender || !formik.values.gender) {
                      canGo = false;
                      setStep(i);
                      break;
                    }
                  }
                  if (i === 2) {
                    await formik.setFieldTouched("birthDate", true);
                    await formik.validateField("birthDate");
                    if (formik.errors.birthDate || !formik.values.birthDate) {
                      canGo = false;
                      setStep(i);
                      break;
                    }
                  }
                }
                if (canGo) setStep(idx);
              }}
              className={`mx-2 items-center ${
                isCurrent
                  ? "border-4 border-purple-500 bg-purple-700"
                  : isCompleted
                  ? "bg-purple-500"
                  : "bg-gray-600 opacity-60"
              } rounded-full w-16 h-20 justify-center`}
              style={{ opacity: isClickable ? 1 : 0.5 }}
            >
              <Text className="text-white font-bold text-2xl">
                {isCompleted ? "✓" : idx + 1}
              </Text>
              <Text className="text-xs text-white mt-1">Step {idx + 1}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text className="text-white text-3xl font-bold mb-6 text-center">
        Create Child Profile
      </Text>
      <Text className="text-white text-base text-center mb-4">
        Step {step + 1} of 4: {steps[step]}
      </Text>

      {step === 0 && (
        <>
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
        </>
      )}

      {step === 1 && (
        <>
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
        </>
      )}

      {step === 2 && (
        <>
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
        </>
      )}

      {step === 3 && (
        <>
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
        </>
      )}

      <View className="flex-row justify-between mt-4">
        {step > 0 && (
          <TouchableOpacity
            onPress={() => setStep((s) => s - 1)}
            className="bg-gray-600 p-3 rounded w-1/3 items-center"
          >
            <Text className="text-white text-lg">Back</Text>
          </TouchableOpacity>
        )}
        <View className="flex-1" />
        {step < 3 && (
          <TouchableOpacity
            onPress={async () => {
              const valid = await validateStep();
              if (valid) setStep((s) => s + 1);
            }}
            className="bg-purple-500 p-3 rounded w-1/3 items-center"
          >
            <Text className="text-white text-lg">Next</Text>
          </TouchableOpacity>
        )}
        {step === 3 && (
          <TouchableOpacity
            disabled={loading}
            onPress={formik.handleSubmit as () => void}
            className={`bg-purple-500 p-3 rounded w-1/3 items-center ${
              loading ? "opacity-50" : ""
            }`}
          >
            <Text className="text-white text-lg">
              {loading ? "Creating..." : "Submit"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text className="text-red-500 text-base mt-4">{error}</Text>}
    </View>
  );
}
