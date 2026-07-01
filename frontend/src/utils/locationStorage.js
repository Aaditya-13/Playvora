const STORAGE_KEY = "playnear-location";

export function getSavedLocation() {
  const value = localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function saveLocation({
  latitude,
  longitude,
  source,
}) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      latitude,
      longitude,
      source,
    })
  );
}

export function clearSavedLocation() {
  localStorage.removeItem(STORAGE_KEY);
}