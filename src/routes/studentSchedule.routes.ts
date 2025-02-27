import express from 'express';
import { asyncWrapper } from '../middleware';
import { StudentScheduleControllers } from '../controller';
export const StudentsScheduleRoutes = express.Router();

StudentsScheduleRoutes.post('/',asyncWrapper(StudentScheduleControllers.viewSchedule));