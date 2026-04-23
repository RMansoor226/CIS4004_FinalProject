// components/AdminControls.jsx
import { useState } from "react";

function AdminControls({ courses, setCourses, currentCourse, setCurrentCourse }) {
    const [newCourseName, setNewCourseName] = useState("");
    const [newCourseDescription, setNewCourseDescription] = useState("");

    const addCourse = () => {
        if (!newCourseName.trim()) return;

        const newCourse = {
            courseID: Date.now(),
            courseName: newCourseName,
            courseDescription: newCourseDescription || "New course description",
            courseTags: ["new"],
            quizzes: []
        };

        const updated = [...courses, newCourse];
        setCourses(updated);
        setCurrentCourse(newCourse);

        setNewCourseName("");
        setNewCourseDescription("");
    };

    return (
        <div className="adminControls">
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
    );
}

export default AdminControls;