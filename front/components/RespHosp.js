import {
  StyleSheet,
  Modal,
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  Linking,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import ModalContext from "../context/ModalContext";
import {
  useFonts,
  MarkaziText_400Regular,
  MarkaziText_700Bold,
} from "@expo-google-fonts/markazi-text";

export default function RespHosp({ hospitals, visible }) {
  let [fontsLoaded] = useFonts({
    MarkaziText_400Regular,
    MarkaziText_700Bold,
  });
  const { setVisible } = useContext(ModalContext);
  // const navigation = useNavigation();
  const hospImg = require("../assets/hospital-icon.png");

  const handleLocationPress = (link) => {
    Linking.openURL(link);
  };
  console.log(hospitals);
  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => (visible = true)}
      >
        <Pressable onPress={() => setVisible(false)}>
          <AntDesign
            name="closecircle"
            size={24}
            color="black"
            style={{ marginHorizontal: 10, marginVertical: 10 }}
          />
        </Pressable>
        <FlatList
          data={hospitals.list1} // Assuming "hospitals" is the response data
          renderItem={({ item }) => (
            <View key={item.hospital_name} style={styles.card}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{item.hospital_name}</Text>
                <Image source={hospImg} style={{ width: 80, height: 80 }} />
              </View>
              <View style={styles.subTitle}>
                <Text style={styles.cardText}>التلفون: {item.phone}</Text>
                <AntDesign name="phone" size={30} color="white" />
              </View>
              <View style={styles.subTitle}>
                <Text style={styles.cardText}>القطاع: {item.type}</Text>
                <FontAwesome name="money" size={30} color="white" />
              </View>
              <View style={styles.subTitle}>
                <Pressable onPress={() => handleLocationPress(item.address)}>
                  <Text style={[styles.cardText, { color: "#0f81f0" }]}>
                    الموقع
                  </Text>
                </Pressable>
                <Entypo name="location-pin" size={30} color="white" />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.hospital_name}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          ListEmptyComponent={<Text> لا يوجد مستشفيات متاحة الان</Text>}
          ListHeaderComponent={
            <Text style={styles.headerText}>
              المستشفيات المتاحة والقريبة من موقعك الآن :{" "}
            </Text>
          }
          ListFooterComponent={
            // <Text style={styles.footerText}>مع التمنيات بالسلامة</Text>
            <FlatList
              data={hospitals.list2} // Assuming "hospitals" is the response data
              renderItem={({ item }) => (
                <View key={item.hospital_name} style={styles.card}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{item.hospital_name}</Text>
                    <Image source={hospImg} style={{ width: 80, height: 80 }} />
                  </View>
                  <View style={styles.subTitle}>
                    <Text style={styles.cardText}>التلفون: {item.phone}</Text>
                    <AntDesign name="phone" size={30} color="white" />
                  </View>
                  <View style={styles.subTitle}>
                    <Text style={styles.cardText}>القطاع: {item.type}</Text>
                    <FontAwesome name="money" size={30} color="white" />
                  </View>
                  <View style={styles.subTitle}>
                    <Text style={styles.cardText}>
                      متوقع تكون متاحة خلال:{" "}
                      {item.availabilityTime == 0
                        ? "لحظات"
                        : `${item.availabilityTime} minutes`}
                    </Text>
                    <Entypo name="time-slot" size={30} color="white" />
                  </View>
                  <View style={styles.subTitle}>
                    <Pressable
                      onPress={() => handleLocationPress(item.address)}
                    >
                      <Text style={[styles.cardText, { color: "#0f81f0" }]}>
                        الموقع
                      </Text>
                    </Pressable>
                    <Entypo name="location-pin" size={30} color="white" />
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.hospital_name}
              ItemSeparatorComponent={() => (
                <View style={{ height: 16 }}></View>
              )}
              ListEmptyComponent={
                <Text>لا يوجد مستشفيات سوف تكون متاحة قريبا</Text>
              }
              ListHeaderComponent={
                <Text style={styles.headerText}>
                  مستشقيات سوف تكون متاحة قريبا :{" "}
                </Text>
              }
              ListFooterComponent={
                <Text style={styles.footerText}>مع التمنيات بالسلامة</Text>
              }
            />
          }
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTitle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 5,
  },
  card: {
    backgroundColor: "#76b49f",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 16,
  },
  titleText: {
    textAlign: "right",
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    width: 220,
    fontFamily: "MarkaziText_700Bold",
  },
  cardText: {
    color: "black",
    textAlign: "right",
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "MarkaziText_400Regular",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#76b49f",
    textAlign: "center",
    marginBottom: 18,
    marginTop: 18,
    paddingHorizontal: 18,
    fontFamily: "MarkaziText_700Bold",
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 18,
    paddingHorizontal: 18,
    fontWeight: "600",
    color: "#76b49f",
    fontFamily: "MarkaziText_700Bold",
  },
});
