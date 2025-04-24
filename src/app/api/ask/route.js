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

    try {
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
        // On capture l'erreur 500 et renvoie une réponse avec un message par défaut
        console.error(`API request failed with status ${response.status}`);
        return NextResponse.json({ 
          answer: language === 'ar' 
            ? "عذرًا، لم نتمكن من معالجة طلبك في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا أو طرح سؤال آخر."
            : "Désolé, nous n'avons pas pu traiter votre demande actuellement. Veuillez réessayer plus tard ou poser une autre question.",
          question,
          isError: true
        }, 
        { status: 200 }); // Renvoyer un 200 OK pour éviter de bloquer le système
      }

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content || "Aucune réponse disponible.";

      return NextResponse.json({ 
        answer,
        question // Renvoyer aussi la question pour référence
      });
    } catch (error) {
      // Gestion des erreurs de l'API
      console.error('API call error:', error);
      return NextResponse.json({ 
        answer: language === 'ar' 
          ? "عذرًا، حدث خطأ أثناء الاتصال بخدمة المعلومات القانونية. يرجى المحاولة مرة أخرى لاحقًا."
          : "Désolé, une erreur s'est produite lors de la connexion au service d'information juridique. Veuillez réessayer ultérieurement.",
        question,
        isError: true
      }, 
      { status: 200 }); // Renvoyer un 200 OK pour éviter de bloquer le système
    }

  } catch (error) {
    // Gestion des erreurs générales
    console.error('Error processing legal question:', error);
    return NextResponse.json({ 
      answer: "Une erreur s'est produite. Veuillez vérifier votre requête et réessayer.",
      question: "",
      isError: true
    }, 
    { status: 200 }); // Renvoyer un 200 OK pour éviter de bloquer le système
  }
}