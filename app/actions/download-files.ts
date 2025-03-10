"use server";

import fs from "fs/promises";
import path from "path";
import JSZip from "jszip";
import mime from "mime";

interface File {
    name: string;
    path: string;
    thumbnail?: string;
}

export async function downloadFiles(files: File[]): Promise<{
    buffer: string;
    filename: string;
    contentType: string;
}> {
    if (files.length === 1) {
        try {
            const filePath = path.join(process.cwd(), "public", files[0].path);
            const fileBuffer = await fs.readFile(filePath);
            const filename = path.basename(filePath);
            const contentType = mime.getType(filePath) || "application/octet-stream";
            return { buffer: fileBuffer.toString("base64"), filename, contentType };
        } catch (error) {
            console.error("Error reading single file:", error);
            throw new Error("Failed to download file");
        }
    } else {
        try {
            const zip = new JSZip();

            for (const file of files) {
                const filePath = path.join(process.cwd(), "public", file.path);
                const fileBuffer = await fs.readFile(filePath);
                const filename = path.basename(filePath);
                zip.file(filename, fileBuffer.toString("base64"), { base64: true });
            }

            const zippedBuffer = await zip.generateAsync({ type: "base64", compression: "DEFLATE" });
            console.log("Zip file ready.");

            const currentTime = Date.now().toString();
            return {
                buffer: zippedBuffer,
                filename: `${currentTime}.zip`,
                contentType: "application/zip",
            };
        } catch (error) {
            console.error("Error creating zip archive:", error);
            throw new Error("Failed to create zip file");
        }
    }
}

