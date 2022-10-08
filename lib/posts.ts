import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '');

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf-8');

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			...matterResult.data
		};
	});
	// sort posts by data
	// @ts-ignore
	return allPostsData.sort(({ data: a }, { data: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);

	// Returens an array that looks like this :
	// [
	// 	{
	// 		paramas: {
	// 			id: 'ssg-ssr'
	// 		}
	// 	},
	// 	{
	// 		paramas: {
	// 			id: 'pre-rendering'
	// 		}
	// 	}
	// ];

	return fileNames.map((filename) => {
		return {
			params: {
				id: filename.replace(/\.md$/, '')
			}
		};
	});
}

export function getPostData(id: any) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	// Combine the data with the id
	return {
		id,
		...matterResult.data
	};
}