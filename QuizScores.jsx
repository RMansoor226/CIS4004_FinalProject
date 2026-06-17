import "../styling/QuizScores.css";

function QuizScores(props) {
    const quiz = props.quiz;
    const answers = props.answers || {};

    let correctCount = 0;

    const results = quiz.questions.map((question, index) => {
        const selectedAnswerID = answers[index];
        const isCorrect = selectedAnswerID === question.correctAnswerID;

        if (isCorrect) {
            correctCount++;
        }

        return {
            questionNumber: index + 1,
            isCorrect: isCorrect
        };
    });

    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);

    return (
        <section id="scorePage">
            <div id="scoreCard">
                <h1>{quiz.quizName}: Score Report</h1>

                <ol id="scoreList">
                    {results.map((result) => (
                        <li key={result.questionNumber}>
                            {result.isCorrect ? "Correct" : "Incorrect"}
                        </li>
                    ))}
                </ol>

                <h2>Score: {scorePercent}%</h2>
            </div>
        </section>
    );
}

export default QuizScores;