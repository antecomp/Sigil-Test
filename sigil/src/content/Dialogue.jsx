import ChoiceContainer from "~/components/Dialogue/ChoiceContainer";
import Viewbox from "~/components/Dialogue/Viewbox";
import chatIcon from '~/assets/ui/chaticon.png';
import '~/styles/Dialogue/Dialogue.css';
import '~/styles/Dialogue/Textbox.css'
import { useModalWindow } from "react-modal-global";
import { lorem, lorem2 } from "~/static/constants/placeholders";
import { useEffect, useState } from "react";
import { useTypewriter } from "~/hooks/useTypewriter";

const placeholderText = [lorem, lorem2];

async function loadDialogue(fileName) {
    try {
        console.log(fileName);
        const response = await import(`../static/dialogue/${fileName}.json`)
        console.log(`file loaded, ref below for object`)
        console.log(response.default);
        return response.default;
    } catch (error) {
        console.error('Failed to load dialog file:', error);
        return null; // TODO: replace this with an actually valuable return we can create an error modal with. (Or throw an error we can handle similarly.)
    }
}

const Dialogue = ({ file }) => {
    const modal = useModalWindow();

    // load dialogue on load / fileName change.
    const [dialogue, setDialogue] = useState(null);
    useEffect(() => {
        loadDialogue(file).then(dia => setDialogue(dia));
    }, [file])


    // For typewriter/textbox piece  ------------------------------------------------------------------;

    // callback triggered by useTypewriter when it's done with the current line/text input.
    const onTextFinished = () => {
        console.log("Finished Typing");
        setChoices(choicesPlaceholder);
    }

    // You will most likely want a currentDialogueObject or whatever here for the JSON parsing...
    const [currentText, setCurrentText] = useState(placeholderText[0])
    const [displayText, skipTypingAnim, isLineFinished] = useTypewriter(currentText, 50, onTextFinished);
    const [canContinue, setCanContinue] = useState(true); // May be a placeholder depending on the logic is implemented. Feel free to change as needed.

    /* !!! PLACEHOLDER LOGIC. DON'T ACTUALLY IMPLEMENT LIKE THIS LOL. USE CALLBACK INSTEAD !!! */
    const advanceText = () => {
        if (isLineFinished) {
            setCurrentText(placeholderText[1])
        } else {
            skipTypingAnim()
        }
    }

    // ------------------------------------------------------------------------------------------------;

    // For choices
    const [choices, setChoices] = useState(null); // May be a placeholder depending on the logic is implemented. Feel free to change as needed.
    const choicesPlaceholder = ['Yes', 'No', 'Maybe', '...'];

    const choiceCallback = (action) => {
        // This is an (obvious) placeholder since I have to wait until we figure out how to parse the dialogue JSON events and whatnot.
        if (action === "continue") {
            advanceText();
        } else {
            console.log(action)
        }
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (!dialogue) {
        return <div>Loading...</div>;
    }

    return (
        <div className="DialogueContainer">
            <div className="DialogueTitle">
                <img src={chatIcon} onClick={modal.close} />
            </div>
            <Viewbox />
            <div className="DialogueBottom">
                <div className="Textbox" onClick={advanceText}>
                    {displayText}
                </div>
                <ChoiceContainer choices={choices} canContinue={canContinue} choiceCallback={choiceCallback} />
            </div>
        </div>
    )
}

export default Dialogue;