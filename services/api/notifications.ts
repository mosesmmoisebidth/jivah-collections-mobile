import ApiService from ".";
import Toast from "react-native-toast-message";
import StorageService from "../storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";

class Notificationservice {
  static async getAllNotifications(params?: {
    page?: number;
    limit?: number;
  }): Promise<any> {
    try {
      const response = await ApiService.authorized.get(
        "/notifications/user/all",
        {
          params: {
            page: params?.page ?? 1,
            limit: params?.limit ?? 10,
          },
        }
      );
      return response.data.payload.items;
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to fetch all Notifications.",
      });
    }
  }

  static async registerForPushNotifications() {
    if (!Constants.isDevice) {
      console.log("Push notifications are not supported on simulators.");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Permission not granted for notifications.");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
    return token;
  }
}

export default Notificationservice;
