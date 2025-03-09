// First, create a utility file for encryption/decryption
const ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "K9x#mP2$vL5nQ8*wR3jY7@hF4pE9!dB";

export const encryptData = (data) => {
  try {
    // Convert the data to string if it's not already
    const textToEncrypt =
      typeof data === "string" ? data : JSON.stringify(data);

    // Simple XOR encryption with the key
    const encrypted = textToEncrypt
      .split("")
      .map((char, index) => {
        const keyChar = ENCRYPTION_KEY[index % ENCRYPTION_KEY.length];
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
      })
      .join("");

    // Convert to base64 for safe storage
    return btoa(encrypted);
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    // Decode from base64
    const decoded = atob(encryptedData);

    // Reverse the XOR encryption
    const decrypted = decoded
      .split("")
      .map((char, index) => {
        const keyChar = ENCRYPTION_KEY[index % ENCRYPTION_KEY.length];
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
      })
      .join("");

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
