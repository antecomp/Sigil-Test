/**
 * Custom hook for creating a simple typewriter effect.
 * @param {string} text - The text to type out. Animation automatically triggered when this is updated, meaning this is best linked to some state var.
 * @param {number} delay - The delay between typing characters (in ms)
 * @param {function} onComplete - Callback function called when typing is complete.
 * @returns {{displayText: string, skipTypingAnim: () => void, isFinished: boolean}}
 * displayText - updating string state that's the currently "typed" text
 * skipTypingAnim - void method for pre-emptively filling all the text in, skipping the animation
 * finished - updating boolean state for tracking if the text has finished typing out // Preferably only used for conditional renders, rely on callback for timed logic.
 */


import { useEffect, useState, useCallback, useRef } from "react";

export const useTypewriter = (text, delay = 50, onComplete) => {
	const [displayText, setDisplayText] = useState('');
	const [isFinished, setFinished] = useState(false);
	const [prevText, setPrevText] = useState(text);
	const callbackCalled = useRef(false);

	// Reset needed state when the text changes.
	useEffect(() => {
		if (prevText !== text) {
			setDisplayText('');
			setFinished(false);
			setPrevText(text);
			callbackCalled.current = false; 
		}
	}, [text, prevText]);

	useEffect(() => {
		let typingInterval;
		if (!isFinished) {
			typingInterval = setInterval(() => {
				if (displayText.length < text.length) {
					setDisplayText(prev => prev + text.charAt(prev.length));
				} else { // finished typing naturally.
					clearInterval(typingInterval);
					if (!callbackCalled.current && onComplete) {
						callbackCalled.current = true; 
						setFinished(true);
						onComplete();
					}
				}
			}, delay);
		}

		return () => clearInterval(typingInterval);
	}, [text, delay, isFinished, onComplete]);

	const skipTypingAnim = useCallback(() => {
		if (!isFinished) {
			setDisplayText(text);
			setFinished(true);
			if (!callbackCalled.current && onComplete) {
				callbackCalled.current = true; 
				onComplete();
			}
		}
	}, [text, isFinished, onComplete]);

	return [displayText, skipTypingAnim, isFinished];
};
