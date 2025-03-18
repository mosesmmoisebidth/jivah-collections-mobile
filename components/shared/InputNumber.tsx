import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { OutfitText } from "../StyledText";

export interface InputNumberProps {
  style?: any;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({
  style = {},
  defaultValue  = 1,
  min = 1,
  max = 99,
  onChange,
  label,
  desc,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleClickDecrement = () => {
    if (min >= value) return;
    setValue((state) => state - 1);
    onChange && onChange(value - 1);
  };

  const handleClickIncrement = () => {
    if (max && max <= value) return;
    setValue((state) => state + 1);
    onChange && onChange(value + 1);
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <OutfitText style={styles.label}>{label}</OutfitText>
          {desc && <OutfitText style={styles.desc}>{desc}</OutfitText>}
        </View>
      )}
      <View style={styles.controlContainer}>
        <TouchableOpacity
          style={[styles.button, min >= value && styles.disabledButton]}
          onPress={handleClickDecrement}
          disabled={min >= value}
        >
          <OutfitText style={styles.buttonText}>-</OutfitText>
        </TouchableOpacity>
        <OutfitText style={styles.valueText}>{value}</OutfitText>
        <TouchableOpacity
          style={[styles.button, max <= value && styles.disabledButton]}
          onPress={handleClickIncrement}
          disabled={max <= value}
        >
          <OutfitText style={styles.buttonText}>+</OutfitText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  labelContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
  desc: {
    fontSize: 12,
    color: "gray",
  },
  controlContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 24,
    color: "black",
  },
  valueText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 30,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default InputNumber;
