'use client';
import api from "./api";

interface IStudentBody {
    name: string;
    courseIds: number[];
}

export const getStudents = () => api.get('students')

export const getStudent = (id) => api.get(`students/${id}`)

export const updateStudent = (id: string, body: IStudentBody) => api.put(`students/${id}`, body)

export const addStudent = (body: IStudentBody) => api.post('students', body)

export const deleteStudent = (id: string) => api.delete(`students/${id}`)