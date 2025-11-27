export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const { stdout } = await execPromise(`yt-dlp -o - ${body.url}`);
        return new Response(stdout);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
