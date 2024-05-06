import '~/styles/Dialogue/Textbox.css'
import { useTypewriter } from '~/hooks/useTypewriter';
import { useEffect, useState } from 'react';
import { lorem2 } from '~/static/constants/placeholders';

const Textbox = ({text}) => {

    // Todo, proper capped incrementer for the text.
    const [currentText, setCurrentText] = useState(text[0]);

    // TODO: hoist all this up to Dialogue, because we need to link the buttons to this shit 
    // + we need the handlers for sprites etc.
    //useTypewriter returns displayText, an updating text for the effect
    //then finishText, a method to trigger an instant "finish" of text, skipping the typewriter effect
    // lastly, useTypewriter returns an updating bool based on if the text has finished typing out.
    const [displayText, finishText, lineFinished] = useTypewriter(currentText, 50, () => {console.log("typing finished")});

    //console.log(lineFinished);

    const advanceText = () => {
        if(lineFinished) {
            setCurrentText(lorem2);
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