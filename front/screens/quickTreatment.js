import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Pressable,
  Animated,
  Button,
  Platform,
  ScrollView,
} from "react-native";
import AuthContext from "../context/AuthContext";
import {
  useFonts,
  MarkaziText_400Regular,
  MarkaziText_700Bold,
} from "@expo-google-fonts/markazi-text";
import RNPickerSelect from "react-native-picker-select";
import { View } from "react-native";

function QuickTreat({ navigation }) {
  let [fontsLoaded] = useFonts({
    MarkaziText_400Regular,
    MarkaziText_700Bold,
  });
  const [selectValue, setSelectValue] = useState("اختر الحالة");
  const [treatment, setTreatment] = useState("");

  useEffect(() => {
    setSelectValue("الاختناق");
  }, []);

  const getTreatment = (value) => {
    setSelectValue(value);
    switch (selectValue) {
      case "الجروح والنزيف":
        setTreatment(`الإجراء: نظف الجرح بالماء والصابون إذا كان صغيرًا. اضغط على الجرح بقطعة شاش نظيفة لوقف النزيف. ارفع الجزء المصاب إن أمكن.
العلاج: استخدام ضمادة معقمة أو لاصقة طبية لتغطية الجرح. إذا كان النزيف شديدًا، اطلب المساعدة الطبية فورًا.`);
        break;

      case "الحروق":
        setTreatment(`الإجراء: تبريد منطقة الحرق بوضعها تحت ماء بارد جارٍ لمدة 10-15 دقيقة. لا تستخدم الثلج مباشرة.
العلاج: غطِّ الحرق بضمادة غير لاصقة. تجنب فقع البثور. في حالة الحروق الشديدة، اطلب الرعاية الطبية.`);
        break;

      case "الكسور والالتواءات":
        setTreatment(`الإجراء: لا تحرك الجزء المصاب. استخدم دعامة ثابتة لدعم العظم المكسور أو المفصل المصاب.
العلاج: وضع الثلج على المنطقة المصابة لتقليل التورم. نقل المصاب إلى المستشفى.`);
        break;

      case "التسمم":
        setTreatment(`الإجراء: حاول معرفة نوع المادة السامة التي تناولها الشخص. لا تجعله يتقيأ إلا إذا نصحك الطبيب بذلك.
العلاج: اتصل بمركز مكافحة السموم أو الطوارئ الطبية فورًا. قد تحتاج إلى تقديم الإسعافات بناءً على توجيهاتهم.`);
        break;

      case "الاختناق":
        setTreatment(`الإجراء: إذا كان الشخص قادرًا على التنفس والسعال، شجعه على الاستمرار في السعال. إذا لم يكن قادرًا على التنفس، استخدم مناورة هيمليك (Heimlich maneuver).
العلاج: في حالة فقدان الوعي، ابدأ بالإسعافات الأولية للإنعاش القلبي الرئوي (CPR) واطلب المساعدة الطبية فورًا.`);
        break;

      case "السكتة القلبية":
        setTreatment(`الإجراء: اتصل بالإسعاف فورًا. ابدأ بإجراء الإنعاش القلبي الرئوي (CPR) حتى وصول الطاقم الطبي.
العلاج: استمر في الضغطات الصدرية بمعدل 100-120 ضغطة في الدقيقة والتنفيس الفموي إذا كنت مدربًا.`);
        break;
      case "الصدمة":
        setTreatment(`الإجراء: اجعل الشخص يستلقي على ظهره ورفع قدميه قليلاً (حوالي 30 سم) لتسهيل تدفق الدم إلى القلب.
العلاج: حافظ على حرارة الجسم بتغطيته ببطانية. اطلب المساعدة الطبية فورًا.`);
        break;
      case "الاشتباه بجلطة دماغية":
        setTreatment(`الأعراض الشائعة:

ضعف مفاجئ أو شلل في جانب واحد من الجسم.
صعوبة في الكلام أو فهم الكلام.
صداع حاد ومفاجئ.
دوار وفقدان التوازن.
تشوش الرؤية في عين واحدة أو كلتا العينين.
الإجراءات:
        
اتصل بالإسعاف فوراً: يجب الاتصال بالطوارئ فور الاشتباه بجلطة.
حافظ على الهدوء: حاول تهدئة الشخص وجعله يستلقي بوضع مريح.
رفع الرأس قليلاً: إذا كان الشخص واعيًا، ارفع رأسه بزاوية 30 درجة للمساعدة في تدفق الدم.
لا تعطه شيئاً للأكل أو الشرب: لتجنب خطر الاختناق.
العلاج:
        
تقديم الرعاية الطبية السريعة يمكن أن يقلل من تأثير الجلطة. يشمل ذلك أدوية لتفتيت الجلطات أو إجراءات طبية أخرى حسب الحالة.`);
        break;
      case "الاشتباه بغيبوبة سكر":
        setTreatment(`الأعراض الشائعة لانخفاض السكر (هيبوجلايسيميا):
- الارتعاش.
- التعرق المفرط.
- الجوع الشديد.
- تشوش الرؤية.
- الدوار أو الدوخة.
- فقدان الوعي (في الحالات الشديدة).
        
الأعراض الشائعة لارتفاع السكر (هايبرجلايسيميا):
- العطش الشديد.
- التبول المتكرر.
- التعب الشديد.
- تشوش الرؤية.
- التنفس العميق والسريع.
- رائحة النفس تشبه الفاكهة.
        
الإجراءات:
        
في حالة انخفاض السكر:
- إذا كان الشخص واعيًا:
- أعطه شيئًا يحتوي على سكر سريع الامتصاص مثل عصير الفواكه، أقراص الجلوكوز، أو حلوى.
- بعد 15 دقيقة، قم بقياس مستوى السكر في الدم إذا كان لديك جهاز قياس السكر.
- إذا لم يتحسن، أعطه كمية إضافية من السكر.
- إذا كان الشخص فاقدًا للوعي:
- لا تحاول إعطائه أي شيء عن طريق الفم.
- اتصل بالإسعاف فوراً.
- قد تحتاج إلى حقنة الجلوكاجون إذا كنت مدربًا على استخدامها ولديك الإبرة المتوفرة.
        
في حالة ارتفاع السكر:
- اتصل بالطوارئ إذا كان الشخص فاقدًا للوعي أو يعاني من أعراض شديدة.
- الراحة والتأكد من تناول الأنسولين: إذا كان الشخص واعيًا، تأكد من أنه أخذ الجرعة المطلوبة من الأنسولين واتصل بالطبيب للحصول على تعليمات إضافية.
        
العلاج:
- انخفاض السكر: سيتطلب تناول سكر سريع الامتصاص وتقييم مستمر لمستوى السكر في الدم.
- ارتفاع السكر: قد يتطلب إعطاء الأنسولين والتأكد من الترطيب الكافي وإدارة الأعراض حتى وصول الرعاية الطبية.`);
        break;

      default:
        break;
    }
  };

  // ********************************
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>اسعافات اولية</Text>
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
        onValueChange={(value) => getTreatment(value)}
        items={[
          { label: "الجروح والنزيف", value: "الجروح والنزيف" },
          { label: "الحروق", value: "الحروق" },
          { label: "الكسور والالتواءات", value: "الكسور والالتواءات" },
          { label: "التسمم", value: "التسمم" },
          { label: "الاختناق", value: "الاختناق" },
          { label: "السكتة القلبية", value: "السكتة القلبية" },
          { label: "الصدمة", value: "الصدمة" },
          { label: "الاشتباه بغيبوبة سكر", value: "الاشتباه بغيبوبة سكر" },
          { label: "الاشتباه بجلطة دماغية", value: "الاشتباه بجلطة دماغية" },
        ]}
        value={selectValue}
      />
      <View>
        <Text style={styles.titleOfTreatment}>{selectValue}</Text>
        <Text style={styles.treatment}>{treatment}</Text>
      </View>
    </ScrollView>
  );
}

export default QuickTreat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  title: {
    fontSize: 30,
    color: "#76b49f",
    fontFamily: "MarkaziText_700Bold",
    marginVertical: 30,
    textAlign: "center",
  },
  titleOfTreatment: {
    fontSize: 30,
    color: "#76b49f",
    fontFamily: "MarkaziText_700Bold",
    marginVertical: 30,
    textAlign: "right",
  },
  treatment: {
    fontSize: 24,
    color: "black",
    fontFamily: "MarkaziText_700Bold",
    textAlign: "right",
    paddingBottom: 30,
  },
});
