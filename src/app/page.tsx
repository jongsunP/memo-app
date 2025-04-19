"use client";

import styled from "styled-components";

export default function Home() {
  return (
    <Button>
      <p>Click me</p>
    </Button>
  );
}

const Button = styled.button`
  background-color: red;
  color: white;
`;
