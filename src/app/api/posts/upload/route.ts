import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const POST = async (request: NextRequest) => {
    try {
        if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
            return NextResponse.json({ data: null, message: "Invalid request type" }, { status: 400 });
        }

        const formData = await request.formData();
        const file = (formData.get("file") as Blob) || null;
    
        if (!file) {
            return NextResponse.json({ data: null, message: "Invalid file" }, { status: 400 });
        }
    
        const today = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }).split("/");
        const UPLOAD_DIR = `uploads${path.sep}${today[2]}-${today[1]}-${today[0]}`;
    
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }
    
        const uniqueSuffix = uuidv4();
        const filename = `${uniqueSuffix}-${(file as File).name}`;
        const relativePath = `${UPLOAD_DIR}${path.sep}${filename}`;
    
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(path.resolve(relativePath), buffer);
    
        return NextResponse.json({ data: `/${relativePath}`, message: "Success" });
    } catch (error) {
        return NextResponse.json({ data: null, message: "Something went wrong" }, { status: 500 });
    }
};
