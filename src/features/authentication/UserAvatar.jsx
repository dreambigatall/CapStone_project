import styled from "styled-components";
import { useUser } from "./useUser";
import Modal from "../../ui/Modal";
const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  cursor: pointer;
`;

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;
 console.log(user)
  return (
    <StyledUserAvatar>
      <Modal>
        <Modal.Open opens="image-previwer">
          <Avatar
            src={avatar || "default-user.jpg"}
            alt={`Avatar of ${fullName}`}
          />
        </Modal.Open>
        <Modal.Window name="image-previwer">
        <img
            src={avatar || "default-user.jpg"}
            alt={fullName}
            style={{  borderRadius: "var(--border-radius-lg)",  }}
          />
        </Modal.Window>
      
      </Modal>
      
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;