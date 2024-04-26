import React, {useState, useEffect} from "react";
import '../styles/BattleCon.css'
import StatusTerm from "../components/StatusTerm";
import Sigil from "../components/sigil";
import {runeData} from "../static/runeData.js"
import Daecon from "../components/DaeCon.jsx";
import PlaceholderDaemonImg from '../artwork/placeholderdaemon.png'
import labeldemarc from '../assets/ui/labeldemarc.png'
import TXRX from '../assets/ui/TXRX.gif'
import TooltipWrapper from "../components/TooltipWrapper.jsx";

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

	const placeholderEnochDaemonName = "ANTHOUSAI"
	const placeHolderDaemonName = "ANTHOUSAI"
	const placeHolderDaemonDesc = <>
		<h3>ANTHOUSAI</h3>
		<p>
			TYPE: NYMPH <hr/>
			Would you uproot a Hyacinth in the name of your God?
		</p>
	</>

	return (
		<div className="BattleCon">
			<div className="labelbar">{placeholderEnochDaemonName} <img src={labeldemarc} alt="" /></div>
			<div className="left">
				<Daecon img={PlaceholderDaemonImg}  />
				<div className="bottomPanel">
					<div className="bl">
						DAEMONVEIL FAILURE MANUAL ENGAGEMENT PROTOCOL ONLINE <br /><br />
						ENTITY.ID: <TooltipWrapper text={placeHolderDaemonDesc}>{placeHolderDaemonName}</TooltipWrapper>
					</div>
					<div className="sigilcon">
						<Sigil radius={90} runeData={runeData.player} />
					</div>
					<div className="br">
						<img src={TXRX} alt="" />
					</div>
				</div>
			</div>
			<div className="right">		
				<StatusTerm messages={testMessages} />
			</div>
		</div>
	)
}

export default BattleCon;