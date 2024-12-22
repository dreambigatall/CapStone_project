// Import the Supabase client and its URL
import supabase, { supabaseUrl } from "./supabase";

/**
 * Signs up a new user with full name, email, and password.
 * 
 * @param {Object} userDetails - Object containing user details.
 * @param {string} userDetails.fullName - Full name of the user.
 * @param {string} userDetails.email - Email of the user.
 * @param {string} userDetails.password - Password for the user.
 * 
 * @returns {Object} Supabase data object containing user information.
 * @throws {Error} If signup fails.
 */
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName, // Store the user's full name in metadata
        avatar: "", // Initialize the avatar as an empty string
      },
    },
  });

  if (error) throw new Error(error.message);

  return data; // Return the Supabase signup response
}

/**
 * Logs in a user with email and password.
 * 
 * @param {Object} credentials - Object containing login credentials.
 * @param {string} credentials.email - Email of the user.
 * @param {string} credentials.password - Password for the user.
 * 
 * @returns {Object} Supabase data object containing user session.
 * @throws {Error} If login fails.
 */
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data; // Return the login session data
}

/**
 * Retrieves the current authenticated user.
 * 
 * @returns {Object|null} The user object if logged in, otherwise `null`.
 * @throws {Error} If retrieving the user fails.
 */
export async function getCurrentUser() {
  // Get the current session
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null; // No session means no logged-in user

  // Retrieve user information
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user; // Return the current user or null if not found
}

/**
 * Logs out the current user.
 * 
 * @throws {Error} If logout fails.
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

/**
 * Updates the current user's password, full name, or avatar.
 * 
 * @param {Object} updates - Object containing update details.
 * @param {string} [updates.password] - New password for the user (optional).
 * @param {string} [updates.fullName] - New full name for the user (optional).
 * @param {File} [updates.avatar] - New avatar file for the user (optional).
 * 
 * @returns {Object} Updated user data.
 * @throws {Error} If update fails at any stage.
 */
export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;

  // Step 1: Update password or full name
  if (password) updateData = { password }; // Update password
  if (fullName) updateData = { data: { fullName } }; // Update full name

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data; // Skip avatar update if not provided

  // Step 2: Upload avatar to storage
  const fileName = `avatar-${data.user.id}-${Math.random()}`; // Generate a unique file name

  const { error: storageError } = await supabase.storage
    .from("avatars") // Target the 'avatars' storage bucket
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // Step 3: Update avatar URL in user metadata
  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: avatarUrl }, // Save avatar URL to user metadata
  });

  if (error2) throw new Error(error2.message);

  return updatedUser; // Return the updated user object
}
