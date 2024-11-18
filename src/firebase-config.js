import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyBIUIxmXJvpfJrz7xPCeqBZMwLlBXdEo0E",
    authDomain: "ori-push-notification.firebaseapp.com",
    projectId: "ori-push-notification",
    storageBucket: "ori-push-notification.firebasestorage.app",
    messagingSenderId: "129665526699",
    appId: "1:129665526699:web:c2f424ad0d0705a65ac0ee",
    measurementId: "G-W4WPG3EY54"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 푸시 알림 권한 요청 함수
export function requestPermission() {
    return Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });
        } else {
            throw new Error('Permission denied');
        }
    });
}

export { messaging };

// 메시지 수신 리스너 설정
onMessage(messaging, (payload) => {
    console.log('Message received: ', payload);
    if (payload.notification) {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: '/firebase-logo.png',
        };

        // 포그라운드에서 알림 표시
        new Notification(notificationTitle, notificationOptions);
    }
})
