import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

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
          {/* <Modal actionLabel='Submit' isOpen title='Hardcoded Title for modal demostration' /> */}
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
