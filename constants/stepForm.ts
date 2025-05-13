import { StyleSheet } from "react-native";

export const options = [
    {
        label: "Yes",
        value: true,
        icon: require("@/assets/images/right_icon.png"),
    },
    { label: "No", value: false, icon: require("@/assets/images/x_icon.png") },
];

export const stylesToggle = StyleSheet.create({
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 16,
    },
    toggleButton: {
        flexDirection: "column",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: "#fff",
    },
    toggleButtonSelected: {
        borderColor: "#f0e7ff",
        backgroundColor: "#8e44ad",
    },
    iconCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#4d4d4d",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 4,
    },
    toggleText: {
        fontSize: 14,
        color: "#333",
    },
    toggleTextSelected: {
        fontWeight: "600",
        color: "#fff",
    },
});