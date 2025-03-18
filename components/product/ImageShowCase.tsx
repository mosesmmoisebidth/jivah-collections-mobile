import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import LikeButton from "./LikeButton";
import BackButton from "../shared/BackButton";

interface ImageShowCaseProps {
  shots: string[];
  productId: string;
}

const ImageShowCase: React.FC<ImageShowCaseProps> = ({ shots, productId }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LikeButton productId={productId} style={styles.likeButton} />

        {/* Absolute positioning the back button */}
       

        <Image
          source={{ uri: shots[activeImageIndex] }}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>
      <FlatList
        data={shots}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setActiveImageIndex(index)}>
            <Image
              source={{ uri: item }}
              style={[
                styles.thumbnail,
                activeImageIndex === index && styles.activeThumbnail,
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imageContainer: {
    position: "relative",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  likeButton: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  // Absolute positioning for the back button

  mainImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f8f8f8",
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 10,
  },
  activeThumbnail: {
    borderWidth: 2,
    borderColor: "blue",
  },
});

export default ImageShowCase;
