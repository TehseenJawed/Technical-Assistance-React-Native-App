// import { useState, useEffect, useCallback } from 'react';
// import { Platform, Linking } from 'react-native';
// import { check, request, PERMISSIONS, RESULTS, PermissionStatus } from 'react-native-permissions';

// export const useAppPermissions = () => {
//   const [hasPermissions, setHasPermissions] = useState(false);
//   const [isDeniedPermanently, setIsDeniedPermanently] = useState(false);

//   const cameraPermission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
//   const micPermission = Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;

//   const checkAndRequestPermissions = useCallback(async () => {
//     try {
//       const camStatus = await check(cameraPermission);
//       const micStatus = await check(micPermission);

//       if (camStatus === RESULTS.GRANTED && micStatus === RESULTS.GRANTED) {
//         setHasPermissions(true);
//         return;
//       }

//       const camReq = await request(cameraPermission);
//       const micReq = await request(micPermission);

//       if (camReq === RESULTS.GRANTED && micReq === RESULTS.GRANTED) {
//         setHasPermissions(true);
//       } else if (camReq === RESULTS.BLOCKED || micReq === RESULTS.BLOCKED) {
//         setIsDeniedPermanently(true);
//       }
//     } catch (error) {
//       console.error("Permission request failed", error);
//     }
//   }, [cameraPermission, micPermission]);

//   useEffect(() => {
//     checkAndRequestPermissions();
//   }, [checkAndRequestPermissions]);

//   const openSettings = useCallback(() => {
//     Linking.openSettings();
//   }, []);

//   return { hasPermissions, isDeniedPermanently, requestPermissions: checkAndRequestPermissions, openSettings };
// };

import { useState, useCallback } from 'react'
import { Camera } from 'react-native-vision-camera'
import { Linking, Platform } from 'react-native'

type PermissionState = {
  hasPermissions: boolean
  isDeniedPermanently: boolean
  isLoading: boolean
  requestPermissions: () => Promise<void>
  openSettings: () => void
}

export function useAppPermissions(): PermissionState {
  const [hasPermissions, setHasPermissions] = useState(false)
  const [isDeniedPermanently, setIsDeniedPermanently] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const requestPermissions = useCallback(async () => {
    setIsLoading(true)
    const cameraStatus = await Camera.getCameraPermissionStatus()
    const micStatus = await Camera.getMicrophonePermissionStatus()

    // If already granted
    if (cameraStatus === 'granted' && micStatus === 'granted') {
      setHasPermissions(true)
      setIsDeniedPermanently(false)
      setIsLoading(false)
      return
    }
    
    // Request permissions
    const newCamera = await Camera.requestCameraPermission()
    const newMic = await Camera.requestMicrophonePermission()
    if (newCamera === 'granted' && newMic === 'granted') {
      setHasPermissions(true)
      setIsDeniedPermanently(false)
    } else {
      setHasPermissions(false)

      // Permanent denial detection
      const camAfter = await Camera.getCameraPermissionStatus()
      const micAfter = await Camera.getMicrophonePermissionStatus()

      if (
        camAfter === 'denied' &&
        micAfter === 'denied'
      ) {
        setIsDeniedPermanently(true)
      }
    }

    setIsLoading(false)
  }, [])

  const openSettings = () => {
    Linking.openSettings()
  }

  return {
    hasPermissions,
    isDeniedPermanently,
    isLoading,
    requestPermissions,
    openSettings,
  }
}