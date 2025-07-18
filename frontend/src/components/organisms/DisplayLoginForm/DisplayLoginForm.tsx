import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../atoms/Button/Button";
import { type ApiResponse, type LoginFormData } from "../../../types/authTypes";
import { postRequest } from "../../../services/endpoints";
import { useAppDispatch } from "../../../app/hooks";
import { login } from "../../../features/auth";
import toast from "react-hot-toast";
import LoginFormFields from "../../molecules/LoginFormFields/LoginFormFields";
import { useNavigate } from "react-router-dom";
import DisplayOtpVerification from "../../molecules/OtpFile/DisplayOtpVerification";

const DisplayLoginForm: React.FC = () => {
  const [usePhoneLogin, setUsePhoneLogin] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [phone, setPhone] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formatPhoneNumber = (raw: string): string => {
    const cleaned = raw.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    } else if (cleaned.length > 10 && cleaned.startsWith('91')) {
      return `+${cleaned}`;
    }
    return `+${cleaned}`;
  };

const onSubmit = async (data: LoginFormData) => {
  if (usePhoneLogin && !otpVerified) {
    toast.error('Please verify OTP before login');
    return;
  }

  const formattedPhone = formatPhoneNumber(phone);
  const payload = usePhoneLogin
    ? { phoneNumber: formattedPhone }
    : { email: data.email, password: data.password };

  try {
    const res = await postRequest<ApiResponse>("/login", payload);
    console.log(res)
    dispatch(login({ user: res.data.user, token: res.data.token }));
    toast.success("Login successful");
    navigate('/home');
  } catch (error) {
    console.error("error during login", error);
    toast.error("Login failed");
  }
};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm">
          Login using{" "}
          <Button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setUsePhoneLogin(!usePhoneLogin)}
          >
            {usePhoneLogin ? "Email & Password" : "Phone Number"}
          </Button>
        </p>
        <Button
          onClick={() => navigate("/register")}
          type="button"
          className="text-sm text-gray-700 hover:underline"
        >
          New user? Register
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {usePhoneLogin ? (
          <DisplayOtpVerification
            phone={phone}
            setPhone={setPhone}
            onVerified={() => setOtpVerified(true)}
            label="Phone Login"
          />
        ) : (
          <LoginFormFields
            register={register}
            errors={errors}
            usePhoneLogin={false}
          />
        )}
        <Button text="Login" type="submit" />
      </form>
    </div>
  );
};

export default DisplayLoginForm;
