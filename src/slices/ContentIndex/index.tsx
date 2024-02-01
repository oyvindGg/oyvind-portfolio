import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import ContentList from "./ContentList";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ContentList from "./ContentList";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
/**
 * Props for `ProjectsIndex`.
 */
export type ProjectsIndexProps =
	SliceComponentProps<Content.ProjectDocumentDataSlicesSlice>;

/**
 * Component for "ProjectsIndex" Slices.
 */
export const ProjectsIndex = async ({
	slice,
}: ProjectsIndexProps): Promise<JSX.Element> => {
	const client = createClient();
	const projects = await client.getAllByType("project");

	const items =
		slice.primary.content_type === "Projects" ? projects : projects;

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Heading size="xl" className="mb-8">
				{slice.primary.heading}
			</Heading>
			{isFilled.richText(slice.primary.description) && (
				<div className="prose prose-xl prose-invert mb-10">
					<PrismicRichText field={slice.primary.description} />
				</div>
			)}
			<ContentList
				items={items}
				viewMoreText={slice.primary.view_more_text}
				fallbackItemImage={slice.primary.fallback_item_image}
			/>
		</Bounded>
	);
};

export const ContentIndex = async ({
	slice,
}: ContentIndexProps): Promise<JSX.Element> => {
	const client = createClient();
	const projects = await client.getAllByType("project");

	const items = "Project" ? projects : [];

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Heading className="mb-8">{slice.primary.heading}</Heading>
			{isFilled.richText(slice.primary.description) && (
				<div className="prose prose-xl prose-invert mb-10">
					<PrismicRichText field={slice.primary.description} />
				</div>
			)}

			<ContentList
				items={items}
				viewMoreText={slice.primary.view_more_text}
				fallbackItemImage={slice.primary.fallback_item_image}
			/>
		</Bounded>
	);
};

export default ContentIndex;
