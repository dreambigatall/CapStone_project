import supabase from "./supabase";

export async function fetchChatData(){

    const {data, error} = await supabase.from("chat").select('*');

    if(error){
        console.log(error);
        throw new Error("Cabines could not loaded")
    }
    return data;
}

export async function fetchUserData(userIds) {
    const { data, error } = await supabase
      .from("auth.users")
      .select("*")
      .in("id", userIds);
  
    if (error) {
      throw new Error("Error fetching user data: " + error.message);
    }
  
    return data;
  }
  
  export async function writeChatMessage(message) {
    const { data, error } = await supabase.from("chat").insert(message);
  
    if (error) {
      throw new Error("Error writing chat message: " + error.message);
    }
  
    return data;
  }