import "../styling/Dashboard.css";
import { useState } from "react";

// HEADER
function Header({ user, manageOpen, onToggleManage }) {
    const title = user?.role === "admin" ? "CodeSchool Admin" : "CodeSchool";

    return (
        <section id="headerSection">
            <h1>{title}</h1>

            {user?.role === "admin" && (
                <nav id="headerButtons">
                    <button onClick={onToggleManage}>
                        {manageOpen ? "Close Manage" : "Manage"}
                    </button>
                </nav>
            )}
        </section>
    );
}

// COURSE CARD
function CourseCard({ course, user, manageOpen, onPick, onEdit, onDelete }) {
    return (
        <section className="card">
            <h1>{course.courseName}</h1>

            <ul className="tags">
                {course.courseTags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>

            <button onClick={onPick}>Select</button>

            {user?.role === "admin" && manageOpen && (
                <div className="adminCourseActions">
                    <button onClick={() => onEdit(course.courseID)}>Edit</button>
                    <button onClick={() => onDelete(course.courseID)}>Delete</button>
                </div>
            )}
        </section>
    );
}

// COURSE VIEW
function CourseView({ courseGroup, user, manageOpen, onCourseSelect, onEdit, onDelete }) {
    return (
        <section>
            {courseGroup.map((currCourse) => (
                <CourseCard
                    key={currCourse.courseID}
                    course={currCourse}
                    user={user}
                    manageOpen={manageOpen}
                    onPick={() => onCourseSelect(currCourse)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </section>
    );
}

// QUIZ CARD
function QuizCard({ quiz, onQuizSelect }) {
    return (
        <div className="card">
            <h1>{quiz.quizName}</h1>

            <ul className="tags">
                {quiz.quizTags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>

            <button onClick={onQuizSelect}>Select</button>
        </div>
    );
}

// QUIZ VIEW
function QuizView({ quizGroup, onQuizSelect }) {
    return (
        <section>
            {quizGroup.map((currQuiz) => (
                <QuizCard
                    key={currQuiz.quizID}
                    quiz={currQuiz}
                    onQuizSelect={() => onQuizSelect(currQuiz)}
                />
            ))}
        </section>
    );
}

// MAIN DASHBOARD
function Dashboard({ currentUser, courses: initialCourses, onQuizSelect }) {
    const [courses, setCourses] = useState(initialCourses);
    const [currentCourse, setCurrentCourse] = useState(initialCourses[0]);
    const [manageOpen, setManageOpen] = useState(false);

    // ADMIN: Add Course
    const addCourse = () => {
        const name = prompt("Enter course name:");
        if (!name) return;

        const newCourse = {
            courseID: Date.now(),
            courseName: name,
            courseTags: ["new"],
            quizzes: []
        };

        const updated = [...courses, newCourse];
        setCourses(updated);
        setCurrentCourse(newCourse);
    };

    // ADMIN: Edit Course
    const editCourse = (courseID) => {
        const updatedName = prompt("Enter new course name:");
        if (!updatedName) return;

        const updatedCourses = courses.map((c) =>
            c.courseID === courseID ? { ...c, courseName: updatedName } : c
        );

        setCourses(updatedCourses);

        if (currentCourse.courseID === courseID) {
            setCurrentCourse(updatedCourses.find((c) => c.courseID === courseID));
        }
    };

    // ADMIN: Delete Course
    const deleteCourse = (courseID) => {
        const updated = courses.filter((c) => c.courseID !== courseID);
        setCourses(updated);

        if (currentCourse.courseID === courseID) {
            setCurrentCourse(updated[0] || null);
        }
    };

    return (
        <div id="dashboardPage">
            <Header
                user={currentUser}
                manageOpen={manageOpen}
                onToggleManage={() => setManageOpen(!manageOpen)}
            />

            <div id="contentPanels">
                <section className="panel" id="coursePanel">
                    <CourseView
                        courseGroup={courses}
                        user={currentUser}
                        manageOpen={manageOpen}
                        onCourseSelect={setCurrentCourse}
                        onEdit={editCourse}
                        onDelete={deleteCourse}
                    />

                    {currentUser?.role === "admin" && manageOpen && (
                        <div className="adminControls">
                            <h3>Admin Controls</h3>
                            <button onClick={addCourse}>Add Course</button>
                        </div>
                    )}
                </section>

                <section className="panel" id="quizPanel">
                    {currentCourse ? (
                        <QuizView
                            quizGroup={currentCourse.quizzes}
                            onQuizSelect={onQuizSelect}
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
