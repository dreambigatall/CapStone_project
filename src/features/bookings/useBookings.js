// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getBookings } from "../../services/apiBookings";
// import { useSearchParams } from "react-router-dom";
// import { PAGE_SIZE } from "../../utils/constants";

// export function useBookings() {
//   const queryClient = useQueryClient();
//   const [searchParams] = useSearchParams();

//   // FILTER
//   const filterValue = searchParams.get("status");
//   const filter =
//     !filterValue || filterValue === "all"
//       ? null
//       : { field: "status", value: filterValue };
//   // { field: "totalPrice", value: 5000, method: "gte" };

//   // SORT
//   const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
//   const [field, direction] = sortByRaw.split("-");
//   const sortBy = { field, direction };

//   // PAGINATION
//   const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

//   // QUERY
//   const {
//     isLoading,
//     data: { data: bookings, count } = {},
//     error,
//   } = useQuery({
//     queryKey: ["bookings", filter, sortBy, page],
//     queryFn: () => getBookings({ filter, sortBy, page }),
//   });
//  console.log(bookings)
//   // PRE-FETCHING
//   const pageCount = Math.ceil(count / PAGE_SIZE);

//   if (page < pageCount)
//     queryClient.prefetchQuery({
//       queryKey: ["bookings", filter, sortBy, page + 1],
//       queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
//     });

//   if (page > 1)
//     queryClient.prefetchQuery({
//       queryKey: ["bookings", filter, sortBy, page - 1],
//       queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
//     });

//   return { isLoading, error, bookings, count };
// }

/**
 * useBookings Hook
 *
 * Purpose:
 * This custom hook fetches and manages bookings data from an API. It includes features for filtering, sorting, pagination, and pre-fetching 
 * the next and previous pages for optimized performance. It leverages the React Query library for data fetching and caching.

 * Dependencies:
 * - React Query (`useQuery` and `useQueryClient`) for fetching and caching data.
 * - React Router (`useSearchParams`) for managing query parameters from the URL.
 * - Utility constant `PAGE_SIZE` to control the number of items displayed per page.
 *
 * Features:
 * - Filters bookings based on the "status" query parameter.
 * - Sorts bookings based on the "sortBy" query parameter.
 * - Handles pagination using the "page" query parameter.
 * - Pre-fetches adjacent pages for smoother navigation.
 *
 * How It Works:
 * 1. **FILTERING**:
 *    - Reads the `status` query parameter from the URL to filter bookings.
 *    - If `status` is not set or is "all", no filtering is applied (`filter` is `null`).
 *    - Otherwise, constructs a filter object with the field and value for filtering.
 * 
 * 2. **SORTING**:
 *    - Reads the `sortBy` query parameter, defaulting to "startDate-desc" if not set.
 *    - Splits the value into `field` and `direction` (e.g., "startDate-desc" -> field = "startDate", direction = "desc").
 *    - Constructs a `sortBy` object to specify the sort field and direction.
 * 
 * 3. **PAGINATION**:
 *    - Reads the `page` query parameter, defaulting to page 1 if not set.
 *    - Converts the page to a number for further processing.
 * 
 * 4. **DATA FETCHING**:
 *    - Uses `useQuery` to fetch bookings data using the `getBookings` API function.
 *    - Passes the filter, sort, and page parameters to `getBookings`.
 *    - React Query caches the result and automatically handles loading and error states.
 * 
 * 5. **PRE-FETCHING**:
 *    - Calculates the total number of pages using `count` and `PAGE_SIZE`.
 *    - Pre-fetches data for the next and previous pages (if applicable) to optimize navigation.
 *    - Uses `queryClient.prefetchQuery` for pre-fetching.
 *
 * 6. **RETURN**:
 *    - Returns `isLoading`, `error`, `bookings`, and `count` for use in the component.
 * 
 * Example Usage:
 * 
 * ```javascript
 * import { useBookings } from "./hooks/useBookings";
 * 
 * function BookingsPage() {
 *   const { isLoading, error, bookings, count } = useBookings();
 * 
 *   if (isLoading) return <p>Loading bookings...</p>;
 *   if (error) return <p>Error loading bookings: {error.message}</p>;
 * 
 *   return (
 *     <div>
 *       <h1>Bookings</h1>
 *       <p>Total Bookings: {count}</p>
 *       <ul>
 *         {bookings.map((booking) => (
 *           <li key={booking.id}>{booking.name}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient(); // React Query client for caching and pre-fetching.
  const [searchParams] = useSearchParams(); // Reads query parameters from the URL.

  // FILTER
  const filterValue = searchParams.get("status"); // Gets the "status" query parameter.
  const filter =
    !filterValue || filterValue === "all"
      ? null // No filtering if "status" is not set or is "all".
      : { field: "status", value: filterValue }; // Construct filter object.

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc"; // Default to "startDate-desc".
  const [field, direction] = sortByRaw.split("-"); // Extract sort field and direction.
  const sortBy = { field, direction }; // Construct sort object.

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page")); // Default to page 1.

  // QUERY
  const {
    isLoading, // Loading state for the query.
    data: { data: bookings, count } = {}, // Destructures bookings data and count.
    error, // Error state for the query.
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // Unique key for caching.
    queryFn: () => getBookings({ filter, sortBy, page }), // Fetch function.
  });

  // PRE-FETCHING: Next page
  const pageCount = Math.ceil(count / PAGE_SIZE); // Calculate total pages.
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // Next page key.
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }), // Fetch next page data.
    });
  }

  // PRE-FETCHING: Previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // Previous page key.
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }), // Fetch previous page data.
    });
  }

  // Return the query state and data.
  return { isLoading, error, bookings, count };
}
