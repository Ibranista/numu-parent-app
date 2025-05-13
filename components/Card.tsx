import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Card({
  children,
  title,
  subTitle,
  submitText,
  handleSubmit,
  StepIcon,
}: {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  submitText?: string;
  handleSubmit?: () => void;
  StepIcon?: React.FC;
}) {
  return (
    <View style={styles.card}>
      {StepIcon ? (
        <StepIcon />
      ) : (
        <Icon
          name="user-circle"
          size={40}
          color="#8e44ad"
          style={styles.userIcon}
        />
      )}
      <Text style={styles.subHeader}>{title}</Text>
      <Text style={styles.header}>{subTitle}</Text>
      {children}
      {handleSubmit && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.nextText}>
            {submitText ? submitText : "Next"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 25,
    margin: 20,
    borderRadius: 12,
    elevation: 3,
  },
  userIcon: {
    alignSelf: "center",
    marginBottom: 10,
  },

  subHeader: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
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
});
