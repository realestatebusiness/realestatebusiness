import React, { useEffect, useState } from "react";
import "./ManageProfile.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { ApiResponse, UserProfile, UserProfileResponse } from "../../types/authTypes";
import { selectUserProfile } from "../../features/userProfile";
import { getRequest, putRequest } from "../../services/endpoints";
import { getCookie } from "../../utils/cookieUtils";
import { setToken } from "../../features/auth";
import { setUser } from "../../features/userProfile/userProfileSlice";
import CityDropDown from "../atoms/CityDropDown/CityDropDown";
const defaultUser: UserProfile = {
  role: "",
  name: "",
  email: "",
  username: "",
  phone: "",
  city: "",
  address: "",
  landline: "",
  state: "",
  promoMails: false,
  token: "",
  userId: "",
  user: {
    isActive: false,
    role: [],
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    landline: "",
    profilePhoto: "",
    companyLogo: "",
  },
};

const ManageProfile: React.FC = () => {
  const [user, setLocalUser] = useState<UserProfile>(defaultUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  

  const dispatch=useAppDispatch();

  const currentUser = useAppSelector(selectUserProfile);
  console.log('user',currentUser)
  const token = useAppSelector((state) => state.auth.token);
console.log(token)
  
useEffect(() => {
    const token = getCookie("Authorization");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);


useEffect(() => {
  if (token) {
    fetchUserProfile(token); // Pass token as argument
  }
}, [token]);


const fetchUserProfile = async (token: string) => {
  try {
    setLoading(true);
    setError(null);

    const res = await getRequest<ApiResponse>("/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // send correct token
      },
    });

    if (res) {
      const data = res.data;

      const formatted: UserProfile = {
        role: data.role?.[0] ?? "",
        name: data.name,
        email: data.email,
        username: "",
        phone: data.phoneNumber,
        city: "",
        address: "",
        landline: "",
        state: "",
        promoMails: false,
        token: token, // Use actual token passed
        userId: data._id,
        user: {
          isActive: data.isActive,
          role: data.role?.filter(Boolean) as string[],
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: "",
          city: "",
          landline: "",
          profilePhoto: "",
          companyLogo: "",
        },
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

      const res = await putRequest<{ success: boolean; data: UserProfile }>(
        "/profile/update",
        user
      );

      if (res.success) {
        setUser(res.data);
        alert("Profile updated successfully!");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    await updateUserProfile();
  };

//  const handleLocationDetect = async () => {
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude } = position.coords;
//       try {
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//         );
//         const data = await res.json();
//         const city =
//           data.address.city || data.address.town || data.address.state || "";
//         setUserCity(city);
//         console.log("usercitey......", city);

//         // Optional: call API to fetch properties in that city
//         // const res = await fetch(`/properties?city=${city}`);
//         // const result = await res.json();
//         // setUserProperties(result.data || []);
//       } catch (err) {
//         console.error("Failed to get city from coordinates:", err);
//       }
//     });
//     handleLocationDetect();
//   }, []);
//  }

  return (
    <div className="profile-container">
      <h2>Modify Profile</h2>

      <div className="form-group">
        <label>You are *</label>
        <input name="role" value={user.role} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Name *</label>
        <input name="name" value={user.name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Email ID *</label>
        <input name="email" value={user.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Username *</label>
        <input name="username" value={user.username} onChange={handleChange} />
      </div>

      <div className="form-group phone-group">
        <label>Phone Number *</label>
        <div className="phone-flex">
          <select disabled>
            <option value="+91">+91 IND</option>
          </select>
          <input name="phone" value={user.phone} onChange={handleChange} />
        </div>
        <label className="promo-whatsapp">
          <input
            type="checkbox"
            name="promoMails"
            checked={user.promoMails}
            onChange={handleChange}
          />
          Allow buyers to WhatsApp me on this number
        </label>
      </div>

      <div className="form-group">
        <label>Your City *</label>
        <input name="city" value={user.city} onChange={handleChange} />
         <CityDropDown user={user} setUser={setUser} />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input name="address" value={user.address} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Landline</label>
        <input name="landline" value={user.landline} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>State</label>
        <input name="state" value={user.state} onChange={handleChange} />
         <CityDropDown user={user} setUser={setUser} />
      </div>

      <button className="save-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </button>

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default ManageProfile;
