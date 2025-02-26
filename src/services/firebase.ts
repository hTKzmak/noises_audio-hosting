// Импорт необходимых функций с SDKs, которые нужны
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Добавить SDKs для продукта Firebase, которые мы хотим использовать 

// https://firebase.google.com/docs/web/setup#available-libraries


// Firebase конфигурация для веб приложения

const firebaseConfig = {
    apiKey: "AIzaSyAFto4iGq3SmwMdj7oM-R9muEEibMz7DcI",
    authDomain: "noises-app-63a0f.firebaseapp.com",
    projectId: "noises-app-63a0f",
    storageBucket: "noises-app-63a0f.firebasestorage.app",
    messagingSenderId: "854786508637",
    appId: "1:854786508637:web:9ad7cfda36bdf14a82cab4"
};


// Инициализация Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);