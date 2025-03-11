import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
  static async saveData<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      throw new Error("Failed to save data");
    }
  }

  static async getData<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      throw new Error("Failed to retrieve data");
    }
  }

  static async deleteData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw new Error("Failed to delete data");
    }
  }

  static async updateData<T>(
    key: string,
    value: T | Partial<T>
  ): Promise<void> {
    try {
      const existingValue = await StorageService.getData<T>(key);
      const updatedValue =
        typeof value === "object" && value !== null
          ? { ...existingValue, ...value }
          : value;
      await StorageService.saveData(key, updatedValue);
    } catch (error) {
      throw new Error("Failed to update data");
    }
  }

  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      throw new Error("Failed to clear storage");
    }
  }
}

export default StorageService;
