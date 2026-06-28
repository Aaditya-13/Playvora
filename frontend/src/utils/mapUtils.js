export const extractCoordinatesFromUrl = (url) => {
  if (!url) return null;

  try {
    const atRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const qRegex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const placeRegex = /place\/(-?\d+\.\d+),(-?\d+\.\d+)/;

    const match = url.match(atRegex) || url.match(qRegex) || url.match(placeRegex);

    if (match && match.length >= 3) {
      return {
        latitude: parseFloat(match[1]),
        longitude: parseFloat(match[2]),
      };
    }
    
    return null; 
  } catch (error) {
    console.error("Failed to parse map URL:", error);
    return null;
  }
};

export const getCoordinatesFromAddress = async (address) => {
  if (!address || address.length < 5) return null;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch (error) {
    console.error("Geocoding failed:", error);
    return null;
  }
};