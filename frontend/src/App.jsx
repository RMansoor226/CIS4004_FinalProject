import { useState, useEffect } from 'react'
import Login from './components/Login.jsx'
import Dashboard from "./components/Dashboard.jsx";
import Quiz from './components/Quiz.jsx'
import QuizScores from './components/QuizScores.jsx'
import './styling/App.css'

function App() {
    const [currentPage, setCurrentPage] = useState("login");
    const [currentUser, setCurrentUser] = useState(null);
    const [currentCourses, setCurrentCourses] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [quizResults, setQuizResults] = useState(null);
    const [users, setUsers] = useState([]);

    // Fetch users from Users Collection
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => setUsers(data.data))
            .catch(err => console.error("Error fetching users: ", err));
    }, []);

    // Fetch courses from Courses Collection
    useEffect(() => {
        fetch("http://localhost:5000/courses")
            .then(res => res.json())
            .then(data => setCurrentCourses(data.data))
            .catch(err => console.error("Error fetching courses: ", err));
    }, []);

    const handleLogin = (user) => {
        setCurrentUser(user);
        setCurrentPage("dashboard");
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
                    courses={currentCourses}
                    currentUser={currentUser}
                    onQuizSelect={
                        (quiz) =>
                        {
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
            {currentPage === "score" &&
                <QuizScores
                    quiz={currentQuiz}
                    answers={quizResults}
                    onReturn={() =>
                        {
                            setCurrentPage("dashboard");
                        }
                }
                />
            }
        </div>
    );
}

export default App
