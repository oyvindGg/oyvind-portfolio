import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import { DateField, isFilled } from "@prismicio/client";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
	const client = createClient();
	const page = await client
		.getByUID("project", params.uid)
		.catch(() => notFound());

	function formatDate(date: DateField) {
		if (isFilled.date(date)) {
			const dateOptions: Intl.DateTimeFormatOptions = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};

			return new Intl.DateTimeFormat("en-US", dateOptions).format(
				new Date(date)
			);
		}
	}

	const formattedDate = formatDate(page.data.date);

	return (
		<Bounded as="article">
			<div className="border-2xl border-2 border-zinc-800 bg-zinc-900 px-4 py-10 md:px-8 md:py-20">
				<Heading as="h1">{page.data.title}</Heading>
				<div className="flex gap-4 text-yellow-400 text-xl">
					{page.tags.map((tag) => (
						<span key={tag}>{tag}</span>
					))}
				</div>
				<p className="mt-8 border-b border-zinc-600 text-xl font-medium text-zinc-300">
					{formattedDate}
				</p>
				<div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
					<SliceZone slices={page.data.slices} components={components} />
				</div>
			</div>
		</Bounded>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const client = createClient();
	const page = await client
		.getByUID("project", params.uid)
		.catch(() => notFound());

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	};
}

export async function generateStaticParams() {
	const client = createClient();
	const pages = await client.getAllByType("project");

	return pages.map((page) => {
		return { uid: page.uid };
	});
}
