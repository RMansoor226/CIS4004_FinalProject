
function QuizInstructions(props) {
    const tags = props.quiz.quizTags;

    return (
        <section>
            <h1>Quiz 0: {props.quiz.quizName}</h1>
            <p>{props.quiz.quizDescription}</p>
            <h2>Tags</h2>
            <ul>
                {tags.map((tag) => (
                    <li>{tag}</li>
                ))}
            </ul>

            <button onClick={props.onStart}>Start</button>
        </section>
    );
}

export default QuizInstructions;