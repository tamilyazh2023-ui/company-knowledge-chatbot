from bs4 import BeautifulSoup


def extract_text(html):
    """
    Extract clean text from HTML.
    """

    soup = BeautifulSoup(html, "lxml")

    # Remove unwanted tags
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    text = soup.get_text(separator=" ", strip=True)

    return text