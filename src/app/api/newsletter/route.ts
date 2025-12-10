import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function GET() {
    await dbConnect();
    try {
        const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: subscribers });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const { email } = body;

        // Check if duplicate
        const exists = await Newsletter.findOne({ email });
        if (exists) {
            return NextResponse.json({ success: false, error: 'Email already subscribed' }, { status: 400 });
        }

        const subscriber = await Newsletter.create({ email });
        return NextResponse.json({ success: true, data: subscriber }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
