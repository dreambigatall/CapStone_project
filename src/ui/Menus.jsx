// /* eslint-disable */

// import { createContext, useContext, useState } from "react";
// import { createPortal } from "react-dom";
// import { HiEllipsisVertical } from "react-icons/hi2";
// import styled from "styled-components";
// import { useOutsideClick } from "../hooks/useOutsideClick";

// const Menu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const StyledToggle = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-700);
//   }
// `;

// const StyledList = styled.ul`
//   position: fixed;

//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-md);
//   border-radius: var(--border-radius-md);

//   right: ${(props) => props.position.x}px;
//   top: ${(props) => props.position.y}px;
// `;

// const StyledButton = styled.button`
//   width: 100%;
//   text-align: left;
//   background: none;
//   border: none;
//   padding: 1.2rem 2.4rem;
//   font-size: 1.4rem;
//   transition: all 0.2s;

//   display: flex;
//   align-items: center;
//   gap: 1.6rem;

//   &:hover {
//     background-color: var(--color-grey-50);
//   }

//   & svg {
//     width: 1.6rem;
//     height: 1.6rem;
//     color: var(--color-grey-400);
//     transition: all 0.3s;
//   }
// `;

// const MenusContext = createContext();

// function Menus({ children }) {
//   const [openId, setOpenId] = useState("");
//   const [position, setPosition] = useState(null);

//   const close = () => setOpenId("");
//   const open = setOpenId;

//   return (
//     <MenusContext.Provider
//       value={{ openId, close, open, position, setPosition }}
//     >
//       {children}
//     </MenusContext.Provider>
//   );
// }

// function Toggle({ id }) {//this componet is used to open or to toggle the list of menu wich connect withe "List" commonet by thir id
//   const { openId, close, open, setPosition } = useContext(MenusContext);

//   function handleClick(e) {
//     const rect = e.target.closest("button").getBoundingClientRect();
//     setPosition({
//       x: window.innerWidth - rect.width - rect.x,
//       y: rect.y + rect.height + 8,
//     });

//     openId === "" || openId !== id ? open(id) : close();
//   }

//   return (
//     <StyledToggle onClick={handleClick}>
//       <HiEllipsisVertical />
//     </StyledToggle>
//   );
// }

// function List({ id, children }) {
//   const { openId, position, close } = useContext(MenusContext);
//   const ref = useOutsideClick(close);

//   if (openId !== id) return null;

//   return createPortal(
//     <StyledList position={position} ref={ref}>
//       {children}
//     </StyledList>,
//     document.body
//   );
// }

// function Button({ children, icon, onClick }) {
//   const { close } = useContext(MenusContext);

//   function handleClick() {
//     onClick?.();
//     close();
//   }

//   return (
//     <li>
//       <StyledButton onClick={handleClick}>
//         {icon}
//         <span>{children}</span>
//       </StyledButton>
//     </li>
//   );
// }

// Menus.Menu = Menu;
// Menus.Toggle = Toggle;
// Menus.List = List;
// Menus.Button = Button;

// export default Menus;

/* eslint-disable */

// Importing necessary libraries and hooks
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2"; // For the toggle icon
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick"; // Custom hook for detecting clicks outside an element

// Styled components for styling menu elements
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// Context to manage the state of the menus
const MenusContext = createContext();

/**
 * `Menus` component provides context for managing the state of multiple menus.
 * It allows opening, closing, and tracking the position of menus dynamically.
 */
function Menus({ children }) {
  const [openId, setOpenId] = useState(""); // Tracks the ID of the currently open menu
  const [position, setPosition] = useState(null); // Tracks the position of the open menu

  const close = () => setOpenId(""); // Closes the menu
  const open = setOpenId; // Opens the menu with a specific ID

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

/**
 * `Toggle` component toggles the menu visibility.
 * It calculates the menu's position dynamically and links the menu with its ID.
 */
function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

/**
 * `List` component renders the dropdown menu.
 * It uses the `useOutsideClick` hook to close the menu when clicking outside.
 */
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close); // Closes menu when clicking outside

  if (openId !== id) return null; // Renders nothing if the menu is not active

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

/**
 * `Button` component represents an individual menu item.
 * It handles clicks and closes the menu after an action.
 */
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.(); // Executes the passed onClick function
    close(); // Closes the menu
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// Exporting individual components as properties of `Menus`
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;




//-----------------------------------------------------------///
//Example usage of the above compound commponet :

// Importing the Menus component and icons for menu items
//import Menus from "./Menus";
//import { HiTrash, HiPencil } from "react-icons/hi2";

// function App() {
//   return (
//     <Menus>
//       {/* Wrapping everything inside the Menus context */}
//       <Menus.Menu>
//         {/* Menu toggle button to open or close the dropdown menu */}
//         <Menus.Toggle id="menu1" /> {/* Toggles menu1 using the provided ID */}

//         {/* Dropdown menu that opens when the toggle is clicked */}
//         <Menus.List id="menu1">
//           {/* Menu button for the "Edit" action */}
//           <Menus.Button
//             icon={<HiPencil />} // Icon for the "Edit" button
//             onClick={() => console.log("Edit")} // Action to perform on click
//           >
//             Edit {/* Label for the "Edit" button */}
//           </Menus.Button>

//           {/* Menu button for the "Delete" action */}
//           <Menus.Button
//             icon={<HiTrash />} // Icon for the "Delete" button
//             onClick={() => console.log("Delete")} // Action to perform on click
//           >
//             Delete {/* Label for the "Delete" button */}
//           </Menus.Button>
//         </Menus.List>
//       </Menus.Menu>
//     </Menus>
//   );
// }

// export default App;


 