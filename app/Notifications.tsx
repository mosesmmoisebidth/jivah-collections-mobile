import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { useNavigation } from "expo-router";
import Header from "@/components/app/Header";
import { Ionicons } from "@expo/vector-icons";
import useGet from "@/hooks/useGet";
import { NotificationItem as INotification } from "@/utils/types";
import { OutfitText } from "@/components/StyledText";
import NotificationItem, {
  NotificationItemSkeleton,
} from "@/components/notifications/NotificationItem";

const Notifications: React.FC = () => {
  const navigation = useNavigation();
  const {
    data: notifications,
    loading,
    refetch,
  } = useGet<INotification[]>("/notifications", {
    authorized: true,
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const groupNotifications = React.useCallback(() => {
    const grouped: Record<string, INotification[]> = {};
    notifications?.forEach((notif) => {
      const date = parseISO(notif.createdAt.toISOString());
      let title = format(date, "MMMM yyyy");
      if (isToday(date)) title = "Today";
      else if (isYesterday(date)) title = "Yesterday";
      else if (format(date, "yyyy-MM") === format(new Date(), "yyyy-MM")) {
        title = format(date, "MMMM dd");
      }
      if (!grouped[title]) grouped[title] = [];
      grouped[title].push(notif);
    });
    return Object.entries(grouped);
  }, [notifications]);

  const groupedData = groupNotifications();

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Header title="Notifications" back />
      {!loading ? (
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
          data={groupedData}
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
          onEndReached={refetch}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="small" /> : null
          }
        />
      )}
    </View>
  );
};

export default Notifications;
