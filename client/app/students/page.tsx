'use client';
import { deleteStudent, getStudents } from '@/services/students';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

export default function Students() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = () => {
        getStudents()
            .then(({ data }) => setItems(data))
            .catch(err => console.error(err))
    }
    const handleDelete = (id) => {
        deleteStudent(id)
            .then(console.log)
            .catch(console.error)
            .finally(fetchStudents)
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <Link href="/students/create">
                <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add student</button>
            </Link>
            {items.map((item) => (
                <li key={item.id}>
                    {item.name}
                    <Link href={`/students/edit/${item.id}`}><AiFillEdit /></Link>
                    <button type='button' onClick={() => handleDelete(item.id)} ><BsFillTrashFill /></button>
                </li>
            ))}
        </main>
    );
}