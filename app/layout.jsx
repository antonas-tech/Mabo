import "./globals.css";

export const metadata = {
  title: "millimeter | Furniture cutting atelier",
  description:
    "High-precision furniture cutting, edging, drilling and detailing atelier built around millimeter accuracy.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
