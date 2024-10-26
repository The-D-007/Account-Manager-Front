import { Platform } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Token from "./saveTokens";
import FormData from "form-data";
import axios from "axios";

export const ImagePickerComponent = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [postButton, setPostButton] = useState(true);
  const [links, setLinks] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      size = getFileSizeFromBase64(result.assets[0].uri);
      if (size < 1048576) {
        setImage(result.assets[0].uri);
        setPostButton(false);
      } else {
        window.alert("Image size should be less than 1MB");
      }
    }
  };

  const postImage = async (caption) => {
    const fbToken = Token.getFbToken();
    const fbPage = Token.getFbPage();
    const bearerToken = Token.getBearerToken();
    const accessToken = Token.getXAccess();
    const accessTokenSecret = Token.getXSecret();
    const instagramAccount = Token.getInstagramAcc();
    const apiUrl = `${process.env.MY_APP_API_URL}/submit`;
    let formData = new FormData();
    formData.append("file", image);
    formData.append("caption", caption);
    formData.append("fbToken", fbToken);
    formData.append("fbPage", fbPage);
    formData.append("bearerToken", bearerToken);
    formData.append("accessToken", accessToken);
    formData.append("accessTokenSecret", accessTokenSecret);
    formData.append("instagramAccount", instagramAccount);
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLinks([response.data.FB, response.data.X, response.data.Instagram]);
      setCaption("");
      setImage(null);
    } catch (error) {
      if (Platform.OS === "web") {
        window.alert("Error: Please sign in again to both accounts.");
      }
      setCaption("");
      setImage(null);
      setLinks([]);
    }
  };

  return {
    image,
    postButton,
    links,
    caption,
    pickImage,
    postImage,
    setCaption,
  };
};

function getFileSizeFromBase64(base64String) {
  const base64Data = base64String.split(",")[1] || base64String;
  const base64Length = base64Data.length;
  const sizeInBytes =
    (base64Length * 3) / 4 -
    (base64Data.endsWith("==") ? 2 : base64Data.endsWith("=") ? 1 : 0);
  return sizeInBytes;
}
