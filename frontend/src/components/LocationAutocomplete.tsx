import axios from "axios";
import { useEffect, useState } from "react";

const LocationAutocomplete = ({
  value,
  onChange,
  placeholder = 'Enter location',
  countryCode = 'in',
  minLength = 3,
  locationType = 'default',
  parentValue = ''
}) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value || value.length < minLength) return;
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: value + (parentValue ? `, ${parentValue}` : ''),
            format: 'json',
            addressdetails: 1,
            limit: 5,
            countrycodes: countryCode
          }
        });

        setSuggestions(res.data);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [value, locationType, minLength, countryCode, parentValue]);

  return (
    <div style={{ marginBottom: '16px' }}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '300px', padding: '8px' }}
      />
      {suggestions.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0', background: '#eee' }}>
          {suggestions.map((item, index) => (
            <li key={index}
                style={{ padding: '6px', cursor: 'pointer' }}
                onClick={() => onChange(item.address?.[locationType] || item.display_name)}>
              {item.address?.[locationType] || item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
