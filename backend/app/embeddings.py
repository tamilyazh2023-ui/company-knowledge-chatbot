from sentence_transformers import SentenceTransformer

# Load embedding model only once
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


def create_embeddings(chunks):
    """
    Convert text chunks into embeddings.
    """

    embeddings = embedding_model.encode(
        chunks,
        show_progress_bar=True
    )

    return embeddings