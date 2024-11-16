// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js");

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBIUIxmXJvpfJrz7xPCeqBZMwLlBXdEo0E",
    projectId: "ori-push-notification",
    messagingSenderId: "129665526699",
    appId: "1:129665526699:web:c2f424ad0d0705a65ac0ee",
})

const messaging = firebase.messaging();