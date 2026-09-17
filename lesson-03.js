// 第三课唯一课程数据源：课堂原句、教材词表与规范化说明分层保存。
// 每个字保存具体语境中的粤拼与音频键；整句音频不由单字机械拼接。
(() => {
  "use strict";

  const token = (char, contextualJyutping, charAudio = char, note = "") => ({
    char,
    contextualJyutping,
    charAudio,
    note,
  });

  const phrase = (text, jyutping, audio, tokens, meaning = "") => ({
    text,
    jyutping,
    audio,
    tokens,
    meaning,
  });

  const sentence = (id, text, meaning, sentenceAudio, tokens, learningPoints = [], sourceStatus = "class-note-normalized", sourceOriginal = "") => ({
    id,
    text,
    meaning,
    sentenceAudio,
    tokens,
    learningPoints,
    sourceStatus,
    sourceOriginal,
  });

  window.CANTO_COURSE = {
    meta: {
      id: "lesson-03-actions-progressive",
      version: "2026-09-17",
      title: "第三课 · 动作与状态",
      romanization: "LSHK Jyutping 1–6",
      audioStatus: "machine-generated-practice-audio",
      source: "课堂教材动词／形容词表 + 2026-09-17用户课堂笔记",
    },

    searchSentences: [
      sentence("l03-s01", "你搵到部手機未？", "你找到手机了吗？", "cy03_1", [token("你", "nei5"), token("搵", "wan2"), token("到", "dou2", "到_dou2", "从「搵到」语境音中切出的 dou2 单字练习音"), token("部", "bou6"), token("手", "sau2"), token("機", "gei1"), token("未", "mei6")], ["result-complement", "not-yet"]),
      sentence("l03-s02", "你喺度搵緊咩？", "你正在找什么？", "cy03_2", [token("你", "nei5"), token("喺", "hai2"), token("度", "dou6"), token("搵", "wan2"), token("緊", "gan2"), token("咩", "me1")], ["progressive", "question"]),
      sentence("l03-s03", "你搵邊個？", "你找谁？", "cy03_3", [token("你", "nei5"), token("搵", "wan2"), token("邊", "bin1"), token("個", "go3")], ["person-question"]),
      sentence("l03-s04", "你搵邊位？", "你找哪位？「邊位」比「邊個」更礼貌。", "l03_s04", [token("你", "nei5"), token("搵", "wan2"), token("邊", "bin1"), token("位", "wai2")], ["polite-person-question"], "expanded-from-user-parenthesis-2026-09-17", "你揾边个？（边位）"),
    ],

    aspectParts: [
      phrase("喺度", "hai2 dou6", "l03_word_haidou", [token("喺", "hai2"), token("度", "dou6")], "在这里；也可放在动词前标记正在进行"),
      phrase("緊", "gan2", "緊", [token("緊", "gan2")], "放在动词后：动作／状态正在持续"),
    ],

    progressiveGroups: [
      {
        id: "progressive-place",
        title: "喺 + 地点 + V緊",
        description: "地点说清楚，緊说明动作仍在持续。",
        sentences: [
          sentence("l03-s05", "我喺香港讀緊書。", "我正在香港读书。这里「香港」是真实地点。", "cy04_2", [token("我", "ngo5"), token("喺", "hai2"), token("香", "hoeng1"), token("港", "gong2"), token("讀", "duk6"), token("緊", "gan2"), token("書", "syu1")], ["location", "progressive"]),
          sentence("l03-s06", "我喺香港度讀緊書。", "我在香港这边读书；「度」可作地点后的方位成分。初学先优先说更简洁的上一句。", "l03_s06", [token("我", "ngo5"), token("喺", "hai2"), token("香", "hoeng1"), token("港", "gong2"), token("度", "dou6"), token("讀", "duk6"), token("緊", "gan2"), token("書", "syu1")], ["location-localizer", "progressive"]),
        ],
      },
      {
        id: "progressive-action",
        title: "喺度 + V緊",
        description: "动态动作里两者可以一起出现；普通话翻译只保留一个“在”。",
        sentences: [
          sentence("l03-s07", "你喺度做緊咩啊？", "你在干什么？这是自然粤语，不是病句。", "cy04_1", [token("你", "nei5"), token("喺", "hai2"), token("度", "dou6"), token("做", "zou6"), token("緊", "gan2"), token("咩", "me1"), token("啊", "aa3")], ["progressive", "question"]),
          sentence("l03-s08", "你喺度做緊乜嘢？", "你在干什么？「乜嘢」是“什么”的完整形式。", "cy04_3", [token("你", "nei5"), token("喺", "hai2"), token("度", "dou6"), token("做", "zou6"), token("緊", "gan2"), token("乜", "mat1"), token("嘢", "je5")], ["progressive", "full-question-form"]),
          sentence("l03-s09", "我喺度食緊飯。", "我正在吃饭。重点是眼下正在做什么。", "cy04_4", [token("我", "ngo5"), token("喺", "hai2"), token("度", "dou6"), token("食", "sik6"), token("緊", "gan2"), token("飯", "faan6")], ["progressive"]),
        ],
      },
    ],

    giveSentences: [
      sentence("l03-s10", "畀本書我。", "给我一本书。常见口语顺序：畀 + 东西 + 人。", "cy05_1", [token("畀", "bei2"), token("本", "bun2"), token("書", "syu1"), token("我", "ngo5")], ["double-object"]),
      sentence("l03-s11", "畀部手機佢。", "把手机给他／她。", "cy05_2", [token("畀", "bei2"), token("部", "bou6"), token("手", "sau2"), token("機", "gei1"), token("佢", "keoi5")], ["double-object"]),
      sentence("l03-s12", "畀錢我買嘢。", "给我钱买东西；「買嘢」说明钱的用途。", "cy05_3", [token("畀", "bei2"), token("錢", "cin2"), token("我", "ngo5"), token("買", "maai5"), token("嘢", "je5")], ["double-object", "purpose"]),
    ],

    directionSentences: [
      sentence("l03-s13", "稍為企出啲。", "稍微往外站一点。", "cy06_1", [token("稍", "saau2"), token("為", "wai4"), token("企", "kei5"), token("出", "ceot1"), token("啲", "di1")], ["direction"]),
      sentence("l03-s14", "企出少少。", "往外站一点；和上一句意思接近，更口语。", "l03_s14", [token("企", "kei5"), token("出", "ceot1"), token("少", "siu2"), token("少", "siu2")], ["direction", "degree"]),
      sentence("l03-s15", "危險，企入啲。", "危险，往里面站一点。", "cy06_2", [token("危", "ngai4"), token("險", "him2"), token("企", "kei5"), token("入", "jap6"), token("啲", "di1")], ["direction", "safety"]),
      sentence("l03-s16", "定啲嚟。", "镇定一点／稳一点来。这里「定」读 ding6。", "cy06_3", [token("定", "ding6"), token("啲", "di1"), token("嚟", "lai4")], ["manner"]),
    ],

    verbFamilies: [
      {
        id: "verb-hai",
        word: phrase("係", "hai6", "係", [token("係", "hai6")], "是"),
        note: "判断、身份或选择；不要和表示地点的「喺 hai2」混淆。",
        examples: [
          phrase("係唔係", "hai6 m4 hai6", "l03_v_hai_mhai", [token("係", "hai6"), token("唔", "m4"), token("係", "hai6")], "是不是"),
          phrase("係邊個", "hai6 bin1 go3", "l03_v_hai_bingo", [token("係", "hai6"), token("邊", "bin1"), token("個", "go3")], "是谁"),
          phrase("定係邊個", "ding6 hai6 bin1 go3", "l03_v_dinghaibingo", [token("定", "ding6"), token("係", "hai6"), token("邊", "bin1"), token("個", "go3")], "还是哪一个／谁；需接前文才完整"),
        ],
      },
      {
        id: "verb-lai",
        word: phrase("嚟", "lai4", "嚟", [token("嚟", "lai4")], "来"),
        note: "表示朝说话者或参照点移动。",
        examples: [
          phrase("入嚟", "jap6 lai4", "l03_v_japlai", [token("入", "jap6"), token("嚟", "lai4")], "进来"),
          phrase("我嚟先", "ngo5 lai4 sin1", "l03_v_ngolaisin", [token("我", "ngo5"), token("嚟", "lai4"), token("先", "sin1")], "我先来"),
          phrase("佢嚟咗", "keoi5 lai4 zo2", "l03_v_keoilai", [token("佢", "keoi5"), token("嚟", "lai4"), token("咗", "zo2")], "他／她来了"),
        ],
      },
      {
        id: "verb-wan",
        word: phrase("搵", "wan2", "搵", [token("搵", "wan2")], "找"),
        note: "教材字形与网页统一写「搵」，不写简化俗写「揾」。",
        examples: [
          phrase("搵到", "wan2 dou2", "l03_v_wandou", [token("搵", "wan2"), token("到", "dou2", "到_dou2")], "找到"),
          phrase("搵乜嘢", "wan2 mat1 je5", "l03_v_wanmatje", [token("搵", "wan2"), token("乜", "mat1"), token("嘢", "je5")], "找什么"),
          phrase("搵邊個", "wan2 bin1 go3", "l03_v_wanbingo", [token("搵", "wan2"), token("邊", "bin1"), token("個", "go3")], "找谁"),
        ],
      },
      {
        id: "verb-bei",
        word: phrase("畀", "bei2", "畀", [token("畀", "bei2")], "给"),
        note: "也常写作「俾」；本课正文与逐字点读统一用「畀」。",
        examples: [
          phrase("畀我", "bei2 ngo5", "l03_v_beingo", [token("畀", "bei2"), token("我", "ngo5")], "给我"),
          phrase("畀佢", "bei2 keoi5", "l03_v_beikeoi", [token("畀", "bei2"), token("佢", "keoi5")], "给他／她"),
          phrase("畀錢我", "bei2 cin2 ngo5", "l03_v_beicinngo", [token("畀", "bei2"), token("錢", "cin2"), token("我", "ngo5")], "给我钱"),
        ],
      },
      {
        id: "verb-kei",
        word: phrase("企", "kei5", "企", [token("企", "kei5")], "站"),
        note: "后接出／入表示移动方向；「企定」是站稳。",
        examples: [
          phrase("企出啲", "kei5 ceot1 di1", "l03_v_keiceot", [token("企", "kei5"), token("出", "ceot1"), token("啲", "di1")], "往外站一点"),
          phrase("企入啲", "kei5 jap6 di1", "l03_v_keijap", [token("企", "kei5"), token("入", "jap6"), token("啲", "di1")], "往里站一点"),
          phrase("企定啲", "kei5 ding6 di1", "l03_v_keiding", [token("企", "kei5"), token("定", "ding6"), token("啲", "di1")], "站稳一点"),
        ],
      },
      {
        id: "verb-tai",
        word: phrase("睇", "tai2", "睇", [token("睇", "tai2")], "看"),
        note: "「睇見」强调看见；「睇定啲」是看清楚／看稳妥一点。",
        examples: [
          phrase("睇一睇", "tai2 jat1 tai2", "l03_v_taijattai", [token("睇", "tai2"), token("一", "jat1"), token("睇", "tai2")], "看一看"),
          phrase("睇見佢", "tai2 gin3 keoi5", "l03_v_taiginkeo", [token("睇", "tai2"), token("見", "gin3"), token("佢", "keoi5")], "看见他／她"),
          phrase("睇定啲", "tai2 ding6 di1", "l03_v_taiding", [token("睇", "tai2"), token("定", "ding6"), token("啲", "di1")], "看准一点／先看清楚再行动"),
        ],
      },
      {
        id: "verb-nam",
        word: phrase("諗", "nam2", "諗", [token("諗", "nam2")], "想、思考"),
        note: "「諗住」通常是打算／本来想着，不是泛指“觉得”。",
        examples: [
          phrase("諗計", "nam2 gai2", "l03_v_namgai", [token("諗", "nam2"), token("計", "gai2")], "想办法"),
          phrase("諗住", "nam2 zyu6", "諗住", [token("諗", "nam2"), token("住", "zyu6")], "打算／本来想着"),
          phrase("諗唔起", "nam2 m4 hei2", "l03_v_nammhei", [token("諗", "nam2"), token("唔", "m4"), token("起", "hei2")], "想不起来"),
          phrase("諗清楚", "nam2 cing1 co2", "l03_v_namcingco", [token("諗", "nam2"), token("清", "cing1"), token("楚", "co2")], "想清楚"),
        ],
      },
      {
        id: "verb-king",
        word: phrase("傾", "king1", "傾", [token("傾", "king1")], "谈、聊"),
        note: "「傾偈」就是聊天；粤语日常很常用。",
        examples: [
          phrase("傾偈", "king1 gai2", "l03_v_kinggai", [token("傾", "king1"), token("偈", "gai2")], "聊天"),
          phrase("傾一傾", "king1 jat1 king1", "l03_v_kingjatking", [token("傾", "king1"), token("一", "jat1"), token("傾", "king1")], "聊一聊"),
          phrase("傾咗好耐", "king1 zo2 hou2 noi6", "l03_v_kingzo", [token("傾", "king1"), token("咗", "zo2"), token("好", "hou2"), token("耐", "noi6")], "聊了很久"),
        ],
      },
    ],

    thoughtContrasts: [
      {
        word: phrase("諗住", "nam2 zyu6", "諗住", [token("諗", "nam2"), token("住", "zyu6")], "打算／本来想着"),
        english: "intend / plan",
        note: "普通的“思考”用諗；“觉得”通常说覺得 gok3 dak1。",
        example: sentence("l03-s17", "我諗住聽日去。", "我打算明天去。", "l03_s17", [token("我", "ngo5"), token("諗", "nam2"), token("住", "zyu6"), token("聽", "ting1"), token("日", "jat6"), token("去", "heoi3")], ["intention"]),
      },
      {
        word: phrase("想", "soeng2", "想", [token("想", "soeng2")], "想要／想做"),
        english: "want / would like",
        note: "后面通常接想要的东西或动作。",
        example: sentence("l03-s18", "我想飲茶。", "我想喝茶。", "l03_s18", [token("我", "ngo5"), token("想", "soeng2"), token("飲", "jam2"), token("茶", "caa4")], ["want"]),
      },
      {
        word: phrase("掛住", "gwaa3 zyu6", "掛住", [token("掛", "gwaa3"), token("住", "zyu6")], "想念／惦记"),
        english: "miss / keep thinking of",
        note: "这里是挂念某人某地；另一常见用法是只顾着做某事。",
        example: sentence("l03-s19", "我好掛住你。", "我很想念你。", "l03_s19", [token("我", "ngo5"), token("好", "hou2"), token("掛", "gwaa3"), token("住", "zyu6"), token("你", "nei5")], ["miss"]),
      },
    ],

    adjectiveFamilies: [
      {
        id: "adj-peng",
        word: phrase("平", "peng4", "平_peng4", [token("平", "peng4", "平_peng4", "从「好平」语境音中切出的 peng4 单字练习音")], "便宜"),
        note: "说价钱便宜时读 peng4；不要按普通话字面猜音。",
        examples: [
          phrase("好平", "hou2 peng4", "l03_a_houpeng", [token("好", "hou2"), token("平", "peng4", "平_peng4")], "很便宜"),
          phrase("平價", "peng4 gaa3", "l03_a_penggaa", [token("平", "peng4", "平_peng4"), token("價", "gaa3")], "平价"),
          phrase("平到死", "peng4 dou3 sei2", "l03_a_pengdousei", [token("平", "peng4", "平_peng4"), token("到", "dou3", "到_dou3", "程度补语「到」读 dou3"), token("死", "sei2")], "便宜得不得了；夸张口语"),
        ],
      },
      {
        id: "adj-leng",
        word: phrase("靚", "leng3", "靚", [token("靚", "leng3")], "漂亮／优质"),
        note: "形容人可指漂亮；「靚湯」指好汤、优质的汤，不是字面“漂亮”。",
        examples: [
          phrase("好靚", "hou2 leng3", "l03_a_houleng", [token("好", "hou2"), token("靚", "leng3")], "很漂亮"),
          phrase("靚湯", "leng3 tong1", "l03_a_lengtong", [token("靚", "leng3"), token("湯", "tong1")], "好汤"),
          phrase("靚到死", "leng3 dou3 sei2", "l03_a_lengdousei", [token("靚", "leng3"), token("到", "dou3", "到_dou3"), token("死", "sei2")], "漂亮得不得了；夸张口语"),
        ],
      },
      {
        id: "adj-zeng",
        word: phrase("正", "zeng3", "正_zeng3", [token("正", "zeng3", "正_zeng3", "从「好正」语境音中切出的 zeng3 单字练习音")], "很棒、很正点"),
        note: "本课是口语评价“好、棒”，不是书面语“正确”的读法。",
        examples: [
          phrase("好正", "hou2 zeng3", "l03_a_houzeng", [token("好", "hou2"), token("正", "zeng3", "正_zeng3")], "很棒"),
          phrase("平靚正", "peng4 leng3 zeng3", "l03_a_penglengzeng", [token("平", "peng4", "平_peng4"), token("靚", "leng3"), token("正", "zeng3", "正_zeng3")], "便宜、优质又正；价廉物美"),
        ],
      },
      {
        id: "adj-ngaam",
        word: phrase("啱", "ngaam1", "啱", [token("啱", "ngaam1")], "对、合适、刚好"),
        note: "可表示正确、合身、时机刚好，具体意思看语境。",
        examples: [
          phrase("唔啱", "m4 ngaam1", "l03_a_mngaam", [token("唔", "m4"), token("啱", "ngaam1")], "不对／不合适"),
          phrase("啱啱好", "ngaam1 ngaam1 hou2", "l03_a_ngaamngaamh", [token("啱", "ngaam1"), token("啱", "ngaam1"), token("好", "hou2")], "刚刚好"),
        ],
      },
      {
        id: "adj-dim",
        word: phrase("掂", "dim6", "掂", [token("掂", "dim6")], "行、顺利、搞得定"),
        note: "不是字面“触碰”；这里判断事情是否可行或已处理好。",
        examples: [
          phrase("唔掂", "m4 dim6", "l03_a_mdim", [token("唔", "m4"), token("掂", "dim6")], "不行／不妙"),
          phrase("搞掂", "gaau2 dim6", "l03_a_gaaudim", [token("搞", "gaau2"), token("掂", "dim6")], "搞定"),
          phrase("實掂", "sat6 dim6", "l03_a_satdim", [token("實", "sat6"), token("掂", "dim6")], "肯定行"),
        ],
      },
      {
        id: "adj-guk",
        word: phrase("焗", "guk6", "焗", [token("焗", "guk6")], "闷热、不通风"),
        note: "本课形容环境闷热；同一个字也可用于焗炉等烹调语境。",
        examples: [
          phrase("好焗", "hou2 guk6", "l03_a_houguk", [token("好", "hou2"), token("焗", "guk6")], "很闷热"),
          phrase("又濕又焗", "jau6 sap1 jau6 guk6", "l03_a_jausapjauguk", [token("又", "jau6"), token("濕", "sap1"), token("又", "jau6"), token("焗", "guk6")], "又湿又闷"),
        ],
      },
    ],

    adjectiveSentences: [
      sentence("l03-s20", "呢件衫好平啊。", "这件衣服很便宜。", "cy08_1", [token("呢", "ni1"), token("件", "gin6"), token("衫", "saam1"), token("好", "hou2"), token("平", "peng4", "平_peng4"), token("啊", "aa3")], ["adjective"]),
      sentence("l03-s21", "嗰個女仔好靚啊。", "那个女生很漂亮。", "cy08_2", [token("嗰", "go2"), token("個", "go3"), token("女", "neoi5"), token("仔", "zai2"), token("好", "hou2"), token("靚", "leng3"), token("啊", "aa3")], ["adjective"]),
      sentence("l03-s22", "老火靚湯好出名。", "老火靓汤很有名。这里「靚」是优质、好喝。", "cy08_3", [token("老", "lou5"), token("火", "fo2"), token("靚", "leng3"), token("湯", "tong1"), token("好", "hou2"), token("出", "ceot1"), token("名", "meng2", "名_meng2", "从「出名」语境音中切出的 meng2 单字练习音")], ["adjective", "collocation"]),
      sentence("l03-s23", "呢度啲嘢好正。", "这里的东西很棒。", "cy08_4", [token("呢", "ni1"), token("度", "dou6"), token("啲", "di1"), token("嘢", "je5"), token("好", "hou2"), token("正", "zeng3", "正_zeng3")], ["evaluation"]),
      sentence("l03-s24", "呢度啲嘢食真係平靚正。", "这里的食物真是价廉物美，又便宜又优质。", "cy08_5", [token("呢", "ni1"), token("度", "dou6"), token("啲", "di1"), token("嘢", "je5"), token("食", "sik6"), token("真", "zan1"), token("係", "hai6"), token("平", "peng4", "平_peng4"), token("靚", "leng3"), token("正", "zeng3", "正_zeng3")], ["evaluation", "three-part-expression"]),
      sentence("l03-s25", "廣東嘅老火湯好出名。", "广东的老火汤很有名；这是比“老火靚湯好出名”更中性的自然基准。", "l03_s25", [token("廣", "gwong2"), token("東", "dung1"), token("嘅", "ge3"), token("老", "lou5"), token("火", "fo2"), token("湯", "tong1"), token("好", "hou2"), token("出", "ceot1"), token("名", "meng2", "名_meng2")], ["recommended-baseline"], "recommended-alongside-class-original-2026-09-17", "课堂原句「老火靚湯好出名」已保留在上一句。"),
      sentence("l03-s26", "你咁做係唔啱嘅。", "你这样做是不对的。这里「咁」表示“这样”，读 gam2。", "cy08_6", [token("你", "nei5"), token("咁", "gam2", "咁_gam2", "从「咁做」语境音中切出的 gam2 单字练习音"), token("做", "zou6"), token("係", "hai6"), token("唔", "m4"), token("啱", "ngaam1"), token("嘅", "ge3")], ["correctness", "manner-demonstrative"]),
      sentence("l03-s27", "呢件衫唔啱你。", "这件衣服不适合你／不合身。", "cy08_7", [token("呢", "ni1"), token("件", "gin6"), token("衫", "saam1"), token("唔", "m4"), token("啱", "ngaam1"), token("你", "nei5")], ["suitability"]),
      sentence("l03-s28", "個晒士啱啱好。", "这个尺码刚刚好；「晒士」来自英语 size。", "cy08_8", [token("個", "go3"), token("晒", "saai1", "晒_saai1", "从「晒士」语境音中切出的 saai1 单字练习音"), token("士", "si2", "士_si2", "从「晒士」语境音中切出的 si2 单字练习音"), token("啱", "ngaam1"), token("啱", "ngaam1"), token("好", "hou2")], ["loanword", "fit"]),
      sentence("l03-s29", "你搞掂未啊？", "你搞定了吗？", "cy08_9", [token("你", "nei5"), token("搞", "gaau2"), token("掂", "dim6"), token("未", "mei6"), token("啊", "aa3")], ["completion-question"]),
      sentence("l03-s30", "終於搞掂喇。", "终于搞定了。", "cy08_10", [token("終", "zung1"), token("於", "jyu1"), token("搞", "gaau2"), token("掂", "dim6"), token("喇", "laa3")], ["completion"]),
      sentence("l03-s31", "呢次實掂。", "这次肯定行。", "cy08_11", [token("呢", "ni1"), token("次", "ci3"), token("實", "sat6"), token("掂", "dim6")], ["confidence"]),
      sentence("l03-s32", "嗰個人真係唔掂。", "那个人真的不行／情况不妙；语气较直接。", "cy08_12", [token("嗰", "go2"), token("個", "go3"), token("人", "jan4"), token("真", "zan1"), token("係", "hai6"), token("唔", "m4"), token("掂", "dim6")], ["negative-evaluation"]),
    ],
  };
})();
