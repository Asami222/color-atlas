// lib/metadata.ts
import type { Metadata } from "next";
import { SITE_NAME, SITE_DESC, SITE_URL } from "@/constants";

export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const desc = description ?? SITE_DESC;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description: desc,
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/ogp.jpg`, // ← 固定OGP
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [`${SITE_URL}/ogp.jpg`], // ← 固定OGP
    },
    alternates: {
      canonical: url,
    },
  };
}