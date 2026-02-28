import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useAppPermissions } from '../hooks/usePermission';
import { triggerIncomingCall } from '../services/notificationServices';
import notifee, { EventType } from '@notifee/react-native';

export default function App() {
  const { hasPermissions, isDeniedPermanently, openSettings, requestPermissions } = useAppPermissions();
  const device = useCameraDevice('front');
  
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  
  // Listen for foreground notification interactions and permissions
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'decline') {
        notifee.cancelNotification(detail.notification?.id || '');
      }
    });
    requestPermissions()
    return unsubscribe;
  }, []);

  if (!hasPermissions) {
    return (
      <View style={styles.center}>
        <Text>Camera and Microphone permissions are required.</Text>
        {true && (
          <Button title="Open System Settings" onPress={openSettings} />
        )}
      </View>
    );
  }

  if (device == null) return <View style={styles.center}><Text>No Camera Device Found</Text></View>;
  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isCameraActive}
        audio={true}
      />

      {/* Controls Overlay */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setIsCameraActive(!isCameraActive)}
        >
          <Text style={styles.buttonText}>
            {isCameraActive ? 'Stop Camera' : 'Start Camera'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setIsMuted(!isMuted)}
        >
          <Text style={styles.buttonText}>
            {isMuted ? 'Unmute' : 'Mute'}
          </Text>
        </TouchableOpacity>

        {/* Test Trigger for VoIP Notification */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#e74c3c' }]} 
          onPress={triggerIncomingCall}
        >
          <Text style={styles.buttonText}>Simulate Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000'
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold'
  },
});