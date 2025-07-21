import React, { useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import toast from 'react-hot-toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { postRequest } from '../../../services/endpoints';
import { auth } from '../../../utils/firebase';
import { InputField } from '../../atoms/InputField';
import { Button } from '../../atoms/Button';

interface OtpVerificationProps {
  phone: string;
  setPhone: (val: string) => void;
  onVerified: () => void;
  label?: string;
}

interface VerifyOtpResponse {
  uid: string;
  phoneNumber: string;
  message: string;
}

const formatPhoneNumber = (raw: string): string => {
  const cleaned = raw.replace(/\D/g, '');
  if (cleaned.length === 10) return `+91${cleaned}`;
  else if (cleaned.startsWith('91') && cleaned.length > 10) return `+${cleaned}`;
  return `+${cleaned}`;
};

// Mock verification for development
const isDevelopment = process.env.NODE_ENV === 'development';
const MOCK_OTP = '123456';

const DisplayOtpVerification: React.FC<OtpVerificationProps> = ({
  phone,
  setPhone,
  onVerified,
  label
}) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const confirmationResultRef = useRef<any>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  // Setup reCAPTCHA verifier once on mount (only in production)
  useEffect(() => {
    if (!isDevelopment && typeof window !== 'undefined' && !recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response: any) => {
              console.log('reCAPTCHA solved:', response);
            },
            'expired-callback': () => {
              console.warn('reCAPTCHA expired.');
            },
          }
        );

        recaptchaVerifierRef.current.render().then((widgetId: any) => {
          console.log('reCAPTCHA widget rendered:', widgetId);
        }).catch((error: any) => {
          console.error('reCAPTCHA render failed:', error);
        });
      } catch (err) {
        console.error('Recaptcha setup failed:', err);
      }
    }

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const sendOtpMock = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOtpSent(true);
    setLoading(false);
    toast.success(`OTP sent successfully (Development mode: use ${MOCK_OTP})`);
  };

  const sendOtpReal = async () => {
    const formattedPhone = formatPhoneNumber(phone);
    setLoading(true);

    try {
      if (!recaptchaVerifierRef.current) {
        toast.error('Recaptcha not initialized. Please refresh and try again.');
        return;
      }

      console.log('Sending OTP to:', formattedPhone);

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifierRef.current
      );

      confirmationResultRef.current = confirmationResult;
      setOtpSent(true);
      toast.success('OTP sent successfully');
    } catch (err: any) {
      console.error('Failed to send OTP:', err);
      if (err.code === 'auth/billing-not-enabled') {
        toast.error('Firebase billing not enabled. Please enable billing or use development mode.');
      } else if (err.code === 'auth/invalid-phone-number') {
        toast.error('Invalid phone number format');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many requests. Try again later.');
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!phone.trim()) {
      toast.error('Please enter phone number');
      return;
    }

    if (isDevelopment) {
      await sendOtpMock();
    } else {
      await sendOtpReal();
    }
  };

  const verifyOtpWithBackend = async (idToken: string): Promise<VerifyOtpResponse> => {
    return await postRequest<VerifyOtpResponse>('/verify-otp', { idToken });
  };

  const handleVerifyOtpMock = async () => {
    if (otp !== MOCK_OTP) {
      toast.error('Invalid OTP. Use 123456 for development');
      return;
    }

    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Mock backend call
      console.log('Mock: Phone verification successful');
      setVerified(true);
      toast.success('Phone number verified successfully! (Development mode)');
      onVerified();
    } catch (error) {
      toast.error('Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpReal = async () => {
    if (!confirmationResultRef.current) {
      toast.error('Please request OTP first');
      return;
    }

    setLoading(true);

    try {
      const result = await confirmationResultRef.current.confirm(otp);
      const idToken = await result.user.getIdToken();
      await verifyOtpWithBackend(idToken);
      setVerified(true);
      toast.success('Phone number verified successfully!');
      onVerified();
    } catch (error: any) {
      console.error('OTP verification failed:', error);
      if (error.code === 'auth/invalid-verification-code') {
        toast.error('Invalid OTP.');
      } else if (error.code === 'auth/code-expired') {
        toast.error('OTP expired. Request a new one.');
      } else {
        toast.error('Verification failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    if (isDevelopment) {
      await handleVerifyOtpMock();
    } else {
      await handleVerifyOtpReal();
    }
  };

  const handleResendOtp = async () => {
    setOtp('');
    setOtpSent(false);
    confirmationResultRef.current = null;
    await sendOtp();
  };

  if (verified) {
    return (
      <div className="text-green-600 font-medium">
        ✅ Phone number verified successfully!
        {isDevelopment && <div className="text-sm text-gray-500 mt-1">(Development mode)</div>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isDevelopment && <div id="recaptcha-container" />}
      {isDevelopment && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
          <strong>Development Mode:</strong> Use OTP <code className="bg-yellow-100 px-1 rounded">{MOCK_OTP}</code>
        </div>
      )}
      {!otpSent ? (
        <div className="space-y-3">
          <InputField
            label={label || 'Phone Number'}
            name="phone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />
          <Button onClick={sendOtp} disabled={loading || !phone.trim()} className="w-full">
            {loading ? 'Sending...' : 'Send OTP'}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Enter the 6-digit OTP sent to{' '}
            <strong className="text-gray-800">{formatPhoneNumber(phone)}</strong>
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
              margin: '0 0.25rem',
              fontSize: '1.25rem',
              borderRadius: '4px',
              border: '2px solid #e5e7eb',
              textAlign: 'center',
              outline: 'none',
              transition: 'border-color 0.15s ease-in-out',
            }}
            renderInput={(props) => <input {...props} />}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              className="flex-1"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
            <Button onClick={handleResendOtp} disabled={loading} className="px-4">
              Resend
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOtpVerification;









