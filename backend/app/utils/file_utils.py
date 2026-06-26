import os

def save_company_data(text):
    """
    Save crawled website text to data/company_data.txt
    """

    os.makedirs("data", exist_ok=True)

    with open("data/company_data.txt", "w", encoding="utf-8") as file:
        file.write(text)

    print("Company data saved successfully.")