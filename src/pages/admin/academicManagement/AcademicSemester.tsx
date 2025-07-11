import { useGetAllAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemester";

const AcademicSemester = () => {
   const { data } = useGetAllAcademicSemesterQuery(undefined);
   console.log(data);
   return (
      <div>
         <h2>This is academic semester</h2>
      </div>
   );
};

export default AcademicSemester;