import React, {useState, useEffect} from "react";
import '../styles/StatusTerm.css'


const StatusTerm = ({messages}) => {

	const formatMessage = (message, key) => {
		console.log(message)
		return (
			<p key={key}>
			FUCKOFF
				{message.icon} {message.content}
			</p>
		)
	}

	return (
		<div className="StatusTerm">
			<div className="titlebar">
				{/* little icon goes here */}
			</div>
			<div className="StatusOutput">
				Output here;
				{/* messages.reverse().map((message, index) => (
        			<p key={index}>{message.content}</p>
      			)) */}
				{
					messages.reverse().map((message, index) => {
						formatMessage(message, index)
					})
				}
			</div>
		</div>
	)
}


export default StatusTerm;