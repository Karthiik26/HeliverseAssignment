const express = require("express");
const RegisterPrinciple = require("../Controllers/RegisterPrinciple");
const RegisterStudent = require("../Controllers/RegisterStudent");
const RegisterTeacher = require("../Controllers/RegisterTeacher");
const GetAllStudents = require("../Controllers/GetAllStudents");
const GetAllTeachers = require("../Controllers/GetAllTeachers");
const GetClassRooms = require("../Controllers/GetClassRooms");
const EditStudent = require("../Controllers/EditStudent");
const DeleteStudent = require("../Controllers/DeleteStudent");
const GetStudentsByClassRoom = require("../Controllers/GetStudentsByClassRoom");
const GetTeacherClassRoom = require("../Controllers/GetTeacherClassRoom");
const LoginPrinciple = require("../Controllers/LoginPrinciple");
const LoginStudent = require("../Controllers/LoginStudent");
const LoginTeacher = require("../Controllers/LoginTeacher");
const GettingPrinciple = require("../Controllers/GetPrinciple");
const CommonLogOut = require("../Controllers/CommonLogOut");
const GettingStudentLList = require("../Controllers/StudentInsideClassroomData");

const AssignStudentInsideClassRoom = require("../Controllers/AssignStudentInsideClassroom");
const CreateClassRoom = require("../Controllers/CreateClassRoom");
const ScheduleClassRoom = require("../Controllers/ScheduleClassRoom");
const GetClassRoomById = require("../Controllers/GetClassRoomById");
const GetStudentById = require("../Controllers/GetStudentById");
const AddLectureToSchedule = require("../Controllers/AssignLectureToClass");
const getClassRoomByTeacherId = require("../Controllers/GetClassRoomByTeacherId");

const Router = express.Router();

Router.post("/RegisterPrinciple", RegisterPrinciple);
Router.post("/RegisterTeacher", RegisterTeacher);
Router.post("/RegisterStudent", RegisterStudent);
Router.get("/GetAllStudents", GetAllStudents);
Router.get("/GetAllTeachers", GetAllTeachers);
Router.get("/GetClassRooms", GetClassRooms);
Router.put("/EditStudent", EditStudent);
Router.delete("/DeleteStudent/:StudentId", DeleteStudent);
Router.get("/GetStudentsByClassRoom", GetStudentsByClassRoom);
Router.get("/GetTeacherClassRoom", GetTeacherClassRoom);
Router.get("/GettingPrinciple", GettingPrinciple);
Router.post("/LoginPrinciple", LoginPrinciple);
Router.post("/LoginStudent", LoginStudent);
Router.post("/LoginTeacher", LoginTeacher);
Router.get("/CommonLogOut", CommonLogOut);

Router.get("/GettingStudentLList/:StudentId", GettingStudentLList);
Router.get("/getClassRoomByTeacherId/:teacherId", getClassRoomByTeacherId);
Router.post("/AddLectureToSchedule", AddLectureToSchedule);
Router.get("/GetStudentById/:StudentId", GetStudentById);
Router.get("/GetClassRoomById/:classRoomId", GetClassRoomById);
Router.post("/AssignStudentInsideClassRoom", AssignStudentInsideClassRoom);
Router.post("/ScheduleClassRoom/:id", ScheduleClassRoom);
Router.post("/CreateClassRoom", CreateClassRoom);

module.exports = Router;
