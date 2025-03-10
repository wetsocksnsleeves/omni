type loadingProps = {
    text?: string;
};

export default function Loading({text = "Loading..."}: loadingProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-30">
            <div
                className="drop-shadow-lg flex flex-col items-center outline outline-1 outline-accent_one bg-primary p-4 py-8 rounded-lg 
                w-1/2 md:w-1/4 max-w-xs max-h-xs"
            >
                <div
                    className="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Loading...</span>
                </div>


                <span className="text-white font-bold mt-3">{text}</span>

            </div>
        </div>
    );
}

