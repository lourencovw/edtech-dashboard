'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudent, updateStudent } from "@/services/students";
import { getCourses } from "@/services/courses";

export default function Edit({ params }: { params: { id: string } }) {
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState('');
    const [selectedCourses, setSelectedCourses] = useState({});

    const router = useRouter()

    const fetchStudentData = () => {
        getStudent(params.id)
            .then(({ data }) => {
                console.log(data);
                
                setName(data.name)
                setSelectedCourses(data.courses.map(course => course.id).reduce((acc, val) => ({...acc, [val]: true}) , {}))
            })
            .catch(err => console.error(err))
    }
    

    useEffect(() => {

        getCourses()
            .then(({ data }) => {
                setCourses(data)
                fetchStudentData()
            })
            .catch(err => console.error(err))
        
    }, [])

    const handleSubmit = (event) => {
        let payload = {
            name,
            courseIds: courses.filter(item => selectedCourses[item.id]).map(item => item.id)
        };

        updateStudent(params.id, payload)
            .then(({ data }) => console.log(data))
            .catch(err => console.error(err))
            .finally(() => router.push('/students'))

        event.preventDefault();
    }


    const handleCheckboxChange = (courseId) => {
        setSelectedCourses((prevState) => ({
            ...prevState,
            [courseId]: !prevState[courseId],
        }))
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-lg">Edit a student</h1>

            <form className="flex flex-col w-2/4" action="" onSubmit={handleSubmit}>
                <label htmlFor="name"></label>
                <input className=" text-black" type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                <hr />
                <label htmlFor="course">Choose courses:</label>
                {courses.map((course) => (
                    <div key={course.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedCourses[course.id] || false}
                                onChange={() => handleCheckboxChange(course.id)}
                            />
                            {course.name}
                        </label>
                    </div>
                ))}
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Edit</button>
            </form>
        </div>
    );
}