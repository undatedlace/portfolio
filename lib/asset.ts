// Prefix public-folder URLs with the basePath when deployed under a sub-path.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${path.replace(/^\//, "")}`;
