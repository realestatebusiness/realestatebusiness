import React from "react";
import { useForm } from "react-hook-form";
import { DisplayFormFieldGroup } from "../../molecules/DisplayFormFieldGroup";
import Button from "../../atoms/Button/Button";


interface LoginData {
  email: string;
  password: string;
}

const DisplayLoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    console.log("Login:", data);
    // send to API
  };

  const fields = [
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <DisplayFormFieldGroup register={register} errors={errors} fields={fields} />
      <Button text="Login" type="submit" />
    </form>
  );
};

export default DisplayLoginForm;
