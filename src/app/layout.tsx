import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Personal Portfolio",
	description: "Øyvind Gjersum - Frontend Developer",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="bg-zinc-900 text-zinc-100">
			<body className={urbanist.className}>
				<Header />
				{children}
				<div className="h-[500px]"></div>
			</body>
		</html>
	);
}
