
import { useState } from 'react'
import './App.css'
import { deleteMessage, getMessages, sendMessage } from './data/crud'

const App = () => {
	const [messages, setMessages] = useState([])
	const [senderMessage, setSenderMessage] = useState('')


	const handleGet = async () => {
		const ms = await getMessages()
		setMessages(ms)
	}

	const handleSend = async () => {
		setSenderMessage('')
		// Vi returnerar id ifall vi skulle behöva det i framtiden
		const newId = await sendMessage({
			text: senderMessage,
			sender: 'David'
		})
		console.log('Meddelande skickat')
		await handleGet()
	}

	const handleDelete = async id => {
		await deleteMessage(id)
		// Borttagningen färdig (eller misslyckad)
		// Nu kan vi uppdatera gränssnittet
		await handleGet()
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
					<div key={m.id} className="box">
						<p> {m.text} </p>
						<p> Från {m.sender} den {m.time}. </p>
						<button onClick={() => handleDelete(m.id)} className="ghost"> Ta bort </button>
					</div>
				))}

				<section>
					<input type="text"
						value={senderMessage}
						onChange={e => setSenderMessage(e.target.value)}
						/>
					<button onClick={handleSend}> Skicka </button>
				</section>
			</main>
		</div>
	)
}
export default App
