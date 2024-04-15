import { Router } from "express";
import { Student } from '../models/studentmodel.js';

const router = Router();

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.grade ||
            !request.body.school ||
            !request.body.idnum 
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, grade, school, idnum',
            });
        }

        const newStudent = {
            name: request.body.name,
            grade: request.body.grade,
            school: request.body.school,
            idnum: request.body.idnum
        };

        const createdStudent = await Student.create(newStudent);
        return response.status(201).send(createdStudent);

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const students = await Student.find({});
        return response.status(200).send({
            count: students.length,
            data: students
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const student = await Student.findById(id);
        return response.status(200).json(student);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.grade ||
            !request.body.school ||
            !request.body.idnum
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, grade, school, idnum',
            });
        }

        const { id } = request.params;
        const result = await Student.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Student not found' });
        }

        return response.status(200).send({ message: 'Student updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Student.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Student not found' });
        }

        return response.status(200).send({ message: 'Student deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
