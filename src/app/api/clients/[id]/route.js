import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';

export async function DELETE(req, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const deletedClient = await Client.deleteOne({ _id: id });
        if (!deletedClient) {
            return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PUT(req, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const body = await req.json();
        const client = await Client.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!client) {
            return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: client });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
