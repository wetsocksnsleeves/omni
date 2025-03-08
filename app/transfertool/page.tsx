"use client";
import Image from "next/image";
import { useState } from "react";

interface MediaBayProp {
    files: File[];
    selection: File[];
    setSelection: (newSelection: File[]) => void;
}

interface MediaControlProp {
    files: File[];
    selection: File[];
    setSelection: (newSelection: File[]) => void;
    className?: string;
}

interface File {
    name: string;
    path: string;
    thumbnail?: string;
}

function FileControl() {
    return (
        <div className="fixed z-20 flex gap-5 my-10 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
                className="border border-border rounded-md bg-secondary px-5 py-2 drop-shadow-[0_8px_8px_rgba(0,0,0,.5)]
            hover:brightness-125 active:brightness-80"
            >
                <label className="select-none text-white">Upload</label>
            </div>
            <div
                className="border border-border rounded-md bg-secondary px-5 py-2 drop-shadow-[0_8px_8px_rgba(0,0,0,.5)]
                hover:brightness-125 active:brightness-80"
            >
                <label className="select-none text-white">Download</label>
            </div>
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
                        className={`group relative rounded-xl aspect-square overflow-hidden 
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
                            className="border border-offwhite"
                            src={file.path}
                            alt={file.name}
                            fill
                            draggable="false"
                        />
                    </div>
                );
            })}
        </div>
    );
}

function MediaControl({ files, selection, setSelection }: MediaControlProp) {
    const amount = selection.length;

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
            >
                <span className="text-white">Delete ({amount})</span>
            </button>
        </div>
    );
}

export default function TransferTool() {
    // Placeholder files
    const tempFiles: File[] = [
        { name: "file1", path: "/missing-file.jpg" },
        { name: "file2", path: "/missing-file.jpg" },
        { name: "file3", path: "/missing-file.jpg" },
        { name: "file4", path: "/missing-file.jpg" },
        { name: "file5", path: "/missing-file.jpg" },
        { name: "file6", path: "/missing-file.jpg" },
        { name: "file6", path: "/missing-file.jpg" },
        { name: "file7", path: "/missing-file.jpg" },
        { name: "file8", path: "/missing-file.jpg" },
        { name: "file9", path: "/missing-file.jpg" },
        { name: "file10", path: "/missing-file.jpg" },
        { name: "file11", path: "/missing-file.jpg" },
    ];

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    return (
        <div className="p-3 w-full">
            <MediaControl
                files={tempFiles}
                selection={selectedFiles}
                setSelection={setSelectedFiles}
            />
            <MediaBay
                files={tempFiles}
                selection={selectedFiles}
                setSelection={setSelectedFiles}
            />
            <FileControl />
        </div>
    );
}
