import React, {useState, useEffect} from "react";
import '../styles/StatusTerm.css'
import battltermIcon from '../assets/ui/battleterm_icon.png'

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
				<img src={battltermIcon}></img>
			</div>
			<div className="StatusOutput">
				{formattedMessages}
			</div>
		</div>
	)
}


export default StatusTerm;