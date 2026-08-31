import '../styling/Dashboard.css';
import {useState} from "react";

// Component that represents dashboard page's header
function Header({user}) {
    const title = user?.role === "admin"
        ? "Admin Dashboard"
        : "User Dashboard";
    return (
      <section id={"headerSection"}>
          <h1>{title}</h1>
          <nav id={"headerButtons"}>
              <button>Courses</button>
              <button>Progress</button>
              {user?.role === "admin" && <button>Manage</button>}
          </nav>
      </section>
    );
}

// Component that represents individual course cards
function CourseCard(props) {
    return (
        <section className={"card"}>
            <h1>{props.course.courseName}</h1>
            <ul className={"tags"}>
                {props.course.courseTags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            <button onClick={props.onPick}>Select</button>
        </section>
    );
}

// Component that represents left-side panel that houses all course cards
function CourseView(props) {
    return (
        <section>
            {props.courseGroup.map((currCourse) => (
                <CourseCard
                    key={currCourse.courseID}
                    course={currCourse}
                    onPick={
                        () => props.onCourseSelect(currCourse)
                    }
                />
            ))}
        </section>
    );
}

// Component that represents individual quiz cards
function QuizCard(props) {
    return (
        <div className={"card"}>
            <h1>{props.quiz.quizName}</h1>
            <ul className={"tags"}>
                {props.quiz.quizTags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            <button onClick={props.onQuizSelect}>Select</button>
        </div>
    );
}

// Component that represents right-side panel that houses all quiz cards
function QuizView(props) {
    return (
        <section>
            {props.quizGroup.map((currQuiz) => (
                <QuizCard
                    key={currQuiz.quizID}
                    quiz={currQuiz}
                    onQuizSelect={() => props.onQuizSelect(currQuiz)} />
            ))}
        </section>
    );
}

// Component that produces entire dashboard page using all previously listed components
function Dashboard(props) {
    // Track currently selected course
    const [currentCourse, setCurrentCourse] = useState(props.courses[0]);
    const setCurrentQuiz = props.onQuizSelect;

    return (
        // Header Element that includes Logo with Navigation Buttons
        // Separate Panel that starts as one unit showing all courses
        // Upon selection of a course the panel splits into two
        // First panel is the same as the original courses panel
        // Second panel is a view of the available quizzes
        // Upon selection of a quiz the page jumps to the selected quiz's instructions page
        <div id={"dashboardPage"}>
            <Header user={props.currentUser} />
            <div id={"contentPanels"}>
                <section className={"panel"} id={"coursePanel"}>
                    <CourseView courseGroup={props.courses} onCourseSelect={setCurrentCourse}/>
                    {props.currentUser?.role === "admin" && (
                        <div>
                            <h3>Admin Controls</h3>
                            <button>Add Course</button>
                            <button>Edit Course</button>
                            <button>Delete Course</button>
                        </div>
                    )}
                </section>
                <section className={"panel"} id={"quizPanel"}>
                    <QuizView quizGroup={currentCourse.quizzes} onQuizSelect={setCurrentQuiz}/>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;