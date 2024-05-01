import React, {useState, useEffect, Suspense} from "react";
import '~/styles/BattleCon.css'
import StatusTerm from "~/components/BattleCon/StatusTerm";
import Sigil from "~/components/BattleCon/sigil";
import {runeData} from "~/static/runeData.js"
import Daecon from "~/components/BattleCon/DaeCon.jsx";
import labeldemarc from '~/assets/ui/labeldemarc.png'
import TXRX from '~/assets/ui/TXRX.gif'
import TooltipWrapper from "~/components/util/TooltipWrapper.jsx";
import SideStatus from "~/components/BattleCon/SideStatus.jsx";
import { useModalWindow } from "react-modal-global";

async function loadDaemon (daemonName) {
	const response = await import(`../static/daemons/${daemonName}.js`)
	console.log(`loading daemon, reference object below for what loaded;`)
	console.log(response.default);
	return response.default;
}


const BattleCon = ({daemonName, testTitle, victoryCallback}) => {

	const modal = useModalWindow();


	const [daemonData, setDaemonData] = useState(null);
	useEffect(() => {
		loadDaemon(daemonName).then(daemon => setDaemonData(daemon));
	}, [])




	const closeTest = () => {
		console.log("close called, should see a callback call");
		modal.close()
		victoryCallback("Preemptive Close, passed to callback")
	}

	const testMessages = [
	  {
		icon: "<-",
		content: "Eske:Attack"
	  },
	  {
		icon: "->",
		content: "Anthousai:Defend"
	  },
	  {
		icon: "#",
		content: "Nothing Happens!"
	  },
	  {
		icon: "\n",
		content: ""
	  },
	  {
		icon: "<-",
		content: "Eske:Attack"
	  },
	  {
		icon: "->",
		content: "Anthousai:Prepare"
	  },
	  {
		icon: "#",
		content: "Critical Breach!"
	  },
	  {
		icon: "#",
		content: "Phantastikos layer shredded!"
	  },
	  {
		icon: "#",
		content: "Several petals fall fromn the Anthousai"
	  },
	  {
		icon: "\n",
		content: ""
	  },
	  {
		icon: "<-",
		content: "Eske:Prepare"
	  },
	  {
		icon: "->",
		content: "Anthousai:Heal"
	  },
	]

	const placeHolderDaemonDesc = <>
		<h3>ANTHOUSAI</h3>
		<p>
			TYPE: NYMPH <hr/>
			Would you uproot a Hyacinth in the name of your God?
		</p>
	</>


  if (!daemonData) {
    return <div>Loading...</div>; // Fallback UI
  }

	return (
		<div className="BattleCon">

				<div className="labelbar" onClick={closeTest}>{daemonData.enochName} <img src={labeldemarc} alt="" /></div>
				<div className="left">
					<Daecon img={daemonData.sprite}  />
					<div className="bottomPanel">
						<div className="bl">
							DAEMONVEIL FAILURE MANUAL ENGAGEMENT PROTOCOL ONLINE <br /><br />
							ENTITY.ID: <TooltipWrapper text={placeHolderDaemonDesc}>{daemonData.name}</TooltipWrapper>
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
				<SideStatus phtnksStb={0.75} dmStb={0.33} />
			</div>
		</div>
	)
}

export default BattleCon;