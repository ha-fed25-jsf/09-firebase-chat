
import { useState } from 'react'
import './App.css'
import { getMessages } from './data/crud'

const App = () => {
	const [messages, setMessages] = useState([])


	const handleGet = async () => {
		const ms = await getMessages()
		setMessages(ms)
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
				{/* main
				<div className="box">
					<p> box 1 </p>
				</div>
				<div className="box user right">
					<p> box 2 </p>
				</div>

				<button className="primary"> yolo 1 </button>
				<button className="ghost"> yolo 2 </button> */}
			</main>
		</div>
	)
}
export default App
