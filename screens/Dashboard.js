import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
  Image, 
} from "react-native";
import { ImagePickerComponent } from "../components/ImagePickerComponent";
import { isMoreThanTwoHoursPassed, storeLastRefreshedTime } from "../components/TokenRefresh";
import * as Token from "../components/saveTokens";

const DashboardScreen = () => {
  const [isReadyToPost, setIsReadyToPost] = useState(false);
  const { image, postButton, links, caption, pickImage, postImage, setCaption } = ImagePickerComponent();

  useEffect(() => {
    setIsReadyToPost(image && caption !== "");
  }, [image, caption]);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (isMoreThanTwoHoursPassed()) {
        try {
          const response = await fetch(`${process.env.MY_APP_API_URL}/newBearer?refreshToken=${encodeURIComponent(Token.getRefreshToken())}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          Token.setBearerToken(data.bearerAccess);
          Token.setRefreshToken(data.refreshToken);
          storeLastRefreshedTime();
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }
    };
    checkAndRefreshToken();
  }, []);

  const handlePost = async () => {
    if (caption === "") {
      alert("Please give a caption");
    } else {
      await postImage(caption);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Content
        caption={caption}
        setCaption={setCaption}
        pickImage={pickImage}
        handlePost={handlePost}
        postButton={postButton}
        isReadyToPost={isReadyToPost}
        links={links}
        image={image} 
      />
    </View>
  );
};

const Content = ({ caption, setCaption, pickImage, handlePost, isReadyToPost, links, image }) => (
  <View style={styles.container}>
    <View style={styles.captionContainer}>
      <Text style={styles.captionText}>Caption:</Text>
      <TextInput
        style={styles.captionInput}
        value={caption}
        onChangeText={setCaption}
        multiline={true}
      />
    </View>
    <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
      <Text style={styles.imageButtonText}>Choose Image</Text>
    </TouchableOpacity>
    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
    <TouchableOpacity
      style={[styles.postButton, isReadyToPost ? styles.enabledButton : styles.disabledButton]}
      onPress={handlePost}
      disabled={!isReadyToPost}
    >
      <Text style={styles.postButtonText}>Post Content</Text>
    </TouchableOpacity>
    {links.length > 0 && <Links links={links} />}
  </View>
);

const Links = ({ links }) => (
  <View style={styles.linksContainer}>
    {links.map((link, index) => (
      <TouchableOpacity
        key={index}
        style={styles.linkButton}
        onPress={() => Linking.openURL(link)}
      >
        <Text style={styles.linkText}>{link}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default DashboardScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    minWidth: 400,
    flexGrow: 0,
    flexShrink: 1,
  },
  captionContainer: {
    marginBottom: 15,
  },
  captionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    minHeight: 60,
    textAlignVertical: "top",
  },
  imageButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 300, 
    borderRadius: 5,
    marginVertical: 10,
  },
  postButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  enabledButton: {
    backgroundColor: "#28a745",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  linksContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  linkButton: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  linkText: {
    color: "#007bff",
    fontSize: 16,
  },
});
