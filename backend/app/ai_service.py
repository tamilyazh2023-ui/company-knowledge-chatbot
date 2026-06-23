import ollama

def generate_answer(question, context):
    """
    Generate an answer using Phi-3 Mini based only on the provided context.
    """

    prompt = f"""
You are a company assistant.

Answer ONLY from the context below.

If the answer is not found in the context,
reply exactly:

"I don't have information about that company."

------------------------
CONTEXT
------------------------

{context}

------------------------
QUESTION
------------------------

{question}

------------------------
ANSWER
------------------------
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

    return response["message"]["content"]