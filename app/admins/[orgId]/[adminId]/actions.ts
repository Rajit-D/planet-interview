"use server";

import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function roleInput(prevState:any, formData:any){
    const name=formData.get("name") as string;
    const skills=formData.get("skills") as string;
    const experience = formData.get("experience") as number;
    const minATS = formData.get("minATS") as number;
}