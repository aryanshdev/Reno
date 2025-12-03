import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { v2 } from "cloudinary";
import path from "path";

const db = mysql.createPool({
  uri: process.env.DBURL,
});

v2.config({
  url: process.env.CLOUDINARY_URL,
});
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    
    const name = data.get("name") as string;
    const emailID = data.get("emailID") as string;
    const contact = data.get("contact") as string;
    const address = data.get("address") as string;
    const city = data.get("city") as string;
    const state = data.get("state") as string;
    const imageFile = data.get("image") as File;

    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const insertQuery = `
      INSERT INTO schools (name, address, city, state, contact, email_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const buffer = Buffer.from(await imageFile.arrayBuffer());

    const [result]: any = await db.execute(insertQuery, [
      name, address, city, state, contact, emailID
    ]);

    const newSchoolId = result.insertId;
    
    const fileBase64 = `data:${imageFile.type};base64,${buffer.toString('base64')}`;

    const uploadResult = await v2.uploader.upload(fileBase64, {
      folder: "school_directory",
      public_id: newSchoolId.toString(),
      overwrite: true,
      resource_type: "auto"
    });

    return NextResponse.json({ message: "School added successfully", id: newSchoolId }, { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM schools ORDER BY id DESC");
     return NextResponse.json({ schools: rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}