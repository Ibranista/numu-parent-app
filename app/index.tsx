import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/counter.slice";
import { AppDispatch, RootState } from "../store/store";

export default function Index() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl font-bold text-orange-500 mb-4">
        Counter: {count}
      </Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <View style={{ height: 10 }} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
}
