import ollama


def generate_answer(question, context):
    """
    Generate an answer using Phi-3 Mini based only on the retrieved context.
    """

    # No context found
    if not context or str(context).strip() == "":
        return "I don't have information about that in the uploaded company documents."

    # Convert retrieved chunks list into a single string
    if isinstance(context, list):
        context = "\n\n".join(context)

    prompt = f"""
You are an AI assistant for a Company Knowledge Chatbot.

Rules:
1. Answer ONLY using the information provided in the CONTEXT.
2. Do NOT use your own knowledge.
3. If the answer is not present in the CONTEXT, reply exactly:
I don't have information about that company.
4. Keep the answer clear and concise.

=========================
CONTEXT
=========================

{context}

=========================
QUESTION
=========================

{question}

=========================
ANSWER
=========================
"""

    response = ollama.chat(
        model="phi3:mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"].strip()