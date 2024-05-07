import ChoiceContainer from "~/components/Dialogue/ChoiceContainer";
import Viewbox from "~/components/Dialogue/Viewbox";
import chatIcon from '~/assets/ui/chaticon.png';
import '~/styles/Dialogue/Dialogue.css';
import '~/styles/Dialogue/Textbox.css'
import { useModalWindow } from "react-modal-global";
import { lorem, lorem2 } from "../static/constants/placeholders";
import { useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";

const placeholderText = [lorem, lorem2];

const Dialogue = () => {

    const modal = useModalWindow();
    
    // For typewriter/textbox piece;
    const [currentText, setCurrentText] = useState(placeholderText[0])
    const [displayText, finishText, lineFinished] = useTypewriter(currentText, 50, () => {console.log("finished typing"); setChoices(choicesPlaceholder);});
    const [canContinue, setCanContinue] = useState(true);

    /* Of course this logic will be changed to the dynamic dialogue JSON loader slop :) */
    const advanceText = () => {
        if(lineFinished) {
            setCurrentText(placeholderText[1])
        } else {
            finishText()
        }
    }


    // For choices
    const [choices, setChoices] = useState(null);
    const choicesPlaceholder = ['Yes', 'No', 'Maybe', '...'];

    const choiceCallback = (action) => {
        // This is an (obvious) placeholder since I have to wait until we figure out how to parse the dialogue JSON events and whatnot.
        if(action === "continue") {
            advanceText();
        } else {
            console.log(action)
        }
    }

    // 
    

    return (
        <div className="DialogueContainer">
            <div className="DialogueTitle">
                <img src={chatIcon} onClick={modal.close}/>
            </div>
            <Viewbox/>
            <div className="DialogueBottom">
                <div className="Textbox" onClick={advanceText}>
                    {displayText}
                </div>
                <ChoiceContainer choices = {choices} canContinue = {canContinue} choiceCallback={choiceCallback}/>
            </div>
        </div>
    )
}

export default Dialogue;