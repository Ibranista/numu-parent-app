import { clearAuth } from "@/features/auth/authSlice";
import { selectAuthUser } from "@/features/auth/selector";
import { logout } from "@/firebaseConfig";
import { useAppDispatch } from "@/hooks/stateHooks";
import { persistor } from "@/store/store";
import { profileModalStyles } from "@/styles/profileModalStyle";
import useSlideAnimation from "@/utils/profileModal";
import { Animated, Modal, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function ProfileModalUI() {
  const authUser = useSelector(selectAuthUser);
  const dispatch = useAppDispatch();

  const { user } = authUser ?? {};
  const { first_name, last_name, email } = user ?? {};

  const { modalVisible, slideAnim, openModal, closeModal } =
    useSlideAnimation();

  const handleLogout = async () => {
    await logout();
    dispatch(clearAuth());
    persistor.purge();
  };

  return (
    <>
      <TouchableOpacity
        style={profileModalStyles.circleButton}
        onPress={openModal}
        activeOpacity={0.7}
      >
        <Text style={profileModalStyles.circleText}>
          {first_name?.charAt(0)}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={profileModalStyles.overlay}
          activeOpacity={1}
          onPress={closeModal}
        />
        <Animated.View
          style={[profileModalStyles.modalContainer, { right: slideAnim }]}
        >
          <Text style={profileModalStyles.modalTitle}>
            {first_name} {last_name}
          </Text>
          <Text style={profileModalStyles.modalName}>{email}</Text>
          <TouchableOpacity
            style={profileModalStyles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={profileModalStyles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </>
  );
}
