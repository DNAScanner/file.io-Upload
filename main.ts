interface FileIOResponse {
	success: boolean;
	status: number;
	id: string;
	key: string;
	path: string;
	nodeType: string;
	name: string;
	title: string | null;
	description: string | null;
	size: number;
	link: string;
	private: boolean;
	expires: string;
	downloads: number;
	maxDownloads: number;
	autoDelete: boolean;
	planId: number;
	screeningStatus: string;
	mimeType: string;
	created: string;
	modified: string;
}

const filename = Deno.args[0] || "";

if (!filename) {
	console.error("No filename provided");
	Deno.exit(1);
}

try {
	await Deno.stat(filename);
} catch {
	console.error("File not found");
	Deno.exit(1);
}

const formData = new FormData();
formData.append("file", new Blob([await Deno.readFile(filename)]), filename);

// Use fetch to upload the file to file.io
const response = await(
	await fetch("https://file.io", {
		method: "POST",
		body: formData,
	})
).json() as FileIOResponse

console.log(response.link);
