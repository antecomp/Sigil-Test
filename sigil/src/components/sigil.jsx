import React, { useState, useEffect } from 'react';
import '../styles/sigil.css'
import { Tooltip } from './Tooltip';

const Sigil = ({ radius, runeData }) => {

	// main circle vars
	const numRunes = runeData.maxNumRunes;
	const runesPerMove = runeData.runesPerMove; // how many runes do we pick before marking as "finished"
	const runeCircles = [];
	const cx = 250;
	const cy = 250;

	// vars for the line drawing stuff
	const [clickedRunes, setClickedRunes] = useState([]);
	const [lines, setLines] = useState([]);

	// state for finished, triggered when we've clicked our max runes, triggers fade out anim
	// and will eventually be used for action triggers.
	const [finished, setFinished] = useState(false);


	// for tooltip
	const [toolTipTarget, setTooltipTarget] = useState(null);
	// TODO, MOVE THE TOOLTIP STUFF / SETTERS TO TRIGGER SHOW TO GENERAL UTILITY JS FILE
	// YOU SHOULD BE ABLE TO SET THE TARGET STATE SETTER AS A CALLBACK INTO THIS FUNCTION 
	// FOR PORTABILITY.


	const generateRuneTooltip = (rune) => {
		return (
			<>
				<h3>
					{rune.name}
				</h3>
				<p>
					{rune.desc}
				</p>
			</>
		)
	}

	const handleClick = (key, x, y) => {

		// Guard Clause: do nothing if we already clicked this rune
		if (clickedRunes.some(rune => rune.key === key)) {
			return;
		}

		// Gaurd clause, prevent clicking if we have the finished flag.
		// Hopefully we'll have something more elegant in the real deal but this is fine for demo purposes.
		if (finished) return;

		//console.log(`Clicked rune ${key} at (${x},${y})`)
		const clickedRune = { key, x, y };
		setClickedRunes(prevClickedRunes => [...prevClickedRunes, clickedRune])
	}


	// called only when our clickedRunes array updates, i.e when we click a rune.
	useEffect(() => {
		if (clickedRunes.length > 1) {
			const lastClickedRune = clickedRunes[clickedRunes.length - 2];
			const currentClickedRune = clickedRunes[clickedRunes.length - 1];
			const newLine = {
				x1: lastClickedRune.x, y1: lastClickedRune.y,
				x2: currentClickedRune.x, y2: currentClickedRune.y
			};
			setLines(prevLines => [...prevLines, newLine]);
		}

		if(clickedRunes.length == runesPerMove) {
			markFinishedAndSubmit();
		}

	}, [clickedRunes]);

	// eventually this will take some prop the parent passes that we can use to bubble our sigil pick up to the combat handler.
	const markFinishedAndSubmit = () => {
		setFinished(true);
		setTooltipTarget(null); // hide tooltips when we hide the rune selector.

		clickedRunes.forEach((rune) => {
			console.log(runeData.runeMap[rune.key]);
		})
	}

	const handleReset = () => {
		setClickedRunes([]);
		setLines([]);
		// likely unneeded because the useEffect would eval to this anyway
		setFinished(false); 
	}


	for (let i = 0; i < numRunes; i++) {
		const angle = (Math.PI * 2 * i) / numRunes;
		const x = cx + radius * Math.cos(angle);
		const y = cy + radius * Math.sin(angle);

		runeCircles.push(
			<g key={`rune-${i}`}>
				<circle
					cx={x} cy={y}
					r={radius / 4}
					stroke="white"
					strokeWidth="2"
					fill="black"
					onClick={() => handleClick(i, x, y)}
					// if already clicked, change cursor to default to indicate we cant click it again.
					className={clickedRunes.some(rune => rune.key === i) ? 'clickedRune' : 'rune'}


					// tooltip code
					onMouseEnter={() => !finished ? setTooltipTarget(generateRuneTooltip(runeData.runeMap[i])) : setTooltipTarget(null)}
					onMouseLeave={() => setTooltipTarget(null)}
				/>
				<text x={x} y={y} textAnchor='middle' dy=".35em" dx=".1em" fill="white">{runeData.runeMap[i].symbol}</text>
			</g>
		);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<>
			{toolTipTarget && <Tooltip offset={{ x: 10, y: 10 }} delay={"0.75s"}> {toolTipTarget} </Tooltip>}

			<svg width="500" height="500" className={`runeBuilder ${finished ? 'finished' : ''}`}>
				<circle cx="250" cy="250" r={radius} stroke="white" strokeWidth="2" fill="none" />
				{runeCircles};
				{lines.map((line, index) => (
					<line key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="white" strokeWidth={2} />
				))}
			</svg>
			<br />
			<button onClick={handleReset}>Reset</button> <br />
		</>
	)
}

export default Sigil;