import type { Language } from '@/i18n/types';
import type { TalentProfile } from '@/types/platform';
import { talents } from './mockData';

interface TalentI18n {
  name: string;
  intro: string;
  tags: string[];
  moodTags: string[];
  styleTags: string[];
  voiceTags: string[];
}

type TalentTranslations = Record<string, Record<Language, TalentI18n>>;

const talentI18n: TalentTranslations = {
  t1: {
    en: { name: "Yuna Park", intro: "Sophisticated, elegant AI persona for premium brands and luxury campaigns.", tags: ["Korean", "20s", "Elegant", "Luxury", "Ad-ready", "English OK"], moodTags: ["Sophisticated", "Calm", "Graceful"], styleTags: ["Premium", "Luxury", "High-fashion"], voiceTags: ["Soft", "Warm", "Clear"] },
    ko: { name: "박유나", intro: "프리미엄 브랜드와 럭셔리 캠페인을 위한 세련되고 우아한 AI 페르소나.", tags: ["한국인", "20대", "우아함", "럭셔리", "광고용", "영어 가능"], moodTags: ["세련된", "차분한", "우아한"], styleTags: ["프리미엄", "럭셔리", "하이패션"], voiceTags: ["부드러운", "따뜻한", "명확한"] },
    ja: { name: "パク・ユナ", intro: "プレミアムブランドとラグジュアリーキャンペーンのための洗練されたAIペルソナ。", tags: ["韓国人", "20代", "エレガント", "ラグジュアリー", "広告向け", "英語OK"], moodTags: ["洗練された", "穏やか", "優雅"], styleTags: ["プレミアム", "ラグジュアリー", "ハイファッション"], voiceTags: ["柔らかい", "温かい", "クリア"] },
    zh: { name: "朴侑娜", intro: "为高端品牌和奢华营销打造的精致优雅AI形象。", tags: ["韩国人", "20多岁", "优雅", "奢华", "广告就绪", "英语OK"], moodTags: ["精致", "沉稳", "优雅"], styleTags: ["高端", "奢华", "高级时装"], voiceTags: ["柔和", "温暖", "清晰"] },
    fr: { name: "Yuna Park", intro: "Persona IA sophistiquée et élégante pour les marques premium et campagnes luxe.", tags: ["Coréenne", "20s", "Élégante", "Luxe", "Pub-ready", "Anglais OK"], moodTags: ["Sophistiquée", "Calme", "Gracieuse"], styleTags: ["Premium", "Luxe", "Haute couture"], voiceTags: ["Douce", "Chaleureuse", "Claire"] },
    es: { name: "Yuna Park", intro: "Persona IA sofisticada y elegante para marcas premium y campañas de lujo.", tags: ["Coreana", "20s", "Elegante", "Lujo", "Lista para anuncios", "Inglés OK"], moodTags: ["Sofisticada", "Tranquila", "Elegante"], styleTags: ["Premium", "Lujo", "Alta moda"], voiceTags: ["Suave", "Cálida", "Clara"] },
    de: { name: "Yuna Park", intro: "Elegante KI-Persona für Premium-Marken und Luxuskampagnen.", tags: ["Koreanisch", "20er", "Elegant", "Luxus", "Werbetauglich", "Englisch OK"], moodTags: ["Raffiniert", "Ruhig", "Anmutig"], styleTags: ["Premium", "Luxus", "High-Fashion"], voiceTags: ["Sanft", "Warm", "Klar"] },
    pt: { name: "Yuna Park", intro: "Persona IA sofisticada e elegante para marcas premium e campanhas de luxo.", tags: ["Coreana", "20s", "Elegante", "Luxo", "Pronta para anúncios", "Inglês OK"], moodTags: ["Sofisticada", "Calma", "Graciosa"], styleTags: ["Premium", "Luxo", "Alta moda"], voiceTags: ["Suave", "Calorosa", "Clara"] },
    ar: { name: "يونا بارك", intro: "شخصية ذكاء اصطناعي راقية وأنيقة للعلامات الفاخرة والحملات الراقية.", tags: ["كورية", "عشرينات", "أنيقة", "فاخرة", "جاهزة للإعلانات", "إنجليزي OK"], moodTags: ["راقية", "هادئة", "رشيقة"], styleTags: ["بريميوم", "فاخرة", "أزياء راقية"], voiceTags: ["ناعم", "دافئ", "واضح"] },
    vi: { name: "Yuna Park", intro: "Nhân vật AI tinh tế, thanh lịch cho thương hiệu cao cấp và chiến dịch sang trọng.", tags: ["Hàn Quốc", "20s", "Thanh lịch", "Sang trọng", "Sẵn sàng quảng cáo", "Tiếng Anh OK"], moodTags: ["Tinh tế", "Điềm tĩnh", "Duyên dáng"], styleTags: ["Cao cấp", "Sang trọng", "Thời trang cao cấp"], voiceTags: ["Nhẹ nhàng", "Ấm áp", "Rõ ràng"] },
  },
  t2: {
    en: { name: "Alex Chen", intro: "Warm and approachable AI persona ideal for educational and tech content.", tags: ["Chinese", "30s", "Warm", "Educational", "Multilingual"], moodTags: ["Friendly", "Approachable", "Trustworthy"], styleTags: ["Casual", "Tech-savvy", "Modern"], voiceTags: ["Clear", "Engaging", "Natural"] },
    ko: { name: "알렉스 첸", intro: "교육 및 기술 콘텐츠에 적합한 따뜻하고 친근한 AI 페르소나.", tags: ["중국인", "30대", "따뜻한", "교육용", "다국어"], moodTags: ["친근한", "접근하기 쉬운", "신뢰감 있는"], styleTags: ["캐주얼", "기술 친화적", "모던"], voiceTags: ["명확한", "매력적인", "자연스러운"] },
    ja: { name: "アレックス・チェン", intro: "教育やテクノロジーコンテンツに最適な親しみやすいAIペルソナ。", tags: ["中国人", "30代", "温かい", "教育向け", "多言語"], moodTags: ["フレンドリー", "親しみやすい", "信頼できる"], styleTags: ["カジュアル", "テック系", "モダン"], voiceTags: ["クリア", "引き込む", "ナチュラル"] },
    zh: { name: "陈亚历", intro: "温暖亲和的AI形象，适合教育和科技内容。", tags: ["中国人", "30多岁", "温暖", "教育", "多语言"], moodTags: ["友好", "亲切", "可信赖"], styleTags: ["休闲", "科技感", "现代"], voiceTags: ["清晰", "有吸引力", "自然"] },
    fr: { name: "Alex Chen", intro: "Persona IA chaleureuse et accessible, idéale pour le contenu éducatif et tech.", tags: ["Chinois", "30s", "Chaleureux", "Éducatif", "Multilingue"], moodTags: ["Amical", "Accessible", "Fiable"], styleTags: ["Décontracté", "Tech", "Moderne"], voiceTags: ["Claire", "Engageante", "Naturelle"] },
    es: { name: "Alex Chen", intro: "Persona IA cálida y accesible, ideal para contenido educativo y tecnológico.", tags: ["Chino", "30s", "Cálido", "Educativo", "Multilingüe"], moodTags: ["Amigable", "Accesible", "Confiable"], styleTags: ["Casual", "Tecnológico", "Moderno"], voiceTags: ["Clara", "Atractiva", "Natural"] },
    de: { name: "Alex Chen", intro: "Warme und zugängliche KI-Persona für Bildungs- und Tech-Inhalte.", tags: ["Chinesisch", "30er", "Warm", "Bildung", "Mehrsprachig"], moodTags: ["Freundlich", "Zugänglich", "Vertrauenswürdig"], styleTags: ["Casual", "Technikaffin", "Modern"], voiceTags: ["Klar", "Fesselnd", "Natürlich"] },
    pt: { name: "Alex Chen", intro: "Persona IA calorosa e acessível, ideal para conteúdo educacional e tecnológico.", tags: ["Chinês", "30s", "Caloroso", "Educacional", "Multilíngue"], moodTags: ["Amigável", "Acessível", "Confiável"], styleTags: ["Casual", "Tech", "Moderno"], voiceTags: ["Clara", "Envolvente", "Natural"] },
    ar: { name: "أليكس تشن", intro: "شخصية ذكاء اصطناعي دافئة وودودة مثالية للمحتوى التعليمي والتقني.", tags: ["صيني", "ثلاثينات", "دافئ", "تعليمي", "متعدد اللغات"], moodTags: ["ودود", "سهل الوصول", "جدير بالثقة"], styleTags: ["عادي", "تقني", "حديث"], voiceTags: ["واضح", "جذاب", "طبيعي"] },
    vi: { name: "Alex Chen", intro: "Nhân vật AI ấm áp và thân thiện, lý tưởng cho nội dung giáo dục và công nghệ.", tags: ["Trung Quốc", "30s", "Ấm áp", "Giáo dục", "Đa ngôn ngữ"], moodTags: ["Thân thiện", "Dễ tiếp cận", "Đáng tin cậy"], styleTags: ["Phong cách thoải mái", "Công nghệ", "Hiện đại"], voiceTags: ["Rõ ràng", "Hấp dẫn", "Tự nhiên"] },
  },
  t3: {
    en: { name: "Mika Tanaka", intro: "Energetic and playful AI persona perfect for short-form and entertainment content.", tags: ["Japanese", "20s", "Energetic", "Short-form", "Entertainment"], moodTags: ["Playful", "Energetic", "Fun"], styleTags: ["Pop", "Trendy", "Youthful"], voiceTags: ["Bright", "Lively", "Expressive"] },
    ko: { name: "미카 타나카", intro: "숏폼 및 엔터테인먼트 콘텐츠에 완벽한 에너지 넘치는 AI 페르소나.", tags: ["일본인", "20대", "에너지 넘치는", "숏폼", "엔터테인먼트"], moodTags: ["발랄한", "에너지 넘치는", "재미있는"], styleTags: ["팝", "트렌디", "젊은"], voiceTags: ["밝은", "활기찬", "표현력 있는"] },
    ja: { name: "田中ミカ", intro: "ショートフォームやエンタメコンテンツに最適なエネルギッシュなAIペルソナ。", tags: ["日本人", "20代", "エネルギッシュ", "ショート動画", "エンタメ"], moodTags: ["遊び心", "エネルギッシュ", "楽しい"], styleTags: ["ポップ", "トレンディ", "若々しい"], voiceTags: ["明るい", "活発", "表現力豊か"] },
    zh: { name: "田中美香", intro: "充满活力的AI形象，完美适合短视频和娱乐内容。", tags: ["日本人", "20多岁", "活力", "短视频", "娱乐"], moodTags: ["活泼", "充满活力", "有趣"], styleTags: ["流行", "潮流", "年轻"], voiceTags: ["明亮", "活泼", "表现力强"] },
    fr: { name: "Mika Tanaka", intro: "Persona IA énergique et ludique, parfaite pour les contenus courts et le divertissement.", tags: ["Japonaise", "20s", "Énergique", "Court-métrage", "Divertissement"], moodTags: ["Ludique", "Énergique", "Amusante"], styleTags: ["Pop", "Tendance", "Jeune"], voiceTags: ["Brillante", "Vivante", "Expressive"] },
    es: { name: "Mika Tanaka", intro: "Persona IA enérgica y divertida, perfecta para contenido corto y entretenimiento.", tags: ["Japonesa", "20s", "Enérgica", "Cortos", "Entretenimiento"], moodTags: ["Juguetona", "Enérgica", "Divertida"], styleTags: ["Pop", "Trendy", "Juvenil"], voiceTags: ["Brillante", "Vivaz", "Expresiva"] },
    de: { name: "Mika Tanaka", intro: "Energiegeladene KI-Persona für Kurzvideos und Unterhaltung.", tags: ["Japanisch", "20er", "Energisch", "Kurzform", "Unterhaltung"], moodTags: ["Verspielt", "Energisch", "Spaßig"], styleTags: ["Pop", "Trendy", "Jugendlich"], voiceTags: ["Hell", "Lebhaft", "Ausdrucksstark"] },
    pt: { name: "Mika Tanaka", intro: "Persona IA energética e divertida, perfeita para conteúdo curto e entretenimento.", tags: ["Japonesa", "20s", "Energética", "Curtas", "Entretenimento"], moodTags: ["Brincalhona", "Energética", "Divertida"], styleTags: ["Pop", "Na moda", "Jovem"], voiceTags: ["Brilhante", "Animada", "Expressiva"] },
    ar: { name: "ميكا تاناكا", intro: "شخصية ذكاء اصطناعي نشيطة ومرحة مثالية للمحتوى القصير والترفيه.", tags: ["يابانية", "عشرينات", "نشيطة", "محتوى قصير", "ترفيه"], moodTags: ["مرحة", "نشيطة", "ممتعة"], styleTags: ["بوب", "عصرية", "شبابية"], voiceTags: ["مشرق", "حيوي", "معبّر"] },
    vi: { name: "Mika Tanaka", intro: "Nhân vật AI năng động và vui nhộn, hoàn hảo cho nội dung ngắn và giải trí.", tags: ["Nhật Bản", "20s", "Năng động", "Video ngắn", "Giải trí"], moodTags: ["Vui tươi", "Năng động", "Thú vị"], styleTags: ["Pop", "Xu hướng", "Trẻ trung"], voiceTags: ["Tươi sáng", "Sống động", "Biểu cảm"] },
  },
  t4: {
    en: { name: "Seo-jin Lee", intro: "Professional and authoritative AI persona for corporate and finance content.", tags: ["Korean", "30s", "Professional", "Corporate", "Finance"], moodTags: ["Authoritative", "Calm", "Serious"], styleTags: ["Business", "Corporate", "Formal"], voiceTags: ["Deep", "Resonant", "Measured"] },
    ko: { name: "이서진", intro: "기업 및 금융 콘텐츠를 위한 전문적이고 권위 있는 AI 페르소나.", tags: ["한국인", "30대", "전문적", "기업용", "금융"], moodTags: ["권위 있는", "차분한", "진지한"], styleTags: ["비즈니스", "기업", "포멀"], voiceTags: ["깊은", "울림 있는", "절제된"] },
    ja: { name: "イ・ソジン", intro: "企業や金融コンテンツ向けのプロフェッショナルなAIペルソナ。", tags: ["韓国人", "30代", "プロ", "企業向け", "金融"], moodTags: ["権威ある", "穏やか", "真剣"], styleTags: ["ビジネス", "企業", "フォーマル"], voiceTags: ["低い", "響く", "落ち着いた"] },
    zh: { name: "李瑞镇", intro: "专业权威的AI形象，适合企业和金融内容。", tags: ["韩国人", "30多岁", "专业", "企业", "金融"], moodTags: ["权威", "沉稳", "严肃"], styleTags: ["商务", "企业", "正式"], voiceTags: ["深沉", "浑厚", "沉稳"] },
    fr: { name: "Seo-jin Lee", intro: "Persona IA professionnelle et autoritaire pour le contenu d'entreprise et financier.", tags: ["Coréen", "30s", "Professionnel", "Entreprise", "Finance"], moodTags: ["Autoritaire", "Calme", "Sérieux"], styleTags: ["Business", "Entreprise", "Formel"], voiceTags: ["Profonde", "Résonnante", "Mesurée"] },
    es: { name: "Seo-jin Lee", intro: "Persona IA profesional y autoritaria para contenido corporativo y financiero.", tags: ["Coreano", "30s", "Profesional", "Corporativo", "Finanzas"], moodTags: ["Autoritario", "Tranquilo", "Serio"], styleTags: ["Negocios", "Corporativo", "Formal"], voiceTags: ["Profunda", "Resonante", "Mesurada"] },
    de: { name: "Seo-jin Lee", intro: "Professionelle KI-Persona für Unternehmens- und Finanzinhalte.", tags: ["Koreanisch", "30er", "Professionell", "Unternehmen", "Finanzen"], moodTags: ["Autoritativ", "Ruhig", "Ernst"], styleTags: ["Business", "Unternehmen", "Formell"], voiceTags: ["Tief", "Resonant", "Gemessen"] },
    pt: { name: "Seo-jin Lee", intro: "Persona IA profissional e autoritária para conteúdo corporativo e financeiro.", tags: ["Coreano", "30s", "Profissional", "Corporativo", "Finanças"], moodTags: ["Autoritário", "Calmo", "Sério"], styleTags: ["Negócios", "Corporativo", "Formal"], voiceTags: ["Profunda", "Ressonante", "Moderada"] },
    ar: { name: "سو جين لي", intro: "شخصية ذكاء اصطناعي مهنية وموثوقة للمحتوى المؤسسي والمالي.", tags: ["كوري", "ثلاثينات", "مهني", "مؤسسي", "مالي"], moodTags: ["موثوق", "هادئ", "جاد"], styleTags: ["أعمال", "مؤسسي", "رسمي"], voiceTags: ["عميق", "رنان", "محسوب"] },
    vi: { name: "Seo-jin Lee", intro: "Nhân vật AI chuyên nghiệp và uy tín cho nội dung doanh nghiệp và tài chính.", tags: ["Hàn Quốc", "30s", "Chuyên nghiệp", "Doanh nghiệp", "Tài chính"], moodTags: ["Uy quyền", "Bình tĩnh", "Nghiêm túc"], styleTags: ["Kinh doanh", "Doanh nghiệp", "Trang trọng"], voiceTags: ["Trầm", "Vang", "Điềm đạm"] },
  },
  t5: {
    en: { name: "Hana Ito", intro: "Cheerful and cute AI persona ideal for gaming and virtual content.", tags: ["Japanese", "20s", "Cute", "Gaming", "Virtual"], moodTags: ["Cheerful", "Sweet", "Adorable"], styleTags: ["Kawaii", "Gaming", "Virtual"], voiceTags: ["Sweet", "High-pitched", "Animated"] },
    ko: { name: "하나 이토", intro: "게임 및 가상 콘텐츠에 이상적인 밝고 귀여운 AI 페르소나.", tags: ["일본인", "20대", "귀여운", "게임", "가상"], moodTags: ["밝은", "달콤한", "사랑스러운"], styleTags: ["카와이", "게이밍", "버추얼"], voiceTags: ["달콤한", "높은 톤", "생동감 있는"] },
    ja: { name: "伊藤ハナ", intro: "ゲームやバーチャルコンテンツに最適な明るくかわいいAIペルソナ。", tags: ["日本人", "20代", "かわいい", "ゲーム", "バーチャル"], moodTags: ["元気", "スイート", "かわいい"], styleTags: ["カワイイ", "ゲーミング", "バーチャル"], voiceTags: ["甘い", "高め", "アニメ風"] },
    zh: { name: "伊藤花", intro: "开朗可爱的AI形象，适合游戏和虚拟内容。", tags: ["日本人", "20多岁", "可爱", "游戏", "虚拟"], moodTags: ["开朗", "甜美", "可爱"], styleTags: ["卡哇伊", "游戏", "虚拟"], voiceTags: ["甜美", "高音", "动感"] },
    fr: { name: "Hana Ito", intro: "Persona IA joyeuse et mignonne, idéale pour le gaming et le contenu virtuel.", tags: ["Japonaise", "20s", "Mignonne", "Gaming", "Virtuel"], moodTags: ["Joyeuse", "Douce", "Adorable"], styleTags: ["Kawaii", "Gaming", "Virtuel"], voiceTags: ["Douce", "Aiguë", "Animée"] },
    es: { name: "Hana Ito", intro: "Persona IA alegre y adorable, ideal para gaming y contenido virtual.", tags: ["Japonesa", "20s", "Linda", "Gaming", "Virtual"], moodTags: ["Alegre", "Dulce", "Adorable"], styleTags: ["Kawaii", "Gaming", "Virtual"], voiceTags: ["Dulce", "Aguda", "Animada"] },
    de: { name: "Hana Ito", intro: "Fröhliche und süße KI-Persona für Gaming und virtuelle Inhalte.", tags: ["Japanisch", "20er", "Süß", "Gaming", "Virtuell"], moodTags: ["Fröhlich", "Süß", "Bezaubernd"], styleTags: ["Kawaii", "Gaming", "Virtuell"], voiceTags: ["Süß", "Hoch", "Animiert"] },
    pt: { name: "Hana Ito", intro: "Persona IA alegre e fofa, ideal para gaming e conteúdo virtual.", tags: ["Japonesa", "20s", "Fofa", "Gaming", "Virtual"], moodTags: ["Alegre", "Doce", "Adorável"], styleTags: ["Kawaii", "Gaming", "Virtual"], voiceTags: ["Doce", "Aguda", "Animada"] },
    ar: { name: "هانا إيتو", intro: "شخصية ذكاء اصطناعي مرحة ولطيفة مثالية للألعاب والمحتوى الافتراضي.", tags: ["يابانية", "عشرينات", "لطيفة", "ألعاب", "افتراضي"], moodTags: ["مبهجة", "حلوة", "ساحرة"], styleTags: ["كاواي", "ألعاب", "افتراضي"], voiceTags: ["حلو", "عالي", "حيوي"] },
    vi: { name: "Hana Ito", intro: "Nhân vật AI vui vẻ và dễ thương, lý tưởng cho gaming và nội dung ảo.", tags: ["Nhật Bản", "20s", "Dễ thương", "Gaming", "Ảo"], moodTags: ["Vui vẻ", "Ngọt ngào", "Đáng yêu"], styleTags: ["Kawaii", "Gaming", "Ảo"], voiceTags: ["Ngọt ngào", "Cao", "Sinh động"] },
  },
  t6: {
    en: { name: "David Kwon", intro: "Trustworthy and calm AI persona for finance and education verticals.", tags: ["Korean", "40s", "Trustworthy", "Finance", "Education"], moodTags: ["Calm", "Reassuring", "Knowledgeable"], styleTags: ["Conservative", "Professional", "Mature"], voiceTags: ["Resonant", "Deep", "Steady"] },
    ko: { name: "권데이비드", intro: "금융 및 교육 분야를 위한 신뢰감 있고 차분한 AI 페르소나.", tags: ["한국인", "40대", "신뢰감 있는", "금융", "교육"], moodTags: ["차분한", "안정감 있는", "지식이 풍부한"], styleTags: ["보수적", "전문적", "성숙한"], voiceTags: ["울림 있는", "깊은", "안정적인"] },
    ja: { name: "クォン・デイビッド", intro: "金融と教育分野向けの信頼感ある落ち着いたAIペルソナ。", tags: ["韓国人", "40代", "信頼できる", "金融", "教育"], moodTags: ["穏やか", "安心感", "博識"], styleTags: ["保守的", "プロ", "成熟"], voiceTags: ["響く", "低い", "安定"] },
    zh: { name: "权大卫", intro: "值得信赖的沉稳AI形象，适合金融和教育领域。", tags: ["韩国人", "40多岁", "可信赖", "金融", "教育"], moodTags: ["沉稳", "令人安心", "知识渊博"], styleTags: ["保守", "专业", "成熟"], voiceTags: ["浑厚", "深沉", "稳定"] },
    fr: { name: "David Kwon", intro: "Persona IA fiable et calme pour la finance et l'éducation.", tags: ["Coréen", "40s", "Fiable", "Finance", "Éducation"], moodTags: ["Calme", "Rassurant", "Érudit"], styleTags: ["Conservateur", "Professionnel", "Mature"], voiceTags: ["Résonnante", "Profonde", "Stable"] },
    es: { name: "David Kwon", intro: "Persona IA confiable y calmada para finanzas y educación.", tags: ["Coreano", "40s", "Confiable", "Finanzas", "Educación"], moodTags: ["Calmado", "Tranquilizador", "Conocedor"], styleTags: ["Conservador", "Profesional", "Maduro"], voiceTags: ["Resonante", "Profunda", "Estable"] },
    de: { name: "David Kwon", intro: "Vertrauenswürdige und ruhige KI-Persona für Finanz- und Bildungsinhalte.", tags: ["Koreanisch", "40er", "Vertrauenswürdig", "Finanzen", "Bildung"], moodTags: ["Ruhig", "Beruhigend", "Wissend"], styleTags: ["Konservativ", "Professionell", "Reif"], voiceTags: ["Resonant", "Tief", "Stetig"] },
    pt: { name: "David Kwon", intro: "Persona IA confiável e calma para finanças e educação.", tags: ["Coreano", "40s", "Confiável", "Finanças", "Educação"], moodTags: ["Calmo", "Reconfortante", "Conhecedor"], styleTags: ["Conservador", "Profissional", "Maduro"], voiceTags: ["Ressonante", "Profunda", "Estável"] },
    ar: { name: "ديفيد كوون", intro: "شخصية ذكاء اصطناعي موثوقة وهادئة للتمويل والتعليم.", tags: ["كوري", "أربعينات", "جدير بالثقة", "مالي", "تعليمي"], moodTags: ["هادئ", "مطمئن", "واسع المعرفة"], styleTags: ["محافظ", "مهني", "ناضج"], voiceTags: ["رنان", "عميق", "ثابت"] },
    vi: { name: "David Kwon", intro: "Nhân vật AI đáng tin cậy và điềm tĩnh cho tài chính và giáo dục.", tags: ["Hàn Quốc", "40s", "Đáng tin cậy", "Tài chính", "Giáo dục"], moodTags: ["Bình tĩnh", "An tâm", "Hiểu biết"], styleTags: ["Bảo thủ", "Chuyên nghiệp", "Trưởng thành"], voiceTags: ["Vang", "Trầm", "Ổn định"] },
  },
};

export function getLocalizedTalents(language: Language): TalentProfile[] {
  return talents.map((talent) => {
    const i18n = talentI18n[talent.id]?.[language] || talentI18n[talent.id]?.en;
    if (!i18n) return talent;
    return {
      ...talent,
      name: i18n.name,
      intro: i18n.intro,
      tags: i18n.tags,
      moodTags: i18n.moodTags,
      styleTags: i18n.styleTags,
      voiceTags: i18n.voiceTags,
    };
  });
}

export function getLocalizedTalentById(id: string, language: Language): TalentProfile | undefined {
  const talent = talents.find(t => t.id === id);
  if (!talent) return undefined;
  const i18n = talentI18n[id]?.[language] || talentI18n[id]?.en;
  if (!i18n) return talent;
  return { ...talent, name: i18n.name, intro: i18n.intro, tags: i18n.tags, moodTags: i18n.moodTags, styleTags: i18n.styleTags, voiceTags: i18n.voiceTags };
}
