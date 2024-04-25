import React, {useState, useEffect} from "react";
import '../styles/StatusTerm.css'


const StatusTerm = ({messages}) => {

	const formattedMessages = [];

	messages.forEach((message, index) => {
		console.log(message);
		console.log(index);
		formattedMessages.push(
			<p key={`logitem-${index}`}>
				{message.icon} {message.content} 
			</p>
		)
	})

	
	return (
		<div className="StatusTerm">
			<div className="titlebar">
				{/* little icon goes here */}
			</div>
			<div className="StatusOutput">
				{formattedMessages}
			</div>
		</div>
	)
}


export default StatusTerm;