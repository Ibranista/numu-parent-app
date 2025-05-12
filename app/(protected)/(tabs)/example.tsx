import Card from "@/components/Card";
import StepFour from "@/components/form/stepfour";
import StepOne from "@/components/form/stepone";
import StepThree from "@/components/form/stepthree";
import StepTwo from "@/components/form/steptwo";
import { createChild } from "@/features/child/thunkApi";
import { getConcerns } from "@/features/concerns/thunk.api";
import { useAppDispatch } from "@/hooks/stateHooks";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

type TGender = "male" | "female" | "";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConcerns(1));
  }, [dispatch]);

  const [step, setStep] = useState(-1);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<TGender>("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [concerns, setConcerns] = useState<string[]>([]);
  const totalSteps = 5;

  const next = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleNameNext = (childName: string) => {
    setName(childName);
    setStep(1);
  };
  const handleGenderNext = (selectedGender: TGender) => {
    setGender(selectedGender);
    setStep(2);
  };
  const handleBirthDateNext = (date: Date) => {
    setBirthDate(date);
    setStep(3);
  };
  const handleConcernsNext = (selectedConcerns: string[]) => {
    setConcerns(selectedConcerns);
    setStep(4);
  };
  const handleSubmit = async () => {
    const result = await dispatch(
      createChild({
        name,
        birthDate,
        acceptedTherapists: [],
        concern_ids: concerns,
        gender,
        therapist_matches: [],
        concerns: [],
      })
    );
    console.log("updated child", result);
    if (createChild.fulfilled.match(result)) {
      Toast.show({
        type: "success",
        text1: "Child created successfully!",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepOne onNext={handleNameNext} initialName={name} />;
      case 1:
        return (
          <StepTwo
            onBack={prev}
            onNext={handleGenderNext}
            initialGender={gender}
          />
        );
      case 2:
        return (
          <StepThree
            onBack={prev}
            onNext={handleBirthDateNext}
            initialBirthDate={birthDate}
          />
        );
      case 3:
        return (
          <StepFour
            onBack={prev}
            onNext={handleConcernsNext}
            initialConcerns={concerns}
          />
        );
      case 4:
        return (
          <Card
            title="Almost there!"
            subTitle="Review your child's information before submitting."
            handleSubmit={handleSubmit}
            submitText="Submit"
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 20,
              }}
            >
              Review & Submit
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Child&apos;s Name:{" "}
              <Text style={{ fontWeight: "bold" }}>{name}</Text>
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Gender: <Text style={{ fontWeight: "bold" }}>{gender}</Text>
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Birth Date:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {birthDate ? birthDate.toDateString() : ""}
              </Text>
            </Text>
            <Text style={{ marginBottom: 20 }}>
              Concerns:{" "}
              <Text style={{ fontWeight: "bold" }}>{concerns.join(", ")}</Text>
            </Text>
            <TouchableOpacity style={styles.backBtn} onPress={prev}>
              <Text style={styles.stepNavActive}>Back</Text>
            </TouchableOpacity>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {step === -1 ? (
        <View>
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <Image
              source={require("@/assets/images/form-intro.png")}
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
            <Text style={styles.welcome} className="font-bold">
              Welcome to Numuw!
            </Text>
            <Text style={styles.info}>
              Your insight is key to helping us understand your child better. By
              answering these short questions, you’ll help us provide the best
              support and personalized care for your child’s Needs
            </Text>
            <TouchableOpacity
              onPress={() => setStep(0)}
              style={styles.tellUsBtn}
            >
              <Image source={require("@/assets/images/hand-gesture.png")} />
              <Text style={{ color: "#fff" }}>Tell Us About Your Child</Text>
              <Image source={require("@/assets/images/right-arrow.png")} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {renderStep()}
          <View style={styles.stepNavContainer}>
            {[...Array(totalSteps)].map((_, idx) => {
              const isDisabled =
                (idx === 1 && !name) ||
                (idx === 2 && (!name || !gender)) ||
                (idx === 3 && (!name || !gender || !birthDate)) ||
                (idx === 4 &&
                  (!name || !gender || !birthDate || concerns.length === 0));
              return (
                <Text
                  key={idx}
                  style={[
                    styles.stepNav,
                    step === idx && styles.stepNavActive,
                    isDisabled && { opacity: 0.4 },
                  ]}
                  onPress={() => {
                    if (!isDisabled) setStep(idx);
                  }}
                >
                  {idx + 1}
                </Text>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
