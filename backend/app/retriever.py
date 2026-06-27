import chromadb
from sentence_transformers import SentenceTransformer

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

client = chromadb.PersistentClient(path="chroma_db")

COLLECTION_NAME = "company_knowledge"


def search_company_knowledge(question, top_k=5):

    # Always get the latest collection
    try:
        collection = client.get_collection(COLLECTION_NAME)
    except Exception:
        print("Knowledge base not found.")
        return []

    if collection.count() == 0:
        print("Knowledge base is empty.")
        return []

    print(f"\nCollection Count: {collection.count()}")

    question_embedding = embedding_model.encode(question)

    results = collection.query(
        query_embeddings=[question_embedding.tolist()],
        n_results=top_k
    )

    print("\nRetriever Results:")
    print(results)

    documents = results.get("documents", [])

    if not documents or len(documents[0]) == 0:
        return []

    unique_docs = []

    seen = set()

    for doc in documents[0]:

        if doc not in seen:

            seen.add(doc)

            unique_docs.append(doc)

    print("\nRetrieved Context:")
    print(unique_docs)

    return unique_docs