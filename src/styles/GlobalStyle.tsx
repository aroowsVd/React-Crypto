import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Poppins", sans-serif;
    background: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }

  a {
    color: inherit;
    &:visited,&:active {
      color: inherit;
    }
  }
`
export default GlobalStyle