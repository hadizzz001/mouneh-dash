import {PrismaClient} from '@prisma/client';

export const dynamic = "force-dynamic";

const client = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;