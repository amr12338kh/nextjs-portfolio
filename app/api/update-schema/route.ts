// app/api/update-schema/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { generateSchemaType } from "@/sanity/lib/generateSchema";
import fs from "fs/promises";
import path from "path";

export async function POST() {
  try {
    const models = await client.fetch('*[_type == "schemaModel"]');
    const schemaTypes = models.map(generateSchemaType);

    const schemaContent = `
      import { SchemaTypeDefinition } from "sanity";
      export const schema: { types: SchemaTypeDefinition[] } = {
        types: [${schemaTypes.map((type) => JSON.stringify(type, null, 2)).join(",\n")}],
      };
    `;

    await fs.writeFile(
      path.join(process.cwd(), "schemas", "generated.ts"),
      schemaContent
    );

    return NextResponse.json({ message: "Schema updated successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating schema", error },
      { status: 500 }
    );
  }
}
