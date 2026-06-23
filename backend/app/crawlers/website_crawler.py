import requests

from app.crawlers.html_parser import extract_text
from app.crawlers.link_filter import (
    get_internal_links,
    filter_useful_links,
)

import requests

from app.utils import save_company_data

def fetch_page(url):
    try:
        response = requests.get(
            url,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/137.0 Safari/537.36"
                )
            },
            timeout=20,
            allow_redirects=True
        )

        print("Status Code:", response.status_code)
        print("Final URL:", response.url)

        response.raise_for_status()

        return response.text

    except Exception as e:
        print("Fetch Error:", e)
        return None


def crawl_website(start_url):

    html = fetch_page(start_url)

    if not html:
        print("Failed to fetch homepage!")
        return ""

    print("Homepage downloaded successfully!")

    links = get_internal_links(start_url, html)

    print(f"Total links found: {len(links)}")

    useful_links = filter_useful_links(links)

    print(f"Useful links found: {len(useful_links)}")

    company_text = ""

    for link in useful_links:

        print(f"Crawling: {link}")

        page = fetch_page(link)

        if page:

            text = extract_text(page)

            print(f"Extracted {len(text)} characters")

            company_text += "\n\n" + text

        else:
            print(f"Failed: {link}")

    print(f"\nTotal extracted characters: {len(company_text)}")

    save_company_data(company_text)
    return company_text