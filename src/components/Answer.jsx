import '../styling/Answer.css'

function Answer(props) {
    let displayedText = props.answer.answerText;
    if (props.answer.answerText === "") {
        displayedText = "This is a placeholder for an empty answer";
    }

    return (
        <span id={"answerContainer"}>
            <input
                id={"answerButton"}
                type={"radio"}
                name={props.name}
                checked={props.isSelected}
                onChange={props.onSelect}
            />
            <label id={"answerText"}>{displayedText}</label>
        </span>
    );
}

export default Answer;