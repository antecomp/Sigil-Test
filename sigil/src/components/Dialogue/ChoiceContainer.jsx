import '~/styles/Dialogue/ChoiceContainer.css'

const ChoiceContainer = ({ choices, canContinue, choiceCallback }) => {

    const renderChoices = () => {
        let rtn = [];

        if (choices == null) {
           for(let i = 0; i < 4; i++) {
                rtn.push(<a key={`disabledchoice-${i}`} className='unavailable'>---</a>)
           }
        } else {
            // Todo: if <4 choices, also render in some blanks like above.
            rtn = choices.map((choice, index) => (
                <a key={`dialoguechoice-${index}`} onClick={() => choiceCallback(choice)}>
                    {choice}
                </a>
            ))
        }

        return rtn;
    }


    return (
        <div className="ChoiceContainer">
            {renderChoices()}
            <a
                className={canContinue ? 'continueAvailable' : 'continueUnavailable'}
                onClick={() => { if (canContinue) { choiceCallback('continue') } }}
            >
                CONTINUE</a>


        </div>
    )
}

export default ChoiceContainer;