import OfferedCours from "../pages/student/OfferedCours";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
   {
      name: 'Dashboard',
      path: 'dashboard',
      element: <StudentDashboard></StudentDashboard>
   },
   {
      name: 'Offered Course',
      path: 'offered-course',
      element: <OfferedCours></OfferedCours>
   },
];