// Comprehensive 20-Question Academic Quiz Database
// Aligned with NCTB Curriculum for Secondary & Higher Secondary (Classes 8-12)

export const SUBJECT_QUIZ_BANKS = {
  // ==========================================
  // 1. MATHEMATICS (গণিত) - 20 Questions
  // ==========================================
  math: [
    {
      id: 'm-1',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'একটি সমকোণী ত্রিভুজের লম্ব ৩ সেমি এবং ভূমি ৪ সেমি হলে অতিভুজ কত?',
      options: ['৫ সেমি', '৬ সেমি', '৭ সেমি', '২৫ সেমি'],
      correctIndex: 0,
      explanation: 'পীথাগোরাসের উপপাদ্য: অতিভুজ² = ৩² + ৪² = ৯ + ১৬ = ২৫। সুতরাং অতিভুজ = √২৫ = ৫ সেমি।'
    },
    {
      id: 'm-2',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'x² - 5x + 6 = 0 সমীকরণের মূল দুটি কী কী?',
      options: ['2 এবং 3', '-2 এবং -3', '1 এবং 6', '-1 এবং -6'],
      correctIndex: 0,
      explanation: 'x² - 3x - 2x + 6 = 0 => (x - 3)(x - 2) = 0 => x = 2, 3।'
    },
    {
      id: 'm-3',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'sin² 45° + cos² 45° এর মান কত?',
      options: ['1', '0', '1/2', '√2'],
      correctIndex: 0,
      explanation: 'ত্রিকোণমিতির মৌলিক অভেদ অনুযায়ী যেকোনো কোণ θ-এর জন্য sin²θ + cos²θ = 1।'
    },
    {
      id: 'm-4',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'একটি বৃত্তের ব্যাসার্ধ r হলে তার ক্ষেত্রফল নির্ণয়ের সূত্র কোনটি?',
      options: ['πr²', '2πr', '4/3 πr³', 'πd'],
      correctIndex: 0,
      explanation: 'বৃত্তের ক্ষেত্রফলের সূত্র πr² এবং পরিধির সূত্র 2πr।'
    },
    {
      id: 'm-5',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'log₁₀ 1000 এর মান কত?',
      options: ['3', '2', '10', '100'],
      correctIndex: 0,
      explanation: '1000 = 10³। সুতরাং log₁₀ 10³ = 3 log₁₀ 10 = 3 × 1 = 3।'
    },
    {
      id: 'm-6',
      subject: 'math',
      subjectName: 'গণিত',
      question: '২, ৪, ৮, ১৬, ... গুণোত্তর ধারাটির ৭ম পদ কত?',
      options: ['১২৮', '৬৪', '২৫৬', '৫১২'],
      correctIndex: 0,
      explanation: 'এখানে প্রথম পদ a = 2, সাধারণ অনুপাত r = 2। ৭ম পদ = ar⁶ = 2 × 2⁶ = 2 × 64 = 128।'
    },
    {
      id: 'm-7',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'একটি ত্রিভুজের তিন কোণের সমষ্টি কত ডিগ্রি?',
      options: ['১৮০°', '৩৬০°', '৯০°', '২৭০°'],
      correctIndex: 0,
      explanation: 'ইউক্লিডীয় জ্যামিতি অনুযায়ী যেকোনো ত্রিভুজের তিনটি অন্তঃকোণের সমষ্টি দুই সমকোণ বা ১৮০ ডিগ্রি।'
    },
    {
      id: 'm-8',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'দ্বিঘাত সমীকরণ ax² + bx + c = 0 এর মূলদ্বয় সমান হওয়ার শর্ত কোনটি?',
      options: ['b² - 4ac = 0', 'b² - 4ac > 0', 'b² - 4ac < 0', 'b = 0'],
      correctIndex: 0,
      explanation: 'নিশ্চায়ক D = b² - 4ac = 0 হলে দ্বিঘাত সমীকরণের মূল দুটি বাস্তব ও পরস্পর সমান হয়।'
    },
    {
      id: 'm-9',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'tan 45° এর মান কত?',
      options: ['1', '0', '1/√3', '√3'],
      correctIndex: 0,
      explanation: 'সমকোণী সমদ্বিবাহু ত্রিভুজে লম্ব ও ভূমি সমান হওয়ায় tan 45° = লম্ব/ভূমি = 1।'
    },
    {
      id: 'm-10',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'একটি সমবাহু ত্রিভুজের প্রতিটি কোণের মান কত?',
      options: ['৬০°', '৪৫°', '৯০°', '৩০°'],
      correctIndex: 0,
      explanation: 'সমবাহু ত্রিভুজের তিনটি কোণই সমান, অর্থাৎ ১৮০° / ৩ = ৬০°।'
    },
    {
      id: 'm-11',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'a³ - b³ এর উৎপাদকে বিশ্লেষণ সূত্র কোনটি?',
      options: ['(a - b)(a² + ab + b²)', '(a - b)(a² - ab + b²)', '(a + b)(a² - ab + b²)', '(a - b)³'],
      correctIndex: 0,
      explanation: 'বীজগণিতের মৌলিক সূত্র: a³ - b³ = (a - b)(a² + ab + b²)।'
    },
    {
      id: 'm-12',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'একটি মুদ্রাকে একবার নিক্ষেপ করলে হেড (Head) আসার সম্ভাবনা কত?',
      options: ['1/2', '1/4', '1', '0'],
      correctIndex: 0,
      explanation: 'মুদ্রা নিক্ষেপে মোট ফলাফল ২টি (Head, Tail)। অনুকূল ফলাফল ১টি। সম্ভাবনা = ১/২।'
    },
    {
      id: 'm-13',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'd/dx (x³) এর ব্যবকলন (differentiation) কত?',
      options: ['3x²', 'x²', '3x', 'x⁴/4'],
      correctIndex: 0,
      explanation: 'ক্যালকুলাসের পাওয়ার রুল: d/dx (xⁿ) = n·xⁿ⁻¹। সুতরাং d/dx (x³) = 3x²।'
    },
    {
      id: 'm-14',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'একটি বর্গের কর্ণের দৈর্ঘ্য ৫√২ সেমি হলে তার বাহুর দৈর্ঘ্য কত?',
      options: ['৫ সেমি', '১০ সেমি', '২৫ সেমি', '২.৫ সেমি'],
      correctIndex: 0,
      explanation: 'বর্গের কর্ণ d = a√২। এখানে a√২ = ৫√২ => a = ৫ সেমি।'
    },
    {
      id: 'm-15',
      subject: 'math',
      subjectName: 'গণিত',
      question: '১ থেকে ১০ পর্যন্ত স্বাভাবিক সংখ্যার যোগফল কত?',
      options: ['৫৫', '৫০', '৪৫', '৬০'],
      correctIndex: 0,
      explanation: 'সূত্র n(n + 1)/2 = 10(11)/2 = 110/2 = 55।'
    },
    {
      id: 'm-16',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'sin 90° এর মান কত?',
      options: ['1', '0', '1/2', 'অসংজ্ঞায়িত'],
      correctIndex: 0,
      explanation: 'একক বৃত্তের ক্ষেত্রে sin 90° = 1 এবং cos 90° = 0।'
    },
    {
      id: 'm-17',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'কোনো সংখ্যার ২০% যদি ৫০ হয়, তবে সংখ্যাটি কত?',
      options: ['২৫০', '২০০', '১০০', '৫০০'],
      correctIndex: 0,
      explanation: 'সংখ্যাটি x হলে: x × (20/100) = 50 => x = 50 × 5 = 250।'
    },
    {
      id: 'm-18',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'রম্বসের কর্ণদ্বয় পরস্পরকে কীভাবে ছেদ করে?',
      options: ['সমকোণে সমদ্বিখণ্ডিত করে', 'অসমকোণে বিভক্ত করে', 'ছেদ করে না', 'সমান্তরাল থাকে'],
      correctIndex: 0,
      explanation: 'রম্বসের একটি প্রধান বৈশিষ্ট্য হলো এর কর্ণদ্বয় পরস্পরকে সমকোণে (৯০°) সমদ্বিখণ্ডিত করে।'
    },
    {
      id: 'm-19',
      subject: 'math',
      subjectName: 'গণিত',
      question: '২-এর ঘাত সূচক সমীকরণ: 2^(x+1) = 32 হলে x এর মান কত?',
      options: ['4', '5', '3', '6'],
      correctIndex: 0,
      explanation: '32 = 2⁵। অতএব 2^(x+1) = 2⁵ => x + 1 = 5 => x = 4।'
    },
    {
      id: 'm-20',
      subject: 'math',
      subjectName: 'গণিত',
      question: 'একটি গোলকের ব্যাসার্ধ r হলে তার আয়তন কত?',
      options: ['4/3 πr³', '4πr²', '2/3 πr³', 'πr³'],
      correctIndex: 0,
      explanation: 'গোলকের আয়তনের সূত্র V = (4/3)πr³ এবং পৃষ্ঠের ক্ষেত্রফল 4πr²।'
    }
  ],

  // ==========================================
  // 2. PHYSICS (পদার্থবিজ্ঞান) - 20 Questions
  // ==========================================
  physics: [
    {
      id: 'p-1',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'নিউটনের গতির দ্বিতীয় সূত্র থেকে আমরা কোন রাশির পরিমাপ পাই?',
      options: ['বল (Force)', 'জড়তা (Inertia)', 'কাজ (Work)', 'ত্বরণবিহীন বেগ'],
      correctIndex: 0,
      explanation: 'নিউটনের ২য় সূত্র বলে: ভরবেগের পরিবর্তনের হার প্রযুক্ত বলের সমানুপাতিক (F = ma)।'
    },
    {
      id: 'p-2',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'পৃথিবীর পৃষ্ঠে অভিকর্ষজ ত্বরণ (g) এর আদর্শ মান কত?',
      options: ['9.8 m/s²', '9.8 m/s', '98 m/s²', '9.8 cm/s²'],
      correctIndex: 0,
      explanation: '৪৫° অক্ষাংশে সমুদ্র সমতলে অভিকর্ষজ ত্বরণের আদর্শ মান ৯.৮০৬৬৫ m/s² (বা প্রায় ৯.৮ m/s²)।'
    },
    {
      id: 'p-3',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'কাজের আন্তর্জাতিক একক (SI Unit) কোনটি?',
      options: ['জুল (Joule)', 'ওয়াট (Watt)', 'নিউটন (Newton)', 'প্যাসকেল (Pascal)'],
      correctIndex: 0,
      explanation: 'কাজের একক জুল (J = N·m)। ওয়াট ক্ষমতার একক এবং নিউটন বলের একক।'
    },
    {
      id: 'p-4',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'ওহমের সূত্রানুসারে ভোল্টেজ (V), কারেন্ট (I) ও রোধের (R) সঠিক সম্পর্ক কোনটি?',
      options: ['V = IR', 'I = VR', 'R = VI', 'V = I/R'],
      correctIndex: 0,
      explanation: 'স্থির তাপমাত্রায় পরিবাহীর তড়িৎ প্রবাহ দুই প্রান্তের বিভব পার্থক্যের সমানুপাতিক: V = IR।'
    },
    {
      id: 'p-5',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'শূন্য মাধ্যমে আলোর গতিবেগ কত?',
      options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁸ km/s', '332 m/s'],
      correctIndex: 0,
      explanation: 'শূন্য মাধ্যমে আলোর বেগ c ≈ 3 × 10⁸ m/s (বা ৩ লক্ষ কিলোমিটার প্রতি সেকেন্ড)।'
    },
    {
      id: 'p-6',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'মহাকর্ষীয় ধ্রুবক (G) এর মান কত?',
      options: ['6.673 × 10⁻¹¹ N m² kg⁻²', '9.8 N m² kg⁻²', '6.673 × 10⁻¹¹ m/s²', '1.6 × 10⁻¹⁹ C'],
      correctIndex: 0,
      explanation: 'হেনরি ক্যাভেন্ডিশ কর্তৃক নির্ধারিত মহাকর্ষীয় ধ্রুবক G = 6.673 × 10⁻¹¹ N m² kg⁻²।'
    },
    {
      id: 'p-7',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'চলন্ত বাস ব্রেক করলে যাত্রীরা সামনের দিকে ঝুঁকে পড়ে কেন?',
      options: ['গতির জড়তার জন্য', 'স্থিতি জড়তার জন্য', 'অভিকর্ষের কারণে', 'ঘর্ষণ বলের কারণে'],
      correctIndex: 0,
      explanation: 'গতির জড়তার কারণে বাসের সাথে সাথে যাত্রীর দেহের উপরের অংশ গতি বজায় রাখতে চায়, তাই ব্রেক করলে সামনে ঝুঁকে পড়ে।'
    },
    {
      id: 'p-8',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'শব্দ তরঙ্গ কোন ধরনের তরঙ্গ?',
      options: ['অনুদৈর্ঘ্য তরঙ্গ (Longitudinal)', 'অনুপ্ৰস্থ তরঙ্গ (Transverse)', 'তড়িৎ-চৌম্বকীয় তরঙ্গ', 'আলোক তরঙ্গ'],
      correctIndex: 0,
      explanation: 'শব্দ হলো যান্ত্রিক অনুদৈর্ঘ্য তরঙ্গ, যা মাধ্যমের সংকোচন ও প্রসারণের মাধ্যমে অগ্রসর হয়।'
    },
    {
      id: 'p-9',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: '১ অশ্বক্ষমতা (Horsepower) কত ওয়াটের সমান?',
      options: ['746 W', '1000 W', '500 W', '74.6 W'],
      correctIndex: 0,
      explanation: '১ হর্সপাওয়ার = ৭৪৬ ওয়াট (1 hp = 746 W)।'
    },
    {
      id: 'p-10',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'আইনস্টাইনের বিখ্যাত ভর-শক্তি সমীকরণ কোনটি?',
      options: ['E = mc²', 'E = hf', 'F = ma', 'P = VI'],
      correctIndex: 0,
      explanation: 'আলবার্ট আইনস্টাইনের আপেক্ষিকতা তত্ত্ব অনুযায়ী ভর ও শক্তি সমতুল্য: E = mc²।'
    },
    {
      id: 'p-11',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'তড়িৎ আধানের এসআই (SI) একক কী?',
      options: ['কুলম্ব (Coulomb)', 'অ্যাম্পিয়ার (Ampere)', 'ভোল্ট (Volt)', 'ওহম (Ohm)'],
      correctIndex: 0,
      explanation: 'চার্জ বা তড়িৎ আধানের একক কুলম্ব (C)। তড়িৎ প্রবাহের একক হলো অ্যাম্পিয়ার।'
    },
    {
      id: 'p-12',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'একটি অবতল দর্পণের বক্রতার ব্যাসার্ধ ২০ সেমি হলে তার ফোকাস দূরত্ব কত?',
      options: ['১০ সেমি', '৪০ সেমি', '৫ সেমি', '২০ সেমি'],
      correctIndex: 0,
      explanation: 'দর্পণের ফোকাস দূরত্ব বক্রতার ব্যাসার্ধের অর্ধেক: f = r/2 = 20/2 = 10 সেমি।'
    },
    {
      id: 'p-13',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'নিচের কোনটি স্কেলার রাশি?',
      options: ['দ্রুতি (Speed)', 'বেগ (Velocity)', 'ত্বরণ (Acceleration)', 'বল (Force)'],
      correctIndex: 0,
      explanation: 'দ্রুতির কেবল মান আছে কিন্তু নির্দিষ্ট দিক নেই, তাই এটি স্কেলার রাশি। বেগ ও ত্বরণ ভেক্টর রাশি।'
    },
    {
      id: 'p-14',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'কোন তাপমাত্রায় সেলসিয়াস ও ফারেনহাইট স্কেলে একই পাঠ পাওয়া যায়?',
      options: ['-40°', '0°', '40°', '100°'],
      correctIndex: 0,
      explanation: 'C/5 = (F - 32)/9 সমীকরণে C = F = x বসালে x = -40 পাওয়া যায়।'
    },
    {
      id: 'p-15',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'চাপের আন্তর্জাতিক একক (SI) কোনটি?',
      options: ['প্যাসকেল (Pascal)', 'নিউটন (Newton)', 'বার (Bar)', 'টর (Torr)'],
      correctIndex: 0,
      explanation: 'একক ক্ষেত্রফলের ওপর লম্বভাবে প্রযুক্ত বলকে চাপ বলে। ১ প্যাসকেল = ১ N/m²।'
    },
    {
      id: 'p-16',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'মুক্তভাবে পড়ন্ত কোনো বস্তুর ৩ সেকেন্ড পর বেগ কত হবে?',
      options: ['29.4 m/s', '9.8 m/s', '19.6 m/s', '44.1 m/s'],
      correctIndex: 0,
      explanation: 'v = u + gt = 0 + (9.8 × 3) = 29.4 m/s।'
    },
    {
      id: 'p-17',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'রকেট উড্ডয়ন কোন পদার্থবিজ্ঞানের সূত্রের ওপর ভিত্তি করে চলে?',
      options: ['নিউটনের ৩য় সূত্র ও রৈখিক ভরবেগের সংরক্ষণ', 'নিউটনের ১ম সূত্র', 'প্যাসকেলের সূত্র', 'আর্কিমিডিসের সূত্র'],
      correctIndex: 0,
      explanation: 'রকেট পেছনের দিকে তীব্র বেগে গ্যাস নির্গমন করে (ক্রিয়া) এবং বিপরীত দিকে সমপরিমাণ প্রতিক্রিয়া বল পেয়ে সামনে এগিয়ে যায়।'
    },
    {
      id: 'p-18',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'তড়িৎ ক্ষমতার সূত্র কোনটি?',
      options: ['P = VI', 'P = V/I', 'P = I² / R', 'P = V / R²'],
      correctIndex: 0,
      explanation: 'বৈদ্যুতিক ক্ষমতা P = VI = I²R = V²/R।'
    },
    {
      id: 'p-19',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'মানুষের কান সর্বোচ্চ কত কম্পাঙ্কের শব্দ শুনতে পায় (শ্রাব্যতার সীমা)?',
      options: ['20,000 Hz', '20 Hz', '2,000 Hz', '100,000 Hz'],
      correctIndex: 0,
      explanation: 'মানব কর্ণের শ্রাব্যতার পাল্লা ২০ হার্টজ (Hz) থেকে ২০,০০০ হার্টজ (20 kHz)।'
    },
    {
      id: 'p-20',
      subject: 'physics',
      subjectName: 'পদার্থবিজ্ঞান',
      question: 'আর্কিমিডিসের নীতি অনুযায়ী অপসারিত তরলের ওজন কার সমান?',
      options: ['প্লবতা বলের সমান', 'বস্তুর প্রকৃত ওজনের সমান', 'বায়ুমণ্ডলীয় চাপের সমান', 'মহাকর্ষ বলের সমান'],
      correctIndex: 0,
      explanation: 'আর্কিমিডিসের নীতি: কোনো বস্তুকে তরলে নিমজ্জিত করলে তা যে পরিমাণ তরল অপসারণ করে, তার ওজন বস্তুর ওপর ঊর্ধ্বমুখী প্লবতা বলের সমান।'
    }
  ],

  // ==========================================
  // 3. CHEMISTRY (রসায়ন) - 20 Questions
  // ==========================================
  chemistry: [
    {
      id: 'c-1',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'সোডিয়াম (Na, পারমাণবিক সংখ্যা ১১) ও ক্লোরিন (Cl, ১৭) মিলে কোন বন্ধন গঠিত হয়?',
      options: ['আয়ন বা তড়িৎযোজী বন্ধন', 'সমযোজী বন্ধন', 'ধাতব বন্ধন', 'হাইড্রোজেন বন্ধন'],
      correctIndex: 0,
      explanation: 'Na একটি ইলেকট্রন দান করে Na⁺ এবং Cl তা গ্রহণ করে Cl⁻ তৈরি করে। বিপরীত আয়ন আকর্ষণে তড়িৎযোজী বন্ধন হয়।'
    },
    {
      id: 'c-2',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'আধুনিক পর্যায় সারণির জনক কাকে বলা হয়?',
      options: ['দিমিত্রি মেন্ডেলিফ', 'জন ডাল্টন', 'হেনরি মোসলে', 'অ্যান্টনি ল্যাভয়সিয়ে'],
      correctIndex: 0,
      explanation: '১৮৬৯ সালে মৌলসমূহের পারমাণবিক ভরের ওপর ভিত্তি করে পর্যায় সারণি আবিষ্কারের জন্য মেন্ডেলিফকে এর জনক বলা হয়।'
    },
    {
      id: 'c-3',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'পর্যায় সারণির সবচেয়ে বেশি তড়িৎ-ঋণাত্মক (Electronegative) মৌল কোনটি?',
      options: ['ফ্লোরিন (F)', 'ক্লোরিন (Cl)', 'অক্সিজেন (O)', 'নাইট্রোজেন (N)'],
      correctIndex: 0,
      explanation: 'পাউলিং স্কেলে ফ্লোরিনের তড়িৎ-ঋণাত্মকতা সর্বোচ্চ (৪.০)।'
    },
    {
      id: 'c-4',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'বিশুদ্ধ পানির pH এর মান কত?',
      options: ['7', '0', '14', '5.5'],
      correctIndex: 0,
      explanation: '২৫° সেলসিয়াস তাপমাত্রায় বিশুদ্ধ পানি নিরপেক্ষ (Neutral), যার pH ঠিক ৭।'
    },
    {
      id: 'c-5',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'মিথেন (CH₄) গ্যাসে কার্বন পরমাণুর সংকরণ (Hybridization) কোনটি?',
      options: ['sp³', 'sp²', 'sp', 'dsp²'],
      correctIndex: 0,
      explanation: 'মিথেনে কার্বন ৪টি একক সমযোজী বন্ধন গঠন করে, যা চতুষ্তলকীয় sp³ সংকরণ নির্দেশ করে।'
    },
    {
      id: 'c-6',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'নিচের কোন গ্যাসটিকে লাফিং গ্যাস (Laughing Gas) বলা হয়?',
      options: ['নাইট্রাস অক্সাইড (N₂O)', 'নাইট্রিক অক্সাইড (NO)', 'নাইট্রোজেন ডাই অক্সাইড (NO₂)', 'অ্যামোনিয়া (NH₃)'],
      correctIndex: 0,
      explanation: 'N₂O গ্যাস শ্বাস নেওয়ার সাথে মৃদু উদ্দীপনা ও হাসির উদ্রেক সৃষ্টি করে বলে একে লাফিং গ্যাস বলে।'
    },
    {
      id: 'c-7',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'লোহায় মরিচা পড়ার জন্য কোন দুটি উপাদানের উপস্থিতি অত্যাবশ্যক?',
      options: ['অক্সিজেন ও পানি/জলীয় বাষ্প', 'কেবল অক্সিজেন', 'কেবল পানি', 'কার্বন ডাই অক্সাইড ও নাইট্রোজেন'],
      correctIndex: 0,
      explanation: 'মরিচা হলো আর্দ্র ফেরিক অক্সাইড (Fe₂O₃·xH₂O)। এর জন্য অক্সিজেন ও পানি উভয়ের উপস্থিতি বাধ্যতামূলক।'
    },
    {
      id: 'c-8',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'অ্যাভোগাড্রো সংখ্যার (Avogadro Constant) সঠিক মান কত?',
      options: ['6.023 × 10²³', '6.023 × 10⁻²³', '3 × 10⁸', '1.6 × 10⁻¹⁹'],
      correctIndex: 0,
      explanation: '১ মোল যেকোনো পদার্থে ঠিক 6.023 × 10²³ টি অণু, পরমাণু বা আয়ন বিদ্যমান থাকে।'
    },
    {
      id: 'c-9',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'কোন মৌলের ইলেকট্রন বিন্যাস 1s² 2s² 2p⁶ 3s¹?',
      options: ['সোডিয়াম (Na)', 'ম্যাগনেসিয়াম (Mg)', 'পটাশিয়াম (K)', 'অ্যালুমিনিয়াম (Al)'],
      correctIndex: 0,
      explanation: 'মোট ইলেকট্রন সংখ্যা ২ + ২ + ৬ + ১ = ১১, যা সোডিয়ামের পারমাণবিক সংখ্যা।'
    },
    {
      id: 'c-10',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'ভিনেগারে প্রধানত কোন অ্যাসিডটি থাকে?',
      options: ['অ্যাসিটিক অ্যাসিড (CH₃COOH)', 'সাইট্রিক অ্যাসিড', 'ফরমিক অ্যাসিড', 'অক্সালিক অ্যাসিড'],
      correctIndex: 0,
      explanation: 'ভিনেগার হলো অ্যাসিটিক অ্যাসিড বা ইথানয়িক অ্যাসিডের ৪-১০% জলীয় দ্রবণ।'
    },
    {
      id: 'c-11',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'নিষ্ক্রিয় গ্যাসগুলো পর্যায় সারণির কোন গ্রুপে অবস্থিত?',
      options: ['গ্রুপ ১৮', 'গ্রুপ ১', 'গ্রুপ ১৭', 'গ্রুপ ২'],
      correctIndex: 0,
      explanation: 'হিলিয়াম, নিয়ন, আর্গন, ক্রিপ্টন, জেনন ও রেডন পর্যায় সারণির ১৮ নং গ্রুপে অবস্থিত।'
    },
    {
      id: 'c-12',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'কোন অ্যাসিডকে ‘রসায়নের রাজা’ (King of Chemicals) বলা হয়?',
      options: ['সালফিউরিক অ্যাসিড (H₂SO₄)', 'হাইড্রোক্লোরিক অ্যাসিড (HCl)', 'নাইট্রিক অ্যাসিড (HNO₃)', 'ফসফরিক অ্যাসিড'],
      correctIndex: 0,
      explanation: 'শিল্প কারখানায় সর্বাধিক ব্যবহারের জন্য সালফিউরিক অ্যাসিডকে রাসায়নিকের রাজা বলা হয়।'
    },
    {
      id: 'c-13',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'পানির একটি অণুর জ্যামিতিক আকৃতি কেমন?',
      options: ['কৌণিক (V-shaped)', 'রৈখিক (Linear)', 'চতুষ্তলকীয়', 'সমতলীয় ত্রিকোণাকার'],
      correctIndex: 0,
      explanation: 'অক্সিজেনের ২টি নিঃসঙ্গ ইলেকট্রন জোড়ের বিকর্ষণের কারণে পানির বন্ধন কোণ ১০৪.৫° এবং আকৃতি কৌণিক হয়।'
    },
    {
      id: 'c-14',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'পরমাণুর নিউক্লিয়াসে কোন কোন কণা থাকে?',
      options: ['প্রোটন ও নিউট্রন', 'প্রোটন ও ইলেকট্রন', 'কেবল নিউট্রন', 'কেবল প্রোটন'],
      correctIndex: 0,
      explanation: 'নিউক্লিয়াস প্রোটন ও নিউট্রন দ্বারা গঠিত, আর ইলেকট্রন নিউক্লিয়াসকে কেন্দ্র করে শক্তিস্তরে ঘোরে।'
    },
    {
      id: 'c-15',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'ব্রোঞ্জ (Bronze) কোন কোন ধাতুর সংকর?',
      options: ['তামা ও টিন (Cu + Sn)', 'তামা ও দস্তা (Cu + Zn)', 'লোহা ও কার্বন', 'অ্যালুমিনিয়াম ও তামা'],
      correctIndex: 0,
      explanation: 'ব্রোঞ্জ হলো কপার (তামা) এবং টিনের সংকর ধাতু।'
    },
    {
      id: 'c-16',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'জারণ প্রক্রিয়ায় কী ঘটে?',
      options: ['ইলেকট্রন বর্জন ঘটে', 'ইলেকট্রন গ্রহণ ঘটে', 'প্রোটন বর্জন ঘটে', 'কোনো পরিবর্তন হয় না'],
      correctIndex: 0,
      explanation: '"জারণ মানে ইলেকট্রন ছারণ" (Oxidation is loss of electrons - OIL RIG)।'
    },
    {
      id: 'c-17',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'ড্রাই আইস (Dry Ice) আসলে কী?',
      options: ['কঠিন কার্বন ডাই-অক্সাইড', 'কঠিন বরফ', 'তরল নাইট্রোজেন', 'কঠিন মিথেন'],
      correctIndex: 0,
      explanation: 'উচ্চ চাপে শীতলীকৃত কঠিন কার্বন ডাই অক্সাইডকে (Solid CO₂) শুষ্ক বরফ বা ড্রাই আইস বলে।'
    },
    {
      id: 'c-18',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'ব্লিচিং পাউডারের রাসায়নিক সংকেত কোনটি?',
      options: ['Ca(OCl)Cl', 'CaCl₂', 'CaCO₃', 'CaO'],
      correctIndex: 0,
      explanation: 'ব্লিচিং পাউডারের সংকেত Ca(OCl)Cl বা ক্যালসিয়াম ক্লোরো-হাইপোক্লোরাইট।'
    },
    {
      id: 'c-19',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'সবচেয়ে হালকা গ্যাস কোনটি?',
      options: ['হাইড্রোজেন (H₂)', 'হিলিয়াম (He)', 'অক্সিজেন (O₂)', 'নাইট্রোজেন (N₂)'],
      correctIndex: 0,
      explanation: 'হাইড্রোজেনের আণবিক ভর মাত্র ২, যা মহাবিশ্বের সবচেয়ে হালকা গ্যাস।'
    },
    {
      id: 'c-20',
      subject: 'chemistry',
      subjectName: 'রসায়ন',
      question: 'খাবার সোডার (Baking Soda) রাসায়নিক নাম কী?',
      options: ['সোডিয়াম হাইড্রোজেন কার্বনেট (NaHCO₃)', 'সোডিয়াম কার্বনেট (Na₂CO₃)', 'সোডিয়াম ক্লোরাইড (NaCl)', 'সোডিয়াম হাইড্রোক্সাইড (NaOH)'],
      correctIndex: 0,
      explanation: 'বেকিং সোডা হলো সোডিয়াম বাইকার্বনেট বা সোডিয়াম হাইড্রোজেন কার্বনেট।'
    }
  ],

  // ==========================================
  // 4. BIOLOGY (জীববিজ্ঞান) - 20 Questions
  // ==========================================
  biology: [
    {
      id: 'b-1',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'উদ্ভিদের সালোকসংশ্লেষণ প্রক্রিয়ায় উপজাত হিসেবে কোন গ্যাসটি নির্গত হয়?',
      options: ['অক্সিজেন (O₂)', 'কার্বন ডাই অক্সাইড (CO₂)', 'নাইট্রোজেন (N₂)', 'মিথেন (CH₄)'],
      correctIndex: 0,
      explanation: 'আলোক পর্যায়ে পানির ফটোলাইসিসের ফলে উপজাত হিসেবে অক্সিজেন উৎপন্ন হয়ে পত্ররন্ধ্র দিয়ে বের হয়।'
    },
    {
      id: 'b-2',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'কোষের ‘পাওয়ার হাউস’ (Powerhouse of the Cell) কাকে বলা হয়?',
      options: ['মাইটোকন্ড্রিয়া', 'গলগি বস্তু', 'রাইবোজোম', 'লাইসোজোম'],
      correctIndex: 0,
      explanation: 'মাইটোকন্ড্রিয়াতে শ্বসনের ক্রেবস চক্র সংঘটিত হয় এবং প্রচুর শক্তি (ATP) তৈরি হয় বলে একে পাওয়ার হাউস বলে।'
    },
    {
      id: 'b-3',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'মানবদেহে স্বাভাবিক অবস্থায় কত জোড়া ক্রোমোজোম থাকে?',
      options: ['২৩ জোড়া (৪৬টি)', '২২ জোড়া', '২৪ জোড়া', '৪৬ জোড়া'],
      correctIndex: 0,
      explanation: 'মানুষের দেহকোষে ২৩ জোড়া ক্রোমোজোম থাকে (২২ জোড়া অটোসোম এবং ১ জোড়া সেক্স ক্রোমোজোম)।'
    },
    {
      id: 'b-4',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'মায়োসিস (Meiosis) কোষ বিভাজন জীবদেহের কোন কোষে ঘটে?',
      options: ['জনন মাতৃকোষে', 'দেহকোষে', 'ত্বকের কোষে', 'হাড়ের কোষে'],
      correctIndex: 0,
      explanation: 'জনন মাতৃকোষে মায়োসিস ঘটে যার ফলে ক্রোমোজোম সংখ্যা অর্ধেক হয়ে হ্যাপ্লয়েড (n) গ্যামেট তৈরি হয়।'
    },
    {
      id: 'b-5',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'বংশগতির ভৌত ভিত্তি (Physical basis of heredity) কোনটি?',
      options: ['ক্রোমোজোম ও ডিএনএ', 'সাইটোপ্লাজম', 'কোষঝিল্লি', 'রাইবোজোম'],
      correctIndex: 0,
      explanation: 'ক্রোমোজোম এবং এর ভেতরে থাকা ডিএনএ (DNA) জীবের বংশগত বৈশিষ্ট্য পিতামাতা থেকে সন্তানে বহন করে।'
    },
    {
      id: 'b-6',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'রক্তের সর্বজনীন গ্রহীতা (Universal Recipient) কোন রক্তের গ্রুপকে বলা হয়?',
      options: ['AB+', 'O-', 'A+', 'B+'],
      correctIndex: 0,
      explanation: 'AB+ রক্তের গ্রুপে কোনো অ্যান্টিবডি না থাকায় এটি যেকোনো গ্রুপের রক্ত গ্রহণ করতে পারে।'
    },
    {
      id: 'b-7',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'রক্তের কোন উপাদান রক্ত জমাট বাঁধতে (Blood clotting) সাহায্য করে?',
      options: ['অনুচক্রিকা (Platelet)', 'লোহিত রক্তকণিকা (RBC)', 'শ্বেত রক্তকণিকা (WBC)', 'হিমোগ্লোবিন'],
      correctIndex: 0,
      explanation: 'অনুচক্রিকা এবং প্লাজমার ফাইব্রিনোজেন ক্ষতস্থানে রক্ত জমাট বাঁধতে প্রধান ভূমিকা পালন করে।'
    },
    {
      id: 'b-8',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'মানুষের হৃদপিণ্ড কতটি প্রকোষ্ঠ বিশিষ্ট?',
      options: ['৪টি প্রকোষ্ঠ', '২টি প্রকোষ্ঠ', '৩টি প্রকোষ্ঠ', '৬টি প্রকোষ্ঠ'],
      correctIndex: 0,
      explanation: 'মানব হৃদপিণ্ডে দুটি অলিন্দ (Atrium) এবং দুটি নিলয় (Ventricle)—মোট ৪টি প্রকোষ্ঠ রয়েছে।'
    },
    {
      id: 'b-9',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'উদ্ভিদের মূল দিয়ে শোষিত পানি কোন কলার মাধ্যমে পাতায় পৌঁছায়?',
      options: ['জাইলেম (Xylem)', 'ফ্লোয়েম (Phloem)', 'প্যারেনকাইমা', 'কোলেনকাইমা'],
      correctIndex: 0,
      explanation: 'জাইলেম কলা পানি ও খনিজ লবণ পাতায় পরিবহন করে, আর ফ্লোয়েম কলা প্রস্তুতকৃত খাদ্য সারা দেহে পাঠায়।'
    },
    {
      id: 'b-10',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'ডিএনএ (DNA) এর দ্বি-সূত্রক (Double Helix) মডেল কে আবিষ্কার করেন?',
      options: ['ওয়াটসন ও ক্রিক (Watson & Crick)', 'রবার্ট হুক', 'গ্রেগর জোহান মেন্ডেল', 'চার্লস ডারউইন'],
      correctIndex: 0,
      explanation: '১৯৫৩ সালে জেমস ওয়াটসন এবং ফ্রান্সিস ক্রিক ডিএনএর ডাবল হেলিক্স গঠন আবিষ্কার করে নোবেল পুরস্কার পান।'
    },
    {
      id: 'b-11',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'রক্তে গ্লুকোজের মাত্রা নিয়ন্ত্রণকারী হরমোন কোনটি?',
      options: ['ইনসুলিন (Insulin)', 'থাইরক্সিন', 'অ্যাড্রেনালিন', 'ইস্ট্রোজেন'],
      correctIndex: 0,
      explanation: 'অগ্ন্যাশয়ের আইলেটস অব ল্যাঙ্গারহ্যান্সের বিটা কোষ থেকে ইনসুলিন নিঃসৃত হয়ে রক্তের গ্লুকোজ নিয়ন্ত্রণ করে।'
    },
    {
      id: 'b-12',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'কোষে প্রোটিন সংশ্লেষণের প্রধান কারখানা কোনটি?',
      options: ['রাইবোজোম (Ribosome)', 'লাইসোজোম', 'ভ্যাকুওল', 'সেন্ট্রোজোম'],
      correctIndex: 0,
      explanation: 'রাইবোজোমে এমআরএনএ (mRNA)-র নির্দেশে অ্যামিনো অ্যাসিড যুক্ত হয়ে প্রোটিন তৈরি হয়।'
    },
    {
      id: 'b-13',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'লাইসোজোমকে কেন ‘আত্মঘাতী থলিকা’ (Suicidal Bag) বলা হয়?',
      options: ['তীব্র হাইড্রোলাইটিক এনজাইম দিয়ে কোষকে হজম করার সক্ষমতার কারণে', 'এটি বিষাক্ত গ্যাস তৈরি করে বলে', 'কোষের নিউক্লিয়াস ধ্বংস করে বলে', 'অক্সিজেন শোষণ করে বলে'],
      correctIndex: 0,
      explanation: 'লাইসোজোমের এনজাইম ঝিল্লি ফেটে বের হলে সম্পূর্ণ কোষটিই পরিপাক বা ধ্বংস হয়ে যায়।'
    },
    {
      id: 'b-14',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'মেন্ডেলের বংশগতির ১ম সূত্রকে কী বলা হয়?',
      options: ['পৃথকীকরণ সূত্র (Law of Segregation)', 'স্বাধীনভাবে মিলনের সূত্র', 'প্রকটতার সূত্র', 'প্রাকৃতিক নির্বাচন সূত্র'],
      correctIndex: 0,
      explanation: 'মেন্ডেলের ১ম সূত্র বলে: জননকোষ সৃষ্টির সময় বিপরীত বৈশিষ্ট্যের ফ্যাক্টরগুলো পৃথক হয়ে যায়।'
    },
    {
      id: 'b-15',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'বৃক্ক বা কিডনির গঠন ও কাজের একক কোনটি?',
      options: ['নেফ্রন (Nephron)', 'নিউরন (Neuron)', 'অ্যালভিওলাই', 'সাইটন'],
      correctIndex: 0,
      explanation: 'প্রতিটি মানব বৃক্কে প্রায় ১০ থেকে ১২ লক্ষ নেফ্রন থাকে, যা রক্ত পরিশোধন ও মূত্র তৈরি করে।'
    },
    {
      id: 'b-16',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'মস্তিষ্কের প্রধান গাঠনিক একক কোনটি?',
      options: ['নিউরন (স্নায়ুকোষ)', 'নেফ্রন', 'অ্যাক্সন', 'মায়োলিন'],
      correctIndex: 0,
      explanation: 'স্নায়ুতন্ত্রের গঠন ও কাজের একককে নিউরন বলে।'
    },
    {
      id: 'b-17',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'কোন ভিটামিনের অভাবে রিকেটস (Rickets) রোগ হয়?',
      options: ['ভিটামিন D', 'ভিটামিন A', 'ভিটামিন C', 'ভিটামিন B12'],
      correctIndex: 0,
      explanation: 'ভিটামিন D এর অভাবে হাড়ের ক্যালসিয়াম শোষণ ব্যাহত হয় এবং শিশুদের রিকেটস রোগ হয়।'
    },
    {
      id: 'b-18',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'উদ্ভিদের বৃদ্ধি নিয়ন্ত্রণকারী প্রধান হরমোন কোনটি?',
      options: ['অক্সিন (Auxin)', 'ইথিলিন', 'অ্যাবসিসিক অ্যাসিড', 'সাইটোকাইনিন'],
      correctIndex: 0,
      explanation: 'অক্সিন হরমোন উদ্ভিদের শীর্ষ মুকুলের বৃদ্ধি এবং আলোকমুখী চলন (Phototropism) নিয়ন্ত্রণ করে।'
    },
    {
      id: 'b-19',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'রক্তের কোন কণিকা মানবদেহের রোগ প্রতিরোধে সৈনিকের মতো কাজ করে?',
      options: ['শ্বেত রক্তকণিকা (Leukocyte)', 'লোহিত রক্তকণিকা', 'অণুচক্রিকা', 'প্লাজমা প্রোটিন'],
      correctIndex: 0,
      explanation: 'শ্বেত রক্তকণিকা ফ্যাগোসাইটোসিস পদ্ধতিতে জীবাণু ধ্বংস করে দেহের প্রতিরক্ষা দেয়।'
    },
    {
      id: 'b-20',
      subject: 'biology',
      subjectName: 'জীববিজ্ঞান',
      question: 'মানবদেহের বৃহত্তম গ্রন্থি (Largest Gland) কোনটি?',
      options: ['যকৃৎ (Liver)', 'অগ্ন্যাশয় (Pancreas)', 'থাইরয়েড', 'পিটুইটারি'],
      correctIndex: 0,
      explanation: 'যকৃৎ মানবদেহের সবচেয়ে বড় অন্তঃ ও বহিঃক্ষরা গ্রন্থি, যা প্রায় ৫০০টিরও বেশি শারীরবৃত্তীয় কাজ করে।'
    }
  ],

  // ==========================================
  // 5. ICT & CODING (আইসিটি ও প্রোগ্রামিং) - 20 Questions
  // ==========================================
  ict: [
    {
      id: 'i-1',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'Python প্রোগ্রামিং ভাষায় একটি চলকের ডাটা টাইপ জানতে কোন বিল্ট-ইন ফাংশন ব্যবহৃত হয়?',
      options: ['type()', 'typeof()', 'datatype()', 'printType()'],
      correctIndex: 0,
      explanation: 'Python-এ যেকোনো চলকের শ্রেণি বা টাইপ নির্ধারণ করতে type() ফাংশন ব্যবহার করা হয়।'
    },
    {
      id: 'i-2',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'ডিজিটাল লজিক গেটের মধ্যে কোন দুটিকে সার্বজনীন গেট (Universal Gates) বলা হয়?',
      options: ['NAND এবং NOR', 'AND এবং OR', 'XOR এবং XNOR', 'NOT এবং AND'],
      correctIndex: 0,
      explanation: 'NAND এবং NOR গেট দিয়ে অন্যান্য সকল মৌলিক গেট বাস্তবায়ন করা যায় বিধায় এদের সার্বজনীন গেট বলে।'
    },
    {
      id: 'i-3',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'দশমিক সংখ্যা ১২-এর বাইনারি মান কত?',
      options: ['1100', '1010', '1110', '1001'],
      correctIndex: 0,
      explanation: '১২ = ৮ + ৪ + ০ + ০ = (1100)₂।'
    },
    {
      id: 'i-4',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'HTML-এ সবচেয়ে বড় হেডিং তৈরি করতে কোন ট্যাগ ব্যবহার করা হয়?',
      options: ['<h1>', '<h6>', '<heading>', '<head>'],
      correctIndex: 0,
      explanation: 'HTML-এ h1 থেকে h6 পর্যন্ত হেডিং রয়েছে, যার মধ্যে h1 সবচেয়ে বড় এবং h6 সবচেয়ে ছোট।'
    },
    {
      id: 'i-5',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'একটি বাইটে (Byte) কতটি বিট (Bit) থাকে?',
      options: ['৮ বিট', '৪ বিট', '১৬ বিট', '১০২৪ বিট'],
      correctIndex: 0,
      explanation: '৮টি বাইনারি ডিজিট বা বিটের সমষ্টিকে এক বাইট বলা হয়।'
    },
    {
      id: 'i-6',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'Python কোডে: for i in range(1, 6): লুপটি কতবার ঘুরবে?',
      options: ['৫ বার', '৬ বার', '৪ বার', '১ বার'],
      correctIndex: 0,
      explanation: 'range(1, 6) সংখ্যাগুলো উৎপন্ন করে 1, 2, 3, 4, 5 — অর্থাৎ মোট ৫ বার ঘুরবে।'
    },
    {
      id: 'i-7',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'কম্পিউটারের অস্থায়ী মেমোরি (Volatile Memory) কোনটি?',
      options: ['RAM (Random Access Memory)', 'ROM', 'Hard Disk', 'SSD'],
      correctIndex: 0,
      explanation: 'বিদ্যুৎ চলে গেলে RAM-এর সকল তথ্য মুছে যায়, তাই এটি ভোলাটাইল বা অস্থায়ী মেমোরি।'
    },
    {
      id: 'i-8',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'ডেটাবেসে প্রতিটি রেকর্ডকে এককভাবে শনাক্ত করার জন্য কোন কী (Key) ব্যবহৃত হয়?',
      options: ['Primary Key', 'Foreign Key', 'Candidate Key', 'Composite Key'],
      correctIndex: 0,
      explanation: 'প্রাইমারি কি এর মান অবশ্যই ইউনিক ও নট-নাল (Not Null) হতে হয়।'
    },
    {
      id: 'i-9',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'URL-এর পূর্ণরূপ কী?',
      options: ['Uniform Resource Locator', 'Universal Resource Link', 'Unified Reference Language', 'Unique Record Line'],
      correctIndex: 0,
      explanation: 'ওয়েব পেজের নির্দিষ্ট ঠিকানাকে নির্দেশ করার বৈশ্বিক ফরম্যাট হলো Uniform Resource Locator।'
    },
    {
      id: 'i-10',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'সি (C) ভাষায় কোনো স্টেটমেন্ট শেষ করতে কোন চিহ্ন ব্যবহার করতে হয়?',
      options: ['; (সেমিকোলন)', ': (কোলন)', '. (ডট)', ', (কমা)'],
      correctIndex: 0,
      explanation: 'C, C++, Java ইত্যাদি ভাষায় প্রতিটি নির্দেশ বা স্টেটমেন্ট সেমিকোলন (;) দিয়ে শেষ করতে হয়।'
    },
    {
      id: 'i-11',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'IPv4 অ্যাড্রেস কত বিটের হয়ে থাকে?',
      options: ['৩২ বিট', '৬৪ বিট', '১২৮ বিট', '১৬ বিট'],
      correctIndex: 0,
      explanation: 'IPv4 অ্যাড্রেস ৪টি অকটেট বা ৩২ বিট বিশিষ্ট (যেমন: 192.168.1.1)। IPv6 হলো ১২৮ বিট।'
    },
    {
      id: 'i-12',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'SQL-এ টেবিল থেকে সব ডেটা নির্বাচন করতে কোন কমান্ড ব্যবহৃত হয়?',
      options: ['SELECT * FROM table_name;', 'GET ALL FROM table_name;', 'FIND * IN table_name;', 'READ table_name;'],
      correctIndex: 0,
      explanation: 'SQL (Structured Query Language)-এ ডেটা ফেচ করতে SELECT স্টেটমেন্ট ব্যবহৃত হয়।'
    },
    {
      id: 'i-13',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'নিচের কোনটি ওপেন সোর্স অপারেটিং সিস্টেম?',
      options: ['Linux', 'Windows 11', 'macOS', 'iOS'],
      correctIndex: 0,
      explanation: 'লিনাক্স একটি ফ্রি ও ওপেন সোর্স অপারেটিং সিস্টেম যার কার্নেল মুক্তভাবে বিতরণযোগ্য।'
    },
    {
      id: 'i-14',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'HTML ফাইলে হাইপারলিংক তৈরি করতে কোন ট্যাগ ব্যবহৃত হয়?',
      options: ['<a>', '<link>', '<href>', '<url>'],
      correctIndex: 0,
      explanation: '<a href="url">লিংক টেক্সট</a> — অ্যাংকর ট্যাগের মাধ্যমে হাইপারলিংক করা হয়।'
    },
    {
      id: 'i-15',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'ক্লাউড কম্পিউটিংয়ের তিনটি প্রধান সার্ভিস মডেল কী কী?',
      options: ['IaaS, PaaS, SaaS', 'HTML, CSS, JS', 'LAN, MAN, WAN', 'HTTP, FTP, SMTP'],
      correctIndex: 0,
      explanation: 'ক্লাউড সার্ভিসের ৩ স্তর: Infrastructure (IaaS), Platform (PaaS) এবং Software as a Service (SaaS)।'
    },
    {
      id: 'i-16',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'Python প্রোগ্রামিংয়ে একটি ফাংশন ডিফাইন করতে কোন কিওয়ার্ড ব্যবহার করা হয়?',
      options: ['def', 'function', 'fn', 'define'],
      correctIndex: 0,
      explanation: 'Python-এ ফাংশন শুরু হয় "def function_name():" দিয়ে।'
    },
    {
      id: 'i-17',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'কম্পিউটার নেটওয়ার্কে কোন টপোলজিতে সব ডিভাইস একটি কেন্দ্রীয় সুইচের সাথে যুক্ত থাকে?',
      options: ['স্টার টপোলজি (Star)', 'বাস টপোলজি (Bus)', 'রিং টপোলজি (Ring)', 'মেশ টপোলজি (Mesh)'],
      correctIndex: 0,
      explanation: 'স্টার টপোলজিতে কেন্দ্রীয় হাব বা সুইচের মাধ্যমে সব কম্পিউটার সংযুক্ত থাকে।'
    },
    {
      id: 'i-18',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'ডি মরগ্যানের প্রথম উপপাদ্যটি কোনটি?',
      options: ['(A + B)\' = A\' · B\'', '(A · B)\' = A\' + B\'', 'A + 0 = A', 'A · 1 = A'],
      correctIndex: 0,
      explanation: 'ডি মরগ্যানের প্রথম সূত্র: দুটি চলকের যোগফলের কমপ্লিমেন্ট তাদের আলাদা কমপ্লিমেন্টের গুণফলের সমান।'
    },
    {
      id: 'i-19',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'মেশিন লার্নিং ও এআই (AI) এর জন্য সর্বাধিক জনপ্রিয় প্রোগ্রামিং ভাষা কোনটি?',
      options: ['Python', 'HTML', 'PHP', 'Visual Basic'],
      correctIndex: 0,
      explanation: 'TensorFlow, PyTorch, NumPy ইত্যাদি সমৃদ্ধ লাইব্রেরির কারণে Python এআইয়ের জন্য শীর্ষে।'
    },
    {
      id: 'i-20',
      subject: 'ict',
      subjectName: 'আইসিটি',
      question: 'ওয়েব ব্রাউজার ও ওয়েব সার্ভারের মধ্যে সুরক্ষিত ডেটা আদান-প্রদানে কোন প্রটোকল ব্যবহৃত হয়?',
      options: ['HTTPS', 'HTTP', 'FTP', 'Telnet'],
      correctIndex: 0,
      explanation: 'HTTPS (HyperText Transfer Protocol Secure) SSL/TLS এনক্রিপশনের মাধ্যমে নিরাপদ যোগাযোগ দেয়।'
    }
  ],

  // ==========================================
  // 6. ENGLISH (ইংরেজি ব্যাকরণ ও সাহিত্য) - 20 Questions
  // ==========================================
  english: [
    {
      id: 'e-1',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Choose the correct sentence according to Subject-Verb Agreement:',
      options: [
        'Neither of the students was present.',
        'Neither of the students were present.',
        'Neither of the students are present.',
        'Neither of the student were present.'
      ],
      correctIndex: 0,
      explanation: 'After "Neither of", plural noun/pronoun takes a singular verb (was).'
    },
    {
      id: 'e-2',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Identify the passive voice of: "The teacher punished the boy."',
      options: [
        'The boy was punished by the teacher.',
        'The boy is punished by the teacher.',
        'The boy had punished by the teacher.',
        'The teacher was punished the boy.'
      ],
      correctIndex: 0,
      explanation: 'Past indefinite passive form: Object + was/were + V3 + by + Subject.'
    },
    {
      id: 'e-3',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Fill in the blank: "He has been living in Dhaka _____ 2015."',
      options: ['since', 'for', 'from', 'in'],
      correctIndex: 0,
      explanation: 'For a specific point in time in Present Perfect Continuous tense, "since" is used.'
    },
    {
      id: 'e-4',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Complete the proverb: "Look before you _____."',
      options: ['leap', 'jump', 'run', 'walk'],
      correctIndex: 0,
      explanation: 'The famous English proverb is: "Look before you leap" (ভাবিয়া করিও কাজ, করিয়া ভাবিও না)।'
    },
    {
      id: 'e-5',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'What is the synonym of the word "Diligent"?',
      options: ['Hardworking', 'Lazy', 'Clever', 'Careless'],
      correctIndex: 0,
      explanation: '"Diligent" means showing care and conscientiousness in one\'s work; hardworking.'
    },
    {
      id: 'e-6',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Choose the correct form: "It is high time we _____ our bad habits."',
      options: ['changed', 'change', 'had changed', 'will change'],
      correctIndex: 0,
      explanation: 'After "It is high time", the following clause must use the Past Indefinite verb form (V2).'
    },
    {
      id: 'e-7',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Which word is an antonym for "Abundant"?',
      options: ['Scarce', 'Plentiful', 'Lavish', 'Ample'],
      correctIndex: 0,
      explanation: '"Abundant" means existing in large quantities; its opposite is "Scarce" (বিরল/অপ্রতুল)।'
    },
    {
      id: 'e-8',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Identify the noun in the sentence: "Honesty is the best policy."',
      options: ['Honesty and policy', 'Best', 'Is', 'The'],
      correctIndex: 0,
      explanation: '"Honesty" and "policy" are abstract nouns.'
    },
    {
      id: 'e-9',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Complete: "Walk fast lest you _____ miss the train."',
      options: ['should', 'would', 'will', 'must'],
      correctIndex: 0,
      explanation: 'Clauses following the conjunction "lest" always take the auxiliary verb "should".'
    },
    {
      id: 'e-10',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Who wrote the tragedy "Hamlet"?',
      options: ['William Shakespeare', 'John Milton', 'William Wordsworth', 'Charles Dickens'],
      correctIndex: 0,
      explanation: 'William Shakespeare wrote Hamlet around 1599-1601.'
    },
    {
      id: 'e-11',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Choose the correct preposition: "The man died _____ cholera."',
      options: ['of', 'from', 'by', 'for'],
      correctIndex: 0,
      explanation: 'When someone dies of a disease, the preposition "of" is used (Die of cholera/cancer).'
    },
    {
      id: 'e-12',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'What is the past participle form of the verb "Fly"?',
      options: ['Flown', 'Flew', 'Flyed', 'Flying'],
      correctIndex: 0,
      explanation: 'Conjugation: Fly (V1) - Flew (V2) - Flown (V3).'
    },
    {
      id: 'e-13',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Choose the indirect speech of: He said, "I am reading a book."',
      options: [
        'He said that he was reading a book.',
        'He said that I was reading a book.',
        'He said that he is reading a book.',
        'He told he was reading a book.'
      ],
      correctIndex: 0,
      explanation: 'Present continuous changes to Past continuous in indirect speech.'
    },
    {
      id: 'e-14',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'What is the comparative degree of "Good"?',
      options: ['Better', 'Best', 'Gooder', 'More good'],
      correctIndex: 0,
      explanation: 'Degrees of comparison: Good (Positive) - Better (Comparative) - Best (Superlative).'
    },
    {
      id: 'e-15',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Which of the following is an example of an Interjection?',
      options: ['Alas!', 'Quickly', 'Because', 'Under'],
      correctIndex: 0,
      explanation: '"Alas!" expresses sudden grief or sorrow and is an interjection.'
    },
    {
      id: 'e-16',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'What is the plural form of the word "Oasis"?',
      options: ['Oases', 'Oasises', 'Oasis', 'Oasees'],
      correctIndex: 0,
      explanation: 'Words derived from Greek ending in -is typically change to -es (Crisis -> Crises, Oasis -> Oases).'
    },
    {
      id: 'e-17',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Fill in the blank: "If he had studied hard, he _____ passed the exam."',
      options: ['would have', 'will have', 'would', 'had'],
      correctIndex: 0,
      explanation: '3rd Conditional structure: If + Past Perfect, Subject + would have + V3.'
    },
    {
      id: 'e-18',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'What does the idiom "A piece of cake" mean?',
      options: ['Something very easy', 'A tasty food', 'A difficult challenge', 'A birthday celebration'],
      correctIndex: 0,
      explanation: 'The idiom "a piece of cake" refers to a task or job that is simple and easy to accomplish.'
    },
    {
      id: 'e-19',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Select the correctly spelled word:',
      options: ['Accommodation', 'Acommodation', 'Accomodation', 'Acomodation'],
      correctIndex: 0,
      explanation: 'The correct spelling is "Accommodation" (double \'c\' and double \'m\').'
    },
    {
      id: 'e-20',
      subject: 'english',
      subjectName: 'ইংরেজি',
      question: 'Identify the sentence with a Gerund:',
      options: [
        'Swimming is a great exercise.',
        'He is swimming in the pool.',
        'They went to swim.',
        'The swimming ducks looked cute.'
      ],
      correctIndex: 0,
      explanation: '"Swimming" acts as the noun subject of the sentence, which makes it a Gerund.'
    }
  ],

  // ==========================================
  // 7. BANGLA (বাংলা ব্যাকরণ ও সাহিত্য) - 20 Questions
  // ==========================================
  bangla: [
    {
      id: 'bn-1',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘সিংহ চিহ্নিত আসন = সিংহাসন’ — এটি কোন সমাসের উদাহরণ?',
      options: ['মধ্যপদলোপী কর্মধারয়', 'দ্বিগু সমাস', 'দ্বন্দ্ব সমাস', 'বহুব্রীহি সমাস'],
      correctIndex: 0,
      explanation: 'ব্যাসবাক্যের মাঝের পদ ‘চিহ্নিত’ লোপ পেয়ে সমস্তপদ হওয়ায় এটি মধ্যপদলোপী কর্মধারয় সমাস।'
    },
    {
      id: 'bn-2',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'বাংলা সাহিত্যের প্রাচীনতম নিদর্শন কোনটি?',
      options: ['চর্যাপদ', 'শ্রীকৃষ্ণকীর্তন', 'মঙ্গলকাব্য', 'পদ্মাবতী'],
      correctIndex: 0,
      explanation: 'হরপ্রসাদ শাস্ত্রী কর্তৃক ১৯০৭ সালে নেপালের রাজদরবার থেকে আবিষ্কৃত ‘চর্যাপদ’ বাংলা ভাষার আদি নিদর্শন।'
    },
    {
      id: 'bn-3',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘জগৎ + নাথ = জগন্নাথ’ — এটি কোন সন্ধির উদাহরণ?',
      options: ['ব্যঞ্জনসন্ধি', 'স্বরসন্ধি', 'বিসর্গ সন্ধি', 'নিপাতনে সিদ্ধ সন্ধি'],
      correctIndex: 0,
      explanation: 'ত-কারের পর ন-কার থাকলে ত-কার পরিবর্তিত হয়ে ন-কার হয়। ব্যঞ্জনে ব্যঞ্জনে মিলিত হওয়ায় এটি ব্যঞ্জনসন্ধি।'
    },
    {
      id: 'bn-4',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘পাপে বিরত হও’ — এখানে ‘পাপে’ কোন কারকে কোন বিভক্তি?',
      options: ['অপাদানে ৭মী', 'করণে ৭মী', 'অধিকরণে ৭মী', 'কর্মে ৭মী'],
      correctIndex: 0,
      explanation: 'যা থেকে কোনো কিছু ভীত, জাত, রক্ষিত বা বিরত হয়, তাকে অপাদান কারক বলে। পাপে (এ বিভক্তি = ৭মী)।'
    },
    {
      id: 'bn-5',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'বাংলা সাহিত্যের প্রথম মহাকাব্য ‘মেঘনাদবধ কাব্য’-এর রচয়িতা কে?',
      options: ['মাইকেল মধুসূদন দত্ত', 'ঈশ্বরচন্দ্র বিদ্যাসাগর', 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়', 'রবীন্দ্রনাথ ঠাকুর'],
      correctIndex: 0,
      explanation: '১৮৬১ সালে অমিত্রাক্ষর ছন্দে প্রথম বাংলা মহাকাব্য ‘মেঘনাদবধ কাব্য’ রচনা করেন মাইকেল মধুসূদন দত্ত।'
    },
    {
      id: 'bn-6',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘চোখের বালি’ বাগধারাটির সঠিক অর্থ কী?',
      options: ['অপ্রিয় ব্যক্তি / শত্রু', 'অন্ধ ব্যক্তি', 'খুব প্রিয় ব্যক্তি', 'ধূর্ত ব্যক্তি'],
      correctIndex: 0,
      explanation: '‘চোখের বালি’ বাগধারাটির অর্থ হলো যে ব্যক্তি চোখে সহ্য হয় না বা চক্ষুশূল/অপ্রিয় ব্যক্তি।'
    },
    {
      id: 'bn-7',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'বাংলা বর্ণমালায় মোট কতটি বর্ণ রয়েছে?',
      options: ['৫০টি', '৩৯টি', '১১টি', '৫২টি'],
      correctIndex: 0,
      explanation: 'বাংলা বর্ণমালায় মোট ৫০টি বর্ণ (১১টি স্বরবর্ণ এবং ৩৯টি ব্যঞ্জনবর্ণ) রয়েছে।'
    },
    {
      id: 'bn-8',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘পদ্মা নদীর মাঝি’ উপন্যাসের রচয়িতা কে?',
      options: ['মানিক বন্দ্যোপাধ্যায়', 'তারাশঙ্কর বন্দ্যোপাধ্যায়', 'বিভূতিভূষণ বন্দ্যোপাধ্যায়', 'কাজী নজরুল ইসলাম'],
      correctIndex: 0,
      explanation: 'জেলে জীবনের বাস্তবচিত্র নিয়ে ১৯৩৬ সালে উপন্যাসটি লেখেন কথাশিল্পী মানিক বন্দ্যোপাধ্যায়।'
    },
    {
      id: 'bn-9',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘দশ আনন যার = দশানন (রাবণ)’ — এটি কোন সমাস?',
      options: ['সংখ্যাবাচক বহুব্রীহি সমাস', 'দ্বিগু সমাস', 'তৎপুরুষ সমাস', 'কর্মধারয় সমাস'],
      correctIndex: 0,
      explanation: 'পূর্বপদ বা পরপদের অর্থ না বুঝিয়ে তৃতীয় কোনো ব্যক্তিকে (রাবণ) বোঝানোয় এটি বহুব্রীহি সমাস।'
    },
    {
      id: 'bn-10',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'বাংলা ভাষায় ব্যবহৃত খাঁটি বাংলা উপসর্গ কতটি?',
      options: ['২১টি', '২০টি', '১৯টি', '২৫টি'],
      correctIndex: 0,
      explanation: 'খাঁটি বাংলা উপসর্গ ২১টি (অ, অঘা, অজ, অনা, আ...) এবং তৎসম বা সংস্কৃত উপসর্গ ২০টি।'
    },
    {
      id: 'bn-11',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'রবীন্দ্রনাথ ঠাকুর কত সালে এবং কোন গ্রন্থের জন্য নোবেল পুরস্কার পান?',
      options: ['১৯১৩ সালে ‘গীতাঞ্জলি’ কাব্যের জন্য', '১৯১১ সালে ‘বলাকা’র জন্য', '১৯১৫ সালে ‘চোখের বালি’র জন্য', '১৯২১ সালে ‘সোনার তরী’র জন্য'],
      correctIndex: 0,
      explanation: '১৯১৩ সালে গীতাঞ্জলি (Song Offerings) কাব্যের অনুবাদের জন্য এশিয়ার প্রথম ব্যক্তি হিসেবে তিনি নোবেল পান।'
    },
    {
      id: 'bn-12',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘সূর্য’ শব্দের সঠিক সমার্থক শব্দ কোনটি?',
      options: ['ভানু / রবি / দিবাকর', 'শশী / চাঁদ', 'জলধর / মেঘ', 'পবন / বাতাস'],
      correctIndex: 0,
      explanation: 'ভানু, তপন, ভাস্কর, রবি, দিনমণি, দিবাকর সূর্যের সমার্থক শব্দ।'
    },
    {
      id: 'bn-13',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘যা চিরস্থায়ী নয়’ — এক কথায় প্রকাশ কী হবে?',
      options: ['নশ্বর', 'অনশ্বর', 'অমর', 'অচির'],
      correctIndex: 0,
      explanation: 'যা সহজে বা কালের নিয়মে ধ্বংস হয়ে যায় তাকে ‘নশ্বর’ বলে। আর যা চিরকাল থাকে তা ‘অনশ্বর’ বা ‘অবিনশ্বর’।'
    },
    {
      id: 'bn-14',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'কাজী নজরুল ইসলামের প্রথম প্রকাশিত কাব্যগ্রন্থ কোনটি?',
      options: ['অগ্নিবীণা (১৯২২)', 'বিষের বাঁশী', 'সর্বহারা', 'দোলন-চাঁপা'],
      correctIndex: 0,
      explanation: '১৯২২ সালে প্রকাশিত ‘অগ্নিবীণা’ নজরুল ইসলামের প্রথম কাব্যগ্রন্থ যাতে বিখ্যাত ‘বিদ্রোহী’ কবিতাটি ছিল।'
    },
    {
      id: 'bn-15',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'বাংলা ব্যাকরণের প্রধান ৪টি আলোচ্য বিষয় কী কী?',
      options: ['ধ্বনিমূল, রূপমূল/শব্দতত্ত্ব, বাক্যতত্ত্ব ও অর্থতত্ত্ব', 'স্বরবর্ণ, ব্যঞ্জনবর্ণ, কারক ও সমাস', 'সন্ধি, প্রত্যয়, উপসর্গ ও অনুস্বার', 'গদ্য, পদ্য, নাটক ও উপন্যাস'],
      correctIndex: 0,
      explanation: 'ভাষাবিজ্ঞান অনুসারে ব্যাকরণের চারটি শাখা: Phonology, Morphology, Syntax এবং Semantics।'
    },
    {
      id: 'bn-16',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘তিলে তৈল হয়’ — এখানে ‘তিলে’ কোন কারকে কোন বিভক্তি?',
      options: ['অপাদানে ৭মী', 'অধিকরণে ৭মী', 'করণে ৭মী', 'কর্মে ৭মী'],
      correctIndex: 0,
      explanation: 'তিল থেকে তেল উৎপন্ন বা জাত হয় বলে অপাদান কারকে ৭মী বিভক্তি।'
    },
    {
      id: 'bn-17',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'নিচের কোন বানানটি সম্পূর্ণ শুদ্ধ?',
      options: ['মুমূর্ষু', 'মুমুর্যু', 'মুমুর্ষু', 'মুমুর্ষূ'],
      correctIndex: 0,
      explanation: 'সঠিক বানান: ম-এ হ্রস্ব উ (মু), ম-এ দীর্ঘ উ (মূ), এবং ষ-এ রেফ হ্রস্ব উ (র্ষু) — মুমূর্ষু।'
    },
    {
      id: 'bn-18',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: '‘একাত্তরের দিনগুলি’ স্মৃতিচারণমূলক গ্রন্থটির রচয়িতা কে?',
      options: ['জাহানারা ইমাম', 'সুফিয়া কামাল', 'বেগম রোকেয়া', 'সেলিনা হোসেন'],
      correctIndex: 0,
      explanation: 'শহীদ জননী জাহানারা ইমাম ১৯৭১ সালের মুক্তিযুদ্ধের বাস্তব অভিজ্ঞতা নিয়ে এই অমর ডায়েরি গ্রন্থটি লেখেন।'
    },
    {
      id: 'bn-19',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'বিসর্গ সন্ধির উদাহরণ কোনটি?',
      options: ['শিরোচ্ছেদ (শিরঃ + ছেদ)', 'বিদ্যালয়', 'সতীশ', 'দিগন্ত'],
      correctIndex: 0,
      explanation: 'শিরঃ + ছেদ = শিরোচ্ছেদ, যা বিসর্গ সন্ধির নিয়মে গঠিত হয়েছে।'
    },
    {
      id: 'bn-20',
      subject: 'bangla',
      subjectName: 'বাংলা',
      question: 'উপসর্গ শব্দের কোথায় বসে নতুন অর্থবোধক শব্দ গঠন করে?',
      options: ['শব্দ বা ধাতুর পূর্বে', 'শব্দের শেষে', 'শব্দের মাঝে', 'বাক্যের শেষে'],
      correctIndex: 0,
      explanation: 'যেসব অর্থহীন বর্ণ বা বর্ণসমষ্টি শব্দ বা ধাতুর পূর্বে বসে অর্থের পরিবর্তন ঘটায় তাকে উপসর্গ বলে।'
    }
  ],

  // ==========================================
  // 8. GENERAL KNOWLEDGE & CAMPUS (সাধারণ জ্ঞান ও ক্যাম্পাস) - 20 Questions
  // ==========================================
  school: [
    {
      id: 's-1',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আইডিয়াল স্কুল অ্যান্ড কলেজ কোন সালে প্রতিষ্ঠিত হয়?',
      options: ['১৯৬৫ সালে', '১৯৭১ সালে', '১৯৫২ সালে', '১৯৮৫ সালে'],
      correctIndex: 0,
      explanation: 'আইডিয়াল স্কুল অ্যান্ড কলেজ ১৯৬৫ সালে মতিঝিলে একটি আদর্শ শিক্ষাপ্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হয়।'
    },
    {
      id: 's-2',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'বাংলাদেশের জাতীয় সংগীত ‘আমার সোনার বাংলা’-র রচয়িতা কে?',
      options: ['রবীন্দ্রনাথ ঠাকুর', 'কাজী নজরুল ইসলাম', 'দ্বিজেন্দ্রলাল রায়', 'জীবনানন্দ দাশ'],
      correctIndex: 0,
      explanation: '১৯০৫ সালে বঙ্গভঙ্গ আন্দোলনের পটভূমিতে রবীন্দ্রনাথ ঠাকুর এটি রচনা করেন।'
    },
    {
      id: 's-3',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আইডিয়াল স্কুলে ১ম থেকে ৯ম শ্রেণিতে সরকারি নীতিমালা অনুযায়ী কোন পদ্ধতিতে ভর্তি নেওয়া হয়?',
      options: ['কেন্দ্রীয় ডিজিটাল লটারি', 'লিখিত ভর্তি পরীক্ষা', 'মৌখিক ভাইভা', 'প্রথম আসলে প্রথম অগ্রাধিকার'],
      correctIndex: 0,
      explanation: 'শিক্ষা মন্ত্রণালয়ের কেন্দ্রীয় নীতিমালা অনুসারে সম্পূর্ণ ডিজিটাল লটারির মাধ্যমে ভর্তি পরিচালিত হয়।'
    },
    {
      id: 's-4',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'বাংলাদেশের সংবিধান কত তারিখে গণপরিষদে গৃহীত হয়?',
      options: ['৪ নভেম্বর ১৯৭২', '১৬ ডিসেম্বর ১৯৭২', '২৬ মার্চ ১৯৭১', '৭ মার্চ ১৯৭১'],
      correctIndex: 0,
      explanation: '১৯৭২ সালের ৪ নভেম্বর গণপরিষদে সংবিধান গৃহীত হয় এবং ১৬ ডিসেম্বর থেকে কার্যকর হয়।'
    },
    {
      id: 's-5',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আইডিয়াল স্কুলের প্রভাতী শাখার পাঠদান সময়সূচি কোনটি?',
      options: ['সকাল ০৭:১৫ থেকে ১১:৩০', 'সকাল ০৯:০০ থেকে ০২:০০', 'দুপুর ১২:০০ থেকে ০৫:১৫', 'সকাল ০৮:০০ থেকে ০১:০০'],
      correctIndex: 0,
      explanation: 'বিদ্যালয়ে প্রভাতী শাখা সকাল ০৭:১৫ থেকে ১১:৩০ এবং দিবা শাখা দুপুর ১২:০০ থেকে ০৫:১৫ পর্যন্ত চলে।'
    },
    {
      id: 's-6',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'বাংলাদেশের জাতীয় স্মৃতিসৌধের স্থপতি কে?',
      options: ['সৈয়দ মাইনুল হোসেন', 'হামিদুর রহমান', 'মাজহারুল ইসলাম', 'শামীম শিকদার'],
      correctIndex: 0,
      explanation: 'সাভারে অবস্থিত জাতীয় স্মৃতিসৌধের স্থপতি সৈয়দ মাইনুল হোসেন।'
    },
    {
      id: 's-7',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আইডিয়াল স্কুলের শিক্ষার্থীদের টিউশন ফি ও বেতন কোন মাধ্যমে নিরাপদে পরিশোধ করা যায়?',
      options: ['বিকাশ (bKash), নগদ ও সোনালী ই-সেবা', 'কেবল নগদে ব্যাংকে গিয়ে', 'চেকের মাধ্যমে', 'ডাকযোগে'],
      correctIndex: 0,
      explanation: 'SchoolPulse প্ল্যাটফর্মের মাধ্যমে সরাসরি বিকাশ, নগদ বা সোনালী ব্যাংকে অনলাইনে ফি দেওয়া যায়।'
    },
    {
      id: 's-8',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'পদ্মা সেতু কত তারিখে জনসাধারণের চলাচলের জন্য আনুষ্ঠানিকভাবে উদ্বোধন করা হয়?',
      options: ['২৫ জুন ২০২২', '১৬ ডিসেম্বর ২০২১', '২৬ মার্চ ২০২২', '১ জানুয়ারি ২০২৩'],
      correctIndex: 0,
      explanation: '২০২২ সালের ২৫ জুন বাংলাদেশের গর্ব ও আত্মমর্যাদার প্রতীক পদ্মা সেতু উদ্বোধন করা হয়।'
    },
    {
      id: 's-9',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'NCTB গ্রেডিং পদ্ধতিতে লেটার গ্রেড A+ পাওয়ার জন্য প্রাপ্ত নম্বরের সীমা কত?',
      options: ['৮০% থেকে ১০০%', '৭০% থেকে ৭৯%', '৬০% থেকে ৬৯%', '৮৫% থেকে ১০০%'],
      correctIndex: 0,
      explanation: 'বাংলাদেশ শিক্ষা বোর্ডের নীতিমালায় ৮০ বা তার বেশি নম্বর পেলে গ্রেড পয়েন্ট ৫.০০ (A+) প্রদান করা হয়।'
    },
    {
      id: 's-10',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আন্তর্জাতিক মাতৃভাষা দিবস কোন তারিখে বিশ্বব্যাপী পালিত হয়?',
      options: ['২১ ফেব্রুয়ারি', '২৬ মার্চ', '১৬ ডিসেম্বর', '১৪ এপ্রিল'],
      correctIndex: 0,
      explanation: 'ইউনেস্কো ১৯৯৯ সালে ২১শে ফেব্রুয়ারিকে আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে স্বীকৃতি দেয়।'
    },
    {
      id: 's-11',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আইডিয়াল স্কুল অ্যান্ড কলেজের মতিঝিল ছাড়াও অন্য দুটি প্রধান শাখা কোথায় অবস্থিত?',
      options: ['বনশ্রী ও মুগদা শাখা', 'মিরপুর ও উত্তরা শাখা', 'ধানমন্ডি ও গুলশান শাখা', 'যাত্রাবাড়ী ও লালবাগ শাখা'],
      correctIndex: 0,
      explanation: 'আইডিয়াল স্কুল অ্যান্ড কলেজের তিনটি মূল ক্যাম্পাস: মতিঝিল (মূল), বনশ্রী ও মুগদা।'
    },
    {
      id: 's-12',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'বাংলাদেশের একমাত্র প্রবাল দ্বীপ কোনটি?',
      options: ['সেন্টমার্টিন', 'কুতুবদিয়া', 'হাতিয়া', 'মনপুরা'],
      correctIndex: 0,
      explanation: 'বঙ্গোপসাগরের উত্তর-পূর্বাংশে অবস্থিত সেন্টমার্টিন বাংলাদেশের একমাত্র প্রবাল দ্বীপ।'
    },
    {
      id: 's-13',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আইডিয়াল স্কুলের শিক্ষার্থীদের রেজাল্ট কার্ডে কোন প্রযুক্তির মাধ্যমে সত্যতা যাচাই করা যায়?',
      options: ['ভেরিফায়েড কিউআর কোড (QR Code)', 'স্ট্যাম্প সিল', 'ম্যানুয়াল সাক্ষর', 'হলোগ্রাম স্টিকার'],
      correctIndex: 0,
      explanation: 'SchoolPulse রিপোর্টে ডায়নামিক কিউআর কোড স্ক্যান করে অনলাইন ডাটাবেস থেকে সত্যায়ন করা যায়।'
    },
    {
      id: 's-14',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'মুক্তিযুদ্ধের সময় বাংলাদেশকে মোট কতটি সেক্টরে ভাগ করা হয়েছিল?',
      options: ['১১টি সেক্টরে', '৭টি সেক্টরে', '৬৪টি সেক্টরে', '৯টি সেক্টরে'],
      correctIndex: 0,
      explanation: '১৯৭১ সালে মুক্তিযুদ্ধকে সঠিকভাবে পরিচালনার জন্য সারা দেশকে ১১টি সেক্টরে ভাগ করা হয়েছিল।'
    },
    {
      id: 's-15',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আইডিয়াল স্কুলের লাইব্রেরিতে শিক্ষার্থীদের জন্য কোন সুবিধাটি বিদ্যমান?',
      options: ['ডিজিটাল ক্যাটালগ ও ২০,০০০+ পাঠ্য ও রেফারেন্স বই', 'কেবল খবরের কাগজ', 'কোনো বই ইস্যু হয় না', 'কেবল শিক্ষকদের প্রবেশাধিকার'],
      correctIndex: 0,
      explanation: 'সমৃদ্ধ লাইব্রেরিতে ২০ হাজারেরও বেশি দুর্লভ বই, আন্তর্জাতিক জার্নাল ও ডিজিটাল ই-বুক কর্নার রয়েছে।'
    },
    {
      id: 's-16',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'বঙ্গবন্ধু স্যাটেলাইট-১ কোন তারিখে মহাকাশে উৎক্ষেপণ করা হয়?',
      options: ['১২ মে ২০১৮', '২৬ মার্চ ২০১৯', '১৬ ডিসেম্বর ২০১৭', '১০ জানুয়ারি ২০১৮'],
      correctIndex: 0,
      explanation: 'যুক্তরাষ্ট্রের ফ্লোরিডার কেনেডি স্পেস সেন্টার থেকে বাংলাদেশের প্রথম যোগাযোগ উপগ্রহ উৎক্ষেপণ করা হয়।'
    },
    {
      id: 's-17',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আইডিয়াল স্কুলের বিজ্ঞান বিভাগের শিক্ষার্থীদের জন্য কোন বিশেষ উইং কাজ করে?',
      options: ['সায়েন্স ক্লাব ও গণিত-অলিম্পিয়াড সেল', 'ডিবেট ক্লাব', 'স্কাউট দল', 'সাংস্কৃতিক পরিষদ'],
      correctIndex: 0,
      explanation: 'আইডিয়াল সায়েন্স সোসাইটি এবং অলিম্পিয়াড উইং জাতীয় ও আন্তর্জাতিক প্রতিযোগিতার প্রস্তুতি নিশ্চিত করে।'
    },
    {
      id: 's-18',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'বাংলাদেশের রাষ্ট্রীয় মনোগ্রামের ডিজাইনার কে?',
      options: ['এ এন এ সাহা', 'কামরুল হাসান', 'হাশেম খান', 'জয়নুল আবেদিন'],
      correctIndex: 0,
      explanation: 'বাংলাদেশের জাতীয় মনোগ্রামের নকশা করেন শিল্পী এ এন এ সাহা।'
    },
    {
      id: 's-19',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'আইডিয়াল স্কুলে বার্ষিক ক্রীড়া প্রতিযোগিতা সাধারণত কোন সময়ে অনুষ্ঠিত হয়?',
      options: ['শীতকালে (জানুয়ারি-ফেব্রুয়ারি)', 'গ্রীষ্মকালে (মে-জুন)', 'বর্ষাকালে', 'পরীক্ষার সময়'],
      correctIndex: 0,
      explanation: 'প্রতি বছর জানুয়ারি-ফেব্রুয়ারি মাসে প্রতিষ্ঠানের তিনটি ক্যাম্পাসে মহাসমারোহে বার্ষিক ক্রীড়া অনুষ্ঠিত হয়।'
    },
    {
      id: 's-20',
      subject: 'school',
      subjectName: 'ক্যাম্পাস ও সাধারণ জ্ঞান',
      question: 'ইউনেস্কোর বিশ্ব ঐতিহ্যের অংশ হিসেবে স্বীকৃতিপ্রাপ্ত সুন্দরবন কোন ধরনের বনভূমি?',
      options: ['ম্যানগ্রোভ বনভূমি (Mangrove)', 'চিরহরিৎ বন', 'পর্ণমোচী বন', 'তৃণভূমি'],
      correctIndex: 0,
      explanation: 'সুন্দরবন বিশ্বের বৃহত্তম অবিভক্ত উপকূলীয় ম্যানগ্রোভ বন, যা রয়েল বেঙ্গল টাইগারের প্রাকৃতিক আবাসভূমি।'
    }
  ]
};

// Helper: Get a complete 20-Question Quiz Set for any requested subject
export function getTwentyQuestionsForSubject(subject = 'all') {
  let list = [];

  if (subject && subject !== 'all' && SUBJECT_QUIZ_BANKS[subject]) {
    // Subject specific 20 questions
    list = [...SUBJECT_QUIZ_BANKS[subject]];
  } else {
    // Multi-disciplinary 20-question mixed model test
    // 3 Math, 3 Physics, 3 Chemistry, 3 Biology, 3 ICT, 3 English, 2 Bangla
    const m = SUBJECT_QUIZ_BANKS.math.slice(0, 3);
    const p = SUBJECT_QUIZ_BANKS.physics.slice(0, 3);
    const c = SUBJECT_QUIZ_BANKS.chemistry.slice(0, 3);
    const b = SUBJECT_QUIZ_BANKS.biology.slice(0, 3);
    const i = SUBJECT_QUIZ_BANKS.ict.slice(0, 3);
    const e = SUBJECT_QUIZ_BANKS.english.slice(0, 3);
    const bn = SUBJECT_QUIZ_BANKS.bangla.slice(0, 2);

    list = [...m, ...p, ...c, ...b, ...i, ...e, ...bn];
  }

  // Ensure exactly 20 questions
  if (list.length < 20) {
    // Fill remaining from other subjects if any shortage
    const allQuestions = Object.values(SUBJECT_QUIZ_BANKS).flat();
    for (const q of allQuestions) {
      if (!list.find(item => item.id === q.id)) {
        list.push(q);
      }
      if (list.length >= 20) break;
    }
  }

  return list.slice(0, 20);
}
