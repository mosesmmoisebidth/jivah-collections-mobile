import React, { useMemo, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import {
  format,
  isThisMonth,
  isThisYear,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";
import { useNavigation } from "expo-router";
import Header from "@/components/app/Header";
import { Ionicons } from "@expo/vector-icons";
import useGet from "@/hooks/useGet";
import { NotificationItem as INotification } from "@/utils/types";
import { OutfitText } from "@/components/StyledText";
import NotificationItem, {
  NotificationItemSkeleton,
} from "@/components/notifications/NotificationItem";
import useGetInfiniteScroll from "@/hooks/useGetInfiniteScroll";

const Notifications: React.FC = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const {
    data: notifications,
    loading,
    error,
    hasMore,
    loadMore,
  } = useGetInfiniteScroll<INotification>("/notifications", {
    authorized: true,
    pageSize: 10,
  });
  console.log(notifications);
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  const groupNotifications = useMemo(() => {
    const grouped: Record<string, INotification[]> = {};
    notifications?.forEach((notification) => {
      const date = parseISO(
        typeof notification.createdAt == "string"
          ? notification.createdAt
          : new Date(notification.createdAt).toISOString()
      );
      let key;

      if (isToday(date)) {
        key = "Today";
      } else if (isYesterday(date)) {
        key = "Yesterday";
      } else if (isThisMonth(date)) {
        key = format(date, "MMMM dd");
      } else if (isThisYear(date)) {
        key = format(date, "MMMM yyyy");
      } else {
        key = format(date, "yyyy");
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(notification);
    });

    return grouped;
  }, [notifications]);

  return (
    <SafeAreaView style={tw`flex-1 p-4 bg-neutral-50`}>
      <Header title="Notifications" back />
      {loading ? (
        <View>
          {[...Array(5)].map((_, index) => (
            <View style={tw`my-2`}>
              <NotificationItemSkeleton key={index} />
            </View>
          ))}
        </View>
      ) : notifications?.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Ionicons name="notifications-off" size={48} color="gray" />
          <OutfitText style={tw`text-lg text-gray-500 mt-4`}>
            No notifications so far.
          </OutfitText>
        </View>
      ) : (
        <FlatList
          data={Object.entries(groupNotifications) || []}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View style={tw`mb-4`}>
              <OutfitText style={tw`text-lg font-bold text-gray-700 mb-2`}>
                {item[0]}
              </OutfitText>
              {item[1].map((notif) => (
                <View style={tw`my-2`}>
                  <NotificationItem item={notif} />
                </View>
              ))}
            </View>
          )}
          ListFooterComponent={
            hasMore ? (
              <TouchableOpacity
                style={tw`w-full mt-4 py-2 bg-blue-500 rounded-lg`}
                onPress={loadMore}
                disabled={loading}
              >
                <OutfitText style={tw`text-white text-center`}>
                  {loading ? "Loading..." : "Load More"}
                </OutfitText>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Notifications;
