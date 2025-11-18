import { MEDIA_URL } from "@/libs/constants/url.constants";

export function getMediaSource(path?: string | null) {
  if (!MEDIA_URL || !path) return;
  return MEDIA_URL + path;
}
