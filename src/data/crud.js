import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore/lite'
import { db } from './database.js'


// Meddelandeobjekt: (id,) sender, text, time
async function getMessages() {
	const msgCol = collection(db, 'messages')
	const msgSnapshot = await getDocs(msgCol)
	const msgList = msgSnapshot.docs.map(doc => {
		console.log('Dokument från Firestore: ', doc)
		const rawData = doc.data()
		rawData.time = toDateTimeString(rawData.time)
		rawData.id = doc.id
		console.log('getMessages returnerar objekt: ', rawData)
		return rawData
	})
	return msgList
}

function toDateTimeString(firestoreTimestamp) {
		// Anta att 'firestoreTimestamp' är ditt Timestamp-objekt från Firestore
	const dateObject = firestoreTimestamp.toDate();
	//dateObject.toLocalDate??
	const year = dateObject.getFullYear();
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Månader är 0-indexerade
	const day = dateObject.getDate().toString().padStart(2, '0');
	const hours = dateObject.getHours().toString().padStart(2, '0');
	const minutes = dateObject.getMinutes().toString().padStart(2, '0');

	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

	console.log(formattedDateTime); // Output: "2026-04-28 13:15" (eller det faktiska datumet/tiden)
	return formattedDateTime
}


async function sendMessage(message) {
// await addDoc(fruitsCol, { name })
	const msgCol = collection(db, 'messages')
	const docRef = await addDoc(msgCol, {
		...message,
		time: Timestamp.now()
	})
	console.log("Dokument skrivet med ID: ", docRef.id);
	return docRef.id
}



export { getMessages, sendMessage }

// async function getFruits() {
// 	const fruitsCol = collection(db, 'fruits')
// 	const fruitSnapshot = await getDocs(fruitsCol)
// 	const fruitList = fruitSnapshot.docs.map(doc => withId(doc))
// 	return fruitList
// }
