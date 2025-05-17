import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";
import ApiService from "@/services/api";
import AuthService from "@/services/api/auth";
import Toast from "react-native-toast-message";

export interface LikeButtonProps {
  style?: any;
  liked?: boolean;
  productId: string;
  onFinishLikeDislike?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  style = {},
  liked = false,
  productId,
  onFinishLikeDislike,
}) => {
  const [user, setUser] = useState<any>(null);

  const fetchUserP = async () => {
    const response = await AuthService.getProfile();
    setUser(response);
  };

  useEffect(() => {
    fetchUserP();
  }, []);

  const [isLiked, setIsLiked] = useState(liked);


  const handleLike = async () => {
    if (!user) {
      router.replace("/(auth)/sign-in");
      return;
    }

    try {
      const response = await ApiService.authorized.post("/users/favorite", {
        productId,
      });
      setIsLiked(!isLiked);
      onFinishLikeDislike && onFinishLikeDislike();
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Favoriting product failed.",
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleLike} style={[styles.button, style]}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isLiked ? "#c48647" : "black"}
          fill={isLiked ? "#c48647" : "none"}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 18,
    elevation: 2,
  },
});

export default LikeButton;
