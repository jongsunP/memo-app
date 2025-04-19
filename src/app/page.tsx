"use client";
import Today from "@/Component/today/Today";
import styled, { createGlobalStyle } from "styled-components";

/*
 * 전역 스타일
 */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

/*
 * 홈 페이지
 */
export default function Home() {
  return (
    <StyledContainer>
      <GlobalStyle />
      <Today />
    </StyledContainer>
  );
}

const StyledContainer = styled.div``;
