'use client';
import { deleteCourse, getCourses } from "@/services/courses";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

export default function Courses() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = () => {
        getCourses()
            .then(({ data }) => setItems(data))
            .catch(err => console.error(err))
    }

    
    const handleDelete = (id) => {
        deleteCourse(id)
            .then(console.log)
            .catch(console.error)
            .finally(fetchCourses)
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <Link href="/courses/create">
                <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add course</button>
            </Link>
            {items.map((item) => (
                <li className="flex" key={item.id}>
                    {item.name}
                    <Link href={`/courses/edit/${item.id}`}>
                        <AiFillEdit />
                    </Link>
                    
                    <button type='button' onClick={() => handleDelete(item.id)} ><BsFillTrashFill /></button>
                </li>
            ))}
        </main>
    );
}