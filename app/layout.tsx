export const metadata = { title: "EAN Aviation — Smart Journey (Demo)", description: "Mockup powered by Descasio + AWS" };
import "./../styles/globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="min-h-screen">{children}</body></html>);
}
