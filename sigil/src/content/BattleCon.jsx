import React, { useState, useEffect, Suspense } from "react";
import '~/styles/BattleCon/BattleCon.css'
import StatusTerm from "~/components/BattleCon/StatusTerm";
import Sigil from "~/components/BattleCon/Sigil";
import { runeData } from "~/static/runeData.js"
import Daecon from "~/components/BattleCon/DaeCon.jsx";
import labeldemarc from '~/assets/ui/labeldemarc.png'
import TXRX from '~/assets/ui/TXRX.gif'
import TooltipWrapper from "~/components/util/TooltipWrapper.jsx";
import SideStatus from "~/components/BattleCon/SideStatus.jsx";
import { useModalWindow } from "react-modal-global";
import { testMessages } from "~/static/constants/placeholders";

// Dynamic Import seems to require relative paths but only when built on windows
// That or mori is simply cursed :^)
async function loadDaemon(fileName) {
	const response = await import(`../static/daemons/${fileName}.js`)
	return response.default;
}

const BattleCon = ({ fileName, nodeCallback }) => {

	const modal = useModalWindow();


	const [daemonData, setDaemonData] = useState(null);
	useEffect(() => {
		loadDaemon(fileName).then(daemon => setDaemonData(daemon));
	}, [fileName])


	const closeTest = () => {
		modal.close()
		nodeCallback("Preemptive Close, passed to callback")
	}


	if (!daemonData) {
		return <div>Loading...</div>; // Fallback UI
	}

	const daemonInfoTooltip = <>
		<h3>{daemonData.name}</h3>
		<p>
			TYPE: {daemonData.type} <hr />
			{daemonData.description}
		</p>
	</>


	return (
		<div className="BattleCon">

			<div className="labelbar" onClick={closeTest}>{daemonData.enochName} <img src={labeldemarc} alt="" /></div>
			<div className="left">
				<Daecon img={daemonData.sprite} />
				<div className="bottomPanel">
					<div className="bl">
						DAEMONVEIL FAILURE MANUAL ENGAGEMENT PROTOCOL ONLINE <br /><br />
						ENTITY.ID:
						<TooltipWrapper text={daemonInfoTooltip}>
							{daemonData.name}
						</TooltipWrapper>
					</div>
					<div className="sigilcon">
						<Sigil radius={90} playerRuneData={runeData.player} />
					</div>
					<div className="br">
						<img src={TXRX} alt="" />
					</div>
				</div>
			</div>

			<div className="right">
				<StatusTerm messages={testMessages} />
				<SideStatus phtnksStb={0.75} dmStb={0.33} />
			</div>
		</div>
	)
}

export default BattleCon;