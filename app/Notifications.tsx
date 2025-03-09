import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import NotificationService from "@/services/api/notifications";
import { useNavigation } from "expo-router";
import Header from "@/components/app/Header";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons

interface Notification {
  userId: string;
  tokenId: string;
  title: string;
  body: string;
  use: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const fetchNotifications = async (nextPage: number = 1) => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const response: Notification[] =
        await NotificationService.getAllNotifications({
          page: nextPage,
          limit: 10,
        });
      if (response.length === 0) setHasMore(false);
      setNotifications((prev) => [...prev, ...response]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setPage((prev) => prev + 1);
      fetchNotifications(page + 1);
    }
  };

  const groupNotifications = useCallback(() => {
    const grouped: Record<string, Notification[]> = {};
    notifications.forEach((notif) => {
      const date = parseISO(notif.createdAt);
      let title = format(date, "MMMM yyyy");
      if (isToday(date)) title = "Today";
      else if (isYesterday(date)) title = "Yesterday";
      else if (format(date, "yyyy-MM") === format(new Date(), "yyyy-MM")) {
        title = format(date, "MMMM dd");
      }
      if (!grouped[title]) grouped[title] = [];
      grouped[title].push(notif);
    });
    return grouped;
  }, [notifications]);

  const groupedData = Object.entries(groupNotifications());

  return (
    <View style={tw`flex-1 p-4 bg-gray-100`}>
      <Header title="Notifications" back />
      {loading ? (
        <View>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={tw`mb-4 p-4 bg-white rounded-lg`}>
              <View style={tw`h-4 w-40 bg-gray-300 rounded`} />
              <View style={tw`h-6 w-full bg-gray-300 rounded mt-2`} />
            </View>
          ))}
        </View>
      ) : notifications.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Ionicons name="notifications-off" size={48} color="gray" />
          <Text style={tw`text-lg text-gray-500 mt-4`}>
            No notifications so far.
          </Text>
        </View>
      ) : (
        <FlatList
          data={groupedData}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View style={tw`mb-4`}>
              <Text style={tw`text-lg font-bold text-gray-700 mb-2`}>
                {item[0]}
              </Text>
              {item[1].map((notif) => (
                <View
                  key={notif.tokenId}
                  style={tw`p-4 bg-white rounded-lg mb-2`}
                >
                  <Text style={tw`text-base font-semibold`}>{notif.title}</Text>
                  <Text style={tw`text-gray-600`}>{notif.body}</Text>
                </View>
              ))}
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" /> : null
          }
        />
      )}
    </View>
  );
};

export default NotificationsPage;
