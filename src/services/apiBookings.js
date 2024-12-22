import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

/**
 * Functions for managing bookings data from the database.
 * These functions interact with the "bookings" table in a Supabase database
 * and include related data from other tables such as "cars", "renters", "cabins", and "guests".
 *
 * Dependencies:
 * - `supabase`: A pre-configured Supabase client for database operations.
 * - `getToday`: A helper function for retrieving today's date.
 * - `PAGE_SIZE`: A constant defining the number of items per page.
 *
 * Each function includes detailed error handling and descriptive comments.
 */

/**
 * Fetches all bookings from the "bookings" table, including related data from "cars" and "renters" tables.
 * 
 * Functionality:
 * - Retrieves all bookings with their associated car and renter details.
 * - Logs the retrieved data to the console.
 * - Throws an error if the data could not be loaded.
 * 
 * @returns {Promise<Array>} Array of all bookings.
 * @throws {Error} If the bookings could not be loaded.
 */
export async function getBookingss() {
  const { data, error } = await supabase.from("bookings").select("*, cars(*), renters(*)");
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

/**
 * Fetches bookings with optional filters, sorting, and pagination.
 * 
 * Functionality:
 * - Allows dynamic filtering by a specific field and method (e.g., equals, greater than).
 * - Supports sorting by a specified field and direction (ascending/descending).
 * - Enables pagination by calculating the range based on the current page and `PAGE_SIZE`.
 * - Returns both the filtered bookings and the total count.
 * - Throws an error if the query fails.
 * 
 * @param {Object} params - Parameters for filtering, sorting, and pagination.
 * @param {Object} [params.filter] - Filter object (field, value, and optional method such as "gte").
 * @param {Object} [params.sortBy] - Sorting object with "field" and "direction" ("asc" or "desc").
 * @param {number} [params.page] - Current page number for pagination.
 * @returns {Promise<Object>} Object containing fetched bookings (`data`) and total count (`count`).
 * @throws {Error} If bookings could not be loaded.
 */
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select("*, cars(name), renters(fullName, email)", { count: "exact" });

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);//server side filtering
  if (sortBy)//server side sorting
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",//if the direction is set by defult to ascending order and if it change it chang into descnding 
    });
  if (page) {//server side pagination
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

/**
 * Fetches a single booking by ID, including related data from "cabins" and "guests".
 * 
 * Functionality:
 * - Retrieves a specific booking by its unique ID.
 * - Includes detailed information about associated cabins and guests.
 * - Throws an error if the booking is not found.
 * 
 * @param {number} id - The ID of the booking to fetch.
 * @returns {Promise<Object>} The booking object.
 * @throws {Error} If the booking could not be found.
 */
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cars(*), renters(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

/**
 * Fetches all bookings created after the specified date.
 * 
 * Functionality:
 * - Filters bookings by their `created_at` field.
 * - Useful for generating analytics like recent bookings in the last 30 days.
 * - Throws an error if the query fails.
 * 
 * @param {string} date - ISO string representing the starting date.
 * @returns {Promise<Array>} Array of bookings created after the specified date.
 * @throws {Error} If the bookings could not be loaded.
 */
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

/**
 * Fetches all stays (bookings) with start dates after the specified date.
 * 
 * Functionality:
 * - Filters stays based on their start date.
 * - Includes associated guest details.
 * - Throws an error if the query fails.
 * 
 * @param {string} date - ISO string representing the starting date.
 * @returns {Promise<Array>} Array of stays.
 * @throws {Error} If stays could not be loaded.
 */
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, renters(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

/**
 * Fetches stays with activity on the current day.
 * 
 * Functionality:
 * - Identifies bookings with specific activity today:
 *   - Unconfirmed bookings starting today.
 *   - Checked-in bookings ending today.
 * - Orders results by creation date.
 * - Throws an error if the query fails.
 * 
 * @returns {Promise<Array>} Array of stays with today's activity.
 * @throws {Error} If bookings could not be loaded.
 */
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

/**
 * Updates a booking with the given ID using the provided data object.
 * 
 * Functionality:
 * - Updates specific fields of a booking.
 * - Returns the updated booking.
 * - Throws an error if the update fails.
 * 
 * @param {number} id - The ID of the booking to update.
 * @param {Object} obj - The data to update the booking with.
 * @returns {Promise<Object>} The updated booking object.
 * @throws {Error} If the booking could not be updated.
 */
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/**
 * Deletes a booking with the given ID.
 * 
 * Functionality:
 * - Removes a booking from the database.
 * - Throws an error if the deletion fails.
 * 
 * @param {number} id - The ID of the booking to delete.
 * @returns {Promise<Object>} Confirmation of the deletion.
 * @throws {Error} If the booking could not be deleted.
 */
export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
