import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;


//--------------------------------------------------------------------------
/**
 * File Overview:
 * This file defines a reusable `Filter` component that provides a user-friendly way to filter data on a page.
 * It utilizes React Router's `useSearchParams` for managing query parameters and `styled-components` for styling.
 * 
 * Purpose:
 * - Allow users to filter data dynamically by clicking filter buttons.
 * - Update the URL's query parameters (`searchParams`) to reflect the current filter state.
 * - Enable seamless integration with paginated data by resetting the "page" parameter when a new filter is applied.
 * 
 * Key Features:
 * - Dynamically renders filter buttons based on the provided `options` array.
 * - Highlights the currently active filter button for better UX.
 * - Updates the URL query parameters without reloading the page using React Router's `useSearchParams`.
 * - Built with `styled-components` for customizable styling.
 * - Prevents redundant actions by disabling the active filter button.
 * 
 * Styled Components:
 * - `StyledFilter`: A flex container with consistent spacing, borders, and background styling.
 * - `FilterButton`: A styled button with a dynamic `active` state to indicate the selected filter.
 * 
 * Props:
 * - `filterField` (string): The query parameter key that represents the filter field (e.g., "category", "sort").
 * - `options` (array): An array of objects defining the filter options. Each object should have:
 *    - `label` (string): The text to display on the button.
 *    - `value` (string): The corresponding value for the filter.
 * 
 * How It Works:
 * 1. The `Filter` component reads the current filter value from the query parameter (`filterField`) using `useSearchParams`.
 * 2. It dynamically renders buttons for each filter option.
 * 3. Clicking a button:
 *    - Updates the query parameter in the URL to the selected filter value.
 *    - Resets the "page" query parameter to 1 (if it exists) for paginated data.
 *    - Visually highlights the active filter button and disables it.
 * 
 * Usage:
 * 
 * 1. Import the `Filter` component:
 *    ```javascript
 *    import Filter from './Filter';
 *    ```
 * 
 * 2. Provide the required `filterField` and `options` props:
 *    ```javascript
 *    const options = [
 *      { label: "All", value: "all" },
 *      { label: "Completed", value: "completed" },
 *      { label: "Pending", value: "pending" },
 *    ];
 * 
 *    function App() {
 *      return (
 *        <Filter
 *          filterField="status"
 *          options={options}
 *        />
 *      );
 *    }
 *    ```
 * 
 * 3. How it integrates:
 *    - The filter buttons update the URL (e.g., `?status=completed`).
 *    - const filterValue = searchParams.get("discount") || "all";
 *     - let filteredCabins;
       - if (filterValue === "all") filteredCabins = cars;
       -if (filterValue === "no-discount")
       - filteredCabins = cars.filter((car) => car.discount === 0);
       -if (filterValue === "with-discount")
       - filteredCabins = cars.filter((car) => car.discount > 0);
 *     - The `currentFilter` is derived from the URL and persists even on page reloads.
 *     - Use the `filterField` query parameter in your backend or frontend logic to fetch or display filtered data.
 * 
 * Customization:
 * - Modify the `StyledFilter` or `FilterButton` styled components to adjust spacing, colors, and other styles.
 * - Extend functionality by adding more behavior on button clicks (e.g., analytics tracking).
 * 
 * Notes:
 * - Ensure that `filterField` corresponds to a key recognized by your backend or frontend filtering logic.
 * - The `options` array must include at least one item to avoid rendering an empty component.
 */
