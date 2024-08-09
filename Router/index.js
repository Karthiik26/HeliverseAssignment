const express = require('express');
const RegisterPrinciple = require('../Controllers/RegisterPrinciple');
const RegisterStudent = require('../Controllers/RegisterStudent');
const RegisterTeacher = require('../Controllers/RegisterTeacher');
const CreateClassRoom = require('../Controllers/CreateClassRoom');
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
const Router = express.Router();

Router.post("/RegisterPrinciple", RegisterPrinciple); //done
Router.post("/RegisterTeacher", RegisterTeacher); //done
Router.post("/RegisterStudent", RegisterStudent); //done
Router.post("/CreateClassRoom", CreateClassRoom);  //done
Router.get("/GetAllStudents", GetAllStudents); //done
Router.get("/GetAllTeachers", GetAllTeachers); //done
Router.get("/GetClassRooms", GetClassRooms); //done
Router.put("/EditStudent", EditStudent);
Router.delete("/DeleteStudent", DeleteStudent);
Router.get("/GetStudentsByClassRoom", GetStudentsByClassRoom); //done 
Router.get("/GetTeacherClassRoom", GetTeacherClassRoom); //done
Router.post("/LoginPrinciple", LoginPrinciple); //done
Router.post("/LoginStudent", LoginStudent);  //done
Router.post("/LoginTeacher", LoginTeacher); //done

module.exports = Router