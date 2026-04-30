import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./database.js"

async function signIn({ email, password }) {
	try {
		const userCredentials = await signInWithEmailAndPassword(auth, email, password)
		console.log('Sign in creds: ', userCredentials)

		return {
			email: email,
			uid: userCredentials.user.uid
		}

		// Alternativ: ha användar-info i en separat collection, t.ex. bild, nickname
		// Hämta datan från databasen

	} catch(error) {
		console.log('Sign in error: ', error.message)
		return null
	}
}

export { signIn }
