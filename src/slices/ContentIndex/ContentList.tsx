"use client";

import React, { useRef } from "react";
import { Content, isFilled } from "@prismicio/client";
import { ContentIndexSlice } from "../../../prismicio-types";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";

type ContentListProps = {
	items: Content.ProjectDocument[] | Content.ProjectDocument[];
	fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
	viewMoreText: ContentIndexSlice["primary"]["view_more_text"];
};

export default function ContentList({
	items,
	fallbackItemImage,
	viewMoreText = "View More",
}: ContentListProps) {
	const component = useRef(null);
	const
	const urlPrefix = "Projects" ? "/projects" : "/";
	return (
		<div ref={component}>
			<ul className="grid border-b border-b-zinc-100">
				{items.map((item, index) => (
					<>
						{isFilled.keyText(item.data.title) && (
							<li className="list-item opacity-1" key={index}>
								<Link
									href={urlPrefix + "/" + item.uid}
									className="flex flex-col justify-between border-t border-t-zinc-100 py-10 text-zinc-200 md:flex-row"
									aria-label={item.data.title}
								>
									<div className="flex flex-col">
										<span className="text-3xl font-bold">
											{item.data.title}
										</span>
										<div className="flex gap-3 text-yellow-400 text-lg font-bold">
											{item.tags.map((tag, index) => (
												<span key={index}>{tag}</span>
											))}
										</div>
									</div>
									<span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
										{viewMoreText} <MdArrowOutward />
									</span>
								</Link>
							</li>
						)}
					</>
				))}
			</ul>

			<div
				className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
				style={{
					backgroundImage: "",
				}}
			></div>
		</div>
	);
}
