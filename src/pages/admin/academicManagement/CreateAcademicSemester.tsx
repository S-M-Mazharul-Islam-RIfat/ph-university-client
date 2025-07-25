import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import type { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map(number => ({
   value: String(currentYear + number),
   label: String(currentYear + number)
}))

const CreateAcademicSemester = () => {
   const [addAcademicSemester] = useAddAcademicSemesterMutation();

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      const name = semesterOptions[Number(data?.name) - 1]?.label;
      const toastId = toast.loading('Createing');
      const semesterData = {
         name,
         code: data.name,
         year: data.year,
         startMonth: data.startMonth,
         endMonth: data.endMonth
      }
      try {
         const res = await addAcademicSemester(semesterData) as TResponse;
         if (res.error) {
            toast.error(res.error.data.message, { id: toastId });
         }
         else {
            toast.success('Semester created', { id: toastId });
         }
      }
      catch (err) {
         console.log(err)
         toast.error('Something went wrong', { id: toastId });
      }
   }

   return (
      <div>
         <Flex justify="center" align="center">
            <Col span={8}>
               <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                  <PHSelect label="Name" name="name" options={semesterOptions}></PHSelect>
                  <PHSelect label="Year" name="year" options={yearOptions}></PHSelect>
                  <PHSelect label="Start Month" name="startMonth" options={monthOptions}></PHSelect>
                  <PHSelect label="End Month" name="endMonth" options={monthOptions}></PHSelect>
                  <Button htmlType="submit">submit</Button>
               </PHForm>
            </Col>
         </Flex>
      </div>
   );
};

export default CreateAcademicSemester;