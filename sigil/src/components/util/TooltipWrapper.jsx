import React, { useState } from "react";
import { Tooltip } from "./Tooltip";
/* For use in 99% of cases, otherwise manually add tooltip event listener code like you did in sigil */


const TooltipWrapper = ({ children, text, enabled = true, offset = { x: 10, y: 10 }, delay = "0.25s" }) => {

	const [toolTipTarget, setTooltipTarget] = useState(null); /* null for not showing any tooltip, ref the short circuit in the JSX return... */


	return (
		<>
			{toolTipTarget && <Tooltip offset={offset} delay={delay}> {toolTipTarget} </Tooltip>}
			<inline
				className="hasTooltip"
				onMouseEnter={() => enabled ? setTooltipTarget(text) : setTooltipTarget(null)}
				onMouseLeave={() => setTooltipTarget(null)}
			>
				{children}
			</inline>
		</>
	)
}

export default TooltipWrapper;