import mqConnection from "./config";

export type Notification = {
    sensor_id: string;
    timestamp: Date;
    reason: string;
}

export const sendNotification = async (notification: Notification) => {
    await mqConnection.sendToQueue('log_notifications', notification);
};