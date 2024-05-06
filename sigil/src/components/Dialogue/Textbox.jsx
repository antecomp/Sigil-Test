import '~/styles/Dialogue/Textbox.css'
import { useTypewriter } from '../../hooks/useTypewriter';

const Textbox = ({text}) => {

    const [displayText, finishText] = useTypewriter(text, 50, () => {console.log("typing finished")});

    return (
        <div className="Textbox" onClick={finishText}> 
            <p>
                {displayText}
            </p>
        </div>
    )
}

export default Textbox;