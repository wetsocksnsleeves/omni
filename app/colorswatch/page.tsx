interface Color {
    hexCode: string;
    label: string;
}

interface Swatch {
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
            <div>
                <h1 className="font-lora text-3xl">My swatches</h1>
            </div>
            <div className="my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border rounded-lg bg-primary w-full h-fit">
                {data.map((swatch, index) => {
                    return (
                        <div
                            key={index}
                            className="m-3 flex flex-col items-center justify-evenly h-fit border border-border bg-secondary rounded-md"
                        >
                            <div
                                className="mt-3 w-full grid grid-cols-2 gap-2 justify-items-center items-start lg:flex lg:flex-row justify-evenly
                            overflow-auto"
                            >
                                {swatch.colors.map((color, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center max-w-25"
                                        >
                                            <div
                                                className={`aspect-square w-25 h-25`}
                                                style={{
                                                    backgroundColor:
                                                        color.hexCode,
                                                }}
                                            ></div>
                                            <label className="m-1 text-balance text-center overflow-hidden">
                                                {color.label}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            <label className="mb-3 lg:mt-0 mt-3">{swatch.label}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
