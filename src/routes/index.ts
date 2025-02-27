import express from 'express';
import { END_POINTS } from '../constant/apiEndpoints';
import { asyncWrapper, permit } from '../middleware';
import { USER_ROLE } from '../utils';
import { AppError } from '../utils';
export const routes = express.Router();
import { UserRoutes } from './user.routes';
import { AuthRoutes } from './auth.routes';
import { ClassRoutes } from './class.routes';
import { AttendanceRoutes } from './attendance.routes';
import { LectureRoutes } from './lecture.routes';
import { ReportingRoutes } from './reporting.routes';
import { StudentsRoutes } from './teacher.routes';
import { StudentsScheduleRoutes } from './studentSchedule.routes';
import { StudentDetailsRoutes } from './studentDetails.routes';
import { SubjectsRoutes } from './subject.routes';
import { HolidaysRoutes } from './holiday.routes';
import { LeaveRoutes } from './leave.routes';
import passport from 'passport';
import { PrincipalRoutes } from './dashboardRoutes/dashboard.routes';

routes.use(END_POINTS.USER, UserRoutes);
routes.use(END_POINTS.AUTH, AuthRoutes);
routes.use(END_POINTS.CLASS,
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.PRINCIPAL]),
    ClassRoutes
);
routes.use(END_POINTS.ATTENDANCE,
    passport.authenticate('jwt', { session: false }),
    AttendanceRoutes
);
routes.use(END_POINTS.LECTURE,
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.TEACHER, USER_ROLE.PRINCIPAL]),
    LectureRoutes
);
routes.use(END_POINTS.REPORTING,
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.TEACHER, USER_ROLE.PRINCIPAL]),
    ReportingRoutes
);
routes.use(END_POINTS.STUDENT,
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.TEACHER]),
    StudentsRoutes
);
routes.use(END_POINTS.SCHEDULE,
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.STUDENT]),
    StudentsScheduleRoutes
);
routes.use(END_POINTS.STUDENT_DETAILS, StudentDetailsRoutes);
routes.use(END_POINTS.SUBJECT,
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.PRINCIPAL]),
    SubjectsRoutes
);
routes.use(END_POINTS.HOLIDAY,
    passport.authenticate('jwt', { session: false }),
    permit([USER_ROLE.PRINCIPAL]),
    HolidaysRoutes
);
routes.use(END_POINTS.LEAVE,
    passport.authenticate('jwt', { session: false }),
    LeaveRoutes
);
routes.use(END_POINTS.PRINCIPAL,
    passport.authenticate('jwt', { session: false }),
    PrincipalRoutes
);

const invalidedRouter = asyncWrapper((req, res, next) => {
    return next(new AppError(`${req.url} - Bad Request URL not Found`, 'not_found'));
});
routes.all('*', invalidedRouter);