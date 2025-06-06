import { selectAuthUser } from "@/features/auth/selector";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Index() {
  const authUser = useSelector(selectAuthUser);

  const firstName = authUser?.user?.first_name || "";
  const lastName = authUser?.user?.last_name || "";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8450A0",
        paddingHorizontal: 24,
      }}
    >
      <Image
        source={require("../../../assets/images/numulogo.png")}
        style={{
          width: 160,
          height: 160,
          marginBottom: 32,
          resizeMode: "contain",
        }}
        accessibilityLabel="We Care Logo"
      />
      <Text className="text-3xl font-bold text-white mb-4 text-center">
        Welcome {firstName} {lastName}
      </Text>
      <Text className="text-lg text-center text-white mb-6 max-w-md">
        Welcome to Numu Child Care! Here you can create your child profile,
        accept therapist matches, and manage your child&apos;s care journey. We
        appreciate you for caring for your children and trusting us to support
        you.
      </Text>
      {/*
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <View style={{ height: 10 }} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      */}
    </View>
  );
}
