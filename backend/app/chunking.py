from langchain_text_splitters import RecursiveCharacterTextSplitter


def create_chunks(text):
    """
    Split large text into smaller chunks for embeddings.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ]
    )

    chunks = splitter.split_text(text)

    print(f"\nTotal Chunks Created: {len(chunks)}")

    return chunks