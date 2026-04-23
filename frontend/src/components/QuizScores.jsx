import "../styling/QuizScores.css"

function QuizScores(props) {
    const correctAnswers = props.quiz.questions.map(question => question.correctAnswerID);
    console.log(correctAnswers);

    let score = 0;

    props.quiz.questions.forEach((q, index) => {
        if (props.answers[index] === correctAnswers[index]) {
            score++;
        }
    });

    return (
        <section id={"quizResultsContainer"}>
            <h1>{props.quiz.quizName} Results</h1>
            <h3>You got {score} out of {props.quiz.questions.length} right!</h3>
            <ul id={"questionList"}>
                {props.quiz.questions.map((q, index) => (
                    <li key={index}>
                        <strong>Question #{index + 1}:</strong>
                        {props.answers[index] === correctAnswers[index]
                            ? " Correct"
                            : " Incorrect"}
                    </li>
                ))}
            </ul>
            <h2>Score: {(score / props.quiz.questions.length) * 100}%</h2>
            <button onClick={props.onReturn}>Return Home</button>
        </section>
    );
}

export default QuizScores;