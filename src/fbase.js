import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where,
    orderBy,
} from "firebase/firestore";

import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadString,
} from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);

export const createEmail = async (email, password) => {
    const user = await createUserWithEmailAndPassword(
        authService,
        email,
        password,
    );
    return user;
};

export const signInEmail = async (email, password) => {
    const data = await signInWithEmailAndPassword(authService, email, password);
    return data;
};

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export const signPopup = async (provider) => {
    const data = await signInWithPopup(authService, provider);
    return data;
};

const dbService = getFirestore();
export const addDocument = async (path, data) => {
    await addDoc(collection(dbService, path), data);
};

export const getDocuments = async (path, uid) => {
    const q = query(
        collection(dbService, path),
        where("creatorId", "==", uid),
        orderBy("createdAt"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
};

export const deleteDocument = async (path, id) => {
    const ref = doc(dbService, path, id);
    await deleteDoc(ref);
};

export const updateDocument = async (path, id, data) => {
    const ref = doc(dbService, path, id);

    await updateDoc(ref, data);
};

export const onDBSnapshot = (path, func) => {
    onSnapshot(collection(dbService, path), func);
};

const storageService = getStorage(app);

export const uploadAttachment = async (uid, attachment) => {
    const attachmentRef = ref(storageService, `${uid}/${uuidv4()}`);
    await uploadString(attachmentRef, attachment, "data_url");
    const attachmentUrl = await getDownloadURL(attachmentRef);

    return attachmentUrl;
};

export const deleteAttachment = async (attachmentUrl) => {
    await deleteObject(ref(storageService, attachmentUrl));
};

export const updateMyProfile = async (data) => {
    await updateProfile(authService.currentUser, data);
};
