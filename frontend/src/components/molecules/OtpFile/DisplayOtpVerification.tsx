import React, { useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import InputField from '../../atoms/InputField';
import Button from '../../atoms/Button';
import toast from 'react-hot-toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { postRequest } from '../../../services/endpoints';
import { auth } from '../../../utils/firebase';

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

  
  const sendOtp = async () => {
    if (!phone.trim()) {
      toast.error('Please enter phone number');
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);
    setLoading(true);
    
    try {
      console.log('Sending OTP to:', formattedPhone);
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        window.recaptchaVerifier
      );
      
      confirmationResultRef.current = confirmationResult;
      setOtpSent(true);
      toast.success('OTP sent successfully');
    } catch (err: any) {
      console.error('Failed to send OTP:', err);
      
      // Handle specific Firebase errors
      if (err.code === 'auth/invalid-phone-number') {
        toast.error('Invalid phone number format');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many requests. Please try again later.');
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpWithBackend = async (idToken: string): Promise<VerifyOtpResponse> => {
    try {
      // Updated endpoint to match your backend route
      const response = await postRequest<VerifyOtpResponse>('/verify-otp', { 
        idToken 
      });
      console.log('✅ OTP Verified:', response);
      return response;
    } catch (error) {
      console.error('❌ Failed to verify OTP with backend:', error);
      throw error;
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    if (!confirmationResultRef.current) {
      toast.error('Please request OTP first');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Verifying OTP:', otp);
      
      // First verify with Firebase
      const result = await confirmationResultRef.current.confirm(otp);
      console.log('Firebase verification successful:', result.user.uid);
      
      // Get ID token
      const idToken = await result.user.getIdToken();
      
      // Then verify with your backend
      await verifyOtpWithBackend(idToken);
      
      setVerified(true);
      toast.success('Phone number verified successfully!');
      onVerified();
    } catch (error: any) {
      console.error('OTP verification failed:', error);
      
      // Handle specific errors
      if (error.code === 'auth/invalid-verification-code') {
        toast.error('Invalid OTP. Please check and try again.');
      } else if (error.code === 'auth/code-expired') {
        toast.error('OTP has expired. Please request a new one.');
      } else {
        toast.error('OTP verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
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
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div id="recaptcha-container" />

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
          <Button 
            onClick={sendOtp} 
            disabled={loading || !phone.trim()}
            className="w-full"
          >
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
            
            <Button 
              onClick={handleResendOtp}
              disabled={loading}
              className="px-4"
            >
              Resend
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOtpVerification;