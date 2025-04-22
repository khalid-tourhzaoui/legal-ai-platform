// src/app/api/ask/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { question, language = 'fr' } = await request.json();
    
    if (!question) {
      return NextResponse.json(
        { error: 'La question est requise' },
        { status: 400 }
      );
    }

    // Instructions pour contextualiser la réponse sur le droit marocain
    const systemPrompt = language === 'fr' 
      ? "Vous êtes un assistant juridique spécialisé dans le droit marocain. Fournissez des informations précises, fiables et à jour sur la législation marocaine. Citez les articles de loi pertinents quand c'est possible. Précisez quand une information pourrait nécessiter une consultation avec un avocat."
      : "You are a legal assistant specialized in Moroccan law. Provide accurate, reliable, and up-to-date information on Moroccan legislation. Cite relevant law articles when possible. Specify when information might require consultation with a lawyer.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    return NextResponse.json({ 
      answer: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error processing legal question:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre question juridique' },
      { status: 500 }
    );
  }
}