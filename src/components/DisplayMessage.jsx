import { useState } from "react"
import { updateMessage } from "../data/crud"

const DisplayMessage = ({ m, handleDelete, refetch }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [formText, setFormText] = useState(m.text)
	const [isPending, setIsPending] = useState(false)

	const handleEdit = async () => {
		if( isEditing ) {
			// Spara värdet till databasen
			setIsPending(true)
			await updateMessage(m.id, formText)

			// Hämta uppdaterad data från databasen
			await refetch()
			setIsPending(false)
		}
		setIsEditing(!isEditing)
	}
	const handleDelete2 = async id => {
		setIsPending(true)
		await handleDelete(id)
		setIsPending(false)
	}

	return (
		<div className="box">
			{isEditing ? (
				<input
					value={formText}
					onChange={e => setFormText(e.target.value)}
					/>
			) : (
				<p> {m.text} </p>
			)}
			<p> Från {m.sender} den {m.time}. </p>
			<div className="button-row">
				<button onClick={handleEdit} className="ghost"> {isEditing ? 'Spara' : 'Ändra'} </button>
				<button onClick={() => handleDelete2(m.id)} className="ghost"> Ta bort </button>
			</div>
		</div>
	)
}

export default DisplayMessage
