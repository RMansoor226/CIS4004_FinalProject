function QuizCard(props) {
    return (
        <section className={"quizCard"}>
            <h1>{props.quiz.quizName}</h1>
            <h2>Tags</h2>
            <ul>
                {props.quiz.quizTags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
        </section>
    );
}

function Courses(props) {
    const tags = props.course.courseTags;
    const quizzes = props.course.quizzes;

    return (
        <div>
            <section id={"courseDetails"}>
                <h1>User Courses</h1>
                <p>Welcome, {props.user?.username}</p>
                <p>Role: {props.user?.role}</p>

                <h2>Course 0: {props.course.courseName}</h2>
                <p>{props.course.courseDescription}</p>

                <h3>Tags</h3>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
            </section>

            <section id={"courseQuizzes"}>
                {quizzes.map((quiz, index) => (
                    <QuizCard key={index} quiz={quiz} />
                ))}
            </section>
        </div>
    );
}

export default Courses;