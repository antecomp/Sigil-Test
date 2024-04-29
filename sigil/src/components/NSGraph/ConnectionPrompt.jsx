import React from "react";
import '~/styles/NSGraph/ConnectionPrompt.css'

const ConnectionPrompt = ({acceptMethod, denyMethod, showStateSttr}) => {

	const handleAccept = () => {
		acceptMethod()
		showStateSttr(false)
	}

	const handleDeny = () => {
		denyMethod()
		showStateSttr(false)
	}

	return (
		<div className="ConnectionPrompt">
			This is a test
			<button onClick={() => {handleAccept()}}>Accept Method</button>
			<button onClick={() => {handleDeny()}}>Deny Method</button>
		</div>
	)
}

export default ConnectionPrompt;