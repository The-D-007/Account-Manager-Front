import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Token from "../components/saveTokens";

const AccountsScreen = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [xShouldFetch, setXShouldFetch] = useState(false);
  const [isPressed, setIsPressed] = useState({
    facebook: false,
    twitter: false,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${process.env.MY_APP_API_URL}/check-condition`
        );
        const data = await response.json();
        setShouldFetch(data.conditionMet);
        setXShouldFetch(data.xConditionMet);
      } catch (error) {
        console.error("Error checking condition:", error);
      }
    }, 5000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 120000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.MY_APP_API_URL}/get-access`
          );
          const responseData = await response.json();
          Token.setFbToken(responseData.fbToken);
          Token.setFbPage(responseData.fbPage);
          Token.setInstagramAcc(responseData.instagramAccount);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      };

      fetchData();
    }
  }, [shouldFetch]);

  useEffect(() => {
    if (xShouldFetch) {
      const xFetchData = async () => {
        try {
          const xResponse = await fetch(
            `${process.env.MY_APP_API_URL}/getXTokens`
          );
          const xResponseData = await xResponse.json();
          Token.setXAccess(xResponseData.accessToken);
          Token.setXSecret(xResponseData.accessTokenSecret);
          Token.setBearerToken(xResponseData.bearerToken);
          Token.setRefreshToken(xResponseData.refreshToken);
        } catch (error) {
          console.error("Error fetching X tokens:", error);
        }
      };

      xFetchData();
    }
  }, [xShouldFetch]);

  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening link:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink(`${process.env.MY_APP_API_URL}/login`)}
        onPressIn={() => setIsPressed({ ...isPressed, facebook: true })}
        onPressOut={() => setIsPressed({ ...isPressed, facebook: false })}
      >
        <View style={styles.iconTextContainer}>
          <Ionicons name="logo-facebook" size={40} />
          <Text style={styles.text}>Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink(`${process.env.MY_APP_API_URL}/twitter`)}
        onPressIn={() => setIsPressed({ ...isPressed, twitter: true })}
        onPressOut={() => setIsPressed({ ...isPressed, twitter: false })}
      >
        <View style={styles.iconTextContainer}>
          <Ionicons name="logo-twitter" size={40} />
          <Text style={styles.text}>X</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 2,
    width: 250,
  },
  buttonPressed: {
    backgroundColor: "#e0e0e0",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default AccountsScreen;
