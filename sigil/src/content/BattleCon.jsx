import React, {useState, useEffect} from "react";
import '../styles/BattleCon.css'
import StatusTerm from "../components/StatusTerm";
import Sigil from "../components/sigil";
import {runeData} from "../static/runeData.js"

const BattleCon = ({battleData}) => {

	const testMessages = [{
		icon: "#",
		content: "this is a test"
	  },
	  {
		icon: ">",
		content: "this is another test"
	  }
	]

	return (
		<div className="BattleCon">
			<div className="left">
				<div className="placeHolderDeCon"></div>
				<Sigil radius={90} runeData={runeData.player} />
			</div>
			<div className="right">		
				<StatusTerm messages={testMessages} />
			</div>
		</div>
	)
}

export default BattleCon;