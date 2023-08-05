import Joi from 'joi';
import { validateReq } from './validation.Helper';

export const ValidationSchema = (req, res, next) => {

    const userSchema = Joi.object({
        UsersName: Joi.string().required(),
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
        Phone: Joi.string().pattern(/^\+[0-9]{1,}$/).length(13).required().messages({
            'string.pattern.base': 'Please provide valid phone number with +91 formate',
            'string.empty': 'phone number cannot be empty',
            'string.length': 'Please provide 10 digits phone number'
        }),
        Email: Joi.string().min(10).email().required(),
        Password: Joi.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password should be this type contain like ex:- Abc@123  ',
                'string.empty': 'Password cannot be empty'
            }),
        Role: Joi.string().valid('Principal', 'Teacher').required()
    });
    validateReq(req, next, userSchema);
};

export const StudentValidation = (req, res, next) => {
    const studentsSchema = Joi.object({
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
        GRID: Joi.number().max(10).required(),
        Phone: Joi.string().pattern(/^\+[0-9]{1,}$/).length(13).required().messages({
            'string.pattern.base': 'Please provide valid phone number with +91 formate',
            'string.empty': 'phone number cannot be empty',
            'string.length': 'Please provide 10 digits phone number'
        }),
        Email: Joi.string().min(10).email().required(),
        Password: Joi.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password should be this type contain like ex:- Abc@123  ',
                'string.empty': 'Password cannot be empty'
            }),
        Role: Joi.string().valid('Student').required()
    });
    validateReq(req, next, studentsSchema);
};

export const ClassValidation = (req, res, next) => {
    const classSchema = Joi.object({
        ClassName: Joi.string().required(),
        Grade: Joi.string().required(),
        ClassTeacher: Joi.number().required()
    });
    validateReq(req, next, classSchema);
};

export const AttendanceValidation = (req, res, next) => {
    const attendanceSchema = Joi.object({
        Status: Joi.string().valid('present', 'absent').required(),
        Date: Joi.string().required(),
        StudentID: Joi.number().required()
    });
    validateReq(req, next, attendanceSchema);
};

export const LectureValidation = (req, res, next) => {
    const lectureSchemas = Joi.object({
        WeekDay: Joi.string().required(),
        Time: Joi.string().required(),
        ClassID: Joi.number().required()
    });
    validateReq(req, next, lectureSchemas);
};

export const ReportingValidation = (req, res, next) => {
    const ReportingSchemas = Joi.object({
        TeacherID: Joi.number().required(),
        StudentID: Joi.number().required(),
        Description: Joi.string().required()
    });
    validateReq(req, next, ReportingSchemas);
};
