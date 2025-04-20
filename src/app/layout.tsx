"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";

/*
 * 전역 스타일
 */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      document.documentElement.addEventListener(
        "touchstart",
        handleTouchStart,
        false
      );
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    return () => {
      document.documentElement.removeEventListener(
        "touchstart",
        handleTouchStart,
        false
      );
    };
  }, []);

  return (
    <html>
      <head>
        <title>Wake Life</title>
        <meta
          name="viewport"
          content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;"
        />
      </head>
      <body>
        <GlobalStyle />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
