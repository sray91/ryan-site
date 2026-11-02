import Header from "./Header";
import Footer from "./Footer";

// `dark` puts the page on the home page's dark theme (.rx in globals.css); the header and footer follow it.
export default function PageShell({ children, dark = false }) {
  return (
    <div className={`min-h-screen flex flex-col${dark ? " rx" : ""}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
