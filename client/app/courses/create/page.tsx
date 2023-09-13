'use client';
import { addCourse } from "@/services/courses";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
    const [name, setName] = useState('');

    const router = useRouter()

    const handleSubmit = (event) => {

        addCourse({ name })
            .then(({ data }) => console.log(data))
            .catch(err => console.error(err))
            .finally(() => router.push('/courses'))

        event.preventDefault();
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-lg">Create a course</h1>

            <form className="flex flex-col w-2/4" action="" onSubmit={handleSubmit}>
                <label htmlFor="name"></label>
                <input className=" text-black" type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                <hr />
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add</button>
            </form>
        </div>
    );
}