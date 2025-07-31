import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { ApiResponse, UserProfile } from "../../types/authTypes";
import { selectUserProfile } from "../../features/userProfile";
import { getRequest, putRequest } from "../../services/endpoints";
import { getCookie } from "../../utils/cookieUtils";
import { selectCurrentUserId, setToken } from "../../features/auth";
import { setUser } from "../../features/userProfile/userProfileSlice";
import { getCityFromLocation } from "../../utils/getCityFromLocation";
import { useNavigate } from "react-router-dom";

// Components
import ProfilePageTemplate from "../../components/templates/ProfilePageTemplate/ProfilePageTemplate";
import ProfileForm from "../../components/organisms/ProfileForm/ProfileForm";
import type { RootState } from "../../app/store";

// Default User Object
const defaultUser: UserProfile = {
  _id: "",
  phoneNumber: "",
  isActive: false,
  companyLogo: "",
  profilePhoto: "",
  role: [], // Uncommented this
  name: "",
  email: "",
  address: "",
  landline: "",
  password: "",
  city: "",
  state: "",
  favoriteProducts: [],
  userlocation: [],
  status: "Active",
  version: 1,
  createdBy: "",
  updatedBy: "",
  location: "",
  createdAt: "",
  updatedAt: "",
};

const sanitizeUserForUpdate = (user: UserProfile) => {
  // Ensure required fields are never empty or undefined
  const payload: any = {
    name: user.name?.trim() || '',
    email: user.email?.trim() || '',
    role:user.role,
    phoneNumber: user.phoneNumber?.trim() || '',
    status: user.status || 'active',
    isActive: user.isActive !== undefined ? user.isActive : true,
    version: user.version || 1,
  };

  // Only add optional fields if they have meaningful values
  if (user.address?.trim()) payload.address = user.address.trim();
  if (user.landline?.trim()) payload.landline = user.landline.trim();
  if (user.city?.trim()) payload.city = user.city.trim();
  if (user.state?.trim()) payload.state = user.state.trim();
  if (user.companyLogo?.trim()) payload.companyLogo = user.companyLogo.trim();
  if (user.profilePhoto?.trim()) payload.profilePhoto = user.profilePhoto.trim();
  
  // Handle location - only include if it exists and has an _id
  if (user.location) {
    if (typeof user.location === 'object' && (user.location as any)?._id) {
      payload.location = (user.location as any)._id;
    } else if (typeof user.location === 'string' && user.location.trim()) {
      payload.location = user.location.trim();
    }
  }

  // Only include arrays if they have items
  if (user.userlocation?.length) {
    payload.userlocation = user.userlocation;
  }
  if (user.favoriteProducts?.length) {
    payload.favoriteProducts = user.favoriteProducts;
  }

  // Only include role if it exists and has valid values
  if (user.role?.length && user.role.some(r => r && r.trim())) {
    payload.role = user.role.filter((r: string) => r && r.trim() !== '');
  }

  // Metadata fields - only if they exist and are not empty
  if (user.createdBy?.trim()) payload.createdBy = user.createdBy.trim();
  if (user.updatedBy?.trim()) payload.updatedBy = user.updatedBy.trim();

  return payload;
};

const ManageProfile: React.FC = () => {
  const [user, setLocalUser] = useState<UserProfile>(defaultUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userid = useAppSelector(selectCurrentUserId);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const userProfile = useAppSelector(selectUserProfile);
const users = useAppSelector((state: RootState) => state.auth.user);
console.log("userprofile role : ",userProfile?.role);
  console.log('userprofile', userProfile);

  const fetchUserProfile = async (token: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getRequest<ApiResponse>("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data) {
        const data = res.data;

        const formatted: UserProfile = {
          _id: data._id,
          phoneNumber: data.phoneNumber,
          isActive: data.isActive,
          companyLogo: data.companyLogo ?? "",
          profilePhoto: data.profilePhoto ?? "",
          role: data.role?.filter((r: string) => r && r.trim() !== '') ?? [], // Filter out empty strings
          name: data.name,
          email: data.email,
          address: data.address ?? "",
          landline: data.landline ?? "",
          city: data.city ?? "",
          state: data.state ?? "", // FIXED: was data.city
          password: "", // intentionally left empty
          favoriteProducts: data.favoriteProducts ?? [],
          userlocation: data.userlocation ?? [],
          status: data.status,
          version: data.version ?? 1,
          createdBy: data.createdBy ?? "",
          updatedBy: data.updatedBy ?? "",
          location: data.location ?? "",
          createdAt: data.createdAt ?? "",
          updatedAt: data.updatedAt ?? "",
        };

        setLocalUser(formatted);
        dispatch(setUser(formatted));
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const sanitizedUser = sanitizeUserForUpdate(user);

      // Clean and validate phone number
      let cleanedPhoneNumber = sanitizedUser.phoneNumber?.replace(/\D/g, '') || '';
      
      // Remove country code if present
      if (cleanedPhoneNumber.startsWith('91') && cleanedPhoneNumber.length === 12) {
        cleanedPhoneNumber = cleanedPhoneNumber.substring(2);
      }
      
      // Ensure it's exactly 10 digits
      if (cleanedPhoneNumber.length !== 10) {
        setError("Phone number must be exactly 10 digits");
        return;
      }

      const payload = {
        ...sanitizedUser,
        phoneNumber: cleanedPhoneNumber,
      };

      // Debug log to see what's being sent
      console.log('Payload being sent:', payload);

      const res = await putRequest<{
        status: any;
        success: boolean;
        data: UserProfile;
      }>("/profile/update", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.success) {
        setLocalUser(res.data);
        dispatch(setUser(res.data));
        toast.success("Profile updated successfully!");
        navigate("/home");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err: any) {
      console.error("Update failed", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = ({ city, state }: { city: string; state: string }) => {
    setLocalUser((prev) => ({
      ...prev,
      city,
      state,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setLocalUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields before submitting
    if (!user.name?.trim()) {
      setError("Name is required");
      toast.error("Name is required");
      return;
    }
    if (!user.email?.trim()) {
      setError("Email is required");
      toast.error("Email is required");
      return;
    }
    if (!user.phoneNumber?.trim()) {
      setError("Phone number is required");
      toast.error("Phone number is required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email.trim())) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number (should be 10 digits)
    const phoneRegex = /^\d{10}$/;
    const cleanPhone = user.phoneNumber.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setError("Phone number should be 10 digits");
      toast.error("Phone number should be 10 digits");
      return;
    }

    await updateUserProfile();
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Profile photo selected:", e.target.files?.[0]);
  };

  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Company logo selected:", e.target.files?.[0]);
  };

  useEffect(() => {
    const token = getCookie("Authorization");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
    }
  }, [token]);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const { city, state } = await getCityFromLocation(userid ?? "");
        console.log("Detected location:", city, state);
        setLocalUser ((prev) => ({
          ...prev,
          city,
          state,
        }));
      } catch (err) {
        console.warn("Location detection failed:", err);
      }
    };

    detectLocation();
  }, [userid]);

  return (
    <ProfilePageTemplate
      userName={user.name || "User"}
      userRole={user.role?.[0] || "User"}
      profileImage={user.profilePhoto}
      lastVisited={user.updatedAt}
    >
      <ProfileForm
        user={user}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onProfilePhotoChange={handleProfilePhotoChange}
        onCompanyLogoChange={handleCompanyLogoChange}
        onCityChange={handleCityChange}
      />
      {error && <div className="error-message">{error}</div>}
    </ProfilePageTemplate>
  );
};

export default ManageProfile;