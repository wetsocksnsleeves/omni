"use client";
import Image from "next/image";
import { useState } from "react";
import SwatchBlock from "../components/ui/SwatchBlock";

export interface Color {
    hexCode: string;
    label: string;
}

export interface Swatch {
    label: string;
    colors: Color[];
}

export default function ColorSwatch() {
    // Test swatch
    const exampleSwatch: Swatch = {
        label: "Test Swatch",
        colors: [
            { hexCode: "#0b0c0d", label: "Background color" },
            { hexCode: "#2e2e2c", label: "border" },
            { hexCode: "#191b1c", label: "PriMary" },
            { hexCode: "#ededed", label: "12345678910" },
        ],
    };

    // Test Data
    const data: Swatch[] = [
        exampleSwatch,
        exampleSwatch,
        exampleSwatch,
        exampleSwatch,
    ];

    return (
        <div className="m-5 flex flex-col">
            <div className="my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border rounded-lg bg-primary w-full h-fit">
                {data.map((swatch, index) => {
                    return (
                        <SwatchBlock index={index} data={swatch}/>
                    );
                })}
            </div>
        </div>
    );
}
