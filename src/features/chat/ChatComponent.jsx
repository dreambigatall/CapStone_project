// import supabase from "../../services/supabase";
// import React, { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// function ChatApp() {
//   const queryClient = useQueryClient();
//   const [message, setMessage] = useState("");
//   const [editMode, setEditMode] = useState({ active: false, messageId: null });

//   // Fetch chat messages
//   const { data: messages, isLoading, error } = useQuery(["chatMessages"], async () => {
//     const { data, error } = await supabase
//       .from("chat")
//       .select("*")
//       .order("created_at", { ascending: true });

//     if (error) throw new Error("Error fetching chat messages: " + error.message);
//     return data;
//   });

//   // Real-time updates
//   useEffect(() => {
//     const subscription = supabase
//       .channel("public:chat")
//       .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat" }, (payload) => {
//         queryClient.setQueryData(["chatMessages"], (oldMessages) => [
//           ...(oldMessages || []),
//           payload.new,
//         ]);
//       })
//       .on("postgres_changes", { event: "DELETE", schema: "public", table: "chat" }, (payload) => {
//         queryClient.setQueryData(["chatMessages"], (oldMessages) =>
//           (oldMessages || []).filter((msg) => msg.id !== payload.old.id)
//         );
//       })
//       .on("postgres_changes", { event: "UPDATE", schema: "public", table: "chat" }, (payload) => {
//         queryClient.setQueryData(["chatMessages"], (oldMessages) =>
//           (oldMessages || []).map((msg) => (msg.id === payload.new.id ? payload.new : msg))
//         );
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(subscription);
//     };
//   }, [queryClient]);

//   // Send a message
//   const sendMessage = useMutation({
//     mutationFn: async (newMessage) => {
//       const { data, error } = await supabase
//         .from("chat")
//         .insert([{ message: newMessage, user_id: null }])
//         .select();

//       if (error) throw new Error("Error sending message: " + error.message);
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["chatMessages"]);
//     },
//   });

//   // Edit a message
//   const editMessage = useMutation({
//     mutationFn: async ({ id, updatedMessage }) => {
//       const { data, error } = await supabase
//         .from("chat")
//         .update({ message: updatedMessage })
//         .eq("id", id)
//         .select();

//       if (error) throw new Error("Error updating message: " + error.message);
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["chatMessages"]);
//     },
//   });

//   // Delete a message
//   const deleteMessage = useMutation({
//     mutationFn: async (id) => {
//       const { error } = await supabase.from("chat").delete().eq("id", id);
//       if (error) throw new Error("Error deleting message: " + error.message);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["chatMessages"]);
//     },
//   });

//   // Handle send message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     if (editMode.active) {
//       await editMessage.mutateAsync({ id: editMode.messageId, updatedMessage: message });
//       setEditMode({ active: false, messageId: null });
//     } else {
//       await sendMessage.mutateAsync(message);
//     }

//     setMessage(""); // Clear the input field
//   };

//   // Handle edit button click
//   const handleEdit = (msg) => {
//     setEditMode({ active: true, messageId: msg.id });
//     setMessage(msg.message); // Populate the input field with the existing message
//   };

//   // Handle delete button click
//   const handleDelete = async (id) => {
//     await deleteMessage.mutateAsync(id);
//   };

//   if (isLoading) return <div className="text-center mt-10">Loading...</div>;
//   if (error) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-blue-300">
//       <header className="text-center bg-blue-600 text-white py-4 shadow-md">
//         <h1 className="text-2xl font-bold">Annaouncment</h1>
//       </header>

//       <main className="flex-1 overflow-y-auto p-4">
//         <div className="space-y-4">
//           {messages?.map((msg) => (
//             <div
//               key={msg.id}
//               className="p-4 rounded-lg shadow-md bg-white border border-gray-200"
//             >
//               <div className="flex justify-between items-center">
//                 <strong className="text-blue-800">{msg.user_id ? `User ${msg.user_id}` : "Anonymous"}</strong>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleEdit(msg)}
//                     className="text-sm text-yellow-500 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(msg.id)}
//                     className="text-sm text-red-500 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//               <p className="text-gray-800 mt-2">{msg.message}</p>
//               <small className="text-gray-500">{new Date(msg.created_at).toLocaleString()}</small>
//             </div>
//           ))}
//         </div>
//       </main>

//       <footer className="sticky bottom-0 bg-white shadow-lg p-4 border-t border-gray-300">
//         <form onSubmit={handleSendMessage} className="flex">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder={editMode.active ? "Editing your message..." : "Type your message..."}
//             className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="px-6 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
//           >
//             {editMode.active ? "Update" : "Send"}
//           </button>
//         </form>
//       </footer>
//     </div>
//   );
// }

// export default ChatApp;

// import supabase from "../../services/supabase";
// import React, { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// //import { getCurrentUser } from "../../services/auth"; // Import your getCurrentUser function
// import { getCurrentUser } from "../../services/apiAuth";

// function ChatApp() {
//   const queryClient = useQueryClient();
//   const [message, setMessage] = useState("");
//   const [editMode, setEditMode] = useState({ active: false, messageId: null });
//   const [user, setUser] = useState(null); // Store the authenticated user's details

//   // Fetch the authenticated user on load
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const currentUser = await getCurrentUser();
//         setUser(currentUser); // Save the user object (id and fullName) in state
//       } catch (error) {
//         console.error("Failed to fetch user:", error.message);
//       }
//     }
//     fetchUser();
//   }, []);

//   // Fetch chat messages
//   const { data: messages, isLoading, error } = useQuery(["chatMessages"], async () => {
//     const { data, error } = await supabase
//       .from("chat")
//       .select("*")
//       .order("created_at", { ascending: true });

//     if (error) throw new Error("Error fetching chat messages: " + error.message);
//     return data;
//   });

//   // Real-time updates
//   useEffect(() => {
//     const subscription = supabase
//       .channel("public:chat")
//       .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat" }, (payload) => {
//         queryClient.setQueryData(["chatMessages"], (oldMessages) => [
//           ...(oldMessages || []),
//           payload.new,
//         ]);
//       })
//       .on("postgres_changes", { event: "DELETE", schema: "public", table: "chat" }, (payload) => {
//         queryClient.setQueryData(["chatMessages"], (oldMessages) =>
//           (oldMessages || []).filter((msg) => msg.id !== payload.old.id)
//         );
//       })
//       .on("postgres_changes", { event: "UPDATE", schema: "public", table: "chat" }, (payload) => {
//         queryClient.setQueryData(["chatMessages"], (oldMessages) =>
//           (oldMessages || []).map((msg) => (msg.id === payload.new.id ? payload.new : msg))
//         );
//       })
//       .subscribe();

//     return () => {
//       supabase.removeChannel(subscription);
//     };
//   }, [queryClient]);

//   // Send a message
//   const sendMessage = useMutation({
//     mutationFn: async (newMessage) => {
//       const { data, error } = await supabase
//         .from("chat")
//         .insert([{ message: newMessage, user_id: user?.id, user_name: user?.user_metadata?.fullName }]) // Include user_id and user_name
//         .select();

//       if (error) throw new Error("Error sending message: " + error.message);
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["chatMessages"]);
//     },
//   });

//   // Edit a message
//   const editMessage = useMutation({
//     mutationFn: async ({ id, updatedMessage }) => {
//       const { data, error } = await supabase
//         .from("chat")
//         .update({ message: updatedMessage })
//         .eq("id", id)
//         .select();

//       if (error) throw new Error("Error updating message: " + error.message);
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["chatMessages"]);
//     },
//   });

//   // Delete a message
//   const deleteMessage = useMutation({
//     mutationFn: async (id) => {
//       const { error } = await supabase.from("chat").delete().eq("id", id);
//       if (error) throw new Error("Error deleting message: " + error.message);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["chatMessages"]);
//     },
//   });

//   // Handle send message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     if (editMode.active) {
//       await editMessage.mutateAsync({ id: editMode.messageId, updatedMessage: message });
//       setEditMode({ active: false, messageId: null });
//     } else {
//       await sendMessage.mutateAsync(message);
//     }

//     setMessage(""); // Clear the input field
//   };

//   // Handle edit button click
//   const handleEdit = (msg) => {
//     setEditMode({ active: true, messageId: msg.id });
//     setMessage(msg.message); // Populate the input field with the existing message
//   };

//   // Handle delete button click
//   const handleDelete = async (id) => {
//     await deleteMessage.mutateAsync(id);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-blue-300">
//       <header className="text-center bg-blue-600 text-white py-4 shadow-md">
//         <h1 className="text-2xl font-bold">Chat Application</h1>
//       </header>

//       <main className="flex-1 overflow-y-auto p-4">
//         <div className="space-y-4">
//           {messages?.map((msg) => (
//             <div
//               key={msg.id}
//               className="p-4 rounded-lg shadow-md bg-white border border-gray-200"
//             >
//               <div className="flex justify-between items-center">
//                 <strong className="text-blue-800">
//                   {msg.user_name ? msg.user_name : "Anonymous"}
//                 </strong>
//                 <div className="space-x-2">
//                   {msg.user_id === user?.id && ( // Only allow edit/delete for the logged-in user's messages
//                     <>
//                       <button
//                         onClick={() => handleEdit(msg)}
//                         className="text-sm text-yellow-500 hover:underline"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(msg.id)}
//                         className="text-sm text-red-500 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//               <p className="text-gray-800 mt-2">{msg.message}</p>
//               <small className="text-gray-500">{new Date(msg.created_at).toLocaleString()}</small>
//             </div>
//           ))}
//         </div>
//       </main>

//       <footer className="sticky bottom-0 bg-white shadow-lg p-4 border-t border-gray-300">
//         <form onSubmit={handleSendMessage} className="flex">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder={editMode.active ? "Editing your message..." : "Type your message..."}
//             className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="px-6 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
//           >
//             {editMode.active ? "Update" : "Send"}
//           </button>
//         </form>
//       </footer>
//     </div>
//   );
// }

// export default ChatApp;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";
import { getCurrentUser } from "../../services/apiAuth";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to bottom, #cce4f6, #a3d9f8);
`;

const Header = styled.header`
  text-align: center;
  background-color: #2563eb;
  color: white;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageCard = styled.div`
  padding: 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageUser = styled.strong`
  color: #1e40af;
`;

const MessageActions = styled.div`
  display: flex;
  gap: 8px;

  button {
    font-size: 0.875rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .edit {
    color: #f59e0b;
  }

  .delete {
    color: #ef4444;
  }

  .reply {
    color: #10b981;
  }
`;

const ReplyContext = styled.div`
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: #e5f5f9;
  border-left: 4px solid #10b981;
  border-radius: 4px;

  span {
    font-weight: bold;
    color: #064e3b;
  }

  p {
    margin: 0;
    color: #374151;
  }
`;

const MessageText = styled.p`
  margin-top: 8px;
  color: #374151;
`;

const MessageTimestamp = styled.small`
  color: #6b7280;
`;

const Footer = styled.footer`
  background-color: white;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const MessageInputForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const SendButton = styled.button`
  padding: 8px 24px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1e3a8a;
  }
`;

function ChatApp() {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState({ active: false, messageId: null });
  const [replyTo, setReplyTo] = useState(null); // Track the message being replied to
  const [user, setUser] = useState(null); // Store the authenticated user's details

  // Fetch the authenticated user on load
  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser); // Save the user object (id and fullName) in state
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
      }
    }
    fetchUser();
  }, []);

  // Fetch chat messages
  const { data: messages, isLoading, error } = useQuery(["chatMessages"], async () => {
    const { data, error } = await supabase
      .from("chat")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw new Error("Error fetching chat messages: " + error.message);
    return data;
  });

  // Real-time updates
  useEffect(() => {
    const subscription = supabase
      .channel("public:chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat" }, (payload) => {
        queryClient.setQueryData(["chatMessages"], (oldMessages) => [
          ...(oldMessages || []),
          payload.new,
        ]);
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "chat" }, (payload) => {
        queryClient.setQueryData(["chatMessages"], (oldMessages) =>
          (oldMessages || []).filter((msg) => msg.id !== payload.old.id)
        );
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "chat" }, (payload) => {
        queryClient.setQueryData(["chatMessages"], (oldMessages) =>
          (oldMessages || []).map((msg) => (msg.id === payload.new.id ? payload.new : msg))
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [queryClient]);

  // Send a message
  const sendMessage = useMutation({
    mutationFn: async (newMessage) => {
      const { data, error } = await supabase
        .from("chat")
        .insert([
          {
            message: newMessage,
            user_id: user?.id,
            user_name: user?.user_metadata?.fullName,
            reply_to: replyTo ? replyTo.id : null, // Include replyTo ID if applicable
          },
        ]);

      if (error) throw new Error("Error sending message: " + error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chatMessages"]);
    },
  });

  // Edit a message
  const editMessage = useMutation({
    mutationFn: async ({ id, updatedMessage }) => {
      const { data, error } = await supabase
        .from("chat")
        .update({ message: updatedMessage })
        .eq("id", id);

      if (error) throw new Error("Error updating message: " + error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chatMessages"]);
    },
  });

  // Delete a message
  const deleteMessage = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("chat").delete().eq("id", id);
      if (error) throw new Error("Error deleting message: " + error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chatMessages"]);
    },
  });

  // Handle send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (editMode.active) {
      await editMessage.mutateAsync({ id: editMode.messageId, updatedMessage: message });
      setEditMode({ active: false, messageId: null });
    } else {
      await sendMessage.mutateAsync(message);
    }

    setMessage(""); // Clear the input field
    //setReplyTo(null); // Clear the reply context
  };

  // Handle reply button click
  const handleReply = (msg) => {
    setReplyTo(msg);
    setMessage(`@${msg.user_name} `); // Pre-fill input with username mention
  };

  // Handle edit button click
  const handleEdit = (msg) => {
    setEditMode({ active: true, messageId: msg.id });
    setMessage(msg.message); // Populate the input field with the existing message
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    await deleteMessage.mutateAsync(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    
    <Container>
      <Header>
        <h1>Annaouncement</h1>
      </Header>

      <Main>
        <MessagesContainer>
          {messages?.map((msg) => (
            <MessageCard key={msg.id}>
              <MessageHeader>
                <MessageUser>
                  {msg.user_name ? msg.user_name : "Anonymous"}
                </MessageUser>
                <MessageActions>
                  
                    
                  {msg.user_id === user?.id && (
                    
                    <>
                    
                      <button onClick={() => handleEdit(msg)} className="edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(msg.id)} className="delete">
                        Delete
                      </button>
                    </>
                  )}
                  <button onClick={() => handleReply(msg)} className="reply">
                    Reply
                  </button>
                 
                 
                </MessageActions>
              </MessageHeader>
              {msg.reply_to && (
                <ReplyContext>
                  <span>Replying to:</span>
                  <p>{messages.find((m) => m.id === msg.reply_to)?.message || "Unknown message "}</p>
                </ReplyContext>
              )}
              
              <MessageText>{msg.message}</MessageText>
              <MessageTimestamp>
                {new Date(msg.created_at).toLocaleString()}
              </MessageTimestamp>
            </MessageCard>
          ))}
        </MessagesContainer>
      </Main>

      <Footer>
        <MessageInputForm onSubmit={handleSendMessage}>
          {replyTo && (
            <ReplyContext>
              <span>Replying to {replyTo.user_name}:</span>
              <p>{replyTo.message}</p>
            </ReplyContext>
          )}
          <MessageInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              editMode.active
                ? "Editing your message..."
                : replyTo
                ? "Replying..."
                : "Type your message..."
            }
          />
          <SendButton type="submit">{editMode.active ? "Update" : "Send"}</SendButton>
        </MessageInputForm>
      </Footer>
    </Container>
    
  );
}

export default ChatApp;
