const saveItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

const getItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
  }
};

const setFbToken = (fbToken) => saveItem("fbToken", fbToken);
const setFbPage = (fbPage) => saveItem("fbPage", fbPage);
const setInstagramAcc = (instagramAccount) =>
  saveItem("instagramAccount", instagramAccount);
const setBearerToken = (token) => saveItem("bearerToken", token);
const setXAccess = (xToken) => saveItem("xToken", xToken);
const setXSecret = (xTokenSecret) => saveItem("xTokenSecret", xTokenSecret);
const setRefreshToken = (refreshToken) =>
  saveItem("refreshToken", refreshToken);

const getFbToken = () => getItem("fbToken");
const getFbPage = () => getItem("fbPage");
const getInstagramAcc = () => getItem("instagramAccount");
const getBearerToken = () => getItem("bearerToken");
const getXAccess = () => getItem("xToken");
const getXSecret = () => getItem("xTokenSecret");
const getRefreshToken = () => getItem("refreshToken");

export {
  setFbToken,
  getFbToken,
  setFbPage,
  getFbPage,
  setInstagramAcc,
  getInstagramAcc,
  setXAccess,
  getXAccess,
  setXSecret,
  getXSecret,
  setBearerToken,
  getBearerToken,
  setRefreshToken,
  getRefreshToken,
};
