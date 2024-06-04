import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
  ScrollView,
} from "react-native";
import { Toast } from "toastify-react-native";
import { Formik } from "formik";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome } from "@expo/vector-icons";
import * as Yup from "yup";
const signupImage = require("../assets/signup-img.png");
import { useFonts, MarkaziText_400Regular, MarkaziText_700Bold } from '@expo-google-fonts/markazi-text';

export default function Signup({ navigation }) {
  let [fontsLoaded] = useFonts({
    MarkaziText_400Regular,
    MarkaziText_700Bold,
  });
  const [isPressed, setIsPressed] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [gender, setGender] = useState("male");

  const formValidation = Yup.object().shape({
    userName: Yup.string()
      .min(3, "اسم المستخدم ثلاثة حروف او اكتر")
      .max(15, "اسم المستخدم اقل من 15 حرف")
      .required("يرجى ادخال اسم المستخدم"),
    email: Yup.string()
      .email("الخاص بك بطريقة صحيحة'gmail'يرجى ادخال ")
      .required("الخاص بك'gmail'يرجى ادخال"),
    password: Yup.string()
      .required("يرجى ادخال كلمة المرور")
      .matches(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/,
        "يجب ان تحتوي كلمة المرور علي ستة أحرف علي الاقل وحرف كبير وحرف خاص ($,@,&,!)"
      ),
    passwordConfirm: Yup.string()
      .required("يرجي تاكيد كلمه المرور")
      .oneOf([Yup.ref("password")], "تأكيد كلمة المرور غير صحيح"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف يجب ان يكون مصرى")
      .required("يرجى ادخال رقم الهاتف"),
    age: Yup.string().required("يرجى ادخال العمر"),
  });

  const registerSubmit = async (values) => {
    console.log("submit");
    try {
      const response = await fetch(
        "http://192.168.1.2:8000/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: values.userName,
            email: values.email,
            phone: values.phone,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
            gender: gender,
            age: values.age,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.errors) {
        console.log("err in errors", data.errors.map(err => err.msg));
        Toast.error(data.errors.map(err => err.msg));
      }
      else {
        console.log("successsssss", data);
        Toast.success("تم انشاء حساب ");
        setTimeout(() => {
          navigation.navigate("SigninScreen");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#76b49f"} color={"white"} />
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          passwordConfirm: "",
          phone: "",
          gender: "",
          age: "",
        }}
        validationSchema={formValidation}
        onSubmit={(values) => registerSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.imageContainer}>
                <Image
                  source={signupImage}
                  style={styles.signupImg}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.createAcc}>
                <FontAwesome name="stethoscope" size={60} color="#76b49f" />
                <Text style={styles.createAccText}>إنشاء حساب</Text>
              </View>
              <View>
                {/* {apiError?<Text style={{ fontSize: 10, color: 'red' }}>{apiError}</Text>:""} */}
              </View>
              {/* user name */}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="user" size={30} color="#76b49f" />
                  <Text style={styles.label}> اسم المستخدم</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="اسم المستخدم"
                  placeholderTextColor={"#071355"}
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                />
                {errors.userName && touched.userName ? (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.userName}
                  </Text>
                ) : (
                  ""
                )}
              </View>
              {/* age*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="calendar" size={30} color="#76b49f" />
                  <Text style={styles.label}> العمر</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="العمر "
                  placeholderTextColor={"#071355"}
                  keyboardType="numeric"
                  onChangeText={handleChange("age")}
                  onBlur={handleBlur("age")}
                  value={values.age}
                />
                {errors.age && touched.age ? (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.age}
                  </Text>
                ) : (
                  ""
                )}
              </View>
              {/* phone*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="phone" size={30} color="#76b49f" />
                  <Text style={styles.label}> الهاتف</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder=" الهاتف"
                  placeholderTextColor={"#071355"}
                  keyboardType="phone-pad"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                {errors.phone && touched.phone ? (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.phone}
                  </Text>
                ) : (
                  ""
                )}
              </View>
              {/* email*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="envelope" size={30} color="#76b49f" />
                  <Text style={styles.label}> البريد الالكتروني</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="******@gmail.com"
                  placeholderTextColor={"#071355"}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.email}
                  </Text>
                ) : (
                  ""
                )}
              </View>
              {/* password*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="key" size={30} color="#76b49f" />
                  <Text style={styles.label}> كلمه المرور</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="  كلمه المرور"
                  placeholderTextColor={"#071355"}
                  keyboardType="default"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.password}
                  </Text>
                ) : (
                  ""
                )}
              </View>
              {/* confirmpassword*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="key" size={30} color="#76b49f" />
                  <Text style={styles.label}> تأكيد كلمه المرور</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder=" تأكيد كلمه المرور"
                  placeholderTextColor={"#071355"}
                  keyboardType="default"
                  secureTextEntry={true}
                  onChangeText={handleChange("passwordConfirm")}
                  onBlur={handleBlur("passwordConfirm")}
                  value={values.passwordConfirm}
                />
                {errors.passwordConfirm && touched.passwordConfirm && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.passwordConfirm}
                  </Text>
                )}
              </View>
              {/* gender*/}
              <View style={styles.inputsView}>
                <View style={styles.labelView}>
                  <FontAwesome name="venus-mars" size={30} color="#9abf4d" />
                  <Text style={styles.label}> النوع </Text>
                </View>
                <RNPickerSelect
                  onValueChange={(value) => setGender(value)}
                  items={[
                    { label: "ذكر", value: "male" },
                    { label: "انثي", value: "female" },
                  ]}
                  onChangeText={handleChange("gender")}
                  onBlur={handleBlur("gender")}
                  value={gender}
                />
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
                  type="submit"
                >
                  تسجيل{" "}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: StatusBar.currentHeight,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  signupImg: {
    // flex: 0.5, // Set the width of the image to 20% of its parent's width
    // aspectRatio: 1, // Maintain the aspect ratio of the image
    width: 300,
    height: 300,
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
    fontFamily: 'MarkaziText_700Bold',
  },
  signupIcon: {
    width: 200,
    height: 100,
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
    fontFamily: 'MarkaziText_400Regular',
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
    fontFamily: 'MarkaziText_400Regular',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    // fontWeight: "bold",
    fontFamily: 'MarkaziText_700Bold',
    backgroundColor: "#900",
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
    marginVertical: 20,
  },
});
