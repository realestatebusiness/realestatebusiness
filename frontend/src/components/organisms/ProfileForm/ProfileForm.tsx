// src/components/organisms/ProfileForm/ProfileForm.tsx
import React from "react";
import FormField from "../../molecules/FormField/FormField";
import PhoneInput from "../../molecules/PhoneInput/PhoneInput";
import UploadSection from "../../molecules/UploadSection/UploadSection";
import ContactInfo from "../../molecules/ContactInfo/ContactInfo";
import Button from "../../atoms/Button/Button";
import Label from "../../atoms/Label/Label";
import Checkbox from "../../atoms/Checkbox/Checkbox";
import CityDropDown from "../../atoms/CityDropDown/CityDropDown";
import type { UserProfile } from "../../../types/authTypes";
import { useAppSelector } from "../../../app/hooks";

interface ProfileFormProps {
  user: UserProfile;
  loading: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onCityChange: ({ city, state }: { city: string; state: string }) => void;
  onSubmit: () => void;
  onProfilePhotoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompanyLogoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  loading,
  onChange,
  onCityChange,
  onSubmit,
  onProfilePhotoChange,
  onCompanyLogoChange,
  className = "",
}) => {
  return (
    <div
      className={`max-w-3xl mx-auto bg-white p-6 rounded shadow ${className}`}
    >
      {/* User Type */}
      <FormField
  label="You are"
  name="userType"
  value={user.role?.[0] ?? ''}
  disabled={true}
  required={true}
/>

      {/* Name */}
      <FormField
        label="Name"
        name="name"
        value={user.name}
        onChange={onChange}
        required={true}
      />

      {/* Email */}
      <FormField
        label="Email ID"
        name="email"
        type="email"
        value={user.email}
        onChange={onChange}
        required={true}
      />

      {/* Username */}
      <FormField
        label="Username"
        name="username"
        value={user.username ?? ""}
        onChange={onChange}
        required={true}
      />

      {/* Phone */}
      <PhoneInput
        label="Phone Number"
        phoneValue={user.phoneNumber}
        onPhoneChange={onChange}
        required={true}
      />

      {/* City */}
      <div className="mb-4">
        <Label required={true}>Your City</Label>
        <CityDropDown city={user.city ?? ""} onChange={onCityChange} />
      </div>

      {/* Address */}
      <FormField
        label="Address"
        name="address"
        value={user.address ?? ""}
        onChange={onChange}
      />

      {/* Landline */}
      <FormField
        label="Landline No"
        name="landline"
        value={user.landline ?? ""}
        onChange={onChange}
      />

      {/* Upload Section */}
      <UploadSection
        onProfilePhotoChange={onProfilePhotoChange}
        onCompanyLogoChange={onCompanyLogoChange}
      />

      {/* Postal Info */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
        <div>
          <p>
            <strong>Current State:</strong> {user.state || "Not selected"}
          </p>
          <p>
            <strong>Current Address:</strong> {user.address}
          </p>
        </div>
        <div>
          <p>
            <strong>Current City:</strong> {user.city}
          </p>
          <p>
            <strong>GSTIN Number:</strong>
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        <strong className="text-black">Note:</strong> These details will be used
        to compute GST. To edit GST details contact{" "}
        <span className="text-blue-600">gst.customer@infoedge.in</span>
      </p>

      {/* Subscription */}
      <div className="bg-gray-100 p-4 mt-6 rounded">
        <label className="text-sm font-semibold block">
          Subscribe For Updates From 99acres
        </label>
        <div className="mt-2">
          {/* <Checkbox
            checked={user.promoMails}
            onChange={onChange}
            label="Other Promotional Mailers"
            name="promoMails"
          /> */}
        </div>
      </div>

      {/* Terms */}
      <p className="text-xs text-gray-600 mt-4">
        By clicking below you agree to{" "}
        <a
          href="https://99acres.com/info/terms-and-conditions"
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </a>
      </p>

      {/* Save Button */}
      <div className="mt-6">
        <Button
          type="submit"
          onClick={onSubmit}
          loading={loading}
          disabled={loading}
        >
          Save Profile
        </Button>
      </div>

      {/* Contact Info */}
      <ContactInfo />
    </div>
  );
};

export default ProfileForm;
