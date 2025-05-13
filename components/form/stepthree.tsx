import { IStepFormProps } from "@/Interface/childFormInterface";
import { styles } from "@/styles/childFormStyle";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import Card from "../Card";
import StepBtnBox from "../StepBtnBox";
import ProgressBar from "./progressBar";

export default function StepThree({
  setStep,
  values,
  errors,
  concernList,
  touched,
  setFieldValue,
}: IStepFormProps & {
  setFieldValue: (field: string, value: any) => void;
}) {
  return (
    <Card
      title="What are your concerns?"
      subTitle="Select all that apply"
      handleSubmit={undefined}
    >
      <ProgressBar step={4} totalSteps={5} />
      {concernList && concernList.length > 0 && (
        <MultiSelect
          hideTags
          items={concernList.map((c: any) => ({
            id: c.id,
            name: c.title,
          }))}
          uniqueKey="id"
          onSelectedItemsChange={(items) => setFieldValue("concern_ids", items)}
          selectedItems={values.concern_ids}
          selectText="Select Concerns"
          searchInputPlaceholderText="Search Concerns..."
          submitButtonText="Submit"
          styleDropdownMenuSubsection={{ backgroundColor: "#fff" }}
          styleMainWrapper={{ backgroundColor: "#fff" }}
          styleDropdownMenu={{ backgroundColor: "#fff" }}
          styleTextDropdownSelected={{
            color: "#8e44ad",
            fontSize: 16,
          }}
          submitButtonColor="#8e44ad"
          styleTextDropdown={{ color: "#8e44ad", fontSize: 16 }}
          styleListContainer={{ backgroundColor: "#fff" }}
          styleRowList={{ backgroundColor: "#fff", borderRadius: 8 }}
          styleItemsContainer={{ backgroundColor: "#fff" }}
        />
      )}

      {touched?.concern_ids && errors?.concern_ids && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {errors?.concern_ids as string}
        </Text>
      )}
      <View style={{ height: 10 }} />
      <StepBtnBox>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
          ]}
          onPress={() => setStep(2)}
        >
          <Text style={styles.stepNavActive}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.backBtn,
            { paddingVertical: 6, paddingHorizontal: 12, flex: 1 },
            (values.concern_ids.length === 0 || errors?.concern_ids) && {
              backgroundColor: "#8d44ada6",
            },
          ]}
          onPress={() =>
            values.concern_ids.length > 0 && !errors?.concern_ids && setStep(4)
          }
          disabled={values.concern_ids.length === 0 || !!errors?.concern_ids}
        >
          <Text
            style={[
              styles.stepNavActive,
              (values.concern_ids.length === 0 || errors?.concern_ids) && {
                backgroundColor: "transparent",
              },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </StepBtnBox>
    </Card>
  );
}
