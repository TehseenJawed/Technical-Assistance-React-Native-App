/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging'
import { triggerIncomingCall } from './src/services/notificationServices'
// import notifee, { EventType } from '@notifee/react-native';

// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   const { notification, pressAction } = detail;

//   if (type === EventType.ACTION_PRESS && pressAction.id === 'decline') {
//     await notifee.cancelNotification(notification.id);
//   }
// });

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage.data.type === 'INCOMING_CALL') {
    await triggerIncomingCall();
  }
});

AppRegistry.registerComponent(appName, () => App);
