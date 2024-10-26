import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";

const SettingsScreen = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
      <View style={styles.container}>
          <Text style={styles.headerText}>
            To use this app, you need to have the following things setup:
          </Text>
          <Text style={styles.listItem}>1. Facebook Page.</Text>
          <Text style={styles.listItem}>2. Instagram Business Account.</Text>
          <Text style={styles.description}>
            The Instagram Business Account must be connected to the Facebook
            page.
          </Text>
          <Text style={styles.headerText}>Follow these steps to connect:</Text>
          <View style={styles.textIconContainer}>
            <Text style={styles.text}>Go to your Facebook page</Text>
            <Ionicons
              name="arrow-forward-sharp"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.text}>Settings</Text>
            <Ionicons
              name="arrow-forward-sharp"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.text}>Linked accounts</Text>
            <Ionicons
              name="arrow-forward-sharp"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.text}>
              Link your Instagram Business account.
            </Text>
          </View>
          <Text style={styles.listItem}>3. X Account.</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Check out the APIs </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Linking.openURL(`${process.env.MY_APP_API_URL}/docs`)
            }
          >
            <Text style={styles.buttonText}>here</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.textContainer, { marginTop: 5 }]}>
          <Text style={styles.text}>Frontend Github click</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Linking.openURL(`${process.env.FRONTEND_GITHUB_URL}`)
            }
          >
            <Text style={styles.buttonText}>here</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.textContainer, { marginTop: 5 }]}>
          <Text style={styles.text}>Backend Github click</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(`${process.env.BACKEND_GITHUB_URL}`)}
          >
            <Text style={styles.buttonText}>here</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    color: '#555', 
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginVertical: 8,
    lineHeight: 20,
  },
  textContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 250,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  textIconContainer: {
    flexDirection: "row",
    alignItems: "center", 
    flexWrap: "wrap",
    marginVertical: 8,

  },
  text: {
    fontSize: 16,
    color: "#333", 
    marginRight: 4,

  },
  icon: {
    color: "#007AFF", 
    marginHorizontal: 2, 
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
