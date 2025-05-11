import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { selectChild } from "@/features/child/selector";
import {
  getChildren,
  updateMatchedTherapistStatus,
} from "@/features/child/thunkApi";
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { declineInitialValues, DeclineSchema } from "@/schema/declineSchema";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function MyChildren() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const childrenData = useAppSelector(selectChild);
  const { child } = childrenData ?? {};
  const [loadingTherapistIds, setLoadingTherapistIds] = useState<string[]>([]);
  const [declineSubmitting, setDeclineSubmitting] = useState(false);

  useEffect(() => {
    console.log("Fetching children data...");
    dispatch(getChildren({ page: 1, limit: 5 }));
  }, [dispatch]);

  const [expanded, setExpanded] = useState<string | null>(null);
  const [expertiseModal, setExpertiseModal] = useState<{
    open: boolean;
    items: string[];
  }>({ open: false, items: [] });
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(
    null
  );

  const handleTherapistStatusUpdate = async (
    {
      status,
      id,
      declinedReason,
    }: {
      status: "accepted" | "declined";
      id: string;
      declinedReason?: string;
    },
    options?: { skipModalClose?: boolean }
  ) => {
    try {
      setLoadingTherapistIds((prev) => [...prev, id]);

      await dispatch(
        updateMatchedTherapistStatus({
          matchedTherapistId: id,
          status,
          decline_reason: declinedReason || "",
        })
      ).unwrap();

      dispatch(getChildren({ page: 1, limit: 5 }));
      Toast.show({
        type: "success",
        text1:
          status === "accepted"
            ? "Therapist accepted successfully!"
            : "Therapist declined successfully!",
        position: "top",
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error("Error updating therapist status:", error);
      Toast.show({
        type: "error",
        text1: "Failed to update therapist status.",
        position: "top",
        visibilityTime: 2000,
      });
    } finally {
      setLoadingTherapistIds((prev) => prev.filter((tId) => tId !== id));

      if (!options?.skipModalClose) {
        setShowDeclineModal(false);
      }
    }
  };

  return (
    <ThemedView className="flex-1 bg-white dark:bg-black px-4 pt-8">
      <View className="flex-row justify-between items-center mb-6">
        <ThemedText
          type="title"
          className="text-2xl font-bold text-[#8450A0] dark:text-[#fff]"
        >
          My Children
        </ThemedText>
        <TouchableOpacity
          className="flex-row items-center bg-[#8450A0] px-4 py-2 rounded-full"
          onPress={() => router.push("/child")}
          accessibilityLabel="Create Child"
        >
          <Ionicons name="add" size={22} color="#fff" />
          <Text className="ml-2 text-white font-semibold">Create Child</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={child?.results || []}
        keyExtractor={(item: any) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        className="pb-4"
        renderItem={({ item: myChild }: { item: any }) => (
          <View
            key={myChild.id}
            className="bg-[#f3e8ff] dark:bg-[#2d223a] rounded-xl p-4 mb-4 shadow-sm border border-[#8450A0]/20"
          >
            <Pressable
              className="flex-row justify-between items-start"
              onPress={() =>
                setExpanded(expanded === myChild.id ? null : myChild.id)
              }
            >
              <View>
                <ThemedText
                  type="subtitle"
                  className="text-lg text-[#8450A0] dark:text-[#fff] mb-1"
                >
                  {myChild.name}
                </ThemedText>
                <ThemedText className="text-base text-gray-700 dark:text-gray-200 mb-1">
                  Gender:{" "}
                  <ThemedText className="font-semibold">
                    {myChild.gender.charAt(0).toUpperCase() +
                      myChild.gender.slice(1)}
                  </ThemedText>
                </ThemedText>
                <ThemedText className="text-base text-gray-700 dark:text-gray-200">
                  Birth Date:{" "}
                  <ThemedText className="font-semibold">
                    {myChild.birthDate}
                  </ThemedText>
                </ThemedText>
              </View>
              <Ionicons
                name={expanded === myChild.id ? "chevron-up" : "chevron-down"}
                size={24}
                color="#8450A0"
                style={{ marginLeft: 8 }}
              />
            </Pressable>
            {expanded === myChild.id && (
              <View className="mt-4">
                <ThemedText className="text-base text-[#8450A0] dark:text-white font-semibold mb-3">
                  Therapists:
                </ThemedText>
                <FlatList
                  data={
                    myChild?.therapist_matches?.filter(
                      (item: any) =>
                        item.status !== "accepted" && item.status !== "declined"
                    ) || []
                  }
                  keyExtractor={(item: any) => item.therapist.id.toString()}
                  renderItem={({ item }: { item: any }) => (
                    <View
                      key={item.therapist.id}
                      className="mb-4 bg-white dark:bg-[#1a1324] rounded-lg p-4 border border-[#8450A0]/10 shadow-sm"
                    >
                      <View className="flex-row items-start">
                        <Image
                          source={{ uri: item.therapist.image }}
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 28,
                            backgroundColor: "#eee",
                          }}
                          resizeMode="cover"
                          className="mr-3"
                        />
                        <View className="flex-1">
                          <View className="flex-row justify-between items-start">
                            <View>
                              <ThemedText className="text-lg font-bold text-[#8450A0] dark:text-white">
                                {item.therapist.name}
                              </ThemedText>
                              <ThemedText className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                                {item.therapist.experience_years} years
                                experience
                              </ThemedText>
                            </View>
                            <View className="flex-row space-x-2">
                              <TouchableOpacity
                                className="bg-[#8450A0] px-3 py-1 rounded-full items-center justify-center"
                                onPress={() =>
                                  handleTherapistStatusUpdate({
                                    status: "accepted",
                                    id: item.id,
                                  })
                                }
                                disabled={loadingTherapistIds.includes(item.id)}
                                accessibilityLabel="Accept Therapist"
                              >
                                <Text className="text-white font-semibold text-sm">
                                  {loadingTherapistIds.includes(item.id)
                                    ? "Accepting..."
                                    : "Accept"}
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                className="bg-[#ff4444] px-3 py-1 rounded-full items-center justify-center"
                                onPress={() => {
                                  setSelectedTherapist(item.id);
                                  setShowDeclineModal(true);
                                }}
                              >
                                <Text className="text-white font-semibold text-sm">
                                  Decline
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View className="flex-row flex-wrap items-center mt-2">
                            {item.therapist.expertise
                              .slice(0, 3)
                              .map((e: any, idx: number) => (
                                <Pressable
                                  key={e.id}
                                  className="bg-[#8450A0]/10 px-2 py-1 rounded-full mr-2 mb-2"
                                  onPress={() =>
                                    setExpertiseModal({
                                      open: true,
                                      items: item.therapist.expertise.map(
                                        (x: any) => x.expertise
                                      ),
                                    })
                                  }
                                >
                                  <ThemedText className="text-xs text-[#8450A0] dark:text-[#c7a8e0] font-semibold">
                                    {e.expertise}
                                    {idx === 2 &&
                                    item.therapist.expertise.length > 3
                                      ? ` +${
                                          item.therapist.expertise.length - 3
                                        }`
                                      : ""}
                                  </ThemedText>
                                </Pressable>
                              ))}
                          </View>
                          {item.therapist.bio && (
                            <ThemedText className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                              {item.therapist.bio.length > 100
                                ? `${item.therapist.bio.substring(0, 100)}...`
                                : item.therapist.bio}
                            </ThemedText>
                          )}
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        )}
      />

      {/* decline modal */}
      <Modal
        visible={showDeclineModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDeclineModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 p-4">
          <Formik
            initialValues={declineInitialValues}
            validationSchema={DeclineSchema}
            onSubmit={async (values, { resetForm }) => {
              setDeclineSubmitting(true);
              await handleTherapistStatusUpdate(
                {
                  status: "declined",
                  id: selectedTherapist,
                  declinedReason: values.reason,
                },
                { skipModalClose: true }
              );
              setDeclineSubmitting(false);
              setShowDeclineModal(false);
              resetForm();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <ThemedText className="text-lg font-bold mb-4">
                  Why are you declining ?
                </ThemedText>

                <TextInput
                  className="border border-gray-300 dark:border-gray-600 rounded p-3 mb-1 dark:text-white"
                  placeholder="Enter your reason..."
                  multiline
                  numberOfLines={4}
                  onChangeText={handleChange("reason")}
                  onBlur={handleBlur("reason")}
                  value={values.reason}
                />

                {errors.reason && touched.reason && (
                  <Text className="text-red-500 text-sm mb-3">
                    {errors.reason}
                  </Text>
                )}

                <View className="flex-row justify-end space-x-3">
                  <TouchableOpacity
                    className="px-4 py-2 rounded"
                    onPress={() => setShowDeclineModal(false)}
                  >
                    <Text className="text-gray-600 dark:text-gray-300">
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`px-4 py-2 rounded ${
                      values.reason.trim() ? "bg-[#ff4444]" : "bg-gray-400"
                    }`}
                    onPress={() => handleSubmit()}
                    disabled={!values.reason.trim() || declineSubmitting}
                  >
                    <Text className="text-white">
                      {declineSubmitting ? "Declining..." : "Submit"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Modal>

      {/* expertise modal */}
      <Modal
        visible={expertiseModal.open}
        transparent
        animationType="fade"
        onRequestClose={() => setExpertiseModal({ open: false, items: [] })}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white dark:bg-[#2d223a] rounded-xl p-6 w-11/12 max-w-md max-h-[70vh]">
            <ThemedText
              type="title"
              className="text-xl font-bold text-[#8450A0] dark:text-white mb-4 text-center"
            >
              Expertise List
            </ThemedText>
            <ScrollView className="max-h-[50vh]" showsVerticalScrollIndicator>
              {expertiseModal.items.map((exp, idx) => (
                <View
                  key={idx}
                  className="py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <ThemedText className="text-base text-gray-800 dark:text-gray-100">
                    • {exp}
                  </ThemedText>
                </View>
              ))}
            </ScrollView>
            <Pressable
              className="mt-6 bg-[#8450A0] px-4 py-3 rounded-full items-center"
              onPress={() => setExpertiseModal({ open: false, items: [] })}
            >
              <ThemedText className="text-white font-semibold">
                Close
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}
