import styled from "styled-components";
import { Link } from "react-router-dom";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Link to="/">
      <Img src="https://znikiymccixmabrhrcux.supabase.co/storage/v1/object/public/storage//xxs.png" alt="Logo" />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
