import React from "react";
import { useForm } from "react-hook-form";
import { DisplayFormFieldGroup } from "../../molecules/DisplayFormFieldGroup";
import Button from "../../atoms/Button";
import { useAppDispatch } from "../../../app/hooks";
import { postFormDataRequest, postRequest } from "../../../services/endpoints";
import type { ApiResponse, RegistrationFormData } from "../../../types/authTypes";
import { login } from "../../../features/auth";
import toast from "react-hot-toast";


const DisplayRegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormData>();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const res = await postRequest<ApiResponse>('/register', data);
      dispatch(login({ user: res.data.user, token: res.data.token }));
      toast.success('registration successful');
    }
    catch (error) {
      console.error('Registration failed', error)
    }
  };


  const fields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
    { label: "Phone Number", name: "phoneNumber", type: "text", required: true },
    { label: "Role", name: "role", type: "text", required: true },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <DisplayFormFieldGroup register={register} errors={errors} fields={fields} />
      <Button
        text="Register"
        type="submit"
        variant="primary"
        className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-md"
      />    </form>
  );
};

export default DisplayRegisterForm;
