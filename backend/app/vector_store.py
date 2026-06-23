import chromadb

from chromadb.config import Settings

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="company_knowledge"
)


def store_embeddings(chunks, embeddings):
    """
    Store chunks and embeddings into ChromaDB.
    """

    ids = []

    for i in range(len(chunks)):
        ids.append(str(i))

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings.tolist()
    )

    print(f"\nStored {len(chunks)} chunks into ChromaDB.")