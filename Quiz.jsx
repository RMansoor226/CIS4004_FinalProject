import {useState} from "react";
import Question from './Question.jsx'
import '../styling/Quiz.css'

function Quiz(props) {
    const allQuestions = props.quiz.questions;

    // Tracks selected question
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Track currently selected answers
    const [selectedAnswers, setSelectedAnswers] = useState({});

    // Functions to change selected question
    function navigateToQuestion(questionNumber) {
        console.log("Navigated to question #" + questionNumber);
        setCurrentQuestion(questionNumber);
    }

    function previousQuestion() {
        console.log("Navigated to previous question");

        // Move to the previous question if the current index is greater than 0
        setCurrentQuestion((prevQ) => Math.max(prevQ - 1, 0));
    }

    function nextQuestion() {
        console.log("Navigated to next question");

        // Move to the next question if the current index is less than the index of the last item
        setCurrentQuestion((nextQ) => Math.min(nextQ + 1, allQuestions.length - 1));
    }

    return (
        <section id={"quizContainer"}>
            <nav id={"quizNumButtons"}>
                {allQuestions.map((selectedQuestion, index) => (
                    <button
                        key={index}
                        onClick={() => navigateToQuestion(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </nav>

            <Question
                question={allQuestions[currentQuestion]}
                selectedAnswer={selectedAnswers[currentQuestion]}
                onSelectAnswer={(answerID) =>
                    setSelectedAnswers(prev => ({
                        ...prev,
                        [currentQuestion] : answerID
                    }))
                }
            />

            <nav id={"quizNavButtons"}>
                <button id={"backButton"} onClick={previousQuestion}>Back</button>
                <button id={"submitButton"} onClick={props.onSubmit}>Submit</button>
                <button id={"nextButton"} onClick={nextQuestion}>Next</button>
            </nav>
        </section>
    );
}

export default Quiz;