

// import React, { useState, useEffect } from "react";
// import styled, { ThemeProvider } from "styled-components";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import supabase from "../../services/supabase";
// import { getCurrentUser } from "../../services/apiAuth";
// import { useDarkMode } from "../../context/DarkModeContext";

// // Light and Dark Themes
// const lightTheme = {
//   background: "#f3f4f6",
//   text: "#374151",
//   cardBackground: "#ffffff",
//   border: "#e5e7eb",
//   primary: "#2563eb",
//   secondary: "#10b981",
//   danger: "#ef4444",
// };

// const darkTheme = {
//   background: "#1f2937",
//   text: "#d1d5db",
//   cardBackground: "#374151",
//   border: "#4b5563",
//   primary: "#60a5fa",
//   secondary: "#34d399",
//   danger: "#f87171",
// };

// // Styled Components
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   background-color: ${(props) => props.theme.background};
//   color: ${(props) => props.theme.text};
// `;

// const Header = styled.header`
//   text-align: center;
//   background-color: ${(props) => props.theme.primary};
//   color: white;
//   padding: 16px;
// `;

// const Main = styled.main`
//   flex: 1;
//   overflow-y: auto;
//   padding: 16px;
// `;

// const MessagesContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const MessageCard = styled.div`
//   padding: 16px;
//   background-color: ${(props) => props.theme.cardBackground};
//   border: 1px solid ${(props) => props.theme.border};
//   border-radius: 8px;
// `;

// const MessageHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const MessageUser = styled.strong`
//   color: ${(props) => props.theme.primary};
// `;

// const MessageActions = styled.div`
//   display: flex;
//   gap: 8px;

//   button {
//     font-size: 0.875rem;
//     cursor: pointer;
//     background: none;
//     border: none;
//     color: ${(props) => props.theme.text};

//     &:hover {
//       text-decoration: underline;
//     }

//     &.edit {
//       color: ${(props) => props.theme.secondary};
//     }

//     &.delete {
//       color: ${(props) => props.theme.danger};
//     }

//     &.reply {
//       color: ${(props) => props.theme.secondary};
//     }
//   }
// `;

// const ReplyContext = styled.div`
//   padding: 8px 12px;
//   background-color: ${(props) => props.theme.cardBackground};
//   border-left: 4px solid ${(props) => props.theme.secondary};
//   border-radius: 4px;
// `;

// const MessageText = styled.p``;

// const Footer = styled.footer`
//   background-color: ${(props) => props.theme.cardBackground};
//   padding: 16px;
//   border-top: 1px solid ${(props) => props.theme.border};
// `;

// const MessageInputForm = styled.form`
//   display: flex;
//   gap: 8px;
// `;

// const MessageInput = styled.input`
//   flex: 1;
//   padding: 8px 12px;
//   border: 1px solid ${(props) => props.theme.border};
//   border-radius: 8px;
//   background-color: ${(props) => props.theme.cardBackground};
//   color: ${(props) => props.theme.text};
// `;

// const SendButton = styled.button`
//   padding: 8px 16px;
//   background-color: ${(props) => props.theme.primary};
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${(props) => props.theme.primary}cc;
//   }
// `;

// function ChatApp() {
//   const queryClient = useQueryClient();
//   const [message, setMessage] = useState("");
//   const [editMode, setEditMode] = useState({ active: false, messageId: null });
//   const [replyTo, setReplyTo] = useState(null);
//   const [user, setUser] = useState(null);
//   const { isDarkMode } = useDarkMode();

//   const theme = isDarkMode ? darkTheme : lightTheme;

//   useEffect(() => {
//     async function fetchUser() {
//       const currentUser = await getCurrentUser();
//       setUser(currentUser);
//     }
//     fetchUser();
//   }, []);

//   const { data: messages, isLoading, error } = useQuery(["chatMessages"], async () => {
//     const { data } = await supabase
//       .from("chat")
//       .select("*")
//       .order("created_at", { ascending: true });
//     return data;
//   });

//   const sendMessage = useMutation({
//     mutationFn: async (newMessage) => {
//       await supabase.from("chat").insert({
//         message: newMessage,
//         user_id: user?.id,
//         user_name: user?.user_metadata?.fullName,
//         reply_to: replyTo?.id || null,
//       });
//     },
//     onSuccess: () => queryClient.invalidateQueries(["chatMessages"]),
//   });

//   const editMessage = useMutation({
//     mutationFn: async ({ id, updatedMessage }) => {
//       await supabase.from("chat").update({ message: updatedMessage }).eq("id", id);
//     },
//     onSuccess: () => queryClient.invalidateQueries(["chatMessages"]),
//   });

//   const deleteMessage = useMutation({
//     mutationFn: async (id) => {
//       await supabase.from("chat").delete().eq("id", id);
//     },
//     onSuccess: () => queryClient.invalidateQueries(["chatMessages"]),
//   });

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (editMode.active) {
//       editMessage.mutate({ id: editMode.messageId, updatedMessage: message });
//       setEditMode({ active: false, messageId: null });
//     } else {
//       sendMessage.mutate(message);
//     }
//     setMessage("");
//     setReplyTo(null);
//   };

//   const handleReply = (msg) => {
//     setReplyTo(msg);
//     setMessage(`@${msg.user_name} `);
//   };

//   const handleEdit = (msg) => {
//     setEditMode({ active: true, messageId: msg.id });
//     setMessage(msg.message);
//   };

//   const handleDelete = (id) => {
//     deleteMessage.mutate(id);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <ThemeProvider theme={theme}>
//       <Container>
//         <Header>Chat App</Header>
//         <Main>
//           <MessagesContainer>
//             {messages.map((msg) => (
//               <MessageCard key={msg.id}>
//                 <MessageHeader>
//                   <MessageUser>{msg.user_name || "Anonymous"}</MessageUser>
//                   <MessageActions>
//                     {msg.user_id === user?.id && (
//                       <>
//                         <button className="edit" onClick={() => handleEdit(msg)}>
//                           Edit
//                         </button>
//                         <button className="delete" onClick={() => handleDelete(msg.id)}>
//                           Delete
//                         </button>
//                       </>
//                     )}
//                     <button className="reply" onClick={() => handleReply(msg)}>
//                       Reply
//                     </button>
//                   </MessageActions>
//                 </MessageHeader>
//                 {msg.reply_to && (
//                   <ReplyContext>
//                     Replying to:{" "}
//                     {messages.find((m) => m.id === msg.reply_to)?.message || "Deleted message"}
//                   </ReplyContext>
//                 )}
//                 <MessageText>{msg.message}</MessageText>
//               </MessageCard>
//             ))}
//           </MessagesContainer>
//         </Main>
//         <Footer>
//           <MessageInputForm onSubmit={handleSendMessage}>
//             {replyTo && <ReplyContext>Replying to: {replyTo.message}</ReplyContext>}
//             <MessageInput
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <SendButton type="submit">{editMode.active ? "Update" : "Send"}</SendButton>
//           </MessageInputForm>
//         </Footer>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default ChatApp;

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../services/supabase";
import { getCurrentUser } from "../../services/apiAuth";
import { useDarkMode } from "../../context/DarkModeContext";

// Light and Dark Themes
const lightTheme = {
  background: "#f3f4f6",
  text: "#374151",
  cardBackground: "#ffffff",
  border: "#e5e7eb",
  primary: "#2563eb",
  secondary: "#10b981",
  danger: "#ef4444",
};

const darkTheme = {
  background: "#1f2937",
  text: "#d1d5db",
  cardBackground: "#374151",
  border: "#4b5563",
  primary: "#60a5fa",
  secondary: "#34d399",
  danger: "#f87171",
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

const Header = styled.header`
  text-align: center;
  background-color: ${(props) => props.theme.primary};
  color: white;
  padding: 16px;
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
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MessageUser = styled.strong`
  color: ${(props) => props.theme.primary};
`;

const MessageActions = styled.div`
  display: flex;
  gap: 8px;

  button {
    font-size: 0.875rem;
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) => props.theme.text};

    &:hover {
      text-decoration: underline;
    }

    &.edit {
      color: ${(props) => props.theme.secondary};
    }

    &.delete {
      color: ${(props) => props.theme.danger};
    }

    &.reply {
      color: ${(props) => props.theme.secondary};
    }
  }
`;

const ReplyContext = styled.div`
  padding: 8px 12px;
  background-color: ${(props) => props.theme.cardBackground};
  border-left: 4px solid ${(props) => props.theme.secondary};
  border-radius: 4px;
  margin-bottom: 8px;
`;

const MessageText = styled.p``;

const Footer = styled.footer`
  background-color: ${(props) => props.theme.cardBackground};
  padding: 16px;
  border-top: 1px solid ${(props) => props.theme.border};
`;

const MessageInputForm = styled.form`
  display: flex;
  gap: 8px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
`;

const SendButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.primary}cc;
  }
`;

function ChatApp() {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState({ active: false, messageId: null });
  const [replyTo, setReplyTo] = useState(null);
  const [user, setUser] = useState(null);
  const { isDarkMode } = useDarkMode();

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    fetchUser();
  }, []);

  const { data: messages, isLoading, error } = useQuery(["chatMessages"], async () => {
    const { data } = await supabase
      .from("chat")
      .select("*")
      .order("created_at", { ascending: true });
    return data;
  });

  const sendMessage = useMutation({
    mutationFn: async (newMessage) => {
      await supabase.from("chat").insert({
        message: newMessage,
        user_id: user?.id,
        user_name: user?.user_metadata?.fullName,
        reply_to: replyTo?.id || null,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["chatMessages"]),
  });

  const editMessage = useMutation({
    mutationFn: async ({ id, updatedMessage }) => {
      await supabase.from("chat").update({ message: updatedMessage }).eq("id", id);
    },
    onSuccess: () => queryClient.invalidateQueries(["chatMessages"]),
  });

  const deleteMessage = useMutation({
    mutationFn: async (id) => {
      await supabase.from("chat").delete().eq("id", id);
    },
    onSuccess: () => queryClient.invalidateQueries(["chatMessages"]),
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (editMode.active) {
      editMessage.mutate({ id: editMode.messageId, updatedMessage: message });
      setEditMode({ active: false, messageId: null });
    } else {
      sendMessage.mutate(message);
    }
    setMessage("");
    setReplyTo(null);
  };

  const handleReply = (msg) => {
    setReplyTo(msg);
    setMessage(`@${msg.user_name} `);
  };

  const handleEdit = (msg) => {
    setEditMode({ active: true, messageId: msg.id });
    setMessage(msg.message);
  };

  const handleDelete = (id) => {
    deleteMessage.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>Announcement</Header>
        <Main>
          <MessagesContainer>
            {messages.map((msg) => {
              const originalMessage = messages.find((m) => m.id === msg.reply_to);

              return (
                <MessageCard key={msg.id}>
                  <MessageHeader>
                    <MessageUser>{msg.user_name || "Anonymous"}</MessageUser>
                    <MessageActions>
                      {msg.user_id === user?.id && (
                        <>
                          <button className="edit" onClick={() => handleEdit(msg)}>
                            Edit
                          </button>
                          <button className="delete" onClick={() => handleDelete(msg.id)}>
                            Delete
                          </button>
                        </>
                      )}
                      <button className="reply" onClick={() => handleReply(msg)}>
                        Reply
                      </button>
                    </MessageActions>
                  </MessageHeader>
                  {originalMessage && (
                    <ReplyContext>
                      Replying to:{" "}
                      <strong>{originalMessage.user_name || "Anonymous"}:</strong>{" "}
                      {originalMessage.message}
                    </ReplyContext>
                  )}
                  <MessageText>{msg.message}</MessageText>
                </MessageCard>
              );
            })}
          </MessagesContainer>
        </Main>
        <Footer>
          <MessageInputForm onSubmit={handleSendMessage}>
            {replyTo && <ReplyContext>Replying to: {replyTo.message}</ReplyContext>}
            <MessageInput
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <SendButton type="submit">{editMode.active ? "Update" : "Send"}</SendButton>
          </MessageInputForm>
        </Footer>
      </Container>
    </ThemeProvider>
  );
}

export default ChatApp;
