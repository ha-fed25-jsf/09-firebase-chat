
import { useState } from 'react'
import './App.css'
import { deleteMessage, getMessages, sendMessage } from './data/crud'
import DisplayMessage from './components/DisplayMessage.jsx'
import { signIn } from './data/auth.js'

const App = () => {
	const [messages, setMessages] = useState([])
	const [senderMessage, setSenderMessage] = useState('')
	const [waitingForResult, setWaitingForResult] = useState(false)
	const [loginForm, setLoginForm] = useState({
		email: '', password: ''
	})


	const handleGet = async () => {
		setWaitingForResult(true)
		await doGetMessages()
		setWaitingForResult(false)
	}
	async function doGetMessages() {
		const ms = await getMessages()
		setMessages(ms)
	}

	const handleSend = async () => {
		setSenderMessage('')
		setWaitingForResult(true)
		// Vi returnerar id ifall vi skulle behöva det i framtiden
		const newId = await sendMessage({
			text: senderMessage,
			sender: 'David'
		})
		console.log('Meddelande skickat')
		await doGetMessages()
		setWaitingForResult(false)
	}

	const handleDelete = async id => {
		setWaitingForResult(true)
		await deleteMessage(id)
		// Borttagningen färdig (eller misslyckad)
		// Nu kan vi uppdatera gränssnittet
		await doGetMessages()
		setWaitingForResult(false)
	}

	const handleSignIn = async () => {
		await signIn(loginForm)
	}

	return (
		<div className="app">
			<header>
				<img src="/favicon.png" />
				<h1> Fire chat </h1>

			</header>
			<main>
				<button onClick={handleGet}> Hämta meddelanden </button>

				{messages.map(m => (
					<DisplayMessage key={m.id}
						m={m}
						handleDelete={handleDelete}
						refetch={handleGet}
						/>
				))}

				<section className="button-row">
					<input type="text"
						value={senderMessage}
						onChange={e => setSenderMessage(e.target.value)}
						/>
					<button onClick={handleSend}
						disabled={waitingForResult}
						> Skicka </button>
				</section>

				<section>
					<label> E-post </label>
					<input type="text"
						value={loginForm.email}
						onChange={e => setLoginForm({
							...loginForm,
							email: e.target.value
						})}
						/>
					<label> Lösenord </label>
					<input type="password"
						value={loginForm.password}
						onChange={e => setLoginForm({
							...loginForm,
							password: e.target.value
						})}
						/>
					{/* TODO: validering */}
					<button onClick={handleSignIn}> Logga in </button>
				</section>
			</main>
		</div>
	)
}
export default App
