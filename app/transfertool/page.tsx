"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchServerFiles } from "../actions/fetch-files.ts";
import { uploadUserFiles } from "../actions/upload-files.ts";
import { downloadFiles } from "../actions/download-files.ts";
import { DeleteFiles } from "../actions/delete-files.ts";
import Loading from "../components/ui/LoadingToast.tsx";

interface MediaBayProp {
    files: File[];
    selection: File[];
    setSelection: (newSelection: File[]) => void;
}

interface MediaControlProp {
    files: File[];
    selection: File[];
    setSelection: (newSelection: File[]) => void;
    getFiles: () => Promise<File>[];
    className?: string;
}

interface FileControlProp {
    getFiles: () => Promise<File>[];
    selection: File[];
    setSelection: (newSelection: File[]) => void;
    setLoading: (loading: LoadingToast) => void;
}

interface File {
    name: string;
    path: string;
    thumbnail?: string;
    video?: boolean;
}

interface LoadingToast {
    text: string;
    state: boolean;
}

function FileControl({ getFiles, selection, setSelection, setLoading }: FileControlProp) {
    async function handleUpload(event) {
        // Validate files array
        const files = event.target.files;
        if (!files || files.length <= 0) return;

        setLoading({ text: "Uploading...", state: true});
        // Package the files to send to server
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        // Send it to the server
        try {
            const success = await uploadUserFiles(formData);
            if (success) {
                console.log("File upload success.");
                getFiles();
            } else {
                console.error("File upload failed.");
            }
        } catch (error) {
            return;
        } finally {
            setLoading({ text: "", state: false });
        }
    }

    async function handleDownload() {
        try {
            setLoading({ text: "Downloading...", state: true});
            const result = await downloadFiles(selection);
            const binary = atob(result.buffer);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([bytes.buffer], { type: result.contentType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = result.filename;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
            alert("Download failed.");
        } finally {
            setSelection([])
            setLoading({ text: "", state: false});
        }
    }

    return (
        <div className="fixed z-20 flex gap-5 my-10 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <input
                id="media-upload"
                type="file"
                accept="image/*,video/*"
                multiple
                className="sr-only"
                onChange={handleUpload}
            />
            <label
                htmlFor="media-upload"
                className="border border-border rounded-md bg-secondary px-5 py-2 drop-shadow-[0_8px_8px_rgba(0,0,0,.5)]
            hover:brightness-125 active:brightness-80 select-none text-white"
            >
                Upload
            </label>
            <label
                className="border border-border rounded-md bg-secondary px-5 py-2 drop-shadow-[0_8px_8px_rgba(0,0,0,.5)]
                hover:brightness-125 active:brightness-80 select-none text-white"
                onClick={handleDownload}
            >
                Download
            </label>
        </div>
    );
}

function MediaBay({ files, selection, setSelection }: MediaBayProp) {
    const toggleSelection = (file: File): void => {
        setSelection((prevSelection: File[]) => {
            const isSelected = prevSelection.some(
                (selectedFile: File) => selectedFile.name === file.name,
            );

            if (isSelected) {
                return prevSelection.filter(
                    (selectedFile: File) => selectedFile.name !== file.name,
                );
            } else {
                return [...prevSelection, file];
            }
        });
    };

    return (
        <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 rounded-xl gap-5 bg-primary border border-0.5 border-border">
            {files.map((file, key) => {
                return (
                    <div
                        key={key}
                        className={`group relative rounded-xl aspect-square overflow-hidden select-none
                            ${selection.some((selectedFile) => selectedFile.name === file.name) ? "outline-3 outline-blue-500" : ""}`}
                        onClick={() => toggleSelection(file)}
                    >
                        <input
                            type="checkbox"
                            className="absolute accent-blue-500 h-4 w-4 top-3 right-3 z-10"
                            readOnly={true}
                            checked={selection.some(
                                (selectedFile) =>
                                    selectedFile.name === file.name,
                            )}
                        />
                        <span
                            className="flex opacity-0 group-hover:opacity-100 transition-all absolute z-10 left-0 bottom-0 w-full h-10 bg-black/70
                        text-white items-center px-3"
                        >
                            <div className="overflow-hidden text-ellipsis">
                                {file.name}
                            </div>
                        </span>
                        <Image
                            className={`object-cover ${file.thumbnail ? "hover:opacity-0 opacity-100" : ""}`}
                            src={
                                file.thumbnail
                                    ? file.thumbnail + ".jpg"
                                    : file.path
                            }
                            alt={file.name}
                            sizes="(max-width: 500px; max-height: 500px)"
                            fill
                            draggable="false"
                        />
                        {file.video ? (
                            <Image
                                className="object-cover hover:opacity-100 opacity-0"
                                src={
                                    file.thumbnail
                                        ? file.thumbnail + ".gif"
                                        : file.path
                                }
                                alt={file.name}
                                sizes="(max-width: 500px; max-height: 500px)"
                                fill
                                unoptimized
                                draggable="false"
                            />
                        ) : (
                            ""
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function MediaControl({
    files,
    selection,
    setSelection,
    getFiles,
}: MediaControlProp) {
    const amount = selection.length;

    async function handleDelete(): Promise<void> {
        DeleteFiles(selection);
        setSelection([]);
        getFiles();
    }

    return (
        <div className="flex justify-between mb-3">
            <div className="flex gap-5">
                <button
                    className="text-sm md:text-base px-5 py-2 bg-white rounded-md cursor-pointer active:brightness-90 hover:brightness-125"
                    onClick={() => setSelection(files)}
                >
                    <label className="text-black">Select All</label>
                </button>
                <button
                    className={`text-sm md:text-base px-5 py-2 bg-secondary rounded-md border border-border                         
                        ${amount > 0 ? "cursor-pointer active:brightness-90 hover:brightness-125" : "brightness-50 cursor-not-allowed"}`}
                    onClick={() => setSelection([])}
                >
                    <label className="text-white">Deselect All</label>
                </button>
            </div>
            <button
                className={`text-sm md:text-base px-5 py-2 bg-red-600 rounded-md
                        ${amount > 0 ? "cursor-pointer active:brightness-90 hover:brightness-125" : "brightness-50 cursor-not-allowed"}`}
                onClick={() => handleDelete()}
            >
                <span className="text-white">Delete ({amount})</span>
            </button>
        </div>
    );
}

export default function TransferTool() {
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<LoadingToast>({
        text: "Loading...",
        state: false,
    });

    // Fetch server storage
    // This is passed to child components and they don't need to call it within
    // useEffect as this function is being called via onClick handlers
    async function getFiles() {
        try {
            const fetchedFiles: File[] = await fetchServerFiles();
            setFiles(fetchedFiles);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    }

    // useEffect hook to escape from client side environment
    useEffect(() => {
        // Initial file fetch upon load
        getFiles();
    }, []);

    return (
        <div className="p-3 w-full">
            {loading.state ? <Loading text={loading.text} /> : ""}
            <MediaControl
                files={files}
                selection={selectedFiles}
                setSelection={setSelectedFiles}
                getFiles={getFiles}
            />
            <MediaBay
                files={files}
                selection={selectedFiles}
                setSelection={setSelectedFiles}
            />
            <FileControl
                getFiles={getFiles}
                selection={selectedFiles}
                setSelection={setSelectedFiles}
                setLoading={setLoading}
            />
        </div>
    );
}
