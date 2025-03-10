"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function NavBar() {
    type Routes = {
        route: string;
        label: string;
    };

    const routes: Routes[] = [
        { route: "/transfertool", label: "Transfer Tool" },
        { route: "/mediadownloader", label: "Media Downloader" },
        { route: "/gifmaker", label: "Gif Maker" },
        { route: "/colorswatch", label: "Color Swatches" },
    ];

    const [burger, setBurger] = useState(false);

    const routeName = usePathname();

    return (
        <div className="">
            <div className="bg-primary outline outline-1 outline-border flex items-center justify-between min-w-screen md:h-20 p-5 gap-5">
                <span className="hover:scale-105 transition-all">
                    <Link href={"/"} className="text-xl font-lora">
                        Omni
                    </Link>
                </span>
                <nav
                    className={`${burger ? "hidden" : "sm:flex flex-row w-full h-full items-center justify-center gap-8 hidden"}`}
                >
                    {routes.map((item) => (
                        <Link
                            href={`${item.route}`}
                            key={item.route}
                            className="hover:glow transition-all"
                        >
                            <span
                                className={`${routeName == item.route ? "italic font-bold" : ""}`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
                <div></div>
                <button
                    type="button"
                    onClick={() => setBurger(!burger)}
                    className="relative w-6 h-6 sm:hidden active:rotate-[-90deg] active:opacity-0 transition-all"
                >
                    {burger ? (
                        <Image
                            src="/closeMenu.svg"
                            alt="Burger Menu"
                            fill={true}
                        />
                    ) : (
                        <Image
                            src="/burgerMenu.svg"
                            alt="Burger Menu"
                            fill={true}
                        />
                    )}
                </button>
            </div>
            <nav
                className={`${burger ? "p-3 bg-primary flex flex-col w-full h-full justify-start items-start" : "hidden"}`} >
                {routes.map((item) => (
                    <Link
                        href={`${item.route}`}
                        key={item.route}
                        className="hover:glow transition-all w-full py-3"
                    >
                        <span
                            className={`${routeName == item.route ? "italic font-bold" : ""}`}
                        >
                            {item.label}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
