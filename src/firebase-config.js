import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAzFq-j_f15sT1MgcvdCqVXN8r5-lNAhwo",
    authDomain: "taskify2021.firebaseapp.com",
    databaseURL: "https://taskify2021-default-rtdb.firebaseio.com",
    projectId: "taskify2021",
    storageBucket: "taskify2021.appspot.com",
    messagingSenderId: "413749867409",
    appId: "1:413749867409:web:efab51605c3318d5cfa030",
    measurementId: "G-BKHHFKBJ6K"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)