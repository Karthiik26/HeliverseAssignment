const express = require('express');
const RegisterPrinciple = require('../Controllers/RegisterPrinciple');
const RegisterStudent = require('../Controllers/RegisterStudent');
const RegisterTeacher = require('../Controllers/RegisterTeacher');
const GetAllStudents = require('../Controllers/GetAllStudents');
const GetAllTeachers = require('../Controllers/GetAllTeachers');
const GetClassRooms = require('../Controllers/GetClassRooms');
const EditStudent = require('../Controllers/EditStudent');
const DeleteStudent = require('../Controllers/DeleteStudent');
const GetStudentsByClassRoom = require('../Controllers/GetStudentsByClassRoom');
const GetTeacherClassRoom = require('../Controllers/GetTeacherClassRoom');
const LoginPrinciple = require('../Controllers/LoginPrinciple');
const LoginStudent = require('../Controllers/LoginStudent');
const LoginTeacher = require('../Controllers/LoginTeacher');
const GettingPrinciple = require('../Controllers/GetPrinciple');
const CommonLogOut = require('../Controllers/CommonLogOut');

const AssignStudentInsideClassRoom = require('../Controllers/AssignStudentInsideClassroom');
const CreateClassRoom = require('../Controllers/CreateClassRoom');
const ScheduleClassRoom = require('../Controllers/ScheduleClassRoom');
const GetClassRoomById = require('../Controllers/GetClassRoomById');
const GetStudentById = require('../Controllers/GetStudentById');

const Router = express.Router();

Router.post("/RegisterPrinciple", RegisterPrinciple); //done done 2
Router.post("/RegisterTeacher", RegisterTeacher); //done done 2
Router.post("/RegisterStudent", RegisterStudent); //done done 2
Router.get("/GetAllStudents", GetAllStudents); //done done 2
Router.get("/GetAllTeachers", GetAllTeachers); //done done 2
Router.get("/GetClassRooms", GetClassRooms); //done done 2
Router.put("/EditStudent", EditStudent);
Router.delete("/DeleteStudent", DeleteStudent);
Router.get("/GetStudentsByClassRoom", GetStudentsByClassRoom); //done  done 2
Router.get("/GetTeacherClassRoom", GetTeacherClassRoom); //done done 2
Router.get("/GettingPrinciple", GettingPrinciple); //done done 2
Router.post("/LoginPrinciple", LoginPrinciple); //done done 2
Router.post("/LoginStudent", LoginStudent);  //done done 2
Router.post("/LoginTeacher", LoginTeacher); //done done 2
Router.get("/CommonLogOut", CommonLogOut); //done done done  3


Router.get("/GetStudentById/:StudentId", GetStudentById);  //done 
Router.get("/GetClassRoomById/:classRoomId", GetClassRoomById);  //done
Router.post("/AssignStudentInsideClassRoom", AssignStudentInsideClassRoom);  //done 
Router.post("/ScheduleClassRoom/:id", ScheduleClassRoom);  //done 
Router.post("/CreateClassRoom", CreateClassRoom);  //done done 2

module.exports = Router