// /* eslint-disable */

// import { createContext, useContext } from "react";
// import styled from "styled-components";

// const StyledTable = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const CommonRow = styled.div`
//   display: grid;
//   grid-template-columns: ${(props) => props.columns};
//   column-gap: 2.4rem;
//   align-items: center;
//   transition: none;
// `;

// const StyledHeader = styled(CommonRow)`
//   padding: 1.6rem 2.4rem;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
// `;

// const StyledRow = styled(CommonRow)`
//   padding: 1.2rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const StyledBody = styled.section`
//   margin: 0.4rem 0;
// `;

// const Footer = styled.footer`
//   background-color: var(--color-grey-50);
//   display: flex;
//   justify-content: center;
//   padding: 1.2rem;

//   /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
//   &:not(:has(*)) {
//     display: none;
//   }
// `;

// const Empty = styled.p`
//   font-size: 1.6rem;
//   font-weight: 500;
//   text-align: center;
//   margin: 2.4rem;
// `;

// const TableContext = createContext();

// function Table({ columns, children }) {//the columns props is used as a context for the childe componet and it is the css rule wich describe how much columne we create
//   return (
//     <TableContext.Provider value={{ columns }}>
//       <StyledTable role="table">{children}</StyledTable>
//     </TableContext.Provider>
//   );
// }

// function Header({ children }) {
//   const { columns } = useContext(TableContext);
//   return (
//     <StyledHeader role="row" columns={columns} as="header">{/*here the columns is passed form parent comont to the diret childe and the dircet chile pass them to thir own childe the important of the context api . i say this because the columns props is passed only for the Tabel comopnet and it can provide to the context and the n the Rows and header comopnet acess them by consuming the context */}
//       {children}
//     </StyledHeader>
//   );
// }
// function Row({ children }) {
//   const { columns } = useContext(TableContext);
//   return (
//     <StyledRow role="row" columns={columns}>
//       {children}
//     </StyledRow>
//   );
// }

// function Body({ data, render }) {//in this body we impliment the render props now this Body componet don't know what thing it render  it understood by the "render " props
//   if (!data.length) return <Empty>No data to show at the moment</Empty>;

//   return <StyledBody>{data.map(render)}</StyledBody>;
// }

// Table.Header = Header;
// Table.Body = Body;
// Table.Row = Row;
// Table.Footer = Footer;

// export default Table;
/* eslint-disable */
/**
 * ESLint is disabled for this file to allow flexibility in coding styles and avoid interruptions caused by linting rules.
 * Specifically, it is useful when:
 * - You are developing and testing quickly without worrying about linting errors.
 * - You want to bypass rules for non-standard practices that are intentional.
 * Note: Use this with caution, as it disables linting for the entire file, which may hide critical errors.
 */

import { createContext, useContext } from "react";
import styled from "styled-components";

/**
 * StyledTable
 * - Creates a styled container for the table with consistent design rules.
 * - Includes border, font styling, background color, and rounded corners.
 */
const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

/**
 * CommonRow
 * - A reusable styled component for rows in the table.
 * - Accepts a `columns` prop to dynamically define grid layout based on CSS grid-template-columns.
 */
const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

/**
 * StyledHeader
 * - Extends CommonRow with styles for the header row of the table.
 * - Adds padding, background color, border, and text styles.
 */
const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

/**
 * StyledRow
 * - Extends CommonRow for data rows.
 * - Adds padding and a bottom border for rows except the last one.
 */
const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

/**
 * StyledBody
 * - Wraps the body of the table, adding spacing between rows.
 */
const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

/**
 * Footer
 * - Styled component for the table footer.
 * - Hides the footer when it contains no child elements using the parent selector `:has`.
 */
const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

/**
 * Empty
 * - Displays a message when the table has no data.
 */
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// Context to share table column configuration with child components
const TableContext = createContext();

/**
 * Table
 * - Provides a flexible and reusable table component.
 * - Uses React Context API to share the `columns` prop with its child components.
 *
 * @param {string} columns - Defines the grid layout for table rows.
 * @param {React.ReactNode} children - The content of the table.
 */
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

/**
 * Header
 * - Represents the table header row.
 * - Consumes the `columns` value from the context to define its layout.
 *
 * @param {React.ReactNode} children - The content of the header row.
 */
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

/**
 * Row
 * - Represents a single data row in the table.
 * - Consumes the `columns` value from the context to define its layout.
 *
 * @param {React.ReactNode} children - The content of the row.
 */
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

/**
 * Body
 * - Represents the body of the table.
 * - Uses a render props pattern to dynamically render rows based on the data provided.
 *
 * @param {Array} data - The array of data to render.
 * @param {Function} render - A function that defines how each data item should be rendered.
 */
function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

// Attach components to the Table object for easy access
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
