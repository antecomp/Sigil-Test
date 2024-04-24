// Based on (stolen from) https://yoavik.com/snippets/mouse-tracker
import {useRef, useEffect} from 'react';
import { createPortal } from 'react-dom';
import cls from 'classnames'
import '../styles/tooltip.css'

export const Tooltip = ({children, className, offset = {x: 0, y:0}, delay}) => {
	const element = useRef({});

	useEffect(() => {
		function handler(e) {
			if (element.current) {
				const x = e.clientX + offset.x, y = e.clientY + offset.y;
				element.current.style.transform = `translate(${x}px, ${y}px)`;
				//element.current.style.visibility = 'visible';
				element.current.classList.add('shownTooltip')
			}
		}

		document.addEventListener('mousemove', handler);
		
		return () => document.removeEventListener('mousemove', handler);

	}, [offset.x, offset.y]);

	// note that the delay aspect is handles in CSS (because im nefarious like that)
	// this passes a CSS var with the delay time.
	// passing no delay prop makes it default to ???? and that just gives it 0 delay at all lol.
	return createPortal(
		<div className={cls('tooltip', className)} ref={element} style={{"--delay": `${delay}`}}> 
			{children}
		</div>
	, document.body
	);
}