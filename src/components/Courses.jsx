
function QuizCard(props) {
    return (
        <section className={"quizCard"}>
            <h1>{props.quiz.quizName}</h1>
            <h2>Tags</h2>
            <ul>
                {props.quiz.quizTags.map((tag) => (
                    <li>{tag}</li>
                ))}
            </ul>
        </section>
    );
}

function Courses(props) {
    const tags = props.course.courseTags;
    const quizzes = props.course.quizzes;
    // Component should consist of the following items:

    // Course Description Portion in the top

    // Cards displaying Quizzes header information (name, tag, difficulty, question count, etc.)

    return (
        <div>
            <section id={"courseDetails"}>
                <h1>Course 0: {props.course.courseName}</h1>
                <p>{props.course.courseDescription}</p>
                <h2>Tags</h2>
                <ul>
                    {tags.map((tag) => (
                        <li>{tag}</li>
                    ))}
                </ul>
            </section>

            <section id={"courseQuizzes"}>
                {quizzes.map((quiz) => (
                    <QuizCard quiz={quiz}/>
                ))}
            </section>
        </div>
    );
}

export default Courses;