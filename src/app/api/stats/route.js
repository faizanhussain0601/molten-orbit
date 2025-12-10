import { NextResponse } from 'next/server';
import Project from '@/models/Project';
import Client from '@/models/Client';
import Contact from '@/models/Contact';
import Newsletter from '@/models/Newsletter';
import dbConnect from '@/lib/mongodb';

export async function GET() {
    try {
        await dbConnect();

        const [projectCount, clientCount, contactCount, subscriberCount] = await Promise.all([
            Project.countDocuments(),
            Client.countDocuments(),
            Contact.countDocuments(),
            Newsletter.countDocuments(),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                projects: projectCount,
                clients: clientCount,
                contacts: contactCount,
                subscribers: subscriberCount,
            },
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
