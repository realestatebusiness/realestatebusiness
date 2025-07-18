import React, { useEffect, useState } from "react";

const stateCityData: Record<string, string[]> = {
    "Andaman and Nicobar Islands": ["Bamboo Flat", "Garacharma", "Port Blair"],
    "Andhra Pradesh": ["Adoni", "Amaravati", "Anantapur", "Bhimavaram", "Chittoor", "Guntur", "Kakinada", "Nellore", "Rajahmundry", "Tirupati", "Vijayawada", "Visakhapatnam"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
    "Assam": ["Dibrugarh", "Guwahati", "Jorhat", "Silchar", "Tezpur"],
    "Bihar": ["Bhagalpur", "Gaya", "Muzaffarpur", "Patna"],
    "Chandigarh": ["Chandigarh"],
    "Chhattisgarh": ["Bhilai", "Bilaspur", "Durg", "Raipur"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Karol Bagh", "Saket"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama"],
    "Gujarat": ["Ahmedabad", "Gandhinagar", "Rajkot", "Surat", "Vadodara", "Bhavnagar"],
    "Haryana": ["Faridabad", "Gurugram", "Hisar", "Karnal", "Panipat"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
    "Jammu and Kashmir": ["Jammu", "Srinagar", "Anantnag"],
    "Jharkhand": ["Bokaro", "Dhanbad", "Jamshedpur", "Ranchi"],
    "Karnataka": ["Bangalore", "Mangalore", "Mysore", "Hubli", "Belgaum"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    "Ladakh": ["Leh", "Kargil"],
    "Madhya Pradesh": ["Bhopal", "Gwalior", "Indore", "Jabalpur", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
    "Manipur": ["Imphal"],
    "Meghalaya": ["Shillong"],
    "Mizoram": ["Aizawl"],
    "Nagaland": ["Dimapur", "Kohima"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Puri", "Rourkela"],
    "Puducherry": ["Puducherry"],
    "Punjab": ["Amritsar", "Chandigarh", "Jalandhar", "Ludhiana", "Patiala"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Udaipur", "Bikaner"],
    "Sikkim": ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Secunderabad"],
    "Tripura": ["Agartala"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ghaziabad", "Kanpur", "Lucknow", "Noida", "Varanasi"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"],
    "West Bengal": ["Asansol", "Durgapur", "Howrah", "Kolkata", "Siliguri"]
  

};

function CityDropDown({ user, setUser }: { user: any, setUser: any }) {
  const [allCities, setAllCities] = useState<string[]>([]);

  useEffect(() => {
    // Populate cities when state changes
    if (user.state && stateCityData[user.state]) {
      setAllCities(stateCityData[user.state]);
    } else {
      setAllCities([]);
    }
  }, [user.state]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    // If city changes, auto-set the state
    if (name === "city") {
      const detectedState = Object.keys(stateCityData).find(state =>
        stateCityData[state].includes(value)
      );
      setUser((prev: any) => ({
        ...prev,
        city: value,
        state: detectedState || prev.state
      }));
    } else {
      setUser((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="form-section p-4">
      <div className="form-group mb-4">
        <label className="block mb-1">State</label>
        <select
          name="state"
          value={user.state}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">-- Select State --</option>
          {Object.keys(stateCityData).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div className="form-group mb-4">

    <select
          name="city"
          value={user.city}
          onChange={handleChange}
          className="border p-2 w-full"
        >
        
          {(user.state ? stateCityData[user.state] : Object.values(stateCityData).flat()).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CityDropDown;
