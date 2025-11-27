import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function SwatchBlock({
    index,
    data,
}: {
    index: number;
    data: Swatch;
}) {
    const [edit, setEdit] = useState<boolean>(false);
    const [colors, setColors] = useState<Swatch>(data);

    const handleLabelChange = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const newLabel = form.elements.namedItem("label") as HTMLInputElement;

        e.preventDefault();
        if (newLabel.value !== colors.label) {
            if (newLabel.value != "") {
                setColors((prev) => ({
                    ...prev,
                    label: newLabel.value,
                }));
            }
        }

        setEdit(!edit);
    }

    const handleCopy = (colorCode: string) => {
        try {
            navigator.clipboard.writeText(colorCode);
            toast(`Color ${colorCode.toUpperCase()} has been copied!`);
        } catch (e) {
            return;
        }
    }

    return (
        <div
            key={index}
            className="m-3 p-3 flex flex-col items-center justify-evenly h-fit border border-border bg-secondary rounded-md min-h-60"
        >
            <div className="w-full">
                <div
                    className="mt-3 w-full grid grid-cols-2 gap-2 justify-items-center items-start lg:flex lg:flex-row justify-evenly
                            overflow-auto"
                >
                    {colors.colors.map((color: Swatch, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center max-w-25"
                            >
                                <div
                                    className="aspect-square w-25 h-25 rounded-md cursor-pointer hover:border border-gray-300 duration-75"
                                    onClick={() => handleCopy(color.hexCode)}
                                    style={{
                                        backgroundColor: color.hexCode,
                                    }}
                                ></div>
                                <label className="m-1 text-balance text-center overflow-hidden">
                                    {color.label}
                                </label>
                            </div>
                        );
                    })}
                </div>

                {edit ? (
                    <form
                        onSubmit={handleLabelChange}
                        className="w-full flex justify-between items-center pt-3"
                    >
                        <button type="button">
                            <Image
                                src="/assets/RemoveIcon.svg"
                                alt="X"
                                width={24}
                                height={24}
                            />
                        </button>
                        <input
                            name="label"
                            type="text"
                            className="text-center"
                            placeholder={colors.label}
                            maxLength={20}
                        />
                        <button type="submit" className="cursor-pointer">
                            <Image
                                src="/assets/CheckIcon.svg"
                                alt="Done"
                                width={30}
                                height={30}
                            />
                        </button>
                    </form>
                ) : (
                    <div className="w-full flex justify-between items-center pt-3">
                        <label className="ml-auto">{colors.label}</label>
                        <button
                            className="ml-auto cursor-pointer"
                            onClick={() => setEdit(!edit)}
                        >
                            <Image
                                src="/assets/EditIcon.svg"
                                alt="Edit Button"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
