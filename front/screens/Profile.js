import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Toast } from "toastify-react-native";
import AuthContext from "../context/AuthContext";
import { useFonts, MarkaziText_400Regular, MarkaziText_700Bold } from '@expo-google-fonts/markazi-text';

const manImage = require("../assets/man-img.png");
const womenImage = require("../assets/women-img.png");

function Profile({ navigation }) {
  let [fontsLoaded] = useFonts({
    MarkaziText_400Regular,
    MarkaziText_700Bold,
  });
  const [isPressed, setIsPressed] = useState(false);
  const [user, setUser] = useState({});
  const [editEmail, setEditEmail] = useState(false);
  const [editUserName, setEditUserName] = useState(false);
  const [phone, setPhone] = useState(false);
  const [age, setAge] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("تم التحديث بنجاح");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useContext(AuthContext);
  const { setToken } = useContext(AuthContext);
  const [password, setPassword] = useState({
    currentPassword: "",
    updatedPassword: "",
    passwordConfirm: "",
  });
  // console.log(token);

  const url = "http://192.168.1.2:8000/api/v1/users/getMe";
  const url2 = "http://192.168.1.2:8000/api/v1/users/updateMe";
  const url3 = "http://192.168.1.2:8000/api/v1/users/chamgeMyPassword";
  // const JWT =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNiYmI3MzBmMzBlOWY5MDhkM2MxNWQiLCJpYXQiOjE3MDk1ODE1NDcsImV4cCI6MTcxODIyMTU0N30.zszPP723QEKMmT5Rer0yGkKYQiSyHjONW_uE2heCgjs";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const body = JSON.stringify({
    user,
  });
  const passBody = JSON.stringify({
    password,
  });
  const options1 = {
    method: "GET",
    headers: headers,
    // body: body,
  };
  const options2 = {
    method: "PUT",
    headers: headers,
    body: body,
  };
  const options3 = {
    method: "PUT",
    headers: headers,
    body: passBody,
  };

  const getUser = async (e) => {
    // e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(url, options1);
      const data = await response.json();

      if (data) {
        console.log(" successful");
        console.log(data);
        setUser(data.data);
      } else {
        console.log("No token received");
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const updateUser = async (field) => {
    try {
      const response = await fetch(url2, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          [field]: user[field], // Send only the updated field
        }),
      });

      const data = await response.json();

      if (data.errors) {
        console.log("Update failed");
        console.log(data.errors[0].msg);
        setErrorMessage(data.errors[0].msg);
        Toast.error(errorMessage);
      } else {
        console.log("Update successful");
        console.log(data);
        setSuccessMessage("تم التحديث بنجاح");
        Toast.success(successMessage);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const updatePass = async () => {
    try {
      const response = await fetch(url3, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          currentPassword: password.currentPassword,
          updatedPassword: password.updatedPassword,
          passwordConfirm: password.passwordConfirm,
        }),
      });

      const data = await response.json();

      if (data.errors) {
        console.log("Update failed");
        console.log(data);
        Toast.error(data.errors.map((err) => err.msg).join('\n'));
      } else if (data.error) {
        Toast.error(data.error, {
          style: {
            maxWidth: '90%'
          },
        });
      } else {
        console.log("Update successful");
        console.log(data);
        setSuccessMessage("تم التحديث بنجاح");
        Toast.success(successMessage);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const changeValue = (field) => {
    switch (field) {
      case "email":
        setEditEmail(true);
        break;
      case "userName":
        setEditUserName(true);
        break;
      case "phone":
        setPhone(true);
        break;
      case "age":
        setAge(true);
        break;
      case "password":
        setEditPassword(true);
        break;
      default:
        break;
    }
  };

  const saveChange = async (field) => {
    switch (field) {
      case "email":
        setEditEmail(false);
        await updateUser("email");
        break;
      case "userName":
        setEditUserName(false);
        await updateUser("userName");
        break;
      case "phone":
        setPhone(false);
        await updateUser("phone");
        break;
      case "age":
        setAge(false);
        await updateUser("age");
        break;
      case "password":
        setEditPassword(false);
        await updatePass();
        break;
      default:
        break;
    }
  };

  const logOut = () => {
    console.log("logout");
    setToken(null);
    // navigation.navigate("Index");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#76b49f"} color={"white"} />
      <ScrollView>
        {/* image */}
        <View style={styles.profileImgContainer}>
          {user.gender === "male" ? (
            <Image
              source={manImage}
              style={styles.profileImg}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={womenImage}
              style={styles.profileImg}
              resizeMode="contain"
            />
          )}
        </View>

        {/* {emial} */}
        <View style={styles.inputsView}>
          <View style={styles.labelView}>
            <View style={styles.title}>
              <FontAwesome name="envelope" size={30} color="white" />
              <Text style={styles.label}> البريد الالكتروني</Text>
            </View>
            {editEmail ? (
              <Pressable onPress={() => saveChange("email")}>
                <AntDesign name="checkcircle" size={30} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => changeValue("email")}>
                <FontAwesome name="pencil" size={30} style={styles.icon} />
              </Pressable>
            )}
          </View>
          {!editEmail ? (
            <Text style={styles.value}>{user.email}</Text>
          ) : (
            <TextInput
              style={styles.input}
              placeholder=" البريد الالكتروني"
              placeholderTextColor={"#071355"}
              keyboardType="email-address"
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
          )}
        </View>
        {/* {name} */}
        <View style={styles.inputsView}>
          <View style={styles.labelView}>
            <View style={styles.title}>
              <FontAwesome name="user" size={30} color="white" />
              <Text style={styles.label}> الاسم </Text>
            </View>
            {editUserName ? (
              <Pressable onPress={() => saveChange("userName")}>
                <AntDesign name="checkcircle" size={30} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => changeValue("userName")}>
                <FontAwesome name="pencil" size={30} style={styles.icon} />
              </Pressable>
            )}
          </View>
          {!editUserName ? (
            <Text style={styles.value}>{user.userName}</Text>
          ) : (
            <TextInput
              style={styles.input}
              placeholder=" اسم المستخدم"
              placeholderTextColor={"#071355"}
              keyboardType="default"
              value={user.userName}
              onChangeText={(text) => setUser({ ...user, userName: text })}
            />
          )}
        </View>
        {/* {phone} */}
        <View style={styles.inputsView}>
          <View style={styles.labelView}>
            <View style={styles.title}>
              <Feather name="phone" size={30} color="white" />
              <Text style={styles.label}> الهاتف </Text>
            </View>
            {phone ? (
              <Pressable onPress={() => saveChange("phone")}>
                <AntDesign name="checkcircle" size={30} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => changeValue("phone")}>
                <FontAwesome name="pencil" size={30} style={styles.icon} />
              </Pressable>
            )}
          </View>
          {!phone ? (
            <Text style={styles.value}>{user.phone}</Text>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="الهاتف"
              placeholderTextColor={"#071355"}
              keyboardType="phone-pad"
              value={user.phone}
              onChangeText={(text) => setUser({ ...user, phone: text })}
            />
          )}
        </View>
        {/* {age} */}
        <View style={styles.inputsView}>
          <View style={styles.labelView}>
            <View style={styles.title}>
              <AntDesign name="idcard" size={30} color="white" />
              <Text style={styles.label}> العمر </Text>
            </View>
            {age ? (
              <Pressable onPress={() => saveChange("age")}>
                <AntDesign name="checkcircle" size={30} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => changeValue("age")}>
                <FontAwesome name="pencil" size={30} style={styles.icon} />
              </Pressable>
            )}
          </View>
          {!age ? (
            <Text style={styles.value}>{user.age}</Text>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="العمر"
              placeholderTextColor={"#071355"}
              keyboardType="phone-pad"
              value={String(user.age)} // Ensure the value is a string
              onChangeText={(text) => setUser({ ...user, age: text })}
            />
          )}
        </View>
        {/* {password} */}
        <View style={styles.inputsView}>
          <View style={styles.labelView}>
            <View style={styles.title}>
              <FontAwesome name="key" size={30} color="white" />
              <Text style={styles.label}> كلمه السر </Text>
            </View>
            {editPassword ? (
              <Pressable onPress={() => saveChange("password")}>
                <AntDesign name="checkcircle" size={30} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => changeValue("password")}>
                <FontAwesome name="pencil" size={30} style={styles.icon} />
              </Pressable>
            )}
          </View>
          {!editPassword ? (
            <Text style={styles.value}>*</Text>
          ) : (
            <View>
              <TextInput
                style={styles.input}
                placeholder="كلمة المرور الحالية"
                placeholderTextColor={"#071355"}
                keyboardType="default"
                secureTextEntry={true}
                value={password.currentPassword}
                onChangeText={(text) =>
                  setPassword({ ...password, currentPassword: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder=" كلمة المرور الجديده"
                placeholderTextColor={"#071355"}
                keyboardType="default"
                secureTextEntry={true}
                value={password.updatedPassword}
                onChangeText={(text) =>
                  setPassword({ ...password, updatedPassword: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder=" تاكيد كلمة المرور الجديده"
                placeholderTextColor={"#071355"}
                keyboardType="default"
                secureTextEntry={true}
                value={password.passwordConfirm}
                onChangeText={(text) =>
                  setPassword({ ...password, passwordConfirm: text })
                }
              />
            </View>
          )}
        </View>
        {/* logout button */}
        <View style={styles.logoutView}>
          <Pressable
            style={[
              styles.logOut,
              { backgroundColor: isPressed ? "#76b49f" : "#9abf4d" },
            ]}
            onPress={logOut}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <Text style={styles.logOutText}>تسجيل الخروج </Text>
            <MaterialIcons name="logout" size={24} color="white" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: StatusBar.currentHeight,
    backgroundColor: "#f5f5f5",
  },
  profileImgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImg: {
    // height: '60%',
    width: 400,
    height: 300,
  },
  logOut: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 13,
  },
  logoutView: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  logOutText: {
    fontSize: 18,
    // fontWeight: "700",
    paddingRight: 5,
    color: "white",
    fontFamily: 'MarkaziText_700Bold',
  },
  inputsView: {
    backgroundColor: "#76b49f",
    marginVertical: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 13,
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
    fontFamily: 'MarkaziText_700Bold',
  },
  labelView: {
    flexDirection: "row-reverse", // Change the direction of the row to right-to-left
    alignItems: "center", // Align the items in the center
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "right",
    marginRight: 10,
    fontFamily: 'MarkaziText_700Bold',
    // fontStyle:"italic"
  },
  icon: {
    alignItems: "flex-start",
  },
  title: {
    flexDirection: "row-reverse",
  },
  value: {
    fontSize: 20,
    fontWeight: "400",
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontFamily: 'MarkaziText_400Regular',
    // borderBottomWidth: 2,
    // borderBottomColor: "#071355",
  },
});
