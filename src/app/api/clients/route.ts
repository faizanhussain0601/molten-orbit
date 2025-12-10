import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    await dbConnect();
    try {
        const clients = await Client.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: clients });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const { name, designation, description, image } = body;

        // Handle Image Upload (expecting base64)
        let imageUrl = '';
        if (image) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');
            const fileName = `${uuidv4()}.png`;
            const uploadDir = path.join(process.cwd(), 'public/uploads');

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            fs.writeFileSync(path.join(uploadDir, fileName), buffer);
            imageUrl = `/uploads/${fileName}`;
        }

        const client = await Client.create({
            name,
            designation,
            description,
            imageUrl,
        });

        return NextResponse.json({ success: true, data: client }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
