import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { Toast } from "toastify-react-native";
import AuthContext from "../context/AuthContext";
import {
  useFonts,
  MarkaziText_400Regular,
  MarkaziText_700Bold,
} from "@expo-google-fonts/markazi-text";

const signin = require("../assets/signin.png");

function SigninScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    MarkaziText_400Regular,
    MarkaziText_700Bold,
  });
  const [isPressed, setIsPressed] = useState(false);
  const [isPressedSignup, setIsPressedSignup] = useState(false);
  const [isPressedForget, setIsPressedForget] = useState(false);
  const [isPressedGuest, setIsPressedGuest] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("تم تسجيل الدخول بنجاح");
  const [errorMessage, setErrorMessage] = useState(
    "خطأ في الايميل او كلمة المرور"
  );
  const [errors, setErrors] = useState({});
  const { setToken } = useContext(AuthContext);

  const validateForm = () => {
    let errors = {};

    if (!email) errors.email = "يرجي ادخال ايميل";
    if (!password) errors.password = "يرجي ادخال كلمة المرور";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const url = "http://192.168.1.2:8000/api/v1/auth/login";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + AsyncStorage.getItem("JWT"),
  };
  const body = JSON.stringify({
    email: email,
    password: password,
  });
  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };

  const handleSubmit = async () => {
    // Prevent default form submission behavior

    if (validateForm()) {
      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.token) {
          // Set the success message first
          setSuccessMessage("تم تسجيل الدخول");

          // Update AsyncStorage with the token
          await AsyncStorage.setItem("JWT", data.token);
          setToken(data.token);

          // Display the success toast message after the state has been updated

          Toast.success(successMessage);

          setErrorMessage(null);
          setTimeout(() => {
            navigation.navigate("Index");
          }, 3000);
        } else {
          // Set the error message
          setErrorMessage(data.message);
          Toast.error(errorMessage);
          setSuccessMessage(null);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.contanier}>
      {/* <Image source={bg} style={styles.Image} resizeMode="cover" /> */}
      {/* <StatusBar backgroundColor="#3447b2" /> */}
      <StatusBar backgroundColor={"#76b49f"} color={"white"} />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={signin}
            style={styles.signupImg}
            resizeMode="contain"
          />
        </View>

        <View style={styles.form}>
          <View style={styles.createAcc}>
            <FontAwesome name="stethoscope" size={60} color="#76b49f" />
            <Text style={styles.createAccText}>تسجيل الدخول</Text>
          </View>
          {/* {errorMessage != null ? (
            <Text style={styles.errorMsg}>{errorMessage}</Text>
          ) : null}
          {successMessage != null ? (
            <Text style={styles.successMsg}>{successMessage}</Text>
          ) : null} */}
          <View style={styles.inputsView}>
            <View style={styles.labelView}>
              <FontAwesome name="envelope" size={30} color="#76b49f" />
              <Text style={styles.label}> البريد الالكتروني</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="*****@gmail.com"
              placeholderTextColor={"#071355"}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>
          <View style={styles.inputsView}>
            <View style={styles.labelView}>
              <FontAwesome name="key" size={30} color="#76b49f" />
              <Text style={styles.label}> كلمه المرور</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="******"
              placeholderTextColor={"#071355"}
              keyboardType="default"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>
          <View style={styles.quesContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate("ReqHospital");
              }}
              onPressIn={() => setIsPressedGuest(true)}
              onPressOut={() => setIsPressedGuest(false)}
            >
              <Text
                style={[
                  styles.signupLink,
                  { color: isPressedGuest ? "#9abf4d" : "blue" },
                ]}
              >
                  دخول كزائر
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("EnterEmail");
              }}
              onPressIn={() => setIsPressedForget(true)}
              onPressOut={() => setIsPressedForget(false)}
            >
              <Text
                style={[
                  styles.signupLink,
                  { color: isPressedForget ? "#9abf4d" : "blue" },
                ]}
              >
                هل نسيت كلمة المرور؟
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("Signup");
              }}
              onPressIn={() => setIsPressedSignup(true)}
              onPressOut={() => setIsPressedSignup(false)}
            >
              <Text
                style={[
                  styles.forgetPass,
                  { color: isPressedSignup ? "#9abf4d" : "blue" },
                ]}
              >
                انشاء حساب
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={handleSubmit}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <Text
              style={[
                styles.button,
                { backgroundColor: isPressed ? "#9abf4d" : "#76b49f" },
              ]}
            >
              تسجيل{" "}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SigninScreen;

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    // paddingVertical: StatusBar.currentHeight,
    justifyContent: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  signupImg: {
    // flex: 0.5, // Set the width of the image to 20% of its parent's width
    // aspectRatio: 1, // Maintain the aspect ratio of the image
    width: "100%",
    height: 350,
    marginBottom: 20,
  },
  form: {
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 40,
    paddingHorizontal: 20,
  },
  inputsView: {
    marginTop: 40,
  },
  input: {
    borderBottomColor: "#9abf4d",
    borderBottomWidth: 2,
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    backgroundColor: "white",
    color: "#071355",
    paddingHorizontal: 5,
    textAlign: "right",
    fontFamily: "MarkaziText_400Regular",
  },
  labelView: {
    flexDirection: "row-reverse", // Change the direction of the row to right-to-left
    alignItems: "center", // Align the items in the center
  },
  label: {
    color: "#76b49f",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "right",
    marginRight: 10,
    fontFamily: "MarkaziText_400Regular",
  },
  createAcc: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  createAccText: {
    fontSize: 30,
    // fontWeight: "bold",
    color: "#76b49f",
    fontFamily: "MarkaziText_700Bold",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    // fontWeight: "bold",
    fontFamily: "MarkaziText_700Bold",
    color: "white",
    fontSize: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 10,
    textAlign: "center",
    marginVertical: 30,
  },
  successMsg: {
    marginVertical: 10,
    color: "green",
    fontSize: 22,
    fontWeight: "500",
  },
  errorMsg: {
    marginVertical: 10,
    color: "#900",
    fontSize: 22,
    fontWeight: "500",
  },
  quesContainer: {
    marginTop: 20,
  },
  signupLink: {
    marginBottom: 10,
    fontSize: 20,
    textDecorationColor: "black",
    textDecorationLine: "underline",
    marginBottom: 15,
    fontFamily: "MarkaziText_400Regular",
  },
  forgetPass: {
    marginBottom: 10,
    fontSize: 20,
    textDecorationColor: "black",
    textDecorationLine: "underline",
    fontFamily: "MarkaziText_400Regular",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
