import { useQuery } from "@tanstack/react-query";
import { fetchChatData, fetchUserData } from "../../services/apiChat";

export function useChatWithUsers() {
    const { data: chatData, isLoading: isChatLoading, error: chatError } = useQuery(
      ["chatData"],
      fetchChatData
    );
   return {
      chatWithUsers: chatData,
      isLoading: isChatLoading,
      error: chatError,
    };
}