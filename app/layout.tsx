import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
<link rel="icon" href="/favicon.ico" sizes="any" />

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wehouse",
  description: "Residential Marketing",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  //layout.tsx is ServerComponent by default so we can use this action here.
  //but due to server request of this action the Layout.tsx should become async func.
  // currentUser value should be sent to navbar for login and further usages.
  //await prisma?.user.find({...}) also could be used by getCurrent is more explicit
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          {/* modals are highly interactive. keep it in ClientOnly wrapper */}
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          {/* <Modal actionLabel='Submit' isOpen title='Hardcoded Title for modal demostration' /> */}
        </ClientOnly>
        <div className="pb-20 pt-28">
        {children}
        </div>
      </body>
    </html>
  );
}
