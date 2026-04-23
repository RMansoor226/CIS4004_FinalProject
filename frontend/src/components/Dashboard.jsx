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

            {props.user?.role === "admin" && props.manageOpen && (
                <div>
                    <button onClick={() => props.onEditQuiz(props.quiz._id)}>
                        Edit Quiz
                    </button>
                    <button onClick={() => props.onDeleteQuiz(props.quiz._id)}>
                        Delete Quiz
                    </button>
                </div>
            )}
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
                    user={props.user}
                    manageOpen={props.manageOpen}
                    onQuizSelect={() => props.onQuizSelect(currQuiz)}
                    onEditQuiz={props.onEditQuiz}
                    onDeleteQuiz={props.onDeleteQuiz}
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
    const [currentQuiz, setCurrentQuiz] = useState(null);

    const [newCourseName, setNewCourseName] = useState("");
    const [newCourseDescription, setNewCourseDescription] = useState("");

    const [newQuizName, setNewQuizName] = useState("");
    const [newQuizDescription, setNewQuizDescription] = useState("");

    const [newQuestionText, setNewQuestionText] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState("0");

    const [manageOpen, setManageOpen] = useState(false);

    const goToQuiz = (quiz) => {
        setCurrentQuiz(quiz);
        props.onQuizSelect(quiz);
    };

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
        setCurrentQuiz(null);
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

        if (currentCourse && currentCourse._id === _id) {
            const updatedCurrentCourse = updatedCourses.find(
                (course) => course._id === _id
            );
            setCurrentCourse(updatedCurrentCourse);
        }
    };

    const deleteCourse = (_id) => {
        const updatedCourses = courses.filter((course) => course._id !== _id);
        setCourses(updatedCourses);

        if (updatedCourses.length > 0) {
            if (currentCourse && currentCourse._id === _id) {
                setCurrentCourse(updatedCourses[0]);
                setCurrentQuiz(null);
            }
        } else {
            setCurrentCourse(null);
            setCurrentQuiz(null);
        }
    };

    const addQuiz = () => {
        if (!currentCourse || !newQuizName.trim()) return;

        const newQuiz = {
            _id: Date.now(),
            quizID: Date.now(),
            quizName: newQuizName,
            quizDescription: newQuizDescription || "New quiz description",
            quizTags: ["new"],
            questions: []
        };

        const updatedCourses = courses.map((course) =>
            course._id === currentCourse._id
                ? { ...course, quizzes: [...(course.quizzes ?? []), newQuiz] }
                : course
        );

        setCourses(updatedCourses);

        const updatedCurrentCourse = updatedCourses.find(
            (course) => course._id === currentCourse._id
        );
        setCurrentCourse(updatedCurrentCourse);
        setCurrentQuiz(newQuiz);

        setNewQuizName("");
        setNewQuizDescription("");
    };

    const editQuiz = (quizId) => {
        if (!currentCourse) return;

        const updatedName = prompt("Enter the new quiz name:");
        if (!updatedName || !updatedName.trim()) return;

        const updatedCourses = courses.map((course) => {
            if (course._id !== currentCourse._id) return course;

            return {
                ...course,
                quizzes: (course.quizzes ?? []).map((quiz) =>
                    quiz._id === quizId
                        ? { ...quiz, quizName: updatedName }
                        : quiz
                )
            };
        });

        setCourses(updatedCourses);

        const updatedCurrentCourse = updatedCourses.find(
            (course) => course._id === currentCourse._id
        );
        setCurrentCourse(updatedCurrentCourse);

        if (currentQuiz && currentQuiz._id === quizId) {
            const updatedQuiz = updatedCurrentCourse.quizzes.find(
                (quiz) => quiz._id === quizId
            );
            setCurrentQuiz(updatedQuiz);
        }
    };

    const deleteQuiz = (quizId) => {
        if (!currentCourse) return;

        const updatedCourses = courses.map((course) => {
            if (course._id !== currentCourse._id) return course;

            return {
                ...course,
                quizzes: (course.quizzes ?? []).filter((quiz) => quiz._id !== quizId)
            };
        });

        setCourses(updatedCourses);

        const updatedCurrentCourse = updatedCourses.find(
            (course) => course._id === currentCourse._id
        );
        setCurrentCourse(updatedCurrentCourse);

        if (currentQuiz && currentQuiz._id === quizId) {
            setCurrentQuiz(null);
        }
    };

    const addQuestion = () => {
        if (!currentCourse || !currentQuiz || !newQuestionText.trim()) return;

        const answerTexts = [answer1, answer2, answer3, answer4];
        if (answerTexts.some((text) => !text.trim())) return;

        const answers = answerTexts.map((text, index) => ({
            answerID: Date.now() + index,
            answerText: text,
            isCorrect: index === Number(correctAnswerIndex)
        }));

        const correctAnswer = answers[Number(correctAnswerIndex)];

        const newQuestion = {
            _id: Date.now(),
            questionID: Date.now(),
            questionText: newQuestionText,
            answerChoices: answers,
            correctAnswerID: correctAnswer.answerID
        };

        const updatedCourses = courses.map((course) => {
            if (course._id !== currentCourse._id) return course;

            return {
                ...course,
                quizzes: (course.quizzes ?? []).map((quiz) =>
                    quiz._id === currentQuiz._id
                        ? {
                              ...quiz,
                              questions: [...(quiz.questions ?? []), newQuestion]
                          }
                        : quiz
                )
            };
        });

        setCourses(updatedCourses);

        const updatedCurrentCourse = updatedCourses.find(
            (course) => course._id === currentCourse._id
        );
        setCurrentCourse(updatedCurrentCourse);

        const updatedQuiz = updatedCurrentCourse.quizzes.find(
            (quiz) => quiz._id === currentQuiz._id
        );
        setCurrentQuiz(updatedQuiz);

        setNewQuestionText("");
        setAnswer1("");
        setAnswer2("");
        setAnswer3("");
        setAnswer4("");
        setCorrectAnswerIndex("0");
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
                        onCourseSelect={(course) => {
                            setCurrentCourse(course);
                            setCurrentQuiz(null);
                        }}
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

                            <h3 style={{ marginTop: "20px" }}>Add Quiz to Selected Course</h3>

                            <p>
                                Current course: {currentCourse?.courseName || "No course selected"}
                            </p>

                            <input
                                type="text"
                                placeholder="Quiz name"
                                value={newQuizName}
                                onChange={(e) => setNewQuizName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Quiz description"
                                value={newQuizDescription}
                                onChange={(e) => setNewQuizDescription(e.target.value)}
                            />

                            <button onClick={addQuiz}>Add Quiz</button>

                            <h3 style={{ marginTop: "20px" }}>Add Question to Selected Quiz</h3>

                            <p>
                                Current quiz: {currentQuiz?.quizName || "No quiz selected"}
                            </p>

                            <input
                                type="text"
                                placeholder="Question text"
                                value={newQuestionText}
                                onChange={(e) => setNewQuestionText(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Answer choice 1"
                                value={answer1}
                                onChange={(e) => setAnswer1(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Answer choice 2"
                                value={answer2}
                                onChange={(e) => setAnswer2(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Answer choice 3"
                                value={answer3}
                                onChange={(e) => setAnswer3(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Answer choice 4"
                                value={answer4}
                                onChange={(e) => setAnswer4(e.target.value)}
                            />

                            <label style={{ display: "block", margin: "10px 0" }}>
                                Correct answer:
                                <select
                                    value={correctAnswerIndex}
                                    onChange={(e) => setCorrectAnswerIndex(e.target.value)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    <option value="0">Answer 1</option>
                                    <option value="1">Answer 2</option>
                                    <option value="2">Answer 3</option>
                                    <option value="3">Answer 4</option>
                                </select>
                            </label>

                            <button onClick={addQuestion}>Add Question</button>
                        </div>
                    )}
                </section>

                <section className={"panel"} id={"quizPanel"}>
                    {currentCourse && currentCourse.quizzes ? (
                        <QuizView
                            quizzes={currentCourse.quizzes}
                            user={props.currentUser}
                            manageOpen={manageOpen}
                            onQuizSelect={goToQuiz}
                            onEditQuiz={editQuiz}
                            onDeleteQuiz={deleteQuiz}
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
