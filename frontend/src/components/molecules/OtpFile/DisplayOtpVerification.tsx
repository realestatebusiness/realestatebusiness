import React, { useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import InputField from '../../atoms/InputField';
import Button from '../../atoms/Button';
import toast from 'react-hot-toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../utils/firebase';

interface OtpVerificationProps {
  phone: string;
  setPhone: (val: string) => void;
  onVerified: () => void;
  label?: string;
}

const formatPhoneNumber = (raw: string): string => {
  const cleaned = raw.replace(/\D/g, '');
  if (cleaned.length === 10) return `+91${cleaned}`;
  else if (cleaned.startsWith('91') && cleaned.length > 10) return `+${cleaned}`;
  return `+${cleaned}`;
};

const DisplayOtpVerification: React.FC<OtpVerificationProps> = ({ phone, setPhone, onVerified, label }) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const confirmationResultRef = useRef<any>(null);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      });
      window.recaptchaVerifier.render().catch(console.error);
    }
  }, []);

  const sendOtp = async () => {
    const formattedPhone = formatPhoneNumber(phone);
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      confirmationResultRef.current = confirmationResult;
      setOtpSent(true);
      toast.success('OTP sent successfully');
    } catch (err) {
      console.error('Failed to send OTP', err);
      toast.error('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmationResultRef.current.confirm(otp);
      if (result.user) {
        const idToken = await result.user.getIdToken(); // <-- 🔐 Send this to backend
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/auth/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken }),
        });

        const data = await response.json();
        if (response.ok) {
          setVerified(true);
          toast.success('Phone number verified via Firebase');
          onVerified(); // Notify parent component
        } else {
          toast.error(data.message || 'OTP verification failed');
        }
      }
    } catch (err) {
      console.error('Verification failed', err);
      toast.error('OTP verification failed');
    }
  };

  if (verified) return <p className="text-green-600">✅ Phone number verified!</p>;

  return (
    <div className="space-y-3">
      <div id="recaptcha-container" />

      {!otpSent ? (
        <>
          <InputField
            label={label || 'Phone Number'}
            name="phone"
            type="text"
            placeholder="+911234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button onClick={sendOtp}>Send OTP</Button>
        </>
      ) : (
        <>
          <p>
            Enter OTP sent to <strong>{formatPhoneNumber(phone)}</strong>
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType="tel"
            shouldAutoFocus
            inputStyle={{
              width: '2.5rem',
              height: '2.5rem',
              margin: '0 0.5rem',
              fontSize: '1.5rem',
              borderRadius: 4,
              border: '1px solid #ccc',
            }}
            renderInput={(props) => <input {...props} />}
          />
          <Button onClick={verifyOtp} className="mt-2">
            Verify OTP
          </Button>
        </>
      )}
    </div>
  );
};

export default DisplayOtpVerification;
