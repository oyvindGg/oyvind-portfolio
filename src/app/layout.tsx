import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const settings = await client.getSingle("settings");

	return {
		title: settings.data.meta_title,
		description: settings.data.meta_description,
	};
}

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
				<Footer />
				<PrismicPreview repositoryName={repositoryName} />
			</body>
		</html>
	);
}
