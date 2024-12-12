// import { cloneElement, createContext, useContext, useState } from "react";
// import { createPortal } from "react-dom";
// import { HiXMark } from "react-icons/hi2";
// import styled from "styled-components";
// import { useOutsideClick } from "../hooks/useOutsideClick";

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: var(--backdrop-color);
//   backdrop-filter: blur(4px);
//   z-index: 1000;
//   transition: all 0.5s;
// `;

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;

// const ModalContext = createContext();

// function Modal({ children }) {
//   const [openName, setOpenName] = useState("");

//   const close = () => setOpenName("");//the close method is used to make the openName stat into empty string
//   const open = setOpenName;//this just set the openName to the name we pass to the Modal.Open "open" props

//   return (
//     <ModalContext.Provider value={{ openName, close, open }}>
//       {children}
//     </ModalContext.Provider>
//   );
// }

// function Open({ children, opens: opensWindowName }) {
//   const { open } = useContext(ModalContext);

//   return cloneElement(children, { onClick: () => open(opensWindowName) }); {/*in this the elemnt inside this Modal.Open comonet we dont pass the function wich open the modal to that we use the cloneElement  wich clone the elemnt and pass a props of onclick and e pass the method with ther uniq name  */}
// }

// function Window({ children, name }) {
//   const { openName, close } = useContext(ModalContext);
//   const ref = useOutsideClick(close);

//   if (name !== openName) return null;

//   return createPortal(
//     <Overlay>
//       <StyledModal ref={ref}>
//         <Button onClick={close}>
//           <HiXMark />
//         </Button>

//         <div>{cloneElement(children, { onCloseModal: close })}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

// Modal.Open = Open;
// Modal.Window = Window;

// export default Modal;

/************************************************************************************************** */

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick"; // Custom hook to detect clicks outside the modal

// Styled component for the modal container
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

// Styled component for the backdrop overlay
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px); // Adds a blur effect to the backdrop
  z-index: 1000;
  transition: all 0.5s;
`;

// Styled component for the close button
const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100); // Changes background on hover
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500); // Sets icon color
  }
`;

// Context to manage the modal state
const ModalContext = createContext();

/**
 * Modal Component
 * Provides a context to manage which modal is open and provides functions to open/close it.
 */
function Modal({ children }) {
  const [openName, setOpenName] = useState(""); // Tracks the currently opened modal by name

  // Function to close the modal (sets openName to an empty string)
  const close = () => setOpenName("");

  // Function to open a modal (sets openName to the provided name)
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

/**
 * Modal.Open
 * A wrapper component that triggers opening a modal when clicked.
 * Uses `cloneElement` to dynamically add an `onClick` handler to the child element.
 */
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) }); 
  // Clones the child element and adds an `onClick` handler to open the modal
}

/**
 * Modal.Window
 * Represents the modal content and manages its visibility based on the modal's `openName`.
 * Uses `createPortal` to render the modal outside the normal DOM hierarchy.
 */
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext); // Get modal state and close function from context
  const ref = useOutsideClick(close); // Detect clicks outside the modal to trigger the close function

  // Renders nothing if the current modal is not open
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        {/* Close button inside the modal */}
        <Button onClick={close}>
          <HiXMark />
        </Button>

        {/* Renders the modal's children and provides an `onCloseModal` prop */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body // Renders the modal content directly into the body for proper layering
  );
}

// Attach the subcomponents to the main Modal component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;



/**
 * Modal Component for React
 * 
 * This code defines a reusable `Modal` component and its subcomponents using React, styled-components, 
 * and utility hooks to manage modal dialogs in an application. The modal includes a backdrop, a close button, 
 * and provides a context-based API for controlling modal state.
 * 
 * Components:
 * - `Modal`: The main context provider for managing the modal state. It holds `openName` (state) to track 
 *   which modal is currently open and provides `open` and `close` functions for managing modal visibility.
 * - `Modal.Open`: A wrapper for any element that should trigger the modal. It uses `cloneElement` to pass an 
 *   `onClick` handler dynamically to the child element, enabling the modal to open with a specific name.
 * - `Modal.Window`: Represents the modal content. It listens for changes to `openName` in the context to decide 
 *   whether it should render. It also uses a custom `useOutsideClick` hook to close the modal when clicking 
 *   outside the content.
 * 
 * Utility:
 * - `StyledModal`: Styled modal content with fixed positioning, padding, and transitions.
 * - `Overlay`: Styled backdrop with blur and background color for the modal.
 * - `Button`: Close button with hover effects, styled using styled-components.
 * 
 * Dependencies:
 * - `react`, `react-dom` for React core functionalities and portals.
 * - `styled-components` for styling modal components.
 * - `react-icons` for providing scalable vector icons (HiXMark used as the close button icon).
 * - `useOutsideClick` (custom hook): Handles clicks outside the modal content to close it.
 * 
 * Example Usage:
 * ```
 * <Modal>
 *   <Modal.Open opens="exampleModal">
 *     <button>Open Modal</button>
 *   </Modal.Open>
 *   <Modal.Window name="exampleModal">
 *     <div>Modal Content Here</div>
 *   </Modal.Window>
 * </Modal>
 * ```
 * 
 * Key Notes:
 * - The `Modal` component uses React's context API to manage state globally for all modal instances within its scope.
 * - `cloneElement` ensures that child elements receive necessary event handlers dynamically, avoiding manual wiring.
 * - The modal uses React Portals (`createPortal`) to render the modal and backdrop outside the DOM hierarchy, ensuring 
 *   proper layering.
 * 
 * Authors can customize modal styling via the styled-components defined here or extend functionality by 
 * modifying the `Modal` context.
 */
