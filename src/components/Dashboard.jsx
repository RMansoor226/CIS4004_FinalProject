import './Dashboard.css';

function Header() {
    return (
      <section id={"headerSection"}>
          <h1>CodeSchool</h1>
          <nav id={"headerButtons"}>
              <button>Courses</button>
              <button>Progress</button>
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
                {props.course.courseTags.map((tag) => (
                    <li>{tag}</li>
                ))}
            </ul>
        </section>
    );
}

// function CourseView(props) {
//     return (
//
//     );
// }

function Dashboard(props) {
    return (
        // Header Element that includes Logo with Navigation Buttons
        // Separate Panel that starts as one unit showing all courses
        // Upon selection of a course the panel splits into two
        // First panel is the same as the original courses panel
        // Second panel is a view of the available quizzes
        // Upon selection of a quiz the page jumps to the selected quiz's instructions page
        <div id={"dashboardPage"}>
            <Header />
            <div id={"contentPanels"}>
                <section id={"coursePanel"}>
                    <CourseCard course={props.course}/>
                </section>
                <section id={"quizPanel"}>
                    <CourseCard course={props.course}/>
                </section>
            </div>


        </div>
    );
}

export default Dashboard;