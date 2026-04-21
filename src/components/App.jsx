import { useState } from 'react'
import Login from './Login.jsx'
import Dashboard from "./Dashboard.jsx";
import Quiz from './Quiz.jsx'
import QuizScores from './QuizScores.jsx'
import '../styling/App.css'

const users = [
    {
        username: "admin1",
        password: "admin123",
        role: "admin"
    },
    {
        username: "user1",
        password: "user123",
        role: "user"
    }
];

const answer0 = {
    answerID : 1000,
    answerText : "A variable stores data that can be used later in a program"
}

const answer1 = {
    answerID : 1001,
    answerText : "A variable repeats code automatically"
}

const answer2 = {
    answerID : 1002,
    answerText : "A variable is used only for webpage colors"
}

const answer3 = {
    answerID : 1003,
    answerText : "A variable can only store numbers"
}

const answer4 = {
    answerID : 1004,
    answerText : "An if statement checks whether a condition is true before running code"
}

const answer5 = {
    answerID : 1005,
    answerText : "An if statement creates a loop that never ends"
}

const answer6 = {
    answerID : 1006,
    answerText : "An if statement stores multiple values in one place"
}

const answer7 = {
    answerID : 1007,
    answerText : "An if statement is only used for styling text"
}

const answer8 = {
    answerID : 1008,
    answerText : "A loop repeats a block of code multiple times"
}

const answer9 = {
    answerID : 1009,
    answerText : "A loop is used to name variables"
}

const answer10 = {
    answerID : 1010,
    answerText : "A loop changes all numbers into strings"
}

const answer11 = {
    answerID : 1011,
    answerText : "A loop is a type of comment"
}

const question0 = {
    questionID : 100,
    questionText : "What is the purpose of a variable in programming?",
    answerChoices : [ answer0, answer1, answer2, answer3 ],
    correctAnswerID : 911
}

const question1 = {
    questionID : 101,
    questionText : "What does an if statement do in programming?",
    answerChoices : [ answer4, answer5, answer6, answer7 ],
    correctAnswerID : 916
}

const question2 = {
    questionID : 102,
    questionText : "What is a loop mainly used for in programming?",
    answerChoices : [ answer8, answer9, answer10, answer11 ],
    correctAnswerID : 921
}

const testQuiz0 = {
    quizID : 10,
    quizName : "Programming Basics Quiz",
    quizDescription : "This quiz tests basic programming concepts",
    quizTags : [ "programming", "basics", "intro" ],
    questions : [ question0, question1, question2 ]
}

// Revise these objects

const testQuiz1 = {
    quizID : 11,
    quizName : "Test Quiz 1",
    quizDescription : "This is an example description for a test quiz to test its basic functionality",
    quizTags : [ "test", "prototype", "not ready" ],
    questions : [ question0, question1, question2 ]
}

const testQuiz2 = {
    quizID : 12,
    quizName : "Test Quiz 2",
    quizDescription : "This is an example description for a test quiz to test its basic functionality",
    quizTags : [ "test", "prototype", "not ready" ],
    questions : [ question0, question1, question2 ]
}

const testQuiz3 = {
    quizID : 13,
    quizName : "Test Quiz 3",
    quizDescription : "This is an example description for a test quiz to test its basic functionality",
    quizTags : [ "test", "prototype", "not ready" ],
    questions : [ question0, question1, question2 ]
}

const testCourse0 = {
    courseID : 0,
    courseName : "Programming Fundamentals",
    courseDescription : "This course introduces beginner programming concepts",
    courseTags : [ "programming", "beginner", "fundamentals"],
    quizzes : [ testQuiz0, testQuiz1, testQuiz2, testQuiz3 ]
}

// Revise these items as well

const testCourse1 = {
    courseID : 1,
    courseName : "Test Course 1",
    courseDescription : "This is an example description for a test course to test its basic functionality",
    courseTags : [ "test course", "prototype course", "course not ready"],
    quizzes : [ testQuiz1, testQuiz2, testQuiz3, testQuiz0 ]
}

const testCourse2 = {
    courseID : 2,
    courseName : "Test Course 2",
    courseDescription : "This is an example description for a test course to test its basic functionality",
    courseTags : [ "test course", "prototype course", "course not ready"],
    quizzes : [ testQuiz2, testQuiz3, testQuiz0, testQuiz1 ]
}

const testCourse3 = {
    courseID : 3,
    courseName : "Test Course 3",
    courseDescription : "This is an example description for a test course to test its basic functionality",
    courseTags : [ "test course", "prototype course", "course not ready"],
    quizzes : [ testQuiz3, testQuiz0, testQuiz1, testQuiz2 ]
}

const testCourseGroup = [testCourse0, testCourse1, testCourse2, testCourse3];

function App() {
    const [currentPage, setCurrentPage] = useState("login");
    const [currentUser, setCurrentUser] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [quizResults, setQuizResults] = useState(null);


    const handleLogin = (user) => {
        setCurrentUser(user);

        if (user.role === "admin") {
            setCurrentPage("dashboard");
        } else {
            setCurrentPage("dashboard"); // or "courses" later
        }
    };

    return (
        <div id={"appPage"}>
            {currentPage === "login" &&
                <Login
                    users={users}
                    onLogin={handleLogin}
                />
            }
            {currentPage === "dashboard" &&
                <Dashboard
                    courses={testCourseGroup}
                    currentUser={currentUser}
                    onQuizSelect={
                        (quiz) => {
                            console.log("Quiz Button Clicked!");
                            setCurrentPage("quiz");
                            setCurrentQuiz(quiz);
                        }
                    }
                />
            }
            {currentPage === "quiz" &&
                <Quiz
                    quiz={currentQuiz}
                    onSubmit={(selectedAnswers) =>
                        {
                            setQuizResults(selectedAnswers);
                            setCurrentPage("score");
                        }
                    }
                />
            }
            {currentPage === "score" && <QuizScores quiz={currentQuiz} answers={quizResults} />}
        </div>
    );
}

export default App
