import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: system-ui, sans-serif;
    line-height: 1.5;
    font-size: 16px;
    transition: background-color ${({ theme }) => theme.transition}, 
                color ${({ theme }) => theme.transition};
  }

  button {
    transition: background-color ${({ theme }) => theme.transition}, 
                color ${({ theme }) => theme.transition};
  }

  input, select, textarea {
    background-color: ${({ theme }) =>
      theme.colors.inputBg || theme.colors.cardBg};
    color: ${({ theme }) => theme.colors.inputText || theme.colors.text};
    border: 1px solid ${({ theme }) =>
      theme.colors.inputBorder || theme.colors.border};
    padding: 0.5rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    transition: all ${({ theme }) => theme.transition};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: opacity ${({ theme }) => theme.transition};
  }
  a:hover {
    opacity: 0.8;
  }
`;
