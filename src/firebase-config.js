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

// 메시지 수신 리스너 설정 (포그라운드)
onMessage(messaging, (payload) => {
    console.log('Message received (foreground): ', payload);

    // 알림 정보는 data 필드에서 꺼냅니다
    const { title, body } = payload.data || {};

    if (title && body) {
        const notificationOptions = {
            body,
            icon: '/ori.ico',
        };

        new Notification(title, notificationOptions);
    }
});

