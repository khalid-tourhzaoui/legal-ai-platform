import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'حقل السؤال مطلوب' },
        { status: 400 }
      );
    }

    // Configuration pour l'API Groq avec Qwen 3-32B - Réponses en arabe uniquement
    const payload = {
      messages: [
        {
          role: 'system',
          content: `أنت مساعد قانوني متخصص في القانون المغربي. يجب أن تجيب باللغة العربية الفصحى فقط.

تعليمات صارمة:
- ابدأ إجابتك مباشرة بالمحتوى العربي
- لا تستخدم أي كلمات أو عبارات بالإنجليزية أو الفرنسية أو أي لغة أخرى
- لا تكتب <think> أو أي تعليقات داخلية
- لا تستخدم كلمات مثل "think", "okay", "let me" أو أي كلمات غير عربية
- اكتب المحتوى باللغة العربية الخالصة فقط من البداية إلى النهاية

المتطلبات القانونية:
- اذكر المواد القانونية ذات الصلة (مثل: المادة X من القانون الجنائي المغربي)
- وضح متى قد تتطلب المعلومات استشارة محام مختص
- قدم إجابات مفصلة ومفيدة ومنظمة
- اذكر المصادر القانونية المغربية ذات الصلة (الدستور، القانون الجنائي، قانون الالتزامات والعقود)
- ابدأ بالإجابة المباشرة ثم قدم التفاصيل
- استخدم نقاط مرقمة أو منظمة عند الضرورة لوضوح أكبر

تذكر: كل كلمة في إجابتك يجب أن تكون باللغة العربية. أي كلمة بلغة أخرى مرفوضة تماماً.`
        },
        {
          role: 'user',
          content: question
        }
      ],
      model: 'llama3-70b-8192',
      max_tokens: 2000,
      temperature: 0.1, // أقل للحصول على إجابات أكثر اتساقاً
      top_p: 0.8,
      stream: false,
      stop: ["<think>", "think", "Let me", "Okay"], // منع الكلمات غير المرغوبة
    };

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(`Groq API request failed with status ${response.status}`);
        const errorText = await response.text();
        console.error('Error details:', errorText);
        
        return NextResponse.json({
          answer: "عذرًا، لم نتمكن من معالجة طلبك في الوقت الحالي. الخدمة مؤقتًا غير متاحة. يرجى المحاولة مرة أخرى لاحقًا.",
          question,
          isError: true,
          errorType: 'api_error'
        }, { status: 200 });
      }

      const data = await response.json();
      let rawAnswer = data.choices?.[0]?.message?.content || "لم يتم العثور على إجابة مناسبة لهذا السؤال.";
      
      // إزالة النص بين <think> و </think>
      const cleanAnswer = (text) => {
        // إزالة كل شيء من <think> إلى </think>
        const cleanedText = text.replace(/<think>[\s\S]*?<\/think>/gi, '');
        // إزالة أي نص يبدأ بـ <think> حتى نهاية السطر إذا لم يكن هناك closing tag
        const finalText = cleanedText.replace(/<think>.*$/gmi, '');
        // إزالة المسافات الفارغة في البداية والنهاية
        return finalText.trim();
      };
      
      const answer = cleanAnswer(rawAnswer);

      // Informations supplémentaires de Groq
      const usage = data.usage || {};
      
      return NextResponse.json({
        answer,
        question,
        model: 'qwen-32b-preview',
        provider: 'groq',
        tokens_used: usage.total_tokens || 0,
        prompt_tokens: usage.prompt_tokens || 0,
        completion_tokens: usage.completion_tokens || 0,
        response_time: data.created ? new Date().getTime() - data.created * 1000 : null
      });

    } catch (apiError) {
      console.error('Groq API call error:', apiError);
      
      // Gestion spécifique des erreurs Groq - Messages en arabe
      let errorMessage = "عذرًا، حدث خطأ أثناء الاتصال بخدمة المعلومات القانونية.";

      if (apiError.message.includes('rate limit')) {
        errorMessage = "تم تجاوز الحد المسموح من الطلبات. يرجى الانتظار قليلاً والمحاولة مرة أخرى.";
      } else if (apiError.message.includes('quota')) {
        errorMessage = "تم استنفاد الكوتا المتاحة. يرجى المحاولة لاحقًا.";
      }

      return NextResponse.json({
        answer: errorMessage,
        question,
        isError: true,
        errorType: 'connection_error'
      }, { status: 200 });
    }

  } catch (error) {
    console.error('Error processing legal question:', error);
    return NextResponse.json({
      answer: "حدث خطأ غير متوقع. يرجى التحقق من طلبك والمحاولة مرة أخرى.",
      question: "",
      isError: true,
      errorType: 'processing_error'
    }, { status: 200 });
  }
}