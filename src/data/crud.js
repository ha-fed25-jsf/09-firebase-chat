import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore/lite'
import { db } from './database.js'

const messageCollectionName = 'messages'
const userCollectionName = 'users'
const msgCol = collection(db, messageCollectionName)
const userCol = collection(db, userCollectionName)

// ----------------------------------------------- //
// Meddelandeobjekt: (id,) sender, text, time
async function getMessages() {
	const msgSnapshot = await getDocs(msgCol)
	const msgList = msgSnapshot.docs.map(doc => {
		// console.log('Dokument från Firestore: ', doc)
		const rawData = doc.data()
		rawData.time = rawData.time.toDate()
		rawData.id = doc.id
		// console.log('getMessages returnerar objekt: ', rawData)
		return rawData
	})
	msgList.sort((m1, m2) => {
		if( m1.time.getTime() < m2.time.getTime() ) {
			return -1
		} else if( m1.time.getTime() > m2.time.getTime() ) {
			return 1
		} else {
			0
		}
	})
	return msgList.map(msg => ({
		...msg,
		time: toDateTimeString(msg.time)
	}))
}

function toDateTimeString(dateObject) {
	const year = dateObject.getFullYear();
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Månader är 0-indexerade
	const day = dateObject.getDate().toString().padStart(2, '0');
	const hours = dateObject.getHours().toString().padStart(2, '0');
	const minutes = dateObject.getMinutes().toString().padStart(2, '0');

	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

	// console.log(formattedDateTime); // Output: "2026-04-28 13:15" (eller det faktiska datumet/tiden)
	return formattedDateTime
}


async function sendMessage(message) {
// await addDoc(fruitsCol, { name })
	const docRef = await addDoc(msgCol, {
		...message,
		time: Timestamp.now()
	})
	console.log("Dokument skrivet med ID: ", docRef.id);
	return docRef.id
}


async function deleteMessage(id) {
	// utgå från message collection (msgCol)
	// skapa en dokumentreferens som pekar på dokumentet vi vill ta bort
	// anropa deleteDoc()
	// Hoppas att dokumentet fanns och att det tas bort
	try {
		const docRef = doc(db, messageCollectionName, id)
		await deleteDoc(docRef)
	} catch(error) {
		console.log('Något gick fel vid borttagning av dokument:\n', error.message)
	}
}


async function updateMessage(id, newText) {
	try {
		const docRef = doc(db, messageCollectionName, id)
		await updateDoc(docRef, {
			// Vi behöver bara skicka med de egenskaper som ska ändras (strunta i sender och time)
			text: newText
		})
		console.log('Ändrade dokument i databasen')
	} catch(error) {
		console.error('Fel vid uppdatering av dokument:\n", error')
	}
}


// ----------------------------------------------- //
// User-objekt: uid, displayName
// Letar efter en användare med ett specifikt uid
// Om det finns, returnera { uid, displayName }
// Annars returnera null
async function getUser(uid) {
	// Hämta alla användare
	// Välj ut den användare som har samma uid
	// Om ingen användare - fail
	// Om hittat användare - returnera datan
	const usersSnapshot = await getDocs(userCol)
	const usersList = usersSnapshot.docs.map(doc => doc.data())
	// Nu har vi en lista med user data: [ { uid, displayName } ]

	const maybeUser = usersList.find(user => user.uid === uid)
	if( maybeUser ) {
		return maybeUser
	}
	return null

	// find - returnerar ett objekt eller undefined
	// filter - returnerar en lista
	// findIndex - returnerar det index som ett objekt har i en lista
}



export { getMessages, sendMessage, deleteMessage, updateMessage, getUser }

// async function getFruits() {
// 	const fruitsCol = collection(db, 'fruits')
// 	const fruitSnapshot = await getDocs(fruitsCol)
// 	const fruitList = fruitSnapshot.docs.map(doc => withId(doc))
// 	return fruitList
// }
