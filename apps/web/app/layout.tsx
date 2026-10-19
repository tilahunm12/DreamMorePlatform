import './globals.css';
import React from 'react';
import Script from 'next/script';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Dream More Platform - Online Learning & Freelance Marketplace',
  description: 'Integrated education and career development platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Dify AI Chatbot Integration */}
        <Script id="dify-chatbot-config" strategy="afterInteractive">
          {`
            window.difyChatbotConfig = {
              token: 'gITPbpECtPr3Vpgy',
              baseUrl: 'https://udify.app',
              inputs: {},
              systemVariables: {},
              userVariables: {},
            };
          `}
        </Script>
        <Script
          src="https://udify.app/embed.min.js"
          id="gITPbpECtPr3Vpgy"
          defer
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

