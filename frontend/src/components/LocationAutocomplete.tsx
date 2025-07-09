import axios from "axios";
import { useEffect, useState } from "react";

const GEOAPIFY_API_KEY = "1b943856cbd1404c817b23e721631e47";

const LocationAutocomplete = ({
  value,
  onChange,
  placeholder = "Enter location",
  countryCode = "in",
  minLength = 2,
  locationType = "",
  parentValue = "",
}) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!value || value.length < minLength) return;

    const fetchSuggestions = async () => {
      const textQuery =
        parentValue && parentValue.length > 0
          ? `${value}, ${parentValue}`
          : value;

      try {
        const res = await axios.get(
          "https://api.geoapify.com/v1/geocode/autocomplete",
          {
            params: {
              text: textQuery,
              lang: "en",
              limit: 6,
              filter: `countrycode:${countryCode}`,
              apiKey: GEOAPIFY_API_KEY,
            },
          }
        );

        setSuggestions(res.data.features || []);
      } catch (err) {
        console.error("Geoapify API error:", err);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [value, parentValue, countryCode, minLength]);

  return (
    <div style={{ marginBottom: "16px" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "8px 0",
            background: "#eee",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((item, index) => {
            const props = item.properties;
            const displayName =
              props.name ||
              props.address_line1 ||
              props.formatted ||
              props[locationType] ||
              "Unnamed location";

            const extraInfo = [
              props.suburb,
              props.city,
              props.state,
              props.country,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <li
                key={index}
                style={{ padding: "6px", cursor: "pointer" }}
                onClick={() => onChange(displayName)}
              >
                {displayName}
                {extraInfo && `, ${extraInfo}`}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
