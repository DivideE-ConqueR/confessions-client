import Header from "./Header";
import Footer from "./Footer";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <Header />

      <div>
        <h1>Opps! Something went wrong</h1>
        <pre>{error?.response?.data?.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>

      <Footer />
    </>
  );
}
