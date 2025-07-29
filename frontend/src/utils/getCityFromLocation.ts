// utils/getCityFromLocation.ts
import { postRequest } from "../services/endpoints";

export const getCityFromLocation = async (
  userId: string
): Promise<{ city: string; state: string }> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";
          const state = data.address.state || "";

          if (city && state) {
            await postRequest("/locationdata", {
              city,
              state,
              latitude,
              longitude,
              userId,
            });

            console.log("Detected Location:", { city, state,userId });
            resolve({ city, state });
          } else {
            reject("City or state not found in geolocation data");
          }
        } catch (err) {
          console.error("Error fetching or posting location:", err);
          reject("Failed to get city/state");
        }
      },
      (error) => {
        console.warn("Geolocation permission denied or error:", error);
        reject("Permission denied");
      }
    );
  });
};
