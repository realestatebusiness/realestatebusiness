import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import { postRequest } from "../../../services/endpoints";
import type { ApiResponse, RegistrationFormData } from "../../../types/authTypes";
import toast from "react-hot-toast";
import { RegisterFormFields } from "../../molecules/RegisterFormFields";
import DisplayOtpVerification from "../../molecules/OtpFile/DisplayOtpVerification";

const DisplayRegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<RegistrationFormData>();
  const [phone, setPhone] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);


  const formatPhoneNumber = (raw: string): string => {
  const cleaned = raw.replace(/\D/g, ''); 
  if (cleaned.length === 10) {
    return `+91${cleaned}`; 
  } else if (cleaned.length > 10 && cleaned.startsWith('91')) {
    return `+${cleaned}`;
  }
  return `+${cleaned}`; 
};

const onSubmit = async (data: RegistrationFormData) => {
  if (!otpVerified) {
    toast.error('Please verify phone number');
    return;
  }

  const formattedPhone = formatPhoneNumber(phone);

  try {
    const res = await postRequest<ApiResponse>('/register', {
      ...data,
      phoneNumber: formattedPhone,
    });
    toast.success('Registration successful');
  } catch (error) {
    console.error('Registration failed', error);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RegisterFormFields
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />
      <DisplayOtpVerification
        phone={phone}
        setPhone={setPhone}
        onVerified={() => setOtpVerified(true)}
        label="Verify Phone"
      />
      <Button
        text="Register"
        type="submit"
        variant="primary"
        className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-md"
      />
    </form>
  );
};

export default DisplayRegisterForm;
