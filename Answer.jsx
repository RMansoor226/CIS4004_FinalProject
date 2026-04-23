import '../styling/Answer.css'

function Answer(props) {
    let displayedText = props.answer.answerText;
    if (props.answer.answerText === "") {
        displayedText = "This is a placeholder for an empty answer";
    }

    return (
        <label className="answerContainer">
            <input
                className="answerButton"
                type="radio"
                name={props.name}
                checked={props.isSelected}
                onChange={props.onSelect}
            />
            <span className="answerText">{displayedText}</span>
        </label>
    );
}

export default Answer;