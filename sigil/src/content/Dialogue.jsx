import ChoiceContainer from "~/components/Dialogue/ChoiceContainer";
import Textbox from "~/components/Dialogue/Textbox";
import Viewbox from "~/components/Dialogue/Viewbox";
import chatIcon from '~/assets/ui/chaticon.png';
import '~/styles/Dialogue/Dialogue.css';
import { useModalWindow } from "react-modal-global";
import { lorem } from "../static/constants/placeholders";

const Dialogue = () => {

    const modal = useModalWindow();

    const CONT = ['...', '...', '...', '...'];
    

    return (
        <div className="DialogueContainer">
            <div className="DialogueTitle">
                <img src={chatIcon} onClick={modal.close}/>
            </div>
            <Viewbox/>
            <div className="DialogueBottom">
                <Textbox text={lorem}/>
                <ChoiceContainer choices = {CONT} canContinue = {false}/>
            </div>
        </div>
    )
}

export default Dialogue;