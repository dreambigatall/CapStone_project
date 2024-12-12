import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;


//-----------------------------------------

/**
 * File Overview:
 * The `Select` component is a reusable dropdown component built with styled-components.
 * It provides a consistent, styled dropdown interface for selecting from a list of options.

 * Purpose:
 * - Provide a customizable and styled dropdown menu.
 * - Allow seamless integration into forms, filters, and other components requiring selection functionality.
 * - Simplify reuse and styling of dropdowns across the application.

 * Key Features:
 * - Fully customizable styling using `styled-components`.
 * - Supports additional props for flexibility, such as `type` for style variations.
 * - Dynamically renders options passed through props.

 * Props:
 * - `options` (array): An array of objects defining the options to be displayed in the dropdown.
 *   - `label` (string): The text to display for the option.
 *   - `value` (string): The value associated with the option.
 * - `value` (string): The currently selected value.
 * - `onChange` (function): A callback function triggered when the selected value changes.
 * - Additional props (`...props`): Any additional attributes (e.g., `type`, `id`, `disabled`) passed to the component.

 * Styled Component:
 * - `StyledSelect`: A `styled.select` component that:
 *   - Adapts border color based on the `type` prop.
 *   - Applies consistent padding, font size, and border radius for a polished look.
 *   - Provides shadow and background-color styles for an elegant UI.
 *   - Style variations:
 *     - `type="white"`: Applies a light border for better contrast with dark backgrounds.
 *     - Default: Applies a neutral border.

 * Component Structure:
 * 1. `StyledSelect`: The styled `<select>` element.
 * 2. `options.map`: Dynamically generates `<option>` elements from the `options` prop.

 * Usage:
 * 
 * 1. Import the `Select` component:
 *    ```javascript
 *    import Select from './Select';
 *    ```
 * 
 * 2. Provide the required props (`options`, `value`, `onChange`) and additional attributes as needed:
 *    ```javascript
 *    const sortingOptions = [
 *      { label: "Price: Low to High", value: "price-asc" },
 *      { label: "Price: High to Low", value: "price-desc" },
 *      { label: "Rating: High to Low", value: "rating-desc" },
 *      { label: "Newest First", value: "newest" },
 *    ];

 *    function App() {
 *      const [selectedValue, setSelectedValue] = React.useState(sortingOptions[0].value);

 *      function handleSortChange(e) {
 *        setSelectedValue(e.target.value);
 *        console.log("Selected Sort Option:", e.target.value);
 *      }

 *      return (
 *        <Select
 *          options={sortingOptions}
 *          value={selectedValue}
 *          onChange={handleSortChange}
 *          type="white"
 *        />
 *      );
 *    }
 *    ```

 * 3. How it integrates:
 *    - The `options` prop defines the list of selectable values.
 *    - The `value` prop keeps the dropdown value in sync with the parent component's state.
 *    - The `onChange` function handles logic when a new option is selected.

 * Customization:
 * - Extend or modify the `StyledSelect` component to match your application's design requirements.
 * - Add additional props like `id` or `name` for better accessibility and form integration.

 * Notes:
 * - Ensure the `value` prop matches one of the `options` to prevent UI inconsistencies.
 * - Use `type` to toggle between different visual styles (e.g., "white" for light themes).
 * - Test the component with a wide range of option lengths to ensure consistent rendering.

 */
