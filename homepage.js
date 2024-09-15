import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkxOMXo8z9gmozoDM1-hJ7rI-KoubWN8k",
    authDomain: "eclipse1-c188d.firebaseapp.com",
    databaseURL: "https://eclipse1-c188d-default-rtdb.firebaseio.com",
    projectId: "eclipse1-c188d",
    storageBucket: "eclipse1-c188d.appspot.com",
    messagingSenderId: "193754748031",
    appId: "1:193754748031:web:fce9b611a62fa8fbd69b4a",
    measurementId: "G-PF5RVDX4W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

const postsContainer = document.getElementById('postsContainer');
const photoInput = document.getElementById('photo-input');
const submitBtn = document.getElementById('submit-btn');

// Fetch posts from Firestore
async function loadPosts() {
    const postsSnapshot = await getDocs(collection(db, "posts"));
    postsContainer.innerHTML = ""; // Clear previous posts
    postsSnapshot.forEach((doc) => {
        const postData = doc.data();
        if (postData.photoURL) {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <img src="${postData.photoURL}" alt="Photo">
                <div class="username">${postData.username}</div>
            `;
            postsContainer.appendChild(postDiv);
        }
    });
}

// Function to upload photo to Firebase Storage
async function uploadPhoto(file) {
    const storageRef = ref(storage, `photos/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

// Function to submit a new post
async function submitPost() {
    const file = photoInput.files[0];
    if (file) {
        const photoURL = await uploadPhoto(file);
        const username = auth.currentUser.displayName || "Anonymous"; // Get username from Firebase Auth

        await addDoc(collection(db, "posts"), {
            username: username,
            photoURL: photoURL,
            timestamp: new Date()
        });

        loadPosts(); // Reload posts after submission
    } else {
        alert("Please select a photo to post.");
    }
}

// Event listener for post button
submitBtn.addEventListener('click', submitPost);

// Load posts after authentication
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadPosts();
    }
});

// Theme toggle logic
const toggleThemeButton = document.getElementById('toggle-theme');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    toggleThemeButton.textContent = document.body.classList.contains('light-theme') ? '🌚' : '🌞';
});