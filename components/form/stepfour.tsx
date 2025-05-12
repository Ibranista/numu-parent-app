import { selectConcerns } from "@/features/concerns/selector";
import { useAppSelector } from "@/hooks/stateHooks";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../Card";
import ProgressBar from "./progressBar";

interface StepFourProps {
  onBack: () => void;
  onNext: (concerns: string[]) => void;
  initialConcerns?: string[];
}

export default function StepFour({
  onBack,
  onNext,
  initialConcerns = [],
}: StepFourProps) {
  const concernData = useAppSelector(selectConcerns);
  const concernList = concernData?.concerns?.results || [];
  const [selected, setSelected] = React.useState<number[]>(
    Array.isArray(initialConcerns)
      ? initialConcerns
          .map((c) => (typeof c === "number" ? c : Number(c)))
          .filter(Boolean)
      : []
  );

  const toggleConcern = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <Card title="What are your concerns?" subTitle="Select all that apply">
      <ProgressBar step={4} totalSteps={5} />
      <ScrollView style={{ maxHeight: 220, marginVertical: 16 }}>
        {concernList.map((concern: any) => (
          <TouchableOpacity
            key={concern.id}
            style={[
              styles.concernItem,
              selected.includes(concern.id) && styles.concernItemSelected,
            ]}
            onPress={() => toggleConcern(concern.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.concernTitle}>{concern.title}</Text>
            <Text style={styles.concernDescription}>{concern.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.navButton} onPress={onBack}>
          <Text style={styles.navButtonText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, { marginLeft: 8 }]}
          onPress={() => selected.length > 0 && onNext(selected.map(String))}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  concernItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  concernItemSelected: {
    borderColor: "#8e44ad",
    backgroundColor: "#f7efff",
    shadowColor: "#8e44ad",
    shadowOpacity: 0.15,
  },
  concernTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#8e44ad",
    marginBottom: 4,
  },
  concernDescription: {
    fontSize: 13,
    color: "#545056",
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
