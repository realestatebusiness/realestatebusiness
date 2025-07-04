import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { postRequest } from '../../../services/endpoints';
import InputField from '../../atoms/InputField';
import Button from '../../atoms/Button';
import toast from 'react-hot-toast';

interface OtpVerificationProps {
  phone: string;
  setPhone: (val: string) => void;
  onVerified: () => void;
  label?: string;
}

const formatPhoneNumber = (raw: string): string => {
  const cleaned = raw.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  } else if (cleaned.startsWith('91') && cleaned.length > 10) {
    return `+${cleaned}`;
  }
  return `+${cleaned}`; 
};

const DisplayOtpVerification: React.FC<OtpVerificationProps> = ({ phone, setPhone, onVerified, label }) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const sendOtp = async () => {
    const formattedPhone = formatPhoneNumber(phone);
    try {
      await postRequest('/send-otp', { phoneNumber: formattedPhone });
      setOtpSent(true);
      toast.success('OTP sent successfully');
    } catch (err) {
      console.error('Failed to send OTP', err);
      toast.error('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    const formattedPhone = formatPhoneNumber(phone);
    try {
      const res = await postRequest('/verify', { phoneNumber: formattedPhone, otp });
      if (res) {
        setVerified(true);
        onVerified();
        toast.success('Phone number verified');
      }
    } catch (err) {
      console.error('Verification failed', err);
      toast.error('OTP verification failed');
    }
  };

  if (verified) {
    return <p className="text-green-600">✅ Phone number verified!</p>;
  }

  return (
    <div className="space-y-3">
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
          <p>Enter OTP sent to <strong>{formatPhoneNumber(phone)}</strong></p>
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
          <Button onClick={verifyOtp} className="mt-2">Verify OTP</Button>
        </>
      )}
    </div>
  );
};

export default DisplayOtpVerification;
