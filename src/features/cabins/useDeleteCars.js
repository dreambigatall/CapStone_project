import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar as deleteCarApi } from "../../services/apiCars";
import { toast } from "react-hot-toast";
export function useDeleteCar(){
    const queryClient = useQueryClient();
    
    const {isLoading:isLoadingToDelete,mutate:deleteCar}=useMutation({
        mutationFn:deleteCarApi,
        onSuccess:()=>{
            toast.success("car successfully deleted");
            queryClient.invalidateQueries({
                queryKey:["cars"]
            })
        },
        onError:(err)=>toast.error(err.message)

    })

    return {isLoadingToDelete,deleteCar};
}