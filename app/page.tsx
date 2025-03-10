import Link from "next/link";
import NavBar from "./components/ui/NavBar";

export default function Home() {
    return (
        <div className="p-2 w-full h-full">
            <div className="my-5 mt-15 flex justify-center ">
                <h1 className="text-4xl md:text-7xl font-lora">
                    Welcome to Omni
                </h1>
            </div>
            <div className="flex justify-center text-center">
                <p>
                    This is a locally hosted web tool. With the little tools you
                    normally need to search for. All in one spot.
                </p>
            </div>
            <div className="mt-10 mb-3 flex justify-center">
                <h2 className="text-3xl font-bold">What's included:</h2>
            </div>
            <div className="flex justify-center">
                <ul className="space-y-5">
                    <li>
                        <Link href="/transfertool">📁 Local file transfer</Link>
                    </li>
                    <li>
                        <Link href="/mediadownloader">📼 Media downloader</Link>
                    </li>
                    <li>
                        <Link href="/gifmaker">🎞️ Gif Maker</Link>
                    </li>
                    <li>
                        <Link href="/colorswatch">🎨 Color Swatches</Link>
                    </li>
                </ul>
            </div>
            <div className="my-10 flex justify-center">
                <p className="italic text-center">
                    To get started. Visit the tools using the bar on the top ⬆️
                </p>
            </div>
        </div>
    );
}
