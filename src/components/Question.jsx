//import {useState} from "react";
import Answer from './Answer.jsx'
import '../styling/Question.css'

function Question(props) {
    const answers = props.question.answerChoices;

    //const [selectedAnswerID, setSelectedAnswerID] = useState(null);

    return (
        <section id={"questionContainer"}>
            <p>{props.question.questionText}</p>
            <span>
                {answers.map((choice, index) => (
                    <Answer
                        key={index}
                        answer={choice}
                        name={`question #${props.question.questionID}`}
                        isSelected={props.selectedAnswer === choice.answerID}
                        onSelect={() => props.onSelectAnswer(choice.answerID)}
                    />
                ))}
            </span>
        </section>
    );
}

export default Question;