/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
import type { ReactNode } from 'react';
import {
   FormProvider,
   useForm,
   type FieldValues,
   type SubmitHandler,
} from 'react-hook-form';

type TFormConfig = {
   defaultValues?: Record<string, any>;
   resolver?: any;
};

type TFormProps = {
   onSubmit: SubmitHandler<FieldValues>;
   children: ReactNode;
} & TFormConfig;

const PHForm = ({ onSubmit, children, defaultValues, resolver }: TFormProps) => {
   const formConfig: TFormConfig = {};

   if (defaultValues) {
      formConfig['defaultValues'] = defaultValues;
   }

   if (resolver) {
      formConfig['resolver'] = resolver;
   }

   const methods = useForm(formConfig);

   return (
      <FormProvider {...methods}>
         <Form layout='vertical' onFinish={methods.handleSubmit(onSubmit)}>{children}</Form>
      </FormProvider>
   );
};

export default PHForm;