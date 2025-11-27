"use client";

function MediaConsole() {
    return (
        <div className="m-3 flex min-h-100">
            <div className="flex bg-secondary rounded-xl border border-border w-full">
            </div>
        </div>
    );
}

function MediaControl() {
    return (
        <div className="mx-3 mb-3">
            <form className="flex justify-between">
                <input
                    className="p-3 w-full rounded-l-lg border border-border bg-secondary outline-none focus:brightness-150 transition-all"
                    type="text"
                    placeholder="Enter video URL..."
                />
                <button
                    className="p-3 h-12 border border-white bg-white rounded-r-lg text-black font-medium 
                    hover:bg-secondary hover:text-white active:bg-white active:text-black transition-all"
                >
                    <label>Download</label>
                </button>
            </form>
            <div className="m-3">
                <h1 className="mt-8 text-bold text-xl">Download Options:</h1>
                <div className="mt-3 mb-1 border-t border-t-border">
                    <hr className="opacity-0"/>
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
    return (
        <div className="max-w-full">
            <div className="m-3 flex flex-col rounded-lg bg-primary">
                <MediaConsole />
                <MediaControl />
            </div>
        </div>
    );
}
