import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import Login from './Login.jsx'
import Dashboard from "./Dashboard.jsx";
import Courses from './Courses.jsx'
import QuizInstructions from './QuizInstructions.jsx'
import Quiz from './Quiz.jsx'
import QuizScores from './QuizScores.jsx'
import '../styling/App.css'

const answer0 = {
    answerID : 911,
    answerText : "This is an example answer for Option A to test if the usage of props is proper"
}

const answer1 = {
    answerID : 912,
    answerText : "This is an example answer for Option B to test if the usage of props is proper"
}

const answer2 = {
    answerID : 913,
    answerText : "This is an example answer for Option C to test if the usage of props is proper"
}

const answer3 = {
    answerID : 914,
    answerText : "This is an example answer for Option D to test if the usage of props is proper"
}

const answer4 = {
    answerID : 915,
    answerText : "This is an example answer for Option A to test if the usage of props is proper"
}

const answer5 = {
    answerID : 912,
    answerText : "This is an example answer for Option B to test if the usage of props is proper"
}

const answer6 = {
    answerID : 916,
    answerText : "This is an example answer for Option C to test if the usage of props is proper"
}

const answer7 = {
    answerID : 917,
    answerText : "This is an example answer for Option D to test if the usage of props is proper"
}

const answer8 = {
    answerID : 918,
    answerText : "This is an example answer for Option A to test if the usage of props is proper"
}

const answer9 = {
    answerID : 919,
    answerText : "This is an example answer for Option B to test if the usage of props is proper"
}

const answer10 = {
    answerID : 921,
    answerText : "This is an example answer for Option C to test if the usage of props is proper"
}

const answer11 = {
    answerID : 922,
    answerText : "This is an example answer for Option D to test if the usage of props is proper"
}

const question0 = {
    questionID : 420,
    questionText : "Version 0: This is a random set of text to test if the question text portion is working properly",
    answerChoices : [ answer0, answer1, answer2, answer3 ]
}

const question1 = {
    questionID : 421,
    questionText : "Version 1: This is a random set of text to test if the question text portion is working properly",
    answerChoices : [ answer4, answer5, answer6, answer7 ]
}

const question2 = {
    questionID : 422,
    questionText : "Version 2: This is a random set of text to test if the question text portion is working properly",
    answerChoices : [ answer8, answer9, answer10, answer11 ]
}

const testQuiz = {
    quizID : 226,
    quizName : "Test Quiz",
    quizDescription : "This is an example description for a test quiz to test its basic functionality",
    quizTags : [ "test", "prototype", "not ready" ],
    questions : [ question0, question1, question2 ]
}

const testCourse = {
    courseID : 310,
    courseName : "Test Course",
    courseDescription : "This is an example description for a test course to test its basic functionality",
    courseTags : [ "test course", "prototype course", "course not ready"],
    quizzes : [ testQuiz ]
}

function App() {
    const [currentPage, setCurrentPage] = useState("login");

    return (
        <div id={"appPage"}>
            {currentPage === "login" && <Login onLogin={() => setCurrentPage("dashboard")} />}
            {currentPage === "dashboard" && <Dashboard course={testCourse}/>}
            {currentPage === "intro" && <QuizInstructions quiz={testQuiz} onStart={() => setCurrentPage("quiz")} />}
            {currentPage === "quiz" && <Quiz quiz={testQuiz} onSubmit={() => setCurrentPage("score")} />}
            {currentPage === "score" && <QuizScores />}
        </div>
    );
}



export default App
