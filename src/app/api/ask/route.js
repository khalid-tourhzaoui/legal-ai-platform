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

    // Vérifier que la clé API existe
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not configured');
      return NextResponse.json({
        answer: "خطأ في الإعداد: مفتاح API غير متوفر. يرجى التواصل مع المسؤول.",
        question,
        isError: true,
        errorType: 'config_error'
      }, { status: 200 });
    }

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
      model: 'llama-3.3-70b-versatile', // Modèle correct et disponible
      max_tokens: 2000,
      temperature: 0.3,
      top_p: 0.9,
      stream: false,
      stop: ["<think>", "Think", "THINK"]
    };

    console.log('Calling Groq API with model:', payload.model);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Log détaillé pour le débogage
      console.log('Groq API Response Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API Error Response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        // Messages d'erreur spécifiques
        if (response.status === 401) {
          return NextResponse.json({
            answer: "خطأ في المصادقة: مفتاح API غير صالح. يرجى التحقق من الإعدادات.",
            question,
            isError: true,
            errorType: 'auth_error',
            debug: errorData.error?.message || 'Authentication failed'
          }, { status: 200 });
        }

        if (response.status === 429) {
          return NextResponse.json({
            answer: "تم تجاوز الحد المسموح من الطلبات. يرجى الانتظار قليلاً والمحاولة مرة أخرى.",
            question,
            isError: true,
            errorType: 'rate_limit'
          }, { status: 200 });
        }

        if (response.status === 400) {
          return NextResponse.json({
            answer: "خطأ في تنسيق الطلب. يرجى إعادة صياغة السؤال.",
            question,
            isError: true,
            errorType: 'bad_request',
            debug: errorData.error?.message || 'Bad request'
          }, { status: 200 });
        }

        return NextResponse.json({
          answer: "عذرًا، لم نتمكن من معالجة طلبك في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.",
          question,
          isError: true,
          errorType: 'api_error',
          debug: `Status: ${response.status}, Message: ${errorData.error?.message || 'Unknown error'}`
        }, { status: 200 });
      }

      const data = await response.json();
      console.log('Groq API Success:', {
        model: data.model,
        usage: data.usage
      });

      let rawAnswer = data.choices?.[0]?.message?.content || "لم يتم العثور على إجابة مناسبة لهذا السؤال.";
      
      // Nettoyer la réponse
      const cleanAnswer = (text) => {
        let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '');
        cleaned = cleaned.replace(/<think>.*$/gmi, '');
        return cleaned.trim();
      };
      
      const answer = cleanAnswer(rawAnswer);
      const usage = data.usage || {};
      
      return NextResponse.json({
        answer,
        question,
        model: data.model || 'llama-3.3-70b',
        provider: 'groq',
        tokens_used: usage.total_tokens || 0,
        prompt_tokens: usage.prompt_tokens || 0,
        completion_tokens: usage.completion_tokens || 0
      });

    } catch (apiError) {
      console.error('Groq API call exception:', apiError);
      
      let errorMessage = "عذرًا، حدث خطأ أثناء الاتصال بخدمة المعلومات القانونية.";

      if (apiError.message?.includes('fetch')) {
        errorMessage = "خطأ في الاتصال بالخدمة. يرجى التحقق من اتصالك بالإنترنت.";
      }

      return NextResponse.json({
        answer: errorMessage,
        question,
        isError: true,
        errorType: 'connection_error',
        debug: apiError.message
      }, { status: 200 });
    }

  } catch (error) {
    console.error('Error processing legal question:', error);
    return NextResponse.json({
      answer: "حدث خطأ غير متوقع. يرجى التحقق من طلبك والمحاولة مرة أخرى.",
      question: "",
      isError: true,
      errorType: 'processing_error',
      debug: error.message
    }, { status: 200 });
  }
}