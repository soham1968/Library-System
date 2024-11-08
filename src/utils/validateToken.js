import admin from "./firebase-admin";

/**
 * Validates a Firebase ID token.
 * @param {string} token - The ID token to verify.
 * @returns {Promise<object>} - The decoded token if valid.
 * @throws {Error} - Throws an error if the token is invalid.
 */
const validateToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export default validateToken;
