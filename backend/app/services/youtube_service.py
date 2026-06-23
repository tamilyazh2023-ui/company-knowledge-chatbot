from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs


def extract_video_id(url: str) -> str:
    """
    Extract YouTube video ID from URL.
    """
    parsed_url = urlparse(url)

    if parsed_url.hostname in ["www.youtube.com", "youtube.com"]:
        return parse_qs(parsed_url.query).get("v", [""])[0]

    elif parsed_url.hostname == "youtu.be":
        return parsed_url.path[1:]

    return ""


def get_youtube_transcript(url: str) -> str:
    """
    Download transcript from a YouTube video.
    """
    video_id = extract_video_id(url)

    if not video_id:
        return "Invalid YouTube URL."

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)

        text = " ".join(
            item["text"]
            for item in transcript
        )

        return text[:12000]

    except Exception as e:
        return f"Transcript Error: {str(e)}"