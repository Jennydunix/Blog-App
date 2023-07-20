// handles the custom request handler for this route(app/api/route)
import prisma from "@/prisma";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";

// add connection functions
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error;
    ("Database Connection Unsuccessful");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    // to fetch all of the blocks from the database
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();
    // connect application to database
    await main(); //this is the data

    // insert data into database
    const post = await prisma.post.create({ data: { description, title } });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
