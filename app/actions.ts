"use server";
import path from "path";
import { readdir, mkdir } from "fs/promises";

interface File {
    name: string;
    path: string;
    thumbnail?: string;
}

// Ensures directory exists
async function ensureDir(dirPath: string) {
    try {
        await mkdir(dirPath, { recursive: true });
        // Directory exists
    } catch (error) {
        console.log("Error creating directory");
        throw error;
    }
}

// Async function as we are returning a promise
export async function fetchServerFiles() {
    "use server";
    try {
        const filesDirectory = path.join(process.cwd(), "public/files");
        await ensureDir(filesDirectory);

        const files = await readdir(filesDirectory);
        const output: File[] = files.map((file) => ({
            name: file,
            path: `/files/${file}`,
        }));

        console.log(output);
        return output;
    } catch (error) {
        // Return an error message
        console.log("Error fetching files");
        return [];
    }
}
