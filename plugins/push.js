import firebase from 'firebase/app'
import 'firebase/messaging'

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('device token: ' + token)
    return token;
  } catch (err) {
    console.error(err);
  }
}
