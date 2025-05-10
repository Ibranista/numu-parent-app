import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth, NextOrObserver, onAuthStateChanged, signOut, User } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const logout = () => signOut(auth);

export const onAuthChange = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);
};
