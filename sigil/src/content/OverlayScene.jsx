import { useEffect, useState, useRef } from "react";
import { useModalWindow } from "react-modal-global";
import { useTypewriter } from "../hooks/useTypewriter";
import '~/styles/OverlayScene/OverlayScene.css'

async function loadScene(file) {
	try {
		console.log(`loading ${file}`);
		const response = await import(`../static/scenes/${file}.js`)
		return response.default;
	} catch (error) {
		console.error(`Failed to load scene file:` , error)
		return null; // You should probably change this
	}
}

const fadeDuration = 250; // in ms, move to constants file later.

const OverlayScene = ({file}) => {
	const modal = useModalWindow()

	// For the entire scene object.
	const [scene, setScene] = useState(null);
	const sceneIndex = useRef(0);
	// Giving it an empty string placeholder to prevent access null prop error (for the useTypewriter hook)
	const [currentFrame, setCurrentFrame] = useState({text: ""});
	useEffect(() => {
		(async () => {
			try {
				let loadedScene = await loadScene(file);
				setScene(loadedScene);
				setCurrentFrame(loadedScene[0]);
			} catch (err) {
				console.error(err);
			}
		})()
	}, [file])

	// TODO/FIX in useTypewriter: for some reason you have to click twice on the first text to advance if the callback is null, but an empty function body works??
	const [displayText, skipTypingAnim, isLineFinished] = useTypewriter(currentFrame.text, 50, () => {});

	const [fadeText, setFadeText] = useState(false); // used for the animation of fading the text before advancing.
	
	// used to toggle between skipTypingAnim() and loading next functions based on if we're typing.
	// isLineFinished is adequate for this because we're just changing a condition, no complicated callback logic needed.

	const handleAdvance = () => {
		if(isLineFinished) {

			// trigger the postEvent of the current showed text before advancing...
			if(currentFrame.postEvent) {currentFrame.postEvent()};

			// If no next scene...
			if(!(scene[sceneIndex.current + 1])) {
				setCurrentFrame({text: "", color: "black"}); // Remember that modal doesn't unmount, so we need to give something to useTypewriter.
				modal.close()
				return;
			}

			setFadeText(true) 
			setTimeout(() => {
				sceneIndex.current += 1; 
				setCurrentFrame(scene[sceneIndex.current]);
				setFadeText(false)
			}, fadeDuration);
	

		} else {
			skipTypingAnim();
		}
	}

	return (
		<div className="OverlayScene" onClick={!fadeText ? handleAdvance : () => {/* do nothing */}}>
			<p style={{...currentFrame.style, color: (currentFrame.color), '--fadeDuration': `${fadeDuration * 2}ms`}} className={fadeText ? 'fadeOut' : ''}>
				{displayText}
			</p>
		</div>
	)


}

export default OverlayScene;