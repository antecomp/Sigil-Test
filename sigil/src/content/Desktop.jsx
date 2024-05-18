import WindowContainer from '~/components/Window/WindowContainer';
import SimpleWindowContainer from '~/components/Window/SimpleWindowContainer';

import IntroText from '~/components/Placeholders/IntroText';
import NSGraph from './NSGraph';
import { useState } from 'react';


const defaultWindows = [
	(
			<SimpleWindowContainer width={'656px'} key="NSGraph">
				<NSGraph />
			</SimpleWindowContainer>
	),
	(
		<WindowContainer key="IntroText">
            <IntroText/>
        </WindowContainer>
	)
]


const Desktop = () => {

	const [windows, setWindows] = useState(defaultWindows);

	const removeWindow = (keyToRemove) => { // This will belong to a context provider so windows can close themselves, eachother etc.
		setWindows(
			currentWindows => {
				const newWindows = currentWindows.filter(win => win.key !== keyToRemove)
				return newWindows;
			}
		)
	}

	return(
		<div id="desktop">
		{windows}
		<button onClick={() => removeWindow('IntroText')}>Hide Introtext</button>
		</div>
	)
}

export default Desktop;