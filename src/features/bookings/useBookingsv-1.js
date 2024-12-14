import { useQuery } from "@tanstack/react-query";
import { getBookingss } from "../../services/apiBookings";

export function useBookingss(){
    const {isLoading,
        data:bookings,
    
    }=useQuery({
        queryKey:["bookings"],
        queryFn:getBookingss,
    })

    return {isLoading, bookings};
}