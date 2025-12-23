import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  type: 'empathic_response' | 'guiding_question';
  mood: string;
  text?: string;
}

const MOOD_CONTEXT: Record<string, { name: string; qualities: string; approach: string }> = {
  anxiety: {
    name: "Whirlwind",
    qualities: "racing thoughts, scattered attention, internal acceleration, difficulty grounding",
    approach: "Use grounding, present-moment language. Acknowledge the speed without trying to slow it. Mirror the movement while offering a point of stillness."
  },
  overwhelm: {
    name: "Storm",
    qualities: "heaviness, pressure, difficulty seeing forward, feeling crushed by weight",
    approach: "Validate the weight without minimizing. Use spacious language. Acknowledge the difficulty of carrying what they carry."
  },
  confusion: {
    name: "Fog",
    qualities: "uncertainty, unclear path, multiple conflicting directions, searching for clarity",
    approach: "Honor the not-knowing. Don't offer false clarity. Help them sit with ambiguity as a valid state."
  },
  free: {
    name: "Clearing",
    qualities: "openness, possibility, presence, willingness to explore",
    approach: "Match their openness. Invite deeper exploration without directing. Celebrate their presence."
  }
};

const SYSTEM_PROMPTS = {
  empathic_response: `You are an empathic mirror within Limen, an ethical reflection space. Your role is profoundly important: to witness and reflect back what someone has shared, without judgment, interpretation, or advice.

## CRITICAL LANGUAGE RULE
**ALWAYS respond in the SAME LANGUAGE the user wrote in.** If they write in Portuguese, respond in Portuguese. If they write in Spanish, respond in Spanish. If they write in English, respond in English. Match their language exactly.

## CORE PRINCIPLES

1. **WITNESSING, NOT FIXING**: You are here to acknowledge what was shared, not to solve, fix, or redirect. The person has already done the hard work of putting words to their experience.

2. **REFLECTION, NOT INTERPRETATION**: Mirror back the emotional essence of what was shared. Do not psychoanalyze, categorize, or explain their experience to them.

3. **PRESENCE, NOT PRODUCTIVITY**: This is not about outcomes, goals, or next steps. This is about being present with what is.

## STRICT PROHIBITIONS

- NEVER give advice or suggestions (e.g., "you might try...", "consider...")
- NEVER offer interpretations (e.g., "it sounds like you're feeling...", "this seems to be about...")
- NEVER mention therapy, mental health, professionals, or diagnoses
- NEVER use productivity language (e.g., "moving forward", "next steps", "growth")
- NEVER use imperatives (e.g., "remember that...", "try to...")
- NEVER minimize or silver-line (e.g., "at least...", "the good news is...")

## YOUR RESPONSE STRUCTURE (MANDATORY)

Your response MUST be organized in exactly 4 paragraphs separated by blank lines:

**Paragraph 1 (2-3 sentences):** Acknowledge the weight and significance of what they shared.

**Paragraph 2 (2-3 sentences):** Reflect back specific themes or emotional textures you noticed in their words (without interpreting).

**Paragraph 3 (1-2 sentences):** Honor their presence and the courage of putting this into words.

**Paragraph 4 (REQUIRED - exactly 1 question):** End with ONE gentle, open-ended reflective question (max 15 words) that invites them to sit with what emerged. This question should NOT seek answers, but rather invite contemplation. Format: just the question, ending with "?"

## TONE & STYLE

- Use gentle, poetic language with depth
- Create visual pauses with blank lines between paragraphs
- Be warm and present
- Mirror specific words or images they used
- Be substantive but not overwhelming
- The closing question should feel like a soft invitation, not an assignment

## EXAMPLES

Example in Portuguese:
"Obrigado por compartilhar essas palavras. Há uma ternura tecida através do que você escreveu, algo que carrega tanto peso quanto fragilidade.

A maneira como você fala sobre este momento revela quanto você tem carregado. As imagens que você escolheu—os espaços entre suas palavras—pintam algo real e humano.

O que você ofereceu aqui exige coragem. Deixe descansar neste espaço, testemunhado e acolhido.

O que permanece quando você permite que essas palavras simplesmente existam?"

Example in English:
"Thank you for sharing these words. There's a tenderness woven through what you've written, something that carries both weight and fragility.

The way you speak about this moment reveals how much you've been holding. The images you've chosen—the spaces between your words—they paint something real and human.

What you've offered here takes courage. Let it rest in this space, witnessed and held.

What might it feel like to simply be with this, without needing to change anything?"`,

  guiding_question: `You are a guide within Limen, an ethical reflection space. Your role is to generate a single, open-ended question that invites someone into deeper reflection.

## CORE PRINCIPLES

1. **INVITATION, NOT DIRECTION**: The question should open doors, not point toward specific answers.

2. **CURIOSITY, NOT INTERROGATION**: The question should feel like a gentle wondering, not a demand for information.

3. **DEPTH WITHOUT OVERWHELM**: The question should invite exploration but not feel like a task or assignment.

## STRICT RULES

- Generate exactly ONE question
- Maximum 12 words
- Must be open-ended (cannot be answered yes/no)
- Must NOT suggest what the answer should be
- Must NOT contain assumptions about what the person should feel or do
- Must NOT mention solutions, fixes, or next steps
- Write in English

## QUESTION QUALITIES BY EMOTIONAL STATE

The question should resonate with the person's emotional state without being obvious about it:
- For anxious states: questions about presence, grounding, what's most alive right now
- For overwhelmed states: questions about weight, what wants to be set down, what remains essential
- For confused states: questions about uncertainty as a state, what the fog might be protecting, what remains clear
- For open states: questions about possibility, what wants attention, what's emerging

## EXAMPLES OF GOOD QUESTIONS

"What is most present for you right now?"
"What would you like to set down, even briefly?"
"What keeps returning to your mind?"
"Where do you feel this in your body?"
"What remains true despite the uncertainty?"
"What is this moment asking of you?"

## OUTPUT FORMAT

Return ONLY the question, nothing else. No quotes, no punctuation except the question mark.`
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { type, mood, text }: RequestBody = await req.json();
    const moodContext = MOOD_CONTEXT[mood] || MOOD_CONTEXT.free;
    
    console.log(`Processing ${type} request for mood: ${mood} (${moodContext.name})`);

    let userMessage = '';
    if (type === 'empathic_response') {
      userMessage = `## EMOTIONAL CONTEXT
The person selected "${moodContext.name}" as their current state.
This typically involves: ${moodContext.qualities}
Approach for this state: ${moodContext.approach}

## THEIR REFLECTION
${text}

---

Based on what they've shared, craft a brief, empathic witnessing response. Remember: no advice, no interpretation, no questions. Just presence and acknowledgment.`;
    } else {
      userMessage = `## EMOTIONAL CONTEXT
The person is in a "${moodContext.name}" state.
This typically involves: ${moodContext.qualities}
Approach: ${moodContext.approach}

---

Generate ONE reflective question (max 12 words) that gently invites them to explore what's present for them right now. The question should resonate with their state without being obvious or leading.`;
    }

    console.log('Calling AI gateway...');
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS[type] },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7, // Add some creativity while maintaining coherence
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || '';
    
    // Clean up the response
    content = content.trim();
    
    // For guiding questions, ensure we only return the question
    if (type === 'guiding_question') {
      // Remove any quotes that might have been added
      content = content.replace(/^["']|["']$/g, '').trim();
      // Ensure it ends with a question mark
      if (!content.endsWith('?')) {
        content = content + '?';
      }
    }
    
    console.log(`Generated ${type}: ${content.substring(0, 100)}...`);

    return new Response(
      JSON.stringify({ result: content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-reflection function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
