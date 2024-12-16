/**
 * Component for managing the check-in process of a booking.
 * 
 * This component handles:
 * - Displaying booking details for guests.
 * - Adding optional extras (like breakfast) to the booking.
 * - Confirming payment from the guest.
 * - Finalizing the check-in process.
 * 
 * Dependencies:
 * - `styled-components` for styling.
 * - Reusable UI components like `Row`, `Heading`, `Button`, and `Checkbox`.
 * - Custom hooks for fetching data, navigating, and handling updates.
 * 
 * **Functional Breakdown:**
 * - **State Management**:
 *   - `confirmPaid`: Tracks whether the payment is confirmed.
 *   - `addBreakfast`: Tracks whether the guest wants to add breakfast.
 * - **Hooks**:
 *   - `useBooking`: Retrieves the current booking data.
 *   - `useSetting`: Fetches global settings (e.g., breakfast pricing).
 *   - `useMoveBack`: Handles navigation back to the previous screen.
 *   - `useCheckin`: Handles the process of checking in the booking.
 */

import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Styled container for displaying optional sections */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

/**
 * Main functional component for the Check-in Booking page.
 * 
 * @returns {JSX.Element} Renders the check-in interface for bookings.
 */
function CheckinBooking() {
  /**
   * State: Tracks whether the guest's payment is confirmed.
   * Default value is based on the `isPaid` property from the booking data (false if not provided).
   */
  const [confirmPaid, setConfirmPaid] = useState(false);

  /**
   * State: Tracks whether the guest wants to add breakfast to the booking.
   * Defaults to `false` (breakfast is not added by default).
   */
  const [addBreakfast, setAddBreakfast] = useState(false);

  /**
   * Hook: Fetches the current booking data.
   * - `booking`: Contains the details of the booking (e.g., guest name, payment status, etc.).
   * - `isLoading`: Indicates if the booking data is still being fetched.
   */
  const { booking, isLoading } = useBooking();

  /**
   * Hook: Fetches global settings related to bookings.
   * - `setting`: Contains system-wide settings (e.g., pricing for optional extras like breakfast).
   * - `isLoadingSettings`: Indicates if the settings are still being fetched.
   */
  const { setting, isLoading: isLoadingSettings } = useSetting();

  /**
   * Effect: Automatically updates the `confirmPaid` state when booking data is loaded.
   * - If the `isPaid` property exists in the booking, `confirmPaid` is set to its value.
   */
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  /**
   * Hook: Provides a function to navigate back to the previous screen.
   */
  const moveBack = useMoveBack();

  /**
   * Hook: Handles the logic for checking in a booking.
   * - `checkin`: Function to perform the check-in (updates the booking with any changes).
   * - `isCheckingIn`: Indicates if the check-in process is currently in progress.
   */
  const { checkin, isCheckingIn } = useCheckin();

  /**
   * Loading Spinner:
   * - Displays a spinner while booking data or settings are still being fetched.
   */
  if (isLoading || isLoadingSettings) return <Spinner />;

  /**
   * Destructure necessary fields from the booking object for easier access.
   */
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  /**
   * Calculate the optional breakfast price based on:
   * - The system's `driverPrice` setting (price per person per night).
   * - The number of nights in the booking.
   * - The number of guests staying.
   */
  const optionalBreakfastPrice = setting.driverPrice * numNights * numGuests;

  /**
   * Function: Handles the check-in process when the user clicks the "Check in" button.
   * 
   * Logic:
   * - Ensures payment is confirmed (`confirmPaid` must be `true`).
   * - If breakfast is added, updates the booking with the additional cost and breakfast details.
   * - If breakfast is not added, updates the booking without modifying the price.
   */
  function handleCheckin() {
    if (!confirmPaid) return; // Do nothing if payment is not confirmed.

    if (addBreakfast) {
      // Check-in with breakfast added.
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      // Check-in without adding breakfast.
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      {/* Header: Displays booking ID and a back button */}
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {/* Booking Details: Displays detailed booking information */}
      <BookingDataBox booking={booking} />

      {/* Optional Breakfast Section:
          Allows the user to add breakfast to the booking if it was not pre-selected. */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add); // Toggle the `addBreakfast` state.
              setConfirmPaid(false); // Reset the payment confirmation.
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      {/* Payment Confirmation Section:
          Ensures the user confirms that the guest has paid the full amount. */}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)} // Toggle the `confirmPaid` state.
          disabled={confirmPaid || isCheckingIn} // Disable checkbox if payment is confirmed or check-in is in progress.
          id="confirm"
        >
          I confirm that {booking.renters.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice) // Display total price without breakfast.
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`} {/* Display detailed breakdown if breakfast is added */}
        </Checkbox>
      </Box>

      {/* Action Buttons:
          - Check-in button: Disabled if payment is not confirmed or check-in is in progress.
          - Back button: Navigates back to the previous screen. */}
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
