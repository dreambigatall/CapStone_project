import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;

//------------------------------------------------------------

/**
 * File Overview:
 * The `SortBy` component provides a dynamic dropdown menu for sorting data on a page.
 * It leverages React Router's `useSearchParams` to manage the "sortBy" query parameter in the URL
 * and uses a reusable `Select` component for rendering the dropdown.

 * Purpose:
 * - Allow users to select a sorting option dynamically from a dropdown menu.
 * - Update the URL's "sortBy" query parameter to reflect the selected sorting option.
 * - Enable seamless interaction with data-fetching logic or front-end filtering based on the selected sorting option.

 * Key Features:
 * - Reads and sets the "sortBy" query parameter in the URL using `useSearchParams`.
 * - Integrates with the reusable `Select` component to display the dropdown menu.
 * - Keeps the selected sorting option consistent with the query parameter in the URL.

 * Props:
 * - `options` (array): An array of objects defining the sorting options. Each object should have:
 *    - `label` (string): The text displayed in the dropdown menu.
 *    - `value` (string): The corresponding value for the sorting option.

 * How It Works:
 * 1. The `SortBy` component reads the current "sortBy" value from the query parameter using `useSearchParams`.
 * 2. It renders a dropdown menu using the `Select` component, passing the `options` and current `sortBy` value.
 * 3. When a new sorting option is selected:
 *    - The "sortBy" query parameter is updated in the URL.
 *    - The page's state is updated without a full reload, ensuring a seamless user experience.

 * Component Breakdown:
 * - `Select`: A reusable dropdown component that takes the following props:
 *    - `options`: The sorting options to display.
 *    - `type`: The style type (e.g., "white" in this example).
 *    - `value`: The currently selected value.
 *    - `onChange`: A callback function triggered when a new option is selected.
 * - `useSearchParams`: Used to get and set the query parameters in the URL dynamically.

 * Usage:
 * 
 * 1. Import the `SortBy` component:
 *    ```javascript
 *    import SortBy from './SortBy';
 *    ```
 * 
 * 2. Provide the `options` prop with sorting options:
 *    ```javascript
 *    const sortingOptions = [
 *      { label: "Price: Low to High", value: "price-asc" },
 *      { label: "Price: High to Low", value: "price-desc" },
 *      { label: "Rating: High to Low", value: "rating-desc" },
 *      { label: "Newest First", value: "newest" },
 *    ];
 * 
 *    function App() {
 *      return (
 *        <SortBy options={sortingOptions} />
 *      );
 *    }
 *    ```
 * 
 * 3. How it integrates:
 *    - The `sortBy` parameter in the URL reflects the selected option (e.g., `?sortBy=price-asc`).
 *    - The selected sorting option persists in the UI even after a page reload.
 *    - Use the "sortBy" query parameter in your backend or front-end logic to fetch or display sorted data.
 * 
 * Customization:
 * - Extend the `Select` component to support additional styles or behaviors if needed.
 * - Add additional logic in the `handleChange` function, such as resetting pagination or tracking analytics.
 * 
 * Notes:
 * - Ensure that the sorting options in the `options` array align with the sorting logic in your backend or front-end.
 * - The `Select` component must handle cases where the `value` is not found in the `options` array.
 */
