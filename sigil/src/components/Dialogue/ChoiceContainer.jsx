import '~/styles/Dialogue/ChoiceContainer.css'

const ChoiceContainer = ({ choices, canContinue }) => {

    return (
        <div className="ChoiceContainer">
        {choices.map((choice, index) => (
            <a key={`dialoguechoice-${index}`}>
                {choice}
            </a>
        ))}
        <a className={canContinue ? 'continueAvailable' : 'continueUnavailable'}>CONTINUE</a>
        
        
        </div>
    )
}

export default ChoiceContainer;