import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting(){
    const{data:setting, isLoading, error} = useQuery({
        queryFn:getSettings,
        queryKey:['setting']
    })

    return {setting, isLoading, error};
}