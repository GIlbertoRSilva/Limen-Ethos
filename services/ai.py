from config.prompts import REFLECTION_PROMPT
from core.session import session

def guided_reflection():
    text = session.get("text", "")
    mood = session.get("mood", "")

    return REFLECTION_PROMPT.format(
        mood=mood,
        text=text[:500]
    )
