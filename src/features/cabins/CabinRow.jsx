// import styled from "styled-components";

// import CreateCabinForm from "./CreateCabinForm";
// //import { useDeleteCabin } from "./useDeleteCabin";

// import { formatCurrency } from "../../utils/helpers";
// import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
// import { useDeleteCar } from "./useDeleteCars";

// //import { useCreateCabin } from "./useCreateCabin";
// import { useCreateCars } from "./useCreateCar";

// import Modal from "../../ui/Modal";
// import ConfirmDelete from "../../ui/ConfirmDelete";
// import Table from "../../ui/Table";
// import Menus from "../../ui/Menus";

// // const TableRow = styled.div`
// //   display: grid;
// //   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
// //   column-gap: 2.4rem;
// //   align-items: center;
// //   padding: 1.4rem 2.4rem;

// //   &:not(:last-child) {
// //     border-bottom: 1px solid var(--color-grey-100);
// //   }
// // `;

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;

// const Price = styled.div`
//   font-family: "Sono";
//   font-weight: 600;
// `;

// const Discount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
//   color: var(--color-green-700);
// `;

// function CabinRow({ cabin }) {
//   const { isLoadingToDelete,deleteCar } = useDeleteCar();
//   const { isCreating, createCar } = useCreateCars();
//  // const {isCreating,createCar}=useCreateCars();

//   // const {
//   //   id: cabinId,
//   //   name,
//   //   maxCapacity,
//   //   regularPrice,
//   //   discount,
//   //   image,
//   //   description,
//   // } = cabin;
//   const {
//     id: cabinId,
//     name,
//     maxCapcity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin;

//   function handleDuplicate() {
//     createCar({
//       name: `Copy of ${name}`,
//       maxCapcity,
//       regularPrice,
//       discount,
      
//       image,
      
//     });
//   }

//   return (
//     <Table.Row>
//       <Img src={image} />
//       <Cabin>{name}</Cabin>
//       <div>Fits up to {maxCapcity} guests</div>
//       <Price>{formatCurrency(regularPrice)}</Price>
//       {discount ? (
//         <Discount>{formatCurrency(discount)}</Discount>
//       ) : (
//         <span>&mdash;</span>
//       )}
//       <div>
//         <Modal>
//           <Menus.Menu>
//             <Menus.Toggle id={cabinId} />

//             <Menus.List id={cabinId}>
//               <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
//                 Duplicate
//               </Menus.Button>

//               <Modal.Open opens="edit">
//                 <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
//               </Modal.Open>

//               <Modal.Open opens="delete">
//                 <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
//               </Modal.Open>
//             </Menus.List>

//             <Modal.Window name="edit">
//               <CreateCabinForm cabinToEdit={cabin} />
//             </Modal.Window>

//             <Modal.Window name="delete">
//               <ConfirmDelete
//                 resourceName="car"
//                 disabled={isLoadingToDelete}
//                 onConfirm={() => deleteCar(cabinId)}
//               />
//             </Modal.Window>
//           </Menus.Menu>
//         </Modal>
//       </div>
//     </Table.Row>
//   );
// }

// export default CabinRow;

// import React, { useState } from "react";
// import styled from "styled-components";
// import Modal from "../../ui/Modal";
// import { formatCurrency } from "../../utils/helpers";
// import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
// import { useDeleteCar } from "./useDeleteCars";
// import { useCreateCars } from "./useCreateCar";
// import ConfirmDelete from "../../ui/ConfirmDelete";
// import Table from "../../ui/Table";
// import Menus from "../../ui/Menus";
// import CreateCabinForm from "./CreateCabinForm";

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
//   cursor: pointer;
// `;

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;

// const Price = styled.div`
//   font-family: "Sono";
//   font-weight: 600;
// `;

// const Discount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
//   color: var(--color-green-700);
// `;

// function CabinRow({ cabin }) {
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const { isLoadingToDelete, deleteCar } = useDeleteCar();
//   const { isCreating, createCar } = useCreateCars();

//   const {
//     id: cabinId,
//     name,
//     maxCapcity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin;

//   function handleDuplicate() {
//     createCar({
//       name: `Copy of ${name}`,
//       maxCapcity,
//       regularPrice,
//       discount,
//       image,
//     });
//   }

//   function handleImageClick() {
//     setIsImageModalOpen(true);
//   }

//   function closeImageModal() {
//     setIsImageModalOpen(false);
//   }

//   return (
//     <Table.Row>
//       {/* Clickable Image */}
//       <Img src={image} alt={name} onClick={handleImageClick} />
//       <Cabin>{name}</Cabin>
//       <div>Fits up to {maxCapcity} guests</div>
//       <Price>{formatCurrency(regularPrice)}</Price>
//       {discount ? (
//         <Discount>{formatCurrency(discount)}</Discount>
//       ) : (
//         <span>&mdash;</span>
//       )}
//       <div>
//         <Modal>
//           <Menus.Menu>
//             <Menus.Toggle id={cabinId} />

//             <Menus.List id={cabinId}>
//               <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
//                 Duplicate
//               </Menus.Button>

//               <Modal.Open opens="edit">
//                 <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
//               </Modal.Open>

//               <Modal.Open opens="delete">
//                 <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
//               </Modal.Open>
//             </Menus.List>

//             <Modal.Window name="edit">
//               <CreateCabinForm cabinToEdit={cabin} />
//             </Modal.Window>

//             <Modal.Window name="delete">
//               <ConfirmDelete
//                 resourceName="car"
//                 disabled={isLoadingToDelete}
//                 onConfirm={() => deleteCar(cabinId)}
//               />
//             </Modal.Window>
//           </Menus.Menu>
//         </Modal>
//       </div>

//       {/* Modal for Image Preview */}
//       {isImageModalOpen && (
//         <Modal>
//           <Modal.Window>
//             <img src={image} alt={name} style={{ maxWidth: "100%" }} />
//             <button onClick={closeImageModal}>Close</button>
//           </Modal.Window>
//         </Modal>
//       )}
//     </Table.Row>
//   );
// }

// export default CabinRow;
/* eslint-disable */

import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDeleteCar } from "./useDeleteCars";
import { useCreateCars } from "./useCreateCar";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CreateCabinForm from "./CreateCabinForm";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  cursor: pointer;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isLoadingToDelete, deleteCar } = useDeleteCar();
  const { isCreating, createCar } = useCreateCars();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCar({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }

  return (
    <Table.Row>
      {/* Clickable Image */}
      <Modal>
        <Modal.Open opens="imagePreview">
          <Img src={image} alt={name} />
        </Modal.Open>

        <Modal.Window name="imagePreview">
          <img
            src={image}
            alt={name}
            style={{  borderRadius: "var(--border-radius-lg)",  }}
          />
        </Modal.Window>
      </Modal>

      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} Tone</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="car"
                disabled={isLoadingToDelete}
                onConfirm={() => deleteCar(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
