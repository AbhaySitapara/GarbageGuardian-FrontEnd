// Utils/Hash.js
export const generateHash = (path) => {
    // Simple hash function using btoa to convert string to Base64
    return btoa(path); // Ensure the path is encoded in Base64
  };
  