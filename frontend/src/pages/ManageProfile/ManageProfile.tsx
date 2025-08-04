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

import ProfilePageTemplate from "../../components/templates/ProfilePageTemplate/ProfilePageTemplate";
import ProfileForm from "../../components/organisms/ProfileForm/ProfileForm";

const defaultUser: UserProfile = {
  _id: "",
  phoneNumber: "",
  isActive: false,
  companyLogo: "",
  profilePhoto: "",
  role: [],
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
  const payload: any = {
    _id: user._id,
    name: user.name?.trim() || '',
    email: user.email?.trim() || '',
    role: user.role,
    phoneNumber: user.phoneNumber?.trim() || '',
    status: user.status || 'active',
    isActive: user.isActive !== undefined ? user.isActive : true,
    version: user.version || 1,
  };

  if (user.address?.trim()) payload.address = user.address.trim();
  if (user.landline?.trim()) payload.landline = user.landline.trim();
  if (user.city?.trim()) payload.city = user.city.trim();
  if (user.state?.trim()) payload.state = user.state.trim();
  if (user.companyLogo?.trim()) payload.companyLogo = user.companyLogo.trim();
  if (user.profilePhoto?.trim()) payload.profilePhoto = user.profilePhoto.trim();

  if (user.location) {
    if (typeof user.location === 'object' && (user.location as any)?._id) {
      payload.location = (user.location as any)._id;
    } else if (typeof user.location === 'string' && user.location.trim()) {
      payload.location = user.location.trim();
    }
  }

  if (user.userlocation?.length) {
    payload.userlocation = user.userlocation;
  }
  if (user.favoriteProducts?.length) {
    payload.favoriteProducts = user.favoriteProducts;
  }

  if (user.role?.length && user.role.some(r => r && r.trim())) {
    payload.role = user.role.filter((r: string) => r && r.trim() !== '');
  }

  if (user.createdBy?.trim()) payload.createdBy = user.createdBy.trim();
  if (user.updatedBy?.trim()) payload.updatedBy = user.updatedBy.trim();

  return payload;
};

const sanitizePhoneNumber = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  }
  if (cleaned.length > 10) {
    cleaned = cleaned.slice(-10);
  }
  return cleaned;
};

const ManageProfile: React.FC = () => {
  const [user, setLocalUser] = useState<UserProfile>(defaultUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationDetected, setLocationDetected] = useState(false);
  const navigate = useNavigate();
  const userid = useAppSelector(selectCurrentUserId);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const userProfile = useAppSelector(selectUserProfile);

  console.log('user Profile',userProfile)
  
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
          role: data.role?.filter((r: string) => r && r.trim() !== '') ?? [],
          name: data.name,
          email: data.email,
          address: data.address ?? "",
          landline: data.landline ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          password: "",
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

      // Check if we have a user ID
      if (!user._id) {
        setError("User ID not found. Please refresh and try again.");
        return;
      }

      const sanitizedUser = sanitizeUserForUpdate(user);
      const cleanedPhoneNumber = sanitizePhoneNumber(sanitizedUser.phoneNumber || "");

      if (cleanedPhoneNumber.length !== 10) {
        setError("Phone number must be exactly 10 digits");
        toast.error("Phone number must be exactly 10 digits");
        return;
      }

      const payload = {
        userId: user._id, 
        ...sanitizedUser,
        phoneNumber: cleanedPhoneNumber,
      };

      console.log("Payload being sent:", payload);

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
        // Preserve the locally updated city and state values
        const updatedUser = {
          ...res.data,
          city: user.city, // Use local state city
          state: user.state, // Use local state state
        };
        
        setLocalUser(updatedUser);
        dispatch(setUser(updatedUser));
        toast.success("Profile updated successfully!");
        navigate("/home");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err: any) {
      console.error("Update failed", err);
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email.trim())) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    const cleanPhone = sanitizePhoneNumber(user.phoneNumber);
    if (cleanPhone.length !== 10) {
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

  // Modified location detection effect
  useEffect(() => {
    const detectLocation = async () => {
      // Only detect location if city/state are empty AND we haven't detected before
      if ((!user.city || !user.state) && !locationDetected && userid) {
        try {
          const { city, state } = await getCityFromLocation(userid);
          setLocalUser((prev) => ({
            ...prev,
            city: prev.city || city, // Only update if current city is empty
            state: prev.state || state, // Only update if current state is empty
          }));
          setLocationDetected(true);
        } catch (err) {
          console.warn("Location detection failed:", err);
          setLocationDetected(true); // Mark as attempted even if failed
        }
      }
    };

    // Only run location detection after user profile is loaded
    if (user._id && userid) {
      detectLocation();
    }
  }, [user._id, userid, user.city, user.state, locationDetected]);

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