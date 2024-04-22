import React, {useState, useEffect} from 'react';
import './sigil.css'

const runeMap = ["⍫", "☸", "⏆", "⎉", "⏣", "␥", "☀", "☍"];

const Sigil = ({radius}) => {

	// main circle vars
	const numRunes = 8;
	const runeCircles = [];
	const cx = 250;
	const cy = 250;

	// vars for the line drawing stuff
	const [clickedRunes, setClickedRunes] = useState([]);
	const [lines, setLines] = useState([]);



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


		setFinished(clickedRunes.length == numRunes);

	}, [clickedRunes]);

	const handleReset = () => {
		setClickedRunes([]);
		setLines([]);
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
			/>
			<text x={x} y={y} textAnchor='middle' dy=".35em" fill="white">{runeMap[i]}</text>
			</g>
		);
	}


	return (
		<>
<svg>
  <filter id="pixelate" x="0" y="0">
    <feFlood x="1" y="1" height="1" width="1"/>
    <feComposite width="2" height="2"/>
    <feTile result="a"/>
    <feComposite in="SourceGraphic" in2="a" operator="in"/>
    <feMorphology operator="dilate" radius="1"/>
  </filter>
</svg>


		<svg width="500" height="500" className={finished ? 'finished' : ''} filter={pixelate ? 'url(#pixelate)' : ''}>
			<circle cx="250" cy="250" r={radius} stroke="white" strokeWidth="2" fill="none" />
			{runeCircles};
			{lines.map((line,index) => (
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