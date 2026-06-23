import google.generativeai as genai

from app.config import GEMINI_API_KEY

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Load the model
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_reply(message: str) -> str:
    """
    Sends the user's message to Gemini and returns the AI response.
    """
    try:
        response = model.generate_content(message)
        return response.text.strip()

    except Exception as e:
        return f"Error: {str(e)}"