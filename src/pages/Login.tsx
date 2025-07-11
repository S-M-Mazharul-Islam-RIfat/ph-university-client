import { Button, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { type FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const defaultValues = {
      userId: 'A-0004',
      password: 'pass123',
   };


   const [login] = useLoginMutation();

   const onSubmit = async (data: FieldValues) => {
      const toastId = toast.loading('Loggin in');
      try {
         const userInfo = {
            id: data.userId,
            password: data.password,
         };


         const res = await login(userInfo).unwrap();
         const user = verifyToken(res.data.accessToken) as TUser;
         dispatch(setUser({ user: user, token: res.data.accessToken }));
         navigate(`/${user?.role}/dashboard`);
         toast.success('Logged In', { id: toastId });
      }
      catch {
         toast.error('Something went wrong', { id: toastId });
      }
   };

   return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
         <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <PHInput type="text" name="userId" label="ID:" />
            <PHInput type="text" name="password" label="Password" />
            <Button htmlType="submit">Login</Button>
         </PHForm>
      </Row>
   );
};

export default Login;