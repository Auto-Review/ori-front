// 서비스 워커용 Firebase SDK 로드
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Firebase 설정
firebase.initializeApp({
    apiKey: "AIzaSyBIUIxmXJvpfJrz7xPCeqBZMwLlBXdEo0E",
    authDomain: "ori-push-notification.firebaseapp.com",
    projectId: "ori-push-notification",
    storageBucket: "ori-push-notification.firebasestorage.app",
    messagingSenderId: "129665526699",
    appId: "1:129665526699:web:c2f424ad0d0705a65ac0ee",
    measurementId: "G-W4WPG3EY54"
});

// Firebase Messaging 초기화
const messaging = firebase.messaging();

// 백그라운드 메시지 수신 처리
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신:', payload);

    const { title, body } = payload.data || {};

    if (title && body) {
        const notificationOptions = {
            body,
            icon: '/ori.ico',
        };

        self.registration.showNotification(title, notificationOptions);
    }
});

