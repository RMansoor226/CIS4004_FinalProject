import "../styling/Dashboard.css";
import { useState } from "react";

function Header({ user, onToggleManage, manageOpen }) {
    const title = user?.role === "admin"
        ? "Admin Dashboard"
        : "User Dashboard";

    return (
        <section id={"headerSection"}>
            <h1>{title}</h1>
            <nav id={"headerButtons"}>
                {user?.role === "admin" && (
                    <button onClick={onToggleManage}>
                        {manageOpen ? "Close Manage" : "Manage"}
                    </button>
                )}
            </nav>
        </section>
    );
}

function CourseCard(props) {
    return (
        <section className={"card"}>
            <h1>{props.course.courseName}</h1>
            <ul className={"tags"}>
                {props.course.courseTags?.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>

            <button onClick={props.onPick}>Select</button>

            {props.user?.role === "admin" && props.manageOpen && (
                <div>
                    <button onClick={() => props.onEdit(props.course._id)}>
                        Edit Course
                    </button>
                    <button onClick={() => props.onDelete(props.course._id)}>
                        Delete Course
                    </button>
                </div>
            )}
        </section>
    );
}

function CourseView(props) {
    return (
        <section>
            {props.courses.map((currCourse) => (
                <CourseCard
                    key={currCourse._id}
                    course={currCourse}
                    user={props.user}
                    manageOpen={props.manageOpen}
                    onPick={() => props.onCourseSelect(currCourse)}
                    onEdit={props.onEdit}
                    onDelete={props.onDelete}
                />
            ))}
        </section>
    );
}

function QuizCard(props) {
    return (
        <div className={"card"}>
            <h1>{props.quiz.quizName}</h1>
            <ul className={"tags"}>
                {props.quiz.quizTags?.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            <button onClick={props.onQuizSelect}>Select</button>
        </div>
    );
}

function QuizView(props) {
    return (
        <section>
            {props.quizzes.map((currQuiz) => (
                <QuizCard
                    key={currQuiz._id}
                    quiz={currQuiz}
                    onQuizSelect={() => props.onQuizSelect(currQuiz)}
                />
            ))}
        </section>
    );
}

function Dashboard(props) {
    const [courses, setCourses] = useState(props.courses ?? []);
    const [currentCourse, setCurrentCourse] = useState(
        Array.isArray(props.courses) && props.courses.length > 0
            ? props.courses[0]
            : null
    );
    const [newCourseName, setNewCourseName] = useState("");
    const [newCourseDescription, setNewCourseDescription] = useState("");
    const [manageOpen, setManageOpen] = useState(false);

    const setCurrentQuiz = props.onQuizSelect;

    const addCourse = () => {
        if (!newCourseName.trim()) return;

        const newCourse = {
            _id: Date.now(),
            courseName: newCourseName,
            courseDescription: newCourseDescription || "New course description",
            courseTags: ["new"],
            quizzes: []
        };

        const updatedCourses = [...courses, newCourse];
        setCourses(updatedCourses);
        setCurrentCourse(newCourse);
        setNewCourseName("");
        setNewCourseDescription("");
    };

    const editCourse = (_id) => {
        const updatedName = prompt("Enter the new course name:");
        if (!updatedName || !updatedName.trim()) return;

        const updatedCourses = courses.map((course) =>
            course._id === _id
                ? { ...course, courseName: updatedName }
                : course
        );

        setCourses(updatedCourses);

        if (currentCourse._id === _id) {
            const updatedCurrentCourse = updatedCourses.find(
                (course) => course._id === _id
            );
            setCurrentCourse(updatedCurrentCourse);
        }
    };

    const deleteCourse = (_id) => {
        const updatedCourses = courses.filter(
            (course) => course._id !== _id
        );

        setCourses(updatedCourses);

        if (updatedCourses.length > 0) {
            if (currentCourse._id === _id) {
                setCurrentCourse(updatedCourses[0]);
            }
        } else {
            setCurrentCourse({
                _id: 0,
                courseName: "",
                courseDescription: "",
                courseTags: [],
                quizzes: []
            });
        }
    };

    const toggleManage = () => {
        setManageOpen(!manageOpen);
    };

    return (
        <div id={"dashboardPage"}>
            <Header
                user={props.currentUser}
                onToggleManage={toggleManage}
                manageOpen={manageOpen}
            />

            <div id={"contentPanels"}>
                <section className={"panel"} id={"coursePanel"}>
                    <CourseView
                        courses={courses}
                        user={props.currentUser}
                        manageOpen={manageOpen}
                        onCourseSelect={setCurrentCourse}
                        onEdit={editCourse}
                        onDelete={deleteCourse}
                    />

                    {props.currentUser?.role === "admin" && manageOpen && (
                        <div>
                            <h3>Admin Controls</h3>

                            <input
                                type="text"
                                placeholder="Course name"
                                value={newCourseName}
                                onChange={(e) => setNewCourseName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Course description"
                                value={newCourseDescription}
                                onChange={(e) => setNewCourseDescription(e.target.value)}
                            />

                            <button onClick={addCourse}>Add Course</button>
                        </div>
                    )}
                </section>

                <section className={"panel"} id={"quizPanel"}>
                    {currentCourse && currentCourse.quizzes ? (
                        <QuizView
                            quizzes={currentCourse.quizzes}
                            onQuizSelect={setCurrentQuiz}
                        />
                    ) : (
                        <p>No course selected.</p>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Dashboard;