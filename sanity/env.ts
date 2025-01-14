export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-22";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const token = process.env.SANITY_TOKEN;

if (!token) {
  console.warn(
    "The environment variable SANITY_TOKEN is not set. This is required for write operations."
  );
} else {
  console.log("The environment variable SANITY_TOKEN is set.");
}

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
