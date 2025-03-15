import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/db-connect";
import User from "@/models/User";
import Validator from "validatorjs";
import { hashSync } from "bcrypt";

export async function POST(request: NextRequest) {
    // try {
        const body = Object.fromEntries(await request.formData());
        const rules = {
            username: "required",
            firstName: "required",
            lastName: "required",
            email: "required|email",
            password: "required|confirmed",
        };

        let validation = new Validator(body, rules);
        if (validation.fails()) {
            return NextResponse.json({ data: validation.errors.all(), message: "Data validation error" }, { status: 400 });
        }

        await dbConnect();

        await User.create({
            username: body.username,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashSync(body.password, 10),
        });
        return NextResponse.redirect(new URL("/posts", request.url));
    // } catch (error) {
        // return NextResponse.json({ data: error, message: "Something went wrong" }, { status: 500 });
    // }
}
