// Google Places API integration scaffold.
// When you have a Google Business Profile, fill in GOOGLE_PLACE_ID and
// GOOGLE_PLACES_API_KEY in your .env file and this will start syncing reviews.

export type GoogleReview = {
  googleId: string;
  authorName: string;
  rating: number;
  text: string;
  googleTime: Date;
};

export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    // Not configured yet — return empty so the sync route is a no-op
    return [];
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${placeId}` +
    `&fields=reviews` +
    `&reviews_sort=newest` +
    `&key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Google Places API error: ${res.status}`);

  const json = await res.json();
  const raw: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number; // Unix seconds
  }> = json.result?.reviews ?? [];

  return raw.map((r) => ({
    // Google doesn't expose a stable review ID via Places API,
    // so we derive one from author + timestamp.
    googleId: `google_${Buffer.from(r.author_name + r.time).toString("base64")}`,
    authorName: r.author_name,
    rating: r.rating,
    text: r.text,
    googleTime: new Date(r.time * 1000),
  }));
}
