import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrincipleLogin from "../Component/Principle/Login";
import PrincipleDashboard from "../Component/Principle/Dashboard";
import StudentRegister from "../Component/Principle/RegisterStudent";
import TeacherRegister from "../Component/Principle/RegisterTeacher";

import StudentHome from "../Component/Student/Home";

import TeacherHome from "../Component/Teacher/Home";

import Mainentry from "../Component/Mainentry";
import StudentAreaInsidePrinciple from "../Pages/StudentAreaInsidePrinciple";
import TeacherAreaInsidePrinciple from "../Pages/TeacherAreaInsidePrinciple";
import ClassRoomAreaInsidePrinciple from "../Pages/ClassRoomAreaInsidePrinciple";
import AssignClasssRoomToStudent from "../Pages/AssignClasssRoomToStudent";
import AssignLectureToTeacher from "../Pages/AssignLectureToTeacher";

const index = createBrowserRouter([
  {
    path: "/v18/",
    element: <App />,
    children: [
      // Principle
      {
        path: "PrincipleLogin",
        element: <PrincipleLogin />,
      },
      {
        path: "PrincipleDashBoard",
        element: <PrincipleDashboard />,
        children: [
          {
            path: "StudentArea",
            element: <StudentAreaInsidePrinciple />,
          },
          {
            path: "TeacherArea",
            element: <TeacherAreaInsidePrinciple />,
          },
          {
            path: "ClassRoomArea",
            element: <ClassRoomAreaInsidePrinciple />,
          },
          {
            path: "AssignClasssRoomToStudent",
            element: <AssignClasssRoomToStudent />,
          },
          {
            path: "AssignLectureToTeacher",
            element: <AssignLectureToTeacher />,
          },
        ],
      },
      ,
      // {
      //     path : 'StudentRegister',
      //     element : <StudentRegister />
      // },
      // {
      //     path : 'TeacherRegister',
      //     element : <TeacherRegister />
      // }
      // Student
      {
        path: "StudentHome",
        element: <StudentHome />,
      },

      // Teacher

      {
        path: "TeacherDashBoard",
        element: <TeacherHome />,
      },
      {
        path: "main",
        element: <Mainentry />,
      },
    ],
  },
]);

export default index;
