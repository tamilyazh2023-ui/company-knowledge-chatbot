import requests
from bs4 import BeautifulSoup


def extract_website_text(url: str) -> str:
    """
    Downloads a webpage and extracts its visible text.
    """

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/137.0 Safari/537.36"
        )
    }

    try:
        response = requests.get(
            url,
            headers=headers,
            timeout=10
        )

        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        # Remove unwanted HTML tags
        for tag in soup(["script", "style", "noscript"]):
            tag.decompose()

        text = soup.get_text(separator=" ", strip=True)

        if not text:
            return "No readable text found on the website."

        return text[:12000]

    except requests.exceptions.RequestException as e:
        return f"Website Error: {e}"

    except Exception as e:
        return f"Error: {e}"