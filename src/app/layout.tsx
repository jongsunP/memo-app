import StyledComponentsRegistry from "@/lib/registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
