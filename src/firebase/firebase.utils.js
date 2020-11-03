import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyA57drgGe8JooPpemgihzWHb-gzlTNfORA',
	authDomain: 'digital-era-exampleappone.firebaseapp.com',
	databaseURL: 'https://digital-era-exampleappone.firebaseio.com',
	projectId: 'digital-era-exampleappone',
	storageBucket: 'digital-era-exampleappone.appspot.com',
	messagingSenderId: '1026983541297',
	appId: '1:1026983541297:web:a7f7fb2475af14216a7310',
	measurementId: 'G-1P26T13RF8',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get;

	if (!snapShot.exist) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log(error);
		}
	}
	return userRef;
};

export default firebase;
