export function getMediaSource(path?: string | null) {
  if (!process.env.NEXT_PUBLIC_MEDIA_URL || !path) return;
  return process.env.NEXT_PUBLIC_MEDIA_URL + path;
}
