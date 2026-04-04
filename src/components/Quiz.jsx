import {useState} from "react";
import Question from './Question.jsx'
import '../styling/Quiz.css'

function Quiz(props) {
    const allQuestions = props.quiz.questions;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    function navigateToQuestion(questionNumber) {
        setCurrentQuestion(questionNumber);
    }

    function previousQuestion() {
        setCurrentQuestion((prevQ) => Math.max(prevQ - 1, 0));
    }

    function nextQuestion() {
        setCurrentQuestion((nextQ) => Math.min(nextQ + 1, allQuestions.length - 1));
    }

    function submitQuiz() {
        let correctCount = 0;

        allQuestions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswerID) {
                correctCount++;
            }
        });

        const totalQuestions = allQuestions.length;
        const gradePercent = Math.round((correctCount / totalQuestions) * 100);

        const result = {
            quizID : props.quiz.quizID,
            quizName : props.quiz.quizName,
            score : correctCount,
            totalQuestions : totalQuestions,
            gradePercent : gradePercent
        };

        props.onSubmit(result);
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
                <button id={"submitButton"} onClick={submitQuiz}>Submit</button>
                <button id={"nextButton"} onClick={nextQuestion}>Next</button>
            </nav>
        </section>
    );
}

export default Quiz;
