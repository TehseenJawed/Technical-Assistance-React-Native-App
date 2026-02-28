import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import notifee, { EventType } from '@notifee/react-native'
import { useEffect } from 'react';
import Dashboard from './src/screens/Dashboard'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS) {
        if (detail.pressAction?.id === 'accept') {
          // Navigate to camera screen
        }
        if (detail.pressAction?.id === 'decline') {
          notifee.cancelNotification(detail.notification?.id!)
        }
      }
    })
  }, [])
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Dashboard />
    </SafeAreaProvider>
  );
}

export default App;
