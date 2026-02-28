import notifee, { AndroidImportance, AndroidCategory } from '@notifee/react-native';

export const triggerIncomingCall = async () => {
  // Request notification permissions (required for iOS 13+ and Android 13+)
  await notifee.requestPermission();

  // Create an Android channel with URGENT importance
  const channelId = await notifee.createChannel({
    id: 'incoming_calls',
    name: 'Incoming Calls',
    importance: AndroidImportance.HIGH, 
    vibration: true,
  });

  // Display the notification
  await notifee.displayNotification({
    title: 'Incoming Tech Assistance',
    body: 'An agent is trying to reach you.',
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      category: AndroidCategory.CALL,
      // Ongoing makes it persistent until interacted with
      ongoing: true,
      actions: [
        {
          title: 'Decline',
          pressAction: { id: 'decline' },
        },
        {
          title: 'Accept',
          // 'default' launches the app
          pressAction: { id: 'default', launchActivity: 'default' },
        },
      ],
    },
    ios: {
      categoryId: 'incoming_call',
      critical: true, // Requires special Apple entitlement in production
    },
  });
};