import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Ajanta Associates'
const BASE_URL = 'https://ajantaworld.in'
const DEFAULT_IMAGE = `${BASE_URL}/Ajanta logo.png`
const DEFAULT_DESCRIPTION =
  "Ajanta Associates – Bangalore's trusted store for Ajanta clocks, wall clocks, fans, LED lights, torches and home appliances. Shop online with fast delivery across India."

/**
 * SEOHead – drop this into any page to set per-page meta tags.
 *
 * Props:
 *  title        – page title (appended with " | Ajanta Associates")
 *  description  – meta description (max ~160 chars)
 *  keywords     – comma-separated keywords string
 *  canonical    – full canonical URL (defaults to BASE_URL)
 *  image        – OG image URL
 *  type         – OG type, default "website"
 *  noIndex      – set true for login/account/checkout pages
 *  schema       – optional JSON-LD object to inject
 */
export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = '',
  canonical = BASE_URL,
  image = DEFAULT_IMAGE,
  type = 'website',
  noIndex = false,
  schema = null,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Clocks, Fans & Lighting in Bangalore`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD schema */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}
