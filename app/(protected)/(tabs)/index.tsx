import { decrement, increment } from "@/features/counter/counter.slice";
import { logout } from "@/firebaseConfig";
import { AppDispatch, RootState } from "@/store/store";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const authState = useContext(AuthContext);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="log me out!" onPress={authState.logOut} />
      <Button
        title="Logout"
        onPress={handleLogout}
        color="#FF6347"
        accessibilityLabel="Logout"
        accessibilityState={{ disabled: false }}
      />
      <Text className="text-3xl font-bold text-orange-500 mb-4">
        Counter: {count}
      </Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <View style={{ height: 10 }} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
}
