import { useEffect, useState, useRef } from "react"

export const useTypewriter = (text, speed = 50, callback) => {
	const [displayText, setDisplayText] = useState('');
	const idx = useRef(0);
	const displayTextRef = useRef('');
	const [finishEarly, setFinishEarly] = useState(false);
	const callbackCalled = useRef(false);

	useEffect(() => {
		const typingInterval = setInterval(() => {
			if(finishEarly) {
				displayTextRef.current = text;
				setDisplayText(text);
				clearInterval(typingInterval);
				if (!callbackCalled.current && callback) {
					callback(); 
					callbackCalled.current = true;
				}
			} else if (idx.current < text.length) {
				displayTextRef.current += text.charAt(idx.current);
				setDisplayText(displayTextRef.current);
				idx.current += 1;
			} else {
				clearInterval(typingInterval)
				if (!callbackCalled.current && callback) {
					callback();
					callbackCalled.current = true; 
				}
			}
		}, speed);

		return () => {
			clearInterval(typingInterval);
		}
	}, [text, speed, callback]);

	const finishText = () => {
		if(!finishEarly) {
			setFinishEarly(true);
		}
	}

	return [displayText, finishText];
}