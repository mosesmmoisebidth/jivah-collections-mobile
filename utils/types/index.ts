export interface NotificationItem {
  id: string;
  type: "INFO" | "WARNING" | "SUCCESS" | "ERROR";
  read: boolean;
  message: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
