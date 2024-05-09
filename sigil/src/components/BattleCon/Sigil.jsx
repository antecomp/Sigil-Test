import React, { useState, useEffect } from 'react';
import '~/styles/BattleCon/sigil.css'
import { Tooltip } from '~/components/util/Tooltip';

const Sigil = ({ radius, playerRuneData }) => {

	// main circle vars
	const numRunes = playerRuneData.maxNumRunes;
	const runesPerMove = playerRuneData.runesPerMove; // how many runes do we pick before marking as "finished"
	const runeCircles = [];
	const svgDim = radius * 2.7; /* *2.5 to fit perfectly, making it larger for the outer masking circle to work */
	const cx = svgDim / 2;
	const cy = svgDim / 2;

	// vars for the line drawing stuff
	const [clickedRunes, setClickedRunes] = useState([]);
	const [lines, setLines] = useState([]);

	// state for finished, triggered when we've clicked our max runes, triggers fade out anim
	// and will eventually be used for action triggers.
	const [finished, setFinished] = useState(false);


	// for manual tooltip
	const [toolTipTarget, setTooltipTarget] = useState(null);


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
	// Note to self: Async nature of setClickedRunes means this *has* to be in a useEffect hook, bundling it with the function above
	// with cause the length/other checks to be on old state because it hasnt updated/rendered yet.
	useEffect(function drawLines() {
		if (clickedRunes.length > 1) {
			const lastClickedRune = clickedRunes[clickedRunes.length - 2];
			const currentClickedRune = clickedRunes[clickedRunes.length - 1];
			const newLine = {
				x1: lastClickedRune.x, y1: lastClickedRune.y,
				x2: currentClickedRune.x, y2: currentClickedRune.y
			};
			setLines(prevLines => [...prevLines, newLine]);
		}

		if (clickedRunes.length == runesPerMove) {
			markFinishedAndSubmit();
		}

	}, [clickedRunes]);

	// eventually this will take some prop the parent passes that we can use to bubble our sigil pick up to the combat handler.
	const markFinishedAndSubmit = () => {
		setFinished(true);
		setTooltipTarget(null); // hide tooltips when we hide the rune selector.

		clickedRunes.forEach((rune) => {
			console.log(playerRuneData.runeMap[rune.key]);
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
					fill="black"
					onClick={() => handleClick(i, x, y)}
					// if already clicked, change cursor to default to indicate we cant click it again.
					className={clickedRunes.some(rune => rune.key === i) ? 'clickedRune' : 'rune'}


					// tooltip code
					onMouseEnter={() => !finished ? setTooltipTarget(generateRuneTooltip(playerRuneData.runeMap[i])) : setTooltipTarget(null)}
					onMouseLeave={() => setTooltipTarget(null)}
				/>
				<text x={x} y={y} textAnchor='middle' dy=".35em" dx=".1em" fill="white">{playerRuneData.runeMap[i].symbol}</text>
			</g>
		);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	return (
		<>
			{toolTipTarget && <Tooltip offset={{ x: 10, y: 10 }} delay={"0.75s"}> {toolTipTarget} </Tooltip>}

			<svg width={svgDim} height={svgDim} className={`runeBuilder ${finished ? 'finished' : ''}`}>
				<circle cx={cx} cy={cy} r={radius * 1.35} stroke="none" fill="black" onClick={handleReset} className='SigilBgCircle' /> {/* bg circle to mask shit to black */}
				<circle cx={cx} cy={cy} r={radius} stroke="white" fill="none" />
				{runeCircles};
				{lines.map((line, index) => (
					<line key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="white" strokeWidth={2} />
				))}
			</svg>
		</>
	)
}

export default Sigil;