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
    const [displayText, finishText, lineFinished] = useTypewriter(currentText, 50, () => {console.log("finished typing")});
    const advanceText = () => {
        if(lineFinished) {
            setCurrentText(placeholderText[1])
        } else {
            finishText()
        }
    }

    // 
    const CONT = ['...', '...', '...', '...'];
    

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
                <ChoiceContainer choices = {CONT} canContinue = {false}/>
            </div>
        </div>
    )
}

export default Dialogue;