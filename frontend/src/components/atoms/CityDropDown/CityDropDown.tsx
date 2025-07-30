// components/CityDropDown.tsx
import React, { useEffect } from "react";

type CityDropDownProps = {
  city: string;
  onChange: (value: { city: string; state: string }) => void;
};

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

const CityDropDown: React.FC<CityDropDownProps> = ({ city, onChange }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    const matchedState = Object.entries(stateCityData).find(([state, cities]) =>
      cities.includes(selectedCity)
    );
    const selectedState = matchedState ? matchedState[0] : "";
    onChange({ city: selectedCity, state: selectedState });
  };

  return (
      <select
        name="city"
        value={city}
        onChange={handleSelect}
        className="mt-1 w-1/2 px-4 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Select</option>
        {Object.entries(stateCityData).map(([state, cities]) => (
          <optgroup key={state} label={state}>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
  );
};

export default CityDropDown;
