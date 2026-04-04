
import '../styling/QuizScores.css'

function QuizScores(props) {
    const quizResults = props.progressReport.quizResults;

    return (
        <section id={"quizScoresPage"}>
            <h1>Progress Report</h1>

            <section className={"progressSummaryCard"}>
                <h2>{props.course.courseName}</h2>
                <p>Completed Quizzes: {props.progressReport.completedQuizzes} / {props.progressReport.totalQuizzes}</p>
                <p>Course Completion: {props.progressReport.courseCompletion}%</p>
            </section>

            <section className={"quizGradesSection"}>
                <h2>Quiz Grades</h2>

                {quizResults.length === 0 ? (
                    <p>No quizzes completed yet.</p>
                ) : (
                    quizResults.map((quizResult) => (
                        <section className={"quizGradeCard"} key={quizResult.quizID}>
                            <h3>{quizResult.quizName}</h3>
                            <p>Score: {quizResult.score} / {quizResult.totalQuestions}</p>
                            <p>Grade: {quizResult.gradePercent}%</p>
                        </section>
                    ))
                )}
            </section>

            <button onClick={props.onBackToDashboard}>Back to Dashboard</button>
        </section>
    );
}

export default QuizScores;
