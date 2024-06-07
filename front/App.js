import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import ToastManager from "toastify-react-native";
import "react-toastify/dist/ReactToastify.css";
import Index from "./screens/Index";
import Signup from "./screens/SignupScreen";
import ReqHospital from "./screens/ReqHospital";
import SigninScreen from "./screens/SigninScreen";
import Profile from "./screens/Profile";
import EnterEmail from "./screens/Forgetpassword/EnterEmail";
import ResetPassword from "./screens/Forgetpassword/ResetPassword";
import EnterVCode from "./screens/Forgetpassword/EnterVCode";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import {
  useFonts,
  MarkaziText_400Regular,
  MarkaziText_700Bold,
} from "@expo-google-fonts/markazi-text";
import QuickTreat from "./screens/quickTreatment";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true); // Ignore all log notifications

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ReqHospital"
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: "#9abf4d",

        tabBarStyle: {
          backgroundColor: "white",
          height: 70,
          paddingBottom: 7,
          shadowColor: "black",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          fontFamily: "MarkaziText_700Bold",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "الصفحه الشخصيه",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={"person"}
              size={27}
              color={color}
              style={{ fontWeight: "600" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QuickTreat"
        component={QuickTreat}
        options={{
          tabBarLabel: "اسعافات اولية",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={"medkit"}
              size={27}
              color={color}
              style={{ fontWeight: "600" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ReqHospital"
        component={ReqHospital}
        options={{
          tabBarLabel: "طلب مستشفي",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="hospital" size={27} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        headerStyle: { backgroundColor: "#76b49f" },
        headerTitleStyle: {
          textAlign: "right",
          fontFamily: "MarkaziText_700Bold",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        fontFamily: "MarkaziText_700Bold",
      }}
    >
      <Stack.Screen
        name="Index"
        component={Index}
        options={{ headerShown: false }}
      />
              <Stack.Screen
        name="QuickTreat"
        component={QuickTreat}
        options={{ headerShown: true }}
      />
        
      <Stack.Screen
        name="SigninScreen"
        component={SigninScreen}
        options={{ headerShown: true, title: "تسجيل الدخول" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: true, title: " انشاء حساب" }}
      />
      <Stack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{ headerShown: true, title: "ادخال الايميل" }}
      />
      <Stack.Screen
        name="EnterVCode"
        component={EnterVCode}
        options={{ headerShown: true, title: " ادخال كود التاكيد" }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: true, title: "ادخال كلمة المرور الجديدة" }}
      />
      <Stack.Screen
        name="ReqHospital"
        component={ReqHospital}
        options={{ headerShown: true, title: "طلب مستشفي" }}
      />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
      <ToastManager
        style={{ width: "100%", paddingVertical: 10, height: "auto" }}
      />
    </NavigationContainer>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    MarkaziText_400Regular,
    MarkaziText_700Bold,
  });
  return (
    <AuthProvider>
      <ModalProvider>
        <MainNavigator />
      </ModalProvider>
    </AuthProvider>
  );
}
