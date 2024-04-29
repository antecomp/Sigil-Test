import React from "react";
import '~/styles/NSGraph/ConnectionPrompt.css'

const ConnectionPrompt = ({acceptMethod, denyMethod, showStateSttr, dest, details}) => {

	const handleAccept = () => {
		acceptMethod()
		showStateSttr('')
	}

	const handleDeny = () => {
		denyMethod()
		showStateSttr('')
	}

	return (
		<div className="ConnectionPrompt">
			<div className="promptContainer">
				<h1>Connect To {dest}?</h1>
				<h2>{details.prompt}</h2>
				<a style={{'--fgc': 'lime'}} className="stbtn" onClick={() => {handleAccept()}}>CONNECT</a>
				<a style={{'--fgc': 'orangered'}} className="stbtn" onClick={() => {handleDeny()}}>CANCEL</a>
			</div>
		</div>
	)
}

export default ConnectionPrompt;