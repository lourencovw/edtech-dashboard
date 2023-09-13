'use client';
import { getCourse, updateCourse } from "../../../../services/courses";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Edit({ params }: { params: { id: string } }) {
    const [name, setName] = useState('');

    const router = useRouter()

    useEffect(() => {
        getCourse(params.id)
            .then(({ data }) => setName(data.name))
            .catch(err => console.error(err))
    }, [])

    const handleSubmit = (event) => {

        updateCourse(params.id, { name })
            .then(({ data }) => console.log(data))
            .catch(err => console.error(err))
            .finally(() => router.push('/courses'))

        event.preventDefault();
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-lg">Edit a course</h1>

            <form className="flex flex-col w-2/4" action="" onSubmit={handleSubmit}>
                <label htmlFor="name"></label>
                <input className=" text-black" type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                <hr />
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Edit</button>
            </form>
        </div>
    );
}