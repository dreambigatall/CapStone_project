import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting  as updateSettingApi} from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting(){
    const queryClient=useQueryClient();

    const{isLoading:isUpdatting, mutate:updateSetting}= useMutation({
        mutationFn:updateSettingApi,
        onSuccess:()=>{
            toast.success("Setting is successfuly update");
            queryClient.invalidateQueries({queryKey:["setting"]});

        },
        onError:(err)=>toast.error(err.message),
    })

    return {isUpdatting,updateSetting}
}