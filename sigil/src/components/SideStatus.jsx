import React from "react";
import '~/styles/Meter.css'
import '~/styles/SideStatus.css'
import TooltipWrapper from "~/components/util/TooltipWrapper";

/* stability numbers should be <= 1, a health percentage, soley visual. This shit should never track the actual health state for obvious reasons */
const SideStatus = ({phtnksStb, dmStb}) => {

	// Note: Move to seperate component if I end up re-using this
	// Also for the love of god implement something different. WHy the fuck am I rendering 40 divs.
	const Bar = ({filled}) => {
		const className = filled ? 'bar filled' : 'bar';
		return <div className={className}></div>;
	}

	const Meter = ({level}) => {
		const bars = Array.from({ length: 20 }, (_, index) => index < level); /* voodoo, makes an array of [true, true... false, false] where # trues = level */

		return (
			<div className="meter">
				{bars.map((filled, index) => (
					<Bar key={`meterbar-${index}`} filled={filled} />
				))}
			</div>
		)
	}

	const phtdesc = (
		<>
			<h4>
				Phantastikos
			</h4>
			<p>
				"ADVERSARY HEALTH" STABILITY OF DAEMONS ILLUSTION. REDUCE TO VANQUISH.
			</p>
		</>
	)

	const dmdesc = (
		<>
			<h4>
				Daemonveil
			</h4>
			<p>
				"USER HEALTH" <br/> DAEMONVEIL PROTECTS FROM DAEMONIC INFLUENCE. TOTAL DAEMONVEIL FAILURE TRIGGERS AUTOMATIC EJECTION OF VI-LINK
			</p>
		</>
	)



	return (
		<div className="SideStatus">
			<div className="sid">USR VI-ID: dv8:8a3</div>
			<div className="sid">RCP VI-ID: ---:---</div>
			<hr />
			<div class="stb"><TooltipWrapper text={phtdesc}>PHTNKS STBLTY</TooltipWrapper> <Meter level={phtnksStb * 20}/> </div>
			<div class="stb"><TooltipWrapper text={dmdesc}>DMVEIL STBLTY</TooltipWrapper> <Meter level={dmStb * 20}/> </div>
		</div>
	)
}

export default SideStatus;