
import { useState } from 'react'
import './App.css'
import { getMessages, sendMessage } from './data/crud'

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
