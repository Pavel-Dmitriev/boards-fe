import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Header } from "./Header";

export function Frame() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-6 pt-22 pb-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
