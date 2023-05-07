import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Custom404() {
  document.title = "404 - Page not found | Confessions";

  return (
    <>
      <Header />
      <div className="flex h-48 flex-col items-center justify-center space-y-1">
        <p className="font-sourceCodePro text-9xl font-semibold tracking-wider sm:tracking-widest">
          404
        </p>
        <p className="font-medium">Didn&apos;t find anything here!</p>
      </div>
      <p className="my-8 text-center">
        Back to{" "}
        <a href="/" className="underline">
          home
        </a>
      </p>
      <Footer />
    </>
  );
}
