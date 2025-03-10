"use server";
import path from "path";
import { readdir, mkdir } from "fs/promises";
import { createWriteStream } from "fs";

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

export async function uploadUserFiles(formData: FormData): Promise<Boolean> {
    const uploadDirectory = path.join(process.cwd(), "public/files");
    await ensureDir(uploadDirectory);
    const files = formData.getAll("files");
    let success = false

    // Loop over each file and download them
    for (const fileEntry of files) {
        if (fileEntry instanceof File) {
            const file = fileEntry;
            // Create a relatively unique name for the file
            const currentTime = Date.now();
            const formattedName = file.name.replace(/\s+/g, "_").toLowerCase().substring(0, file.name.lastIndexOf("."));
            const fileFormat = file.name.substring(file.name.lastIndexOf("."));
            const fileName = formattedName + "_" + currentTime.toString() + fileFormat;
            const filePath = path.join(uploadDirectory, fileName); 

            try {
                // Turn file into binary array
                const arrayBuffer = await file.arrayBuffer();
                // Turn into a Node.js buffer
                const buffer = Buffer.from(arrayBuffer);
                // Create a read stream of the Node.js buffer
                const readStream = require("stream").Readable.from(buffer);
                // Create a write stream to the file path for file saving
                const writeStream = createWriteStream(filePath);
                // Save the file
                readStream.pipe(writeStream);

                await new Promise((resolve, reject) => {
                    writeStream.on("finish", resolve);
                    writeStream.on("error", reject);
                });

                console.log(`${filePath} successfully saved.`);
                success = true;
            } catch (error) {
                console.error(`${filePath} couldn't be saved.`, error);
            }
        }
    }
    return success;
}
