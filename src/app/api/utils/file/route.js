
// import multer from 'multer';

import { NextResponse } from "next/server";
import formidable from "formidable";
import {writeFile} from 'fs/promises'
// const upload = multer({
//   dest: './public/uploads',
// });




export async function POST(request) {
    // const file2 = await req.json();
    // console.log(file2.data,"file2e3");
    // console.log(process.cwd())
//   const file = await upload.single('image');
    const dw =  await request.formData();
    const file = dw.get("image");
    const byteData = await file.arrayBuffer()
    const buffer = Buffer.from(byteData)
    const path = `./public/assets/${file.name}`
    await writeFile(path,buffer)


    
//   if (!file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   const imageUrl = `/uploads/${file.originalname}`;

  return NextResponse.json({ "Statue":"Success","imgPath":`/assets/${file.name}`});
}