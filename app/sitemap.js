const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cerocomplicado.com";

export default function sitemap() {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
