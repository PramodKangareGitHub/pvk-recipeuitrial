import { PostHogPageview, Providers } from "ui/components/Providers";
import "./initPosthog";
import "ui/css/globals.css";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { Suspense } from "react";
import { RecipeLayout } from "./RecipeLayout";
import { ServerFetchProvider } from "ui/components/Providers/ServerFetchProvider";
import AuthContext from "ui/context/ZiplyAuthContext";

const sora = Sora({ subsets: ["latin"] });

const metadataConstants = {
  title: "Ziply - RecipeUI",
  description:"Ziply - RecipeUI",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <body className={sora.className}>
        <Providers>
          <ServerFetchProvider>
            <AuthContext>
              <RecipeLayout>{children}</RecipeLayout>
            </AuthContext>
          </ServerFetchProvider>
        </Providers>
      </body>
    </html>
  );
}
