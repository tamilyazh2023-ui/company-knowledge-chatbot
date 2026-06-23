from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse


def get_internal_links(base_url, html):
    """
    Extract all internal links from a webpage.
    """

    soup = BeautifulSoup(html, "lxml")

    links = set()

    base_domain = urlparse(base_url).netloc

    for tag in soup.find_all("a", href=True):

        href = tag["href"]

        # Convert relative URL to absolute URL
        full_url = urljoin(base_url, href)

        parsed = urlparse(full_url)

        # Keep only links from the same domain
        if parsed.netloc == base_domain:
            links.add(full_url)

    return list(links)


def filter_useful_links(links):
    """
    Filter useful company-related links and remove unwanted pages.
    """

    useful_keywords = [
        "about",
        "company",
        "product",
        "products",
        "service",
        "services",
        "solution",
        "solutions",
        "career",
        "careers",
        "contact",
        "leadership",
        "business",
        "technology",
        "ai"
    ]

    unwanted_keywords = [
        "privacy",
        "cookie",
        "cookies",
        "terms",
        "legal",
        "store",
        "download",
        "investor",
        "support",
        "locale",
        "signin",
        "login",
        "register",
        "account"
    ]

    filtered_links = []
    seen = set()

    for link in links:

        # Remove URL fragments (#section)
        link = link.split("#")[0]

        # Remove query parameters (?id=...)
        link = link.split("?")[0]

        # Remove duplicates
        if link in seen:
            continue

        seen.add(link)

        lower = link.lower()

        # Skip unwanted pages
        if any(keyword in lower for keyword in unwanted_keywords):
            continue

        # Keep only useful pages
        if any(keyword in lower for keyword in useful_keywords):
            filtered_links.append(link)

    return filtered_links