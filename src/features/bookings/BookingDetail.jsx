import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useDeleteBooking } from "../check-in-out/useDeleting";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking, isLoading} = useBooking();
  const navigate = useNavigate();
  const {checkout,isCheckingOut} = useCheckout();
   const {deleteBookings, isLoadingToDeleteBooking}= useDeleteBooking();
 console.log(booking)

  const moveBack = useMoveBack();
  if(isLoading) return <Spinner/>
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>{booking.status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>

        

       {
       booking.status === 'unconfirmed' && <Button  onClick={()=>navigate(`/checkin/${booking.id}`)}>
                 
                 chekd in
                 </Button>
        }

       {booking.status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(booking.id)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

<Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isLoadingToDeleteBooking}
              onConfirm={() =>
                deleteBookings(booking.id, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
