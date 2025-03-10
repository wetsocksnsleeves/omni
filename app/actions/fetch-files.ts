"use server";
import path from "path";
import { readdir, mkdir } from "fs/promises";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fs from "fs/promises";

interface File {
    name: string;
    path: string;
    thumbnail?: string;
    video?: boolean;
}

// Video extensions that need thumbnails
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".avi", ".mkv"]);

// Generate a .jpg and a .gif
export async function generateThumbnail(filePath, thumbnailPath) {
    ffmpeg.setFfmpegPath(ffmpegPath);

    const fileName = path.basename(thumbnailPath);

    try {
        await new Promise((resolve, reject) => {
            ffmpeg(filePath)
                .inputOption("-vsync 0") // Different option that helps with MOV files
                .on("end", resolve)
                .on("error", (err) => {
                    console.error("Error generating thumbnail:", err);
                    reject(err);
                })
                .screenshots({
                    count: 1,
                    timestamps: [0.5], // Use 0.5 seconds instead of 0
                    filename: fileName + ".jpg",
                    folder: path.dirname(thumbnailPath),
                });
        });

        // Generate GIF thumbnail
        await new Promise((resolve, reject) => {
            ffmpeg(filePath)
                .on("end", resolve)
                .on("error", reject)
                .setStartTime("00:00:00")
                .setDuration(3)
                .size("320x?")
                .output(`${path.dirname(thumbnailPath)}/${fileName}.gif`)
                .format("gif")
                .run();
        });

        return { success: true, thumbnailPath };
    } catch (error) {
        console.error("Thumbnail generation failed:", error);
        return { success: false, error: "Thumbnail generation failed" };
    }
}

// Checks a given file name and returns a thumbnail or false
function isVideo(filePath: string): string {
    const fileName = path.basename(filePath);
    const extension = fileName
        .toLowerCase()
        .substring(fileName.lastIndexOf("."));
    const thumbnailPath =
        process.cwd() +
        "/public/files/thumbnails/" +
        fileName.substring(0, fileName.lastIndexOf("."));
    if (VIDEO_EXTENSIONS.has(extension)) {
        return thumbnailPath;
    }
    return "";
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

// Fetch files from server storage and send the array to the client
export async function fetchServerFiles() {
    try {
        const filesDirectory = path.join(process.cwd(), "public/files");
        await ensureDir(filesDirectory);
        await ensureDir(path.join(process.cwd(), "public/files/thumbnails"));

        const files = await readdir(filesDirectory);
        let output: any[] = [];
        for (const file of files) {
            if (file == "thumbnails") {
                continue;
            }

            const thumbnail = isVideo(`/files/${file}`);

            if (thumbnail === "") {
                output.push({ name: file, path: `/files/${file}` });
            } else {
                await generateThumbnail(filesDirectory + "/" + file, thumbnail);
                output.push({
                    name: file,
                    path: `/files/${file}`,
                    thumbnail: `/files/thumbnails/${path.basename(thumbnail)}`,
                    video: true,
                });
            }
        }

        console.log("Files successfully fetched.");
        return output;
    } catch (error) {
        // Return an error message
        console.log("Error fetching files.");
        return [];
    }
}
