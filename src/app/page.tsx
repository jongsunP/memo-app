"use client";

import Today from "@/Component/today/Today";
import styled from "styled-components";

/*
 * 홈 페이지
 */
export default function Home() {
  return (
    <StyledContainer>
      <Today />
    </StyledContainer>
  );
}

const StyledContainer = styled.div``;
