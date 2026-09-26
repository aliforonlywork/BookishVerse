import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url, image }) {
  const siteName = 'BookishVerse';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Original Book Summaries`;
  const desc = description || 'Original, in-depth book summaries and self-improvement articles — get the key ideas from top books in minutes.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}