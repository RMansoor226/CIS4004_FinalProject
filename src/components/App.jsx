import { useState } from 'react'
import Login from './Login.jsx'
import Dashboard from "./Dashboard.jsx";
import Courses from './Courses.jsx'
import QuizInstructions from './QuizInstructions.jsx'
import Quiz from './Quiz.jsx'
import QuizScores from './QuizScores.jsx'
import '../styling/App.css'

const answer0 = {
    answerID : 911,
    answerText : "A variable stores data that can be used later in a program"
}

const answer1 = {
    answerID : 912,
    answerText : "A variable repeats code automatically"
}

const answer2 = {
    answerID : 913,
    answerText : "A variable is used only for webpage colors"
}

const answer3 = {
    answerID : 914,
    answerText : "A variable can only store numbers"
}

const answer4 = {
    answerID : 915,
    answerText : "An if statement checks whether a condition is true before running code"
}

const answer5 = {
    answerID : 916,
    answerText : "An if statement creates a loop that never ends"
}

const answer6 = {
    answerID : 917,
    answerText : "An if statement stores multiple values in one place"
}

const answer7 = {
    answerID : 918,
    answerText : "An if statement is only used for styling text"
}

const answer8 = {
    answerID : 919,
    answerText : "A loop repeats a block of code multiple times"
}

const answer9 = {
    answerID : 920,
    answerText : "A loop is used to name variables"
}

const answer10 = {
    answerID : 921,
    answerText : "A loop changes all numbers into strings"
}

const answer11 = {
    answerID : 922,
    answerText : "A loop is a type of comment"
}

const question0 = {
    questionID : 420,
    questionText : "What is the purpose of a variable in programming?",
    answerChoices : [ answer0, answer1, answer2, answer3 ],
    correctAnswerID : 911
}

const question1 = {
    questionID : 421,
    questionText : "What does an if statement do in programming?",
    answerChoices : [ answer4, answer5, answer6, answer7 ],
    correctAnswerID : 915
}

const question2 = {
    questionID : 422,
    questionText : "What is a loop mainly used for in programming?",
    answerChoices : [ answer8, answer9, answer10, answer11 ],
    correctAnswerID : 919
}

const testQuiz = {
    quizID : 226,
    quizName : "Programming Basics Quiz",
    quizDescription : "This quiz tests basic programming concepts",
    quizTags : [ "programming", "basics", "intro" ],
    questions : [ question0, question1, question2 ]
}

const testCourse = {
    courseID : 310,
    courseName : "Programming Fundamentals",
    courseDescription : "This course introduces beginner programming concepts",
    courseTags : [ "programming", "beginner", "fundamentals"],
    quizzes : [ testQuiz ]
}

function App() {
    const [currentPage, setCurrentPage] = useState("login");

    const [progressReport, setProgressReport] = useState({
        quizResults : [],
        completedQuizzes : 0,
        totalQuizzes : testCourse.quizzes.length,
        courseCompletion : 0
    });

    function handleQuizSubmit(result) {
        const updatedQuizResults = [...progressReport.quizResults];

        const existingIndex = updatedQuizResults.findIndex(
            (quizResult) => quizResult.quizID === result.quizID
        );

        if (existingIndex >= 0) {
            updatedQuizResults[existingIndex] = result;
        } else {
            updatedQuizResults.push(result);
        }

        const completedQuizzes = updatedQuizResults.length;
        const totalQuizzes = testCourse.quizzes.length;
        const courseCompletion = Math.round((completedQuizzes / totalQuizzes) * 100);

        setProgressReport({
            quizResults : updatedQuizResults,
            completedQuizzes : completedQuizzes,
            totalQuizzes : totalQuizzes,
            courseCompletion : courseCompletion
        });

        setCurrentPage("score");
    }

    return (
        <div id={"appPage"}>
            {currentPage === "login" && <Login onLogin={() => setCurrentPage("dashboard")} />}
            {currentPage === "dashboard" && <Dashboard course={testCourse}/>}
            {currentPage === "intro" && (
                <QuizInstructions
                    quiz={testQuiz}
                    onStart={() => setCurrentPage("quiz")}
                />
            )}
            {currentPage === "quiz" && (
                <Quiz
                    quiz={testQuiz}
                    onSubmit={handleQuizSubmit}
                />
            )}
            {currentPage === "score" && (
                <QuizScores
                    course={testCourse}
                    progressReport={progressReport}
                    onBackToDashboard={() => setCurrentPage("dashboard")}
                />
            )}
        </div>
    );
}

export default App
