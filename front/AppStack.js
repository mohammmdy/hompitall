// import { StyleSheet, Text, View } from "react-native";
// import Index from "./screens/Index";
// import Signup from "./screens/SignupScreen";
// import ReqHospital from "./screens/ReqHospital";
// import SigninScreen from "./screens/SigninScreen";
// import Profile from "./screens/Profile";
// import EnterEmail from "./screens/Forgetpassword/EnterEmail";
// import ToastManager from "toastify-react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import ResetPassword from "./screens/Forgetpassword/ResetPassword";
// import EnterVCode from "./screens/Forgetpassword/EnterVCode";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import RespHosp from './components/RespHosp';

// const Stack = createNativeStackNavigator();
// // export const AboutStack = () => {
// //   return (
// //     <Stack.Navigator
// //     initialRouteName="Index"
// //       screenOptions={{
// //         headerStyle: { backgroundColor: "#6a51ae" },
// //         headerTitleStyle: { fontWeight: "bold" },
// //         headerTintColor: "#fff",
// //         contentStyle: { backgroundColor: "#e8e4f3" },
// //       }}
// //     >
// //        <Stack.Screen name="Index" component={Index} />
// //         <Stack.Screen name="EnterEmail" component={EnterEmail} />
// //         <Stack.Screen name="Profile" component={Profile} />
// //         <Stack.Screen name="EnterVCode" component={EnterVCode} />
// //         <Stack.Screen name="ResetPassword" component={ResetPassword} />
// //         <Stack.Screen name="ReqHospital" component={ReqHospital} />
// //         <Stack.Screen name="SigninScreen" component={SigninScreen} />
// //         <Stack.Screen name="Signup" component={Signup} />
// //         <Stack.Screen name="RespHosp" component={RespHosp} />
// //     </Stack.Navigator>
// //   );
// // };

// export default function AppStack() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Index">
//         <Stack.Screen name="Index" component={Index} />
//         <Stack.Screen name="EnterEmail" component={EnterEmail} />
//         <Stack.Screen name="Profile" component={Profile} />
//         <Stack.Screen name="EnterVCode" component={EnterVCode} />
//         <Stack.Screen name="ResetPassword" component={ResetPassword} />
//         <Stack.Screen name="ReqHospital" component={ReqHospital} />
//         <Stack.Screen name="SigninScreen" component={SigninScreen} />
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="RespHosp" component={RespHosp} />
//       </Stack.Navigator>
//       <AboutStack/>
//       <ToastManager/>
//     </NavigationContainer>

//   );
//   {
//     /* <View style={styles.container}>*/
//   }
//   {
//     /* <Index/> */
//   }
//   {
//     /* <Signup/> */
//   }
//   {
//     /* <ReqHospital/>  */
//   }
//   {
//     /* <SigninScreen/>  */
//   }
//   {
//     /* <Profile/> */
//   }
//   {
//     /* <EnterEmail/> */
//   }
//   {
//     /* <EnterVCode/> */
//   }
//   {
//     /* <ResetPassword/> */
//   }
//   {
//     /* <EnterEmail/> */
//   }
//   {
//     /* <ToastManager/>*/
//   }
//   {
//     /*</View>*/
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });

// ************************************************************************
import { Pressable, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./screens/Index";
import Signup from "./screens/SignupScreen";
import ReqHospital from "./screens/ReqHospital";
import SigninScreen from "./screens/SigninScreen";
import Profile from "./screens/Profile";
import EnterEmail from "./screens/Forgetpassword/EnterEmail";
import ResetPassword from "./screens/Forgetpassword/ResetPassword";
import EnterVCode from "./screens/Forgetpassword/EnterVCode";
import RespHosp from "./components/RespHosp";

const Stack = createNativeStackNavigator();

export const AboutStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerStyle: { backgroundColor: "#6a51ae" },
        headerTitleStyle: { fontWeight: "bold" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#e8e4f3" },
      }}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="EnterEmail" component={EnterEmail} />
      <Stack.Screen name="Profile" component={Profile} />{" "}
      <Stack.Screen name="EnterVCode" component={EnterVCode} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ReqHospital" component={ReqHospital} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="RespHosp" component={RespHosp} />
    </Stack.Navigator>
  );
};

export default function AppStack() {
  return <AboutStack />;
}
