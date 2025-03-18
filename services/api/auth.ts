import ApiService from ".";
import {
  ChangePassword,
  Login,
  Register,
  UpdateProfile,
} from "../../utils/types/auth";
import Toast from "react-native-toast-message";
import StorageService from "../storage";
import ProductService from "./product";

class AuthService {
  static async login(credentials: Login, onSuccess?: () => void): Promise<any> {
    try {
      const response = await ApiService.unauthorized.post("/auth/login", {
        identifier: credentials.email,
        password: credentials.password,
      });
      await StorageService.saveData(
        "accessToken",
        response.data.data.accessToken
      );
      await StorageService.saveData(
        "refreshToken",
        response.data.data.refreshToken
      );
      if (onSuccess) onSuccess();
      Toast.show({
        type: "success",
        position: "top",
        text1: "Login Successful",
        text2: "You have logged in successfully!",
      });
      return response.data;
    } catch (error: any) {
      console.log("Here is the error");
      console.log(error);
      // Show error toast message
      Toast.show({
        type: "error",
        position: "top",
        text1: "Login Failed",
        text2:
          error.response.data.message ?? "There was an error during login.",
      });
    }
  }

  static async register(
    userData: Register,
    onSuccess?: () => void
  ): Promise<any> {
    try {
      const response = await ApiService.unauthorized.post("/auth/register", {
        ...userData,
        phoneNumber: [userData.phoneNumber],
      });
      console.log(response.data);
      await StorageService.saveData(
        "accessToken",
        response.data.data.accessToken
      );
      await StorageService.saveData(
        "refreshToken",
        response.data.data.refreshToken
      );
      await StorageService.saveData("user", response.data.data.user);
      if (onSuccess) onSuccess(); // Call the success callback if provided
      // Show success toast message
      Toast.show({
        type: "success",
        position: "top",
        text1: "Registration Successful",
        text2: "Your account has been created!",
      });
      return response.data;
    } catch (error) {
      // Show error toast message
      Toast.show({
        type: "error",
        position: "top",
        text1: "Registration Failed",
        text2: "There was an error during registration.",
      });
    }
  }

  static async requestResetPassword(
    email: string,
    onSuccess?: () => void
  ): Promise<any> {
    try {
      const response = await ApiService.unauthorized.post(
        "/users/request/reset/password",
        { email }
      );
      if (onSuccess) onSuccess();
      Toast.show({
        type: "success",
        position: "top",
        text1: "Check Your Email",
        text2: "We have sent an otp to use while verifying your account.",
      });
      return response.data;
    } catch (error) {
      // Show error toast message
      Toast.show({
        type: "error",
        position: "top",
        text1: "Forgot Password Failed",
        text2: "There was an error while sending the password reset email.",
      });
      throw new Error("Forgot password failed");
    }
  }

  static async verifyResetPasswod(
    email: string,
    onSuccess?: () => void
  ): Promise<any> {
    try {
      const response = await ApiService.unauthorized.post(
        "/users/verify/reset/password",
        { email }
      );
      if (onSuccess) onSuccess();
      return response.data;
    } catch (error) {
      // Show error toast message
      Toast.show({
        type: "error",
        position: "top",
        text1: "Forgot Password Failed",
        text2: "There was an error while verifying your account.",
      });
      throw new Error("Verify otp failed");
    }
  }

  static async resetPassword(
    token: string,
    password: string,
    onSuccess?: () => void
  ): Promise<any> {
    try {
      const response = await ApiService.unauthorized.post(
        "/auth/reset-password",
        { token, password }
      );
      if (onSuccess) onSuccess(); // Call the success callback if provided
      // Show success toast message
      Toast.show({
        type: "success",
        position: "top",
        text1: "Password Reset Successful",
        text2: "Your password has been successfully reset.",
      });
      return response.data;
    } catch (error) {
      // Show error toast message
      Toast.show({
        type: "error",
        position: "top",
        text1: "Password Reset Failed",
        text2: "There was an error resetting your password.",
      });
      throw new Error("Reset password failed");
    }
  }

  static async changePassword(
    passwords: ChangePassword,
    onSuccess?: () => void
  ): Promise<any> {
    try {
      const response = await ApiService.authorized.patch(
        "/users/change/password",
        passwords
      );
      if (onSuccess) onSuccess();
      Toast.show({
        type: "success",
        position: "top",
        text1: "Password Changed Successfully",
        text2: "Your password has been updated.",
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response);

      let errorMessage =
        "An error occurred while changing your password. Please try again.";

      if (error.response?.status === 400) {
        errorMessage = "The old password you entered is incorrect.";
      } else if (error.response?.status === 422) {
        errorMessage =
          "Your new password doesn't meet the required criteria. Please ensure it meets all security requirements.";
      } else if (error.response?.status === 500) {
        errorMessage =
          "We're having trouble updating your password. Please try again later.";
      }

      Toast.show({
        type: "error",
        position: "top",
        text1: "Password Change Failed",
        text2: errorMessage,
      });
    }
  }

  static async logout(onSuccess?: () => void): Promise<any> {
    try {
      // const response = await ApiService.authorized.post("/auth/logout");
      await StorageService.clearAll();
      if (onSuccess) onSuccess();
      // Show success toast message
      Toast.show({
        type: "success",
        position: "top",
        text1: "Logged Out",
        text2: "You have successfully logged out.",
      });
      // return response.data;
    } catch (error) {
      console.log(error);
      // Show error toast message
      Toast.show({
        type: "error",
        position: "top",
        text1: "Logout Failed",
        text2: "There was an error during logout.",
      });
    }
  }

  static async getProfile(onSuccess?: () => void): Promise<any> {
    try {
      const response = await ApiService.authorized.get("/users/profile");
      // if (onSuccess) onSuccess(); // Call the success callback if provided
      // console.log(response.data.payload.user);
      // console.log(user);
      return response.data;
    } catch (error) {
      console.log(error);
      // Show error toast message
      Toast.show({
        type: "error",
        position: "top",
        text1: "Profile Fetch Failed",
        text2: "There was an error fetching the profile.",
      });
    }
  }

  // static async updateProfile(
  //   formData: UpdateProfile,
  //   onSuccess?: () => void
  // ): Promise<any> {
  //   try {
  //     const user = await StorageService.getData("user");
  //     const formDataToSend = new FormData();
  //     formDataToSend.append("firstName", formData.firstName);
  //     formDataToSend.append("lastName", formData.lastName);
  //     formDataToSend.append("email", formData.email);
  //     formDataToSend.append("username", formData.username);
  //     formDataToSend.append(
  //       "phoneNumber",
  //       JSON.stringify([formData.phoneNumber])
  //     );
  //     if (formData.profileImage) {
  //       formDataToSend.append("profileImage", formData.profileImage);
  //     }

  //     const response = await ApiService.authorized.patch(
  //       //@ts-ignore
  //       `/users/update-user/${user?.id}`,
  //       formDataToSend
  //     );

  //     if (onSuccess) onSuccess();

  //     Toast.show({
  //       type: "success",
  //       position: "top",
  //       text1: "Profile Updated",
  //       text2: "Your profile has been updated successfully.",
  //     });

  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     Toast.show({
  //       type: "error",
  //       position: "top",
  //       text1: "Profile Update Failed",
  //       text2: "There was an error updating your profile.",
  //     });
  //     throw new Error("Profile update failed");
  //   }
  // }
}

export default AuthService;
