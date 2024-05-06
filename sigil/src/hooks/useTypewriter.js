import { useEffect, useState, useCallback, useRef } from "react";

export const useTypewriter = (text, speed = 50, callback) => {
	const [displayText, setDisplayText] = useState('');
	const [finished, setFinished] = useState(false);
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
		if (!finished) {
			typingInterval = setInterval(() => {
				if (displayText.length < text.length) {
					setDisplayText(prev => prev + text.charAt(prev.length));
				} else { // finished typing naturally.
					clearInterval(typingInterval);
					if (!callbackCalled.current && callback) {
						callbackCalled.current = true; 
						setFinished(true);
						callback();
					}
				}
			}, speed);
		}

		return () => clearInterval(typingInterval);
	}, [text, speed, finished, callback]);

	const finishText = useCallback(() => {
		if (!finished) {
			setDisplayText(text);
			setFinished(true);
			if (!callbackCalled.current && callback) {
				callbackCalled.current = true; 
				callback();
			}
		}
	}, [text, finished, callback]);

	return [displayText, finishText, finished];
};
