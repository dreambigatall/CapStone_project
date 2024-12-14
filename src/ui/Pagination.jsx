/**
 * Pagination Component
 * 
 * This component provides pagination controls for navigating through
 * a list of items. It displays the current range of items and allows
 * users to navigate to the next or previous pages.
 * 
 * Props:
 * - count (number): The total number of items to paginate.
 * 
 * Features:
 * - Displays the current range of items (e.g., "1 to 10 of 100 results").
 * - Provides "Previous" and "Next" buttons for navigation.
 * - Buttons are disabled when on the first or last page.
 * - Uses query parameters in the URL to track the current page (via React Router's `useSearchParams`).
 * 
 * How It Works:
 * 1. **Page Tracking via URL Parameters**:
 *    - The component uses the `useSearchParams` hook from React Router to manage the `page` query parameter in the URL.
 *    - If no `page` parameter exists, the default current page is set to `1`.
 * 
 * 2. **Page Count Calculation**:
 *    - The `pageCount` is calculated by dividing the total number of items (`count`) by the predefined `PAGE_SIZE` constant, using `Math.ceil` to ensure all items are accounted for.
 * 
 * 3. **Navigation Buttons**:
 *    - The "Previous" button decreases the current page by 1 unless already on the first page.
 *    - The "Next" button increases the current page by 1 unless already on the last page.
 *    - Both buttons update the `page` query parameter in the URL to reflect the new page.
 *    - The buttons are disabled when navigation is not possible (e.g., on the first or last page).
 * 
 * 4. **Displaying Results Range**:
 *    - The text dynamically calculates and displays the range of items shown on the current page.
 *    - For example, if the current page is `2` and `PAGE_SIZE` is `10`, it shows "11 to 20 of X results".
 * 
 * Dependencies:
 * - `react-icons/hi2`: For Chevron icons used in the navigation buttons.
 * - `react-router-dom`: For handling search parameters in the URL.
 * - `styled-components`: For styling the component and its elements.
 * - `PAGE_SIZE`: A constant defining the number of items per page.
 * 
 * Styling:
 * - Customizable button styles based on active or disabled states.
 * - Responsive and styled using `styled-components`.
 * 
 * Usage:
 * 1. Import the Pagination component:
 *    ```jsx
 *    import Pagination from './Pagination';
 *    ```
 * 
 * 2. Ensure you have `PAGE_SIZE` defined in your constants:
 *    ```javascript
 *    export const PAGE_SIZE = 10; // Number of items per page
 *    ```
 * 
 * 3. Pass the `count` prop to indicate the total number of items:
 *    ```jsx
 *    const totalItems = 123; // Total number of items
 * 
 *    <Pagination count={totalItems} />
 *    ```
 * 
 * 4. Make sure the parent component uses React Router's `<BrowserRouter>` or equivalent for search parameter management:
 *    ```jsx
 *    import { BrowserRouter } from 'react-router-dom';
 *    import Pagination from './Pagination';
 * 
 *    function App() {
 *      return (
 *        <BrowserRouter>
 *          <Pagination count={123} />
 *        </BrowserRouter>
 *      );
 *    }
 *    ```
 */



import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;