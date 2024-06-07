import {
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Image,
  Modal,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Platform,
} from "react-native";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { FontAwesome } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import RespHosp from "../components/RespHosp";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthContext from "../context/AuthContext";
import ModalContext from "../context/ModalContext";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import isEqual from "lodash/isEqual";
import {
  useFonts,
  MarkaziText_400Regular,
  MarkaziText_700Bold,
} from "@expo-google-fonts/markazi-text";

// import { Notifications } from 'expo';
const reqHospImg = require("../assets/requestHospital.png");

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

export default function ReqHospital({ navigation }) {
  let [fontsLoaded] = useFonts({
    MarkaziText_400Regular,
    MarkaziText_700Bold,
  });
  const [expoPushToken, setExpoPushToken] = useState();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const [isPressed, setIsPressed] = useState(false);
  const [location, setLocation] = useState({
    coords: {
      latitude: 30,
      longitude: 30,
    },
  });
  const [disease, setDisease] = useState("يصعب التشخيص");
  // const { disease } = useContext(AuthContext);
  // const { setDisease } = useContext(AuthContext);
  const [section, setSection] = useState("خاص أو حكومي");
  // const { section } = useContext(AuthContext);
  // const { setSection } = useContext(AuthContext);
  const [reqLocation, setReqLocation] = useState(false);
  const [notification, setNotification] = useState(false);
  const { visible, setVisible } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  // const { hospitals } = useContext(AuthContext);
  // const { setHospitals } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useContext(AuthContext);
  // ************
  // *** notification code *********
  // const sendNotification = async () => {
  //   console.log("send notification");
  //   const message = {
  //     to: expoPushToken,
  //     sound: "default",
  //     title: "شغلت النوتيفيكيشن يا صيع يا صيع",
  //     body: "بس فرونت بس بصراحه",
  //   };
  //   await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       host: "exp.host",
  //       accept: "application/json",
  //       "accept-encoding": "gzip, deflate",
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(message),
  //   });
  // };

  // useEffect(() => {
  //   console.log("registration");
  //   registerForPushNotificationsAsync()
  //     .then((token) => {
  //       console.log("token is ", token);
  //       setExpoPushToken(token);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     // Learn more about projectId:
  //     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  //     token = (
  //       await Notifications.getExpoPushTokenAsync({
  //         projectId: "f67db72d-7652-45fc-80c0-70a27f8c5fae",
  //       })
  //     ).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   return token;
  // }

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "f67db72d-7652-45fc-80c0-70a27f8c5fae",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: true,
  //     shouldSetBadge: false,
  //   }),
  // });

  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      const { data, ...rest } = notification;
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        // Pass the custom data along with the notification
        // This will include your custom icon
        ...rest,
        ...data,
      };
    },
  });

  const sendNotification = async () => {
    console.log("Sending notification...");

    // const message = {
    //   to: expoPushToken,
    //   sound: "default",
    //   title: "شغلت النوتيفيكيشن يا صيع يا صيع",
    //   body: "بس فرونت بس بصراحه",
    // };

    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Homepital Application",
      body: "تم تحديث المستشفيات المتاحة",
      // Add the following line to include your custom icon
      // You can replace 'logo.png' with the path to your custom icon file
      // Make sure to place your custom icon in the assets folder of your project
      // and update the path accordingly
      data: { image: require("../assets/logo.jpg") },
    };

    try {
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          host: "exp.host",
          accept: "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
      });
      console.log("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // *****************
  // **** scheduled requests **********

  // Define the interval for scheduled requests (adjust as needed)
  const pollingInterval = 1 * 60 * 1000; // 1 minutes in milliseconds
  const stopPollingAfter = 15 * 60 * 1000; // 3 minutes in milliseconds
  // useEffect(() => {
  //   if (location.coords.latitude !== 30) {
  //     const interval = setInterval(async () => {
  //       // await sendNotification()
  //       try {
  //         const data = await fetch(url, {
  //           method: "POST",
  //           headers: headers,
  //           body: JSON.stringify({
  //             section: section,
  //             case: disease,
  //             latitude: location.latitude,
  //             longitude: location.longitude,
  //           }),
  //         });
  //         console.log("disease : ", disease);
  //         console.log("section : ", section);

  //         const response = await data.json();
  //         console.log("data inside interval : ", response);

  //         setHospitals((prevHospitals) => {
  //           console.log("prev hosp", prevHospitals);
  //           if (!isEqual(response, prevHospitals)) {
  //             setNotification(true);
  //             console.log("data changed");
  //             return response;
  //           } else {
  //             setNotification(false);
  //             console.log("data didn't change");
  //             return prevHospitals;
  //           }
  //         });
  //       } catch (error) {
  //         console.error("Error fetching hospitals:", error);
  //       }
  //     }, pollingInterval);

  //     const timeout = setTimeout(() => {
  //       clearInterval(interval);
  //       console.log("Polling stopped after 3 minutes");
  //     }, stopPollingAfter);

  //     return () => {
  //       clearInterval(interval);
  //       clearTimeout(timeout);
  //     };
  //   }

  // }, [section, disease, location]);
  useEffect(() => {
    // Return early if latitude is 30
    if (location.coords.latitude === 30) {
      return;
    }

    const interval = setInterval(async () => {
      // await sendNotification()
      try {
        const data = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            section: section,
            case: disease,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }),
        });
        console.log("disease : ", disease);
        console.log("section : ", section);

        const response = await data.json();
        console.log("data inside interval : ", response);

        setHospitals((prevHospitals) => {
          console.log("prev hosp", prevHospitals);
          if (!isEqual(response, prevHospitals)) {
            setNotification(true);
            console.log("data changed");
            return response;
          } else {
            setNotification(false);
            console.log("data didn't change");
            return prevHospitals;
          }
        });
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    }, pollingInterval);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      console.log("Polling stopped after 3 minutes");
    }, stopPollingAfter);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [section, disease, location]);

  // ********************
  // animation
  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  useEffect(() => {
    startAnimation();
  }, [reqLocation]);

  // ************
  useEffect(() => {
    if (notification) {
      sendNotification();
    }
  }, [notification]);

  // sendNotification()
  const url = "http://192.168.1.6:8000/api/v1/select";

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const body = JSON.stringify({
    section: section,
    case: disease,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    // latitude:"30.158392910140286",
    // longitude:"31.62863789393309"
  });

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };

  const getHospitals = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();

      if (data) {
        console.log(" successful");
        console.log("location", location);
        // console.log(data);
        setHospitals(data);
        setVisible(true);
        // navigation.navigate("RespHosp")
        // setUser(data.data);
      } else {
        console.log("No token received");
        console.log(data);
        // setErrorMessage(data.message);
        // setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setReqLocation(false);
    setLoading(false);
    setLocation({
      coords: {
        latitude: 30,
        longitude: 30,
      },
    });
    // Perform your refresh logic here, such as fetching new data from an API

    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulate a delay of 2 seconds
  };

  useEffect(() => {
    if (reqLocation) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        try {
          let location = await Location.getCurrentPositionAsync({});
          setLocation({
            coords: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          });
          console.log(location);
        } catch (error) {
          console.log("Error getting current position:", error);
          // setReqLocation(false)
        }
      })();
    } else {
      console.log("false");
    }
  }, [reqLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#76b49f"} color={"white"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ff0000", "#00ff00", "#0000ff"]}
            tintColor="white"
            title="Loading..."
            titleColor="white"
            progressBackgroundColor="gray"
          />
        }
      >
        <View style={styles.imageContainer}>
          <Image source={reqHospImg} style={styles.hospImg} />
          {!token ? (
            <Pressable
              onPress={() => navigation.navigate("QuickTreat")}
              style={styles.aidPress}
            >
              <View style={styles.aidview}>
                <Text style={styles.aidtext}>الاسعافات الاولية</Text>
                <Ionicons name={"medkit"} size={27} color={"white"} />
              </View>
            </Pressable>
          ) : null}
        </View>
        <View style={styles.formContainer}>
          {/* choose disease */}
          <View style={styles.inputContainer}>
            <View style={styles.labelView}>
              <FontAwesome name="stethoscope" size={40} color="#76b49f" />
              <Text style={styles.label}>اختر المرض</Text>
            </View>
            <RNPickerSelect
              style={{
                inputIOS: {
                  backgroundColor: "#76b49f",
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                  color: "black",
                  paddingRight: 30, // to ensure the text is never behind the icon
                  marginTop: 10,
                },
                inputAndroid: {
                  backgroundColor: "#76b49f",
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 2,
                  borderColor: "purple",
                  borderRadius: 15,
                  color: "black",
                  paddingRight: 30, // to ensure the text is never behind the icon
                  marginTop: 10,
                },
              }}
              onValueChange={(value) => setDisease(value)}
              items={[
                { label: "غيبوبة", value: "غيبوبة" },
                { label: "نزيف", value: "نزيف" },
                { label: "ذبحة صدرية", value: "ذبحة صدرية" },
                { label: "جلطات", value: "جلطات" },
                { label: "أزمة قلبية", value: "أزمة قلبية" },
                { label: "تسمم", value: "تسمم" },
                { label: "حوادث", value: "حوادث" },
                { label: "حروق", value: "حروق" },
                { label: "عيون", value: "عيون" },
                { label: "نسا وتوليد", value: "نسا وتوليد" },
                { label: "يصعب التشخيص", value: "يصعب التشخيص" },
              ]}
              value={disease}
            />
          </View>
          {/* choose private or governmental */}
          <View style={styles.inputContainer}>
            <View style={styles.labelView}>
              <FontAwesome name="bank" size={40} color="#76b49f" />
              <Text style={styles.label}>اختر القطاع</Text>
            </View>
            <RNPickerSelect
              style={{
                inputIOS: {
                  backgroundColor: "#76b49f",
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                  color: "black",
                  paddingRight: 30, // to ensure the text is never behind the icon
                  marginTop: 10,
                },
                inputAndroid: {
                  backgroundColor: "#76b49f",
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 2,
                  borderColor: "purple",
                  borderRadius: 15,
                  color: "black",
                  paddingRight: 30, // to ensure the text is never behind the icon
                  marginTop: 10,
                },
              }}
              onValueChange={(value) => setSection(value)}
              items={[
                { label: "خاص", value: "خاص" },
                { label: "حكومي", value: "حكومي" },
                { label: "خاص أو حكومي ", value: "خاص أو حكومي" },
              ]}
              value={section}
            />
          </View>
          {/* location */}
          <View style={styles.inputContainer}>
            <View style={styles.labelView}>
              <FontAwesome name="crosshairs" size={40} color="#76b49f" />
              <Text style={styles.label}> مكانك الان</Text>
            </View>
            {/* input location */}
            {/* MapView component */}
            {reqLocation ? (
              <MapView
                style={{ flex: 1, height: 200 }}
                region={{
                  latitude: location ? location.coords.latitude : 30.0257723,
                  longitude: location ? location.coords.longitude : 31.1805767,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {location && (
                  <Marker
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    title="Your Location"
                  />
                )}
              </MapView>
            ) : (
              <View style={styles.locationImg}>
                <Pressable onPress={() => setReqLocation(true)}>
                  <Animated.View style={animatedStyle}>
                    <Entypo name="location-pin" size={100} color="#76b49f" />
                  </Animated.View>
                </Pressable>
              </View>
            )}
          </View>

          {/* submit button */}
          {loading ? (
            <ActivityIndicator
              animating={true}
              color="#76b49f"
              size={100}
              style={{ marginVertical: 20 }}
            />
          ) : (
            <Pressable
              onPress={getHospitals}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              disabled={location.coords.latitude == 30 ? true : false}
            >
              <Text
                style={[
                  styles.button,
                  { backgroundColor: isPressed ? "#9abf4d" : "#76b49f" },
                ]}
              >
                طلب
              </Text>
            </Pressable>
          )}
        </View>

        <RespHosp hospitals={hospitals} visible={visible} />
        {/* first aid for guest */}
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: StatusBar.currentHeight,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  hospImg: {
    width: 300,
    height: 300,
  },
  formContainer: {
    paddingVertical: 20,
  },
  inputContainer: {
    marginVertical: 20,
  },
  labelView: {
    flexDirection: "row-reverse", // Change the direction of the row to right-to-left
    alignItems: "center", // Align the items in the center
  },
  label: {
    color: "#76b49f",
    fontSize: 24,
    fontWeight: "600",
    marginRight: 10,
    fontFamily: "MarkaziText_700Bold",
  },
  locationImg: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    // fontWeight: "bold",
    fontFamily: "MarkaziText_700Bold",
    backgroundColor: "#900",
    color: "white",
    fontSize: 24,
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
  aidview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    backgroundColor: "#76b49f",
    width: "60%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  aidPress: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20
  },
  aidtext: {
    color: "white",
    fontFamily: "MarkaziText_700Bold",
    fontSize: 20
  }
});
