import React, {useState, useEffect} from 'react';
import './sigil.css'
import { Tooltip } from './Tooltip';

const runeMap = ["⍫", "☸", "⏆", "⎉", "⏣", "␥", "☀", "☍"];
const descJSXMap = [
	<>
		<h3>DEFEND</h3> <p>REDUCE DAMAGE TAKEN, NEGATE BASIC ATTACK DAMAGE</p>
	</>,

	<>
		<h3>OBSERVE</h3> <p>PREDICT DÆMON ATTACK ON NEXT TURN. LEAVES VULNERABLE TO ATTACK</p>
	</>,

	<>
		<h3>ATTACK</h3> <p>LUNGE AT ENEMY. CANNOT BREAK DEFENSE</p>
	</>,

	<>
		<h3>PREPARE</h3> <p>APPLY VULERABILITY, INCREASES EFFECTIVENESS OF FOLLOWING RUNE</p>
	</>,

	<>
		<h3>PROLONG</h3> <p>REPEAT THE PREVIOUS RUNE</p>
	</>,

	<>
		<h3>EVADE</h3> <p>CHANCE FOR ALL DAMAGE NEGATION, INCREASES DAMAGE ON EVASION FAIL</p>
	</>,

	<>
		<h3>HEAL</h3> <p>RECOVER LOST HEALTH, LEAVES VULNERABLE TO ATTACKS</p>
	</>,

	<>
		<h3>CALL FAMILIAR</h3> <p>SUMMON FAMILIAR OR USE SUMMONED FAMILIARS ABILITY</p>
	</>
]

const Sigil = ({radius}) => {

	// main circle vars
	const numRunes = 8;
	const runesPerMove = 5; // how many runes do we pick before marking as "finished"
	const runeCircles = [];
	const cx = 250;
	const cy = 250;

	// vars for the line drawing stuff
	const [clickedRunes, setClickedRunes] = useState([]);
	const [lines, setLines] = useState([]);


	// for tooltip
	const [toolTipTarget, setTooltipTarget] = useState(null);
	// TODO, MOVE THE TOOLTIP STUFF / SETTERS TO TRIGGER SHOW TO GENERAL UTILITY JS FILE
	// YOU SHOULD BE ABLE TO SET THE TARGET STATE SETTER AS A CALLBACK INTO THIS FUNCTION 
	// FOR PORTABILITY.




	// for the pixelate test
	const [pixelate, setPixelate] = useState(false);

	const togglePixelate = () => {
		setPixelate(!pixelate);
	}


	// state for finished
	const [finished, setFinished] = useState(false);

	const handleClick = (key, x, y) => {

		// Guard Clause: do nothing if we already clicked this rune
		if(clickedRunes.some(rune => rune.key === key)) {
			return;
		}

		// Gaurd clause, prevent clicking if we have the finished flag.
		// Hopefully we'll have something more elegant in the real deal but this is fine for demo purposes.
		if(finished) return;

		//console.log(`Clicked rune ${key} at (${x},${y})`)
		const clickedRune = {key, x, y};
		setClickedRunes(prevClickedRunes => [...prevClickedRunes, clickedRune])
	}


	// called only when our clickedRunes array updates, i.e when we click a rune.
	useEffect(() => {
		if(clickedRunes.length > 1) {
			const lastClickedRune = clickedRunes[clickedRunes.length - 2];
			const currentClickedRune = clickedRunes[clickedRunes.length - 1];
			const newLine = 	{x1: lastClickedRune.x, y1: lastClickedRune.y, 
								x2: currentClickedRune.x, y2: currentClickedRune.y};
			setLines(prevLines => [...prevLines, newLine]);
		}


		//setFinished(clickedRunes.length == numRunes);
		setFinished(clickedRunes.length == runesPerMove);

	}, [clickedRunes]);


	// edge case : hovering over the finishing rune still triggers tooltip
	// THIS IS TERRIBLE BECAUSE USEEFFECT IS TRIGGERED MORE OFTEN THAN THIS, NEED
	// SOME SUPLIMENTAL FUNCTION TO MARK THE SHIT AS FINISHED AND RUN A BUNCH OF CODE THEN LOL.
	useEffect(() => {
		setTooltipTarget(null);
	}, [finished])


	const handleReset = () => {
		setClickedRunes([]);
		setLines([]);
		setFinished(false); // likely unneeded because the useEffect would eval to this anyway
	}


	for(let i = 0; i < numRunes; i++) {
		const angle = (Math.PI * 2 * i) / numRunes;
		const x = cx + radius * Math.cos(angle);
		const y = cy + radius * Math.sin(angle);

		runeCircles.push(
			<g key={i}>
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
			onMouseEnter={() => !finished ? setTooltipTarget(descJSXMap[i]) : setTooltipTarget(null)}
			onMouseLeave={() => setTooltipTarget(null)}
			/>
			<text x={x} y={y} textAnchor='middle' dy=".35em" fill="white">{runeMap[i]}</text>
			</g>
		);
	}


	return (
		<>
			{toolTipTarget && <Tooltip offset={{ x: 10, y: 10 }} delay={"0.75s"}> {toolTipTarget} </Tooltip>}

			<svg style={{ position: "absolute", top: 0, pointerEvents: "none", width: 0, height: 0 }}>
				<filter id="pixelate" x="0" y="0">
					<feFlood x="1" y="1" height="1" width="1" />
					<feComposite width="2" height="2" />
					<feTile result="a" />
					<feComposite in="SourceGraphic" in2="a" operator="in" />
					<feMorphology operator="dilate" radius="1" />
				</filter>
			</svg>


			<svg width="500" height="500" className={`runeBuilder ${finished ? 'finished' : ''}`} filter={pixelate ? 'url(#pixelate)' : ''}>
				<circle cx="250" cy="250" r={radius} stroke="white" strokeWidth="2" fill="none" />
				{runeCircles};
				{lines.map((line, index) => (
					<line key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="white" strokeWidth={2} />
				))}
			</svg>
			<br />
			<button onClick={handleReset}>Reset</button> <br />
			<button onClick={togglePixelate}>Pixelate</button>

		</>
	)
}

export default Sigil;