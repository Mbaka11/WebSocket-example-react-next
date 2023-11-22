import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav></nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
