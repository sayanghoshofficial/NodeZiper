import styled
// , { css }
 from "styled-components";

export const Main = styled.div`
min-height: 90vh;
display: flex;
align-items: center;
background-image: url("../../Assets/background.jpg");
background-position: center;
background-size: cover;
`;

export const Title = styled.h1`
font-size: 95px;
`;

export const SubTitle = styled.p`
font-size:25px;
padding-top:10px;
`;

export const IntroText = styled.div`
width: 100%;
text-align:center;
`;

export const ButtonContainer = styled.div`
 margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
  flex-wrap: wrap;
  /* flex-direction: column; */
`;

export const Landingbutton = styled.button`
width: 200px;
  height: 55px;
  font-weight: 700;

  &:hover{
    background-color: var( --bs-blue);
    color:var(--bs-white);
  }
`;

// // Define media query styles
// const desktopStyles = css`
//   ButtonContainer {
//     padding: 0 200px;
//   }
//   Title {
//     padding: 0 100px;
//   }
// `;

// const mobileStyles = css`
//   Title {
//     font-size: 60px;
//   }
//   Landingbutton {
//     width: 150px;
//     height: 50px;
//   }
// `;