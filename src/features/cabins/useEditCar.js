import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCar } from "../../services/apiCars";
import { toast } from "react-toast";

export function useEditCar(){
    const queryClient= useQueryClient();

    const {mutate:editCar, isLoading:isEditing}= useMutation({
         mutationFn:({newCarData, id})=>createEditCar(newCarData,id),
         onSuccess:()=>{
            toast.success("Cabin sucessfully edited");
            queryClient.invalidateQueries({queryKey:["cars"]})
         },
         onError:(err)=>toast.error(err.message),
    })
    return {isEditing, editCar}
}