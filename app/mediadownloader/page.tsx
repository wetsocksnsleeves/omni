"use client";

import { useState } from "react";
import { toast, Toaster } from "sonner";

interface MediaInfo {
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    messages: string[];
    setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

function MediaConsole({messages}: string[]) {
    return (
        <div className="m-3 flex min-h-100">
            <div className="flex flex-col justify-end bg-secondary rounded-xl border border-border w-full p-4">
                {messages.map((msg, i) => {
                    return (
                        <span
                            key={i}
                            className="text-sm font-mono"
                        >
                            {"> "}
                            {msg}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

function MediaControl({ url, setUrl, messages, setMessages}: MediaInfo) {
    const downloadHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!url) {
            toast.warning("Enter a Url");
        }

        const res = await fetch("/api/downloader", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();

        if (data) {
            if (data.error) {
                setMessages([...messages, data.error]);
            }
        }
    };

    return (
        <div className="mx-3 mb-3">
            <form className="flex justify-between" onSubmit={downloadHandler}>
                <input
                    className="p-3 w-full rounded-l-lg border border-border bg-secondary outline-none focus:brightness-150 transition-all"
                    type="text"
                    name="url"
                    placeholder="Enter video URL..."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUrl(e.target.value);
                    }}
                />
                <button
                    className="p-3 h-12 bg-white rounded-r-lg text-black font-medium 
                    hover:bg-secondary hover:border hover:border-white hover:text-white active:bg-white active:text-black transition-all"
                    type="submit"
                >
                    <label>Download</label>
                </button>
            </form>
            <div className="m-3">
                <h1 className="mt-8 text-bold text-xl">Download Options:</h1>
                <div className="mt-3 mb-1 border-t border-t-border">
                    <hr className="opacity-0" />
                </div>
                <div className="flex flex-row gap-10">
                    <div>
                        <p className="my-2">Format:</p>
                        <label>
                            <input type="checkbox" />
                            <span className="mx-3">option...</span>
                        </label>
                    </div>
                    <div>
                        <p className="my-2">Sound:</p>
                        <label>
                            <input type="checkbox" />
                            <span className="mx-3">option...</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MediaDownloader() {
    const [url, setUrl] = useState<string | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    return (
        <div className="max-w-full">
            <Toaster richColors position="top-center" />
            <div className="m-3 flex flex-col rounded-lg bg-primary">
                <MediaConsole messages={messages} />
                <MediaControl
                    url={url}
                    setUrl={setUrl}
                    messages={messages}
                    setMessages={setMessages}
                />
            </div>
        </div>
    );
}
