import '~/styles/Dialogue/Textbox.css'
import { useTypewriter } from '../../hooks/useTypewriter';
import { useState } from 'react';

const Textbox = ({text}) => {

    const [currentText, setCurrentText] = useState(text);

    // TODO: hoist all this up to Dialogue, because we need to link the buttons to this shit 
    // + we need the handlers for sprites etc.
    const [displayText, finishText] = useTypewriter(currentText, 50, () => {console.log("typing finished"); setLineFinished(true)});

    const [lineFinished, setLineFinished] = useState(false);

    const advanceText = () => {
        if(lineFinished) {
            console.log("Please god")
            setCurrentText("IM GOING INSANE");
        } else {
            finishText();
        }
    }

    return (
        <div className="Textbox" onClick={advanceText}> 
            <p>
                {displayText}
            </p>
        </div>
    )
}

export default Textbox;