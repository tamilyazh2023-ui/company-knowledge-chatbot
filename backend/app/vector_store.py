import uuid
import chromadb

# Connect to ChromaDB
client = chromadb.PersistentClient(
    path="chroma_db"
)

COLLECTION_NAME = "company_knowledge"


def store_embeddings(chunks, embeddings):
    """
    Clear old knowledge base and store new embeddings.
    """

    # Delete old collection if it exists
    try:
        client.delete_collection(COLLECTION_NAME)
        print("Old knowledge base cleared.")
    except Exception:
        print("No previous knowledge base found.")

    # Create a fresh collection
    collection = client.get_or_create_collection(
        name=COLLECTION_NAME
    )

    ids = [str(uuid.uuid4()) for _ in chunks]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings.tolist()
    )

    print(f"Stored {len(chunks)} chunks into ChromaDB.")
    print(f"Collection Count: {collection.count()}")