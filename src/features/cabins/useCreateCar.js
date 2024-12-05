import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCar } from "../../services/apiCars";
import { toast } from "react-hot-toast";


export function useCreateCars(){
    const queryClient = useQueryClient();

    const {mutate:createCar, isLoading: isCreating}= useMutation({
        mutationFn:createEditCar,
        onSuccess:()=>{
            toast.success("Ne car is succesfully created");
            queryClient.invalidateQueries({queryKey:["cars"]})
        },
        onError:(err)=>toast.error(err.message),

    })
    return {isCreating, createCar}
}