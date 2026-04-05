import './Dashboard.css';

function Header(props) {
    return (
        <section id={"headerSection"}>
            <h1>CodeSchool</h1>
            <nav id={"headerButtons"}>
                <button>Courses</button>
                <button>Progress</button>
                {props.user?.role === "admin" && <button>Manage</button>}
            </nav>
        </section>
    );
}

function CourseCard(props) {
    return (
        <section className={"courseCard"}>
            <h1>{props.course.courseName}</h1>
            <h2>Tags</h2>
            <ul>
                {props.course.courseTags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
        </section>
    );
}

function Dashboard(props) {
    return (
        <div id={"dashboardPage"}>
            <Header user={props.user} />

            <div id={"contentPanels"}>
                <section id={"coursePanel"}>
                    <h2>Admin Dashboard</h2>
                    <p>Welcome, {props.user?.username}</p>
                    <p>Role: {props.user?.role}</p>

                    <CourseCard course={props.course} />

                    {props.user?.role === "admin" && (
                        <div>
                            <h3>Admin Controls</h3>
                            <button>Add Course</button>
                            <button>Edit Course</button>
                            <button>Delete Course</button>
                        </div>
                    )}
                </section>

                <section id={"quizPanel"}>
                    <h2>Available Quizzes</h2>
                    {props.course.quizzes.map((quiz, index) => (
                        <div key={index}>
                            <h3>{quiz.quizName}</h3>
                            <p>{quiz.quizDescription}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Dashboard;