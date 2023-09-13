'use client';
import api from "./api";

interface ICourseBody {
    name: string;
    courseIds: number[];
}

export const getCourses = () => api.get('courses')

export const getCourse = (id) => api.get(`courses/${id}`)

export const updateCourse = (id: string, body: ICourseBody) => api.put(`courses/${id}`, body)

export const addCourse = (body: ICourseBody) => api.post('courses', body)

export const deleteCourse = (id: string) => api.delete(`courses/${id}`)