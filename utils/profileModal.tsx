import { useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";

const useSlideAnimation = (initialVisible = false) => {
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const [modalVisible, setModalVisible] = useState(initialVisible);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setModalVisible(false));
  };

  return {
    modalVisible,
    slideAnim,
    openModal,
    closeModal,
  };
};

export default useSlideAnimation;
