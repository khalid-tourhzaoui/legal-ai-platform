import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { question, language = 'ar' } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Le champ question est requis' },
        { status: 400 }
      );
    }

    // Configuration pour l'API RapidAPI
    const payload = {
      messages: [
        {
          role: 'system',
          content: language === 'ar' 
            ? "أنت مساعد قانوني متخصص في القانون المغربي. قدم معلومات دقيقة وموثوقة ومحدثة عن التشريع المغربي. أذكر المواد القانونية ذات الصلة عندما يكون ذلك ممكنًا. وضح متى قد تتطلب المعلومات استشارة محام."
            : "Vous êtes un assistant juridique spécialisé dans le droit marocain. Fournissez des informations précises, fiables et à jour sur la législation marocaine. Citez les articles de loi pertinents quand c'est possible. Précisez quand une information pourrait nécessiter une consultation avec un avocat."
        },
        {
          role: 'user',
          content: question
        }
      ],
      model: 'gpt-4-turbo',
      max_tokens: 1000,
      temperature: 0.7
    };

    const response = await fetch('https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    return NextResponse.json({ 
      answer,
      question // Renvoyer aussi la question pour référence
    });

  } catch (error) {
    console.error('Error processing legal question:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre question juridique',error },
      { status: 500 }
    );
  }
}