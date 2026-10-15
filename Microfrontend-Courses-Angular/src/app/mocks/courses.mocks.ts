import { Course } from "../core/domain/models/course.model";

export const COURSES_MOCK: Course[] = [
    {
        id: 1,
        name: 'Arquitectura de Software',
        teacher: 'Jesus David Mejia',
        credits: 3,
        modality: 'Presencial',
    },
    {
        id: 2,
        name: 'Bases de Datos',
        teacher: 'Ana Gomez',
        credits: 4,
        modality: 'Virtual',
    },
    {
        id: 3,
        name: 'Programacion Web',
        teacher: 'Carlos Ramirez',
        credits: 2,
        modality: 'Hibrido',
    }
];
