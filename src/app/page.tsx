"use client";

import Manage from "@/Component/manage/Manage";
import Today from "@/Component/today/Today";
import styled from "styled-components";

export default function Home() {
  return (
    <StyledContainer>
      {/* <Manage /> */}
      <Today />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: black;
`;
