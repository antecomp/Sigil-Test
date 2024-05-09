import React, { useState, useEffect } from "react";
import '~/styles/BattleCon/StatusTerm.css'
import battltermIcon from '~/assets/ui/battleterm_icon.png'

const StatusTerm = ({ messages }) => {

	const formattedMessages = [];

	messages.forEach((message, index) => {

		/* \n to denote a blank/newline message */
		if (message.icon == "\n") {
			formattedMessages.push(
				<br />
			)
			return;
		}
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