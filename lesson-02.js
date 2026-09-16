// 第二课唯一课程数据源：每个字保存具体语境中的粤拼与音频键。
// 整句音频与逐字练习音是两类资产，不能把单字机械拼接成自然句。
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

  const sentence = (id, text, meaning, sentenceAudio, tokens, learningPoints, sourceStatus = "class-note-normalized", sourceOriginal = "") => ({
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
      id: "lesson-02-pronouns-questions",
      version: "2026-09-16",
      title: "第二课 · 代词与问句",
      romanization: "LSHK Jyutping 1–6",
      audioStatus: "machine-generated-practice-audio",
      source: "课堂教材第18–19页 + 2026-06-24复习稿 + 2026-09-16用户补充",
    },

    pronouns: [
      {
        singular: phrase("我", "ngo5", "我", [token("我", "ngo5")], "我"),
        plural: phrase("我哋", "ngo5 dei6", "我哋", [token("我", "ngo5"), token("哋", "dei6")], "我们"),
      },
      {
        singular: phrase("你", "nei5", "你", [token("你", "nei5")], "你"),
        plural: phrase("你哋", "nei5 dei6", "你哋", [token("你", "nei5"), token("哋", "dei6")], "你们"),
      },
      {
        singular: phrase("佢", "keoi5", "佢", [token("佢", "keoi5")], "他／她／它"),
        plural: phrase("佢哋", "keoi5 dei6", "佢哋", [token("佢", "keoi5"), token("哋", "dei6")], "他们／她们／它们"),
      },
    ],

    demonstrativeParts: {
      prefixes: [
        { ...token("呢", "ni1"), meaning: "这" },
        { ...token("嗰", "go2"), meaning: "那" },
        { ...token("邊", "bin1"), meaning: "哪" },
      ],
      suffixes: [
        { ...token("個", "go3"), meaning: "个／人" },
        { ...token("度", "dou6"), meaning: "地方" },
        { ...token("啲", "di1"), meaning: "些" },
      ],
    },

    demonstratives: [
      phrase("呢個", "ni1 go3", "呢個", [token("呢", "ni1"), token("個", "go3")], "这个"),
      phrase("呢度", "ni1 dou6", "呢度", [token("呢", "ni1"), token("度", "dou6")], "这里"),
      phrase("呢啲", "ni1 di1", "呢啲", [token("呢", "ni1"), token("啲", "di1")], "这些"),
      phrase("嗰個", "go2 go3", "嗰個", [token("嗰", "go2"), token("個", "go3")], "那个"),
      phrase("嗰度", "go2 dou6", "嗰度", [token("嗰", "go2"), token("度", "dou6")], "那里"),
      phrase("嗰啲", "go2 di1", "嗰啲", [token("嗰", "go2"), token("啲", "di1")], "那些"),
      phrase("邊個", "bin1 go3", "邊個", [token("邊", "bin1"), token("個", "go3")], "谁／哪一个"),
      phrase("邊度", "bin1 dou6", "邊度", [token("邊", "bin1"), token("度", "dou6")], "哪里"),
      phrase("邊啲", "bin1 di1", "邊啲", [token("邊", "bin1"), token("啲", "di1")], "哪些"),
    ],

    questionExpressions: [
      phrase("咩", "me1", "咩", [token("咩", "me1")], "什么；最常用口语"),
      phrase("乜嘢", "mat1 je5", "乜嘢", [token("乜", "mat1"), token("嘢", "je5")], "什么；完整形式"),
      phrase("邊個", "bin1 go3", "邊個", [token("邊", "bin1"), token("個", "go3")], "谁／哪一个"),
      phrase("邊度", "bin1 dou6", "邊度", [token("邊", "bin1"), token("度", "dou6")], "哪里"),
      phrase("邊啲", "bin1 di1", "邊啲", [token("邊", "bin1"), token("啲", "di1")], "哪些"),
      phrase("點樣", "dim2 joeng2", "點樣", [token("點", "dim2"), token("樣", "joeng2", "樣_joeng2", "从「點樣」语境音中切出的 joeng2 单字练习音")], "怎样／如何"),
      phrase("點解", "dim2 gaai2", "點解", [token("點", "dim2"), token("解", "gaai2")], "为什么"),
      phrase("係咪", "hai6 mai6", "c03_hai6mai6", [token("係", "hai6"), token("咪", "mai6", "咪_mai6", "从「係咪」语境音中切出的 mai6 单字练习音")], "是不是；这里咪读 mai6"),
    ],

    contrasts: [
      {
        title: "係 / 喺",
        cue: "是 / 在",
        left: phrase("係", "hai6", "係", [token("係", "hai6")], "判断：是"),
        right: phrase("喺", "hai2", "喺", [token("喺", "hai2")], "位置：在"),
        note: "你係邊個？问身份；你喺邊度？问位置。係 hai6 是低平调，不是下降调。",
      },
      {
        title: "嘢 / 嘅",
        cue: "东西 / 的",
        left: phrase("嘢", "je5", "嘢", [token("嘢", "je5")], "东西／事情"),
        right: phrase("嘅", "ge3", "嘅", [token("嘅", "ge3")], "所有格：我的"),
        note: "嘢 je5 不是 ye；所有格嘅 ge3 没有鼻音尾，不能读成 gan。",
      },
      {
        title: "咩 / 咪",
        cue: "什么 / 别",
        left: phrase("咩", "me1", "咩", [token("咩", "me1")], "什么"),
        right: phrase("咪", "mai5", "咪", [token("咪", "mai5")], "别／不要"),
        note: "我哋食咩＝我们吃什么；咪食＝别吃。係咪里的咪另读 mai6。",
      },
      {
        title: "嘅 ge3 / ge2",
        cue: "所有格 / 句末追问",
        left: phrase("我嘅", "ngo5 ge3", "l02_word_my", [token("我", "ngo5"), token("嘅", "ge3")], "我的"),
        right: phrase("講嘅？", "gong2 ge2", "l02_word_gong_ge2", [token("講", "gong2"), token("嘅", "ge2", "嘅_ge2")], "为什么这样说？的句末语气"),
        note: "同一个字会因语法功能改变声调；所以本页逐字保存语境读音，不用单字本调自动套句子。",
      },
    ],

    sentenceGroups: [
      {
        id: "people-actions",
        title: "人称 + 动作",
        description: "先把谁、正在做什么说清楚。",
        sentences: [
          sentence("l02-s01", "我哋食咩啊？", "我们吃什么？", "cy01_1", [token("我", "ngo5"), token("哋", "dei6"), token("食", "sik6"), token("咩", "me1"), token("啊", "aa3")], ["pronoun", "question"]),
          sentence("l02-s02", "你哋做緊咩啊？", "你们在做什么？", "cy01_2", [token("你", "nei5"), token("哋", "dei6"), token("做", "zou6"), token("緊", "gan2"), token("咩", "me1"), token("啊", "aa3")], ["pronoun", "progressive", "question"]),
          sentence("l02-s03", "佢哋去做咩啊？", "他们去做什么？语境不同，也可能带“为什么去”的语感。", "cy01_3", [token("佢", "keoi5"), token("哋", "dei6"), token("去", "heoi3"), token("做", "zou6"), token("咩", "me1"), token("啊", "aa3")], ["pronoun", "question"]),
          sentence("l02-s04", "你喺呢度做咩啊？", "你在这里做什么？", "cy01_5", [token("你", "nei5"), token("喺", "hai2"), token("呢", "ni1"), token("度", "dou6"), token("做", "zou6"), token("咩", "me1"), token("啊", "aa3")], ["location", "question"]),
        ],
      },
      {
        id: "identify-place",
        title: "是什么、是谁、在哪里",
        description: "用呢／嗰／邊把对象和地点框出来。",
        sentences: [
          sentence("l02-s05", "呢個係咩啊？", "这个是什么？", "cy01_4", [token("呢", "ni1"), token("個", "go3"), token("係", "hai6"), token("咩", "me1"), token("啊", "aa3")], ["demonstrative", "copula"]),
          sentence("l02-s06", "呢啲係咩啊？", "这些是什么？", "c02_1", [token("呢", "ni1"), token("啲", "di1"), token("係", "hai6"), token("咩", "me1"), token("啊", "aa3")], ["demonstrative", "copula"]),
          sentence("l02-s07", "嗰個人係邊個？", "那个人是谁？", "cy01_6", [token("嗰", "go2"), token("個", "go3"), token("人", "jan4"), token("係", "hai6"), token("邊", "bin1"), token("個", "go3")], ["person", "question"]),
          sentence("l02-s08", "嗰度有個人。", "那里有个人。", "c02_2", [token("嗰", "go2"), token("度", "dou6"), token("有", "jau5"), token("個", "go3"), token("人", "jan4")], ["location"]),
          sentence("l02-s09", "你係邊個？", "你是谁？", "c02_3", [token("你", "nei5"), token("係", "hai6"), token("邊", "bin1"), token("個", "go3")], ["identity"]),
          sentence("l02-s10", "你喺邊度？", "你在哪里？", "cy01_8", [token("你", "nei5"), token("喺", "hai2"), token("邊", "bin1"), token("度", "dou6")], ["location"]),
          sentence("l02-s11", "呢個係乜嘢？", "这个是什么？（完整说法）", "cy01_9", [token("呢", "ni1"), token("個", "go3"), token("係", "hai6"), token("乜", "mat1"), token("嘢", "je5")], ["full-question-form"]),
          sentence("l02-s12", "你點樣啊？", "你怎么样？单独问略依赖语境；问候也可说“你最近點呀？”。", "cy01_10", [token("你", "nei5"), token("點", "dim2"), token("樣", "joeng2", "樣_joeng2", "从「點樣」语境音中切出的 joeng2 单字练习音"), token("啊", "aa3")], ["manner-question"]),
          sentence("l02-s13", "你點解噉講嘅？", "你为什么这么说？", "cy01_11", [token("你", "nei5"), token("點", "dim2"), token("解", "gaai2"), token("噉", "gam2"), token("講", "gong2"), token("嘅", "ge2", "嘅_ge2")], ["reason-question", "sentence-particle"]),
        ],
      },
      {
        id: "ownership",
        title: "归属：谁的、我的、不是我的",
        description: "所有格嘅读 ge3；本课「你點解噉講嘅？」句末的嘅读 ge2。",
        sentences: [
          sentence("l02-s14", "嗰啲嘢係邊個嘅？", "那些东西是谁的？", "cy01_7", [token("嗰", "go2"), token("啲", "di1"), token("嘢", "je5"), token("係", "hai6"), token("邊", "bin1"), token("個", "go3"), token("嘅", "ge3")], ["ownership"]),
          sentence("l02-s15", "邊啲嘢係我嘅？", "哪些东西是我的？", "c02_4", [token("邊", "bin1"), token("啲", "di1"), token("嘢", "je5"), token("係", "hai6"), token("我", "ngo5"), token("嘅", "ge3")], ["ownership"]),
          sentence("l02-s16", "邊啲嘢唔係我嘅？", "哪些东西不是我的？", "l02_s16", [token("邊", "bin1"), token("啲", "di1"), token("嘢", "je5"), token("唔", "m4"), token("係", "hai6"), token("我", "ngo5"), token("嘅", "ge3")], ["ownership", "negation"], "contrast-example-2026-09-16"),
          sentence("l02-s17", "呢個係唔係你嘅？", "这个是不是你的？", "l02_s17", [token("呢", "ni1"), token("個", "go3"), token("係", "hai6"), token("唔", "m4"), token("係", "hai6"), token("你", "nei5"), token("嘅", "ge3")], ["yes-no-question", "ownership"], "user-confirmed-2026-09-16"),
          sentence("l02-s18", "呢本書係邊個嘅？", "这本书是谁的？", "l02_s18", [token("呢", "ni1"), token("本", "bun2"), token("書", "syu1"), token("係", "hai6"), token("邊", "bin1"), token("個", "go3"), token("嘅", "ge3")], ["classifier", "ownership"], "normalized-from-user-original-2026-09-16", "呢個係邊個嘅書？（改为有量词「本」的自然问法）"),
        ],
      },
      {
        id: "choice-still",
        title: "选择、仍然、还没",
        description: "普通话一个“还／还是”，粤语要按功能拆开。",
        sentences: [
          sentence("l02-s19", "你要去呢間店定係去嗰間店啊？", "你要去这家店还是那家店？", "cy02_1", [token("你", "nei5"), token("要", "jiu3"), token("去", "heoi3"), token("呢", "ni1"), token("間", "gaan1"), token("店", "dim3"), token("定", "ding6"), token("係", "hai6"), token("去", "heoi3"), token("嗰", "go2"), token("間", "gaan1"), token("店", "dim3"), token("啊", "aa3")], ["choice"], "normalized-from-user-original-2026-09-16", "你要去 A 店定係去 B 店啊？（A／B 是课堂占位符；跟读句改用呢／嗰两家具体店）"),
          sentence("l02-s20", "我仲係去呢間店。", "我的原计划没变，仍然去这家店。", "l02_s20_still", [token("我", "ngo5"), token("仲", "zung6"), token("係", "hai6"), token("去", "heoi3"), token("呢", "ni1"), token("間", "gaan1"), token("店", "dim3")], ["still-unchanged"], "contrast-example-2026-09-16", "仲係去 A 店啦。（已补主语并改用具体店；只在计划仍不变时用仲係）"),
          sentence("l02-s21", "我都係去呢間店啦。", "考虑后，我还是去这家店吧。", "cy02_2", [token("我", "ngo5"), token("都", "dou1"), token("係", "hai6"), token("去", "heoi3"), token("呢", "ni1"), token("間", "gaan1"), token("店", "dim3"), token("啦", "laa1")], ["decision-after-weighing"], "corrected-from-ambiguous-class-note-2026-09-16"),
          sentence("l02-s22", "你仲未食飯啊？", "你还没吃饭吗？", "cy02_3", [token("你", "nei5"), token("仲", "zung6"), token("未", "mei6"), token("食", "sik6"), token("飯", "faan6"), token("啊", "aa3")], ["not-yet"]),
        ],
      },
    ],

    negativeWords: [
      {
        word: { ...token("唔", "m4"), meaning: "一般的“不”" },
        examples: [
          sentence("l02-n01", "我唔知。", "我不知道。", "c03_s01", [token("我", "ngo5"), token("唔", "m4"), token("知", "zi1")], ["negative"]),
          sentence("l02-n02", "你唔使客氣。", "你不用客气。", "c03_s02", [token("你", "nei5"), token("唔", "m4"), token("使", "sai2"), token("客", "haak3"), token("氣", "hei3")], ["negative"]),
          sentence("l02-n03", "好唔好？", "好不好？", "l02_neg_hou", [token("好", "hou2"), token("唔", "m4"), token("好", "hou2")], ["a-not-a"]),
          sentence("l02-n04", "係唔係？", "是不是？", "l02_neg_hai", [token("係", "hai6"), token("唔", "m4"), token("係", "hai6")], ["a-not-a"]),
        ],
      },
      {
        word: { ...token("冇", "mou5"), meaning: "没有／没发生" },
        examples: [
          sentence("l02-n05", "有冇？", "有没有？", "l02_neg_jau", [token("有", "jau5"), token("冇", "mou5")], ["have-not-have"]),
          sentence("l02-n06", "我冇睇過。", "我没看过。", "c03_s04", [token("我", "ngo5"), token("冇", "mou5"), token("睇", "tai2"), token("過", "gwo3")], ["past-negative"]),
          sentence("l02-n07", "我冇意見。", "我没有意见。", "c03_s03", [token("我", "ngo5"), token("冇", "mou5"), token("意", "ji3"), token("見", "gin3")], ["have-not"]),
        ],
      },
      {
        word: { ...token("未", "mei6"), meaning: "尚未／还没" },
        examples: [
          sentence("l02-n08", "得未呀？", "可以了吗？", "l02_neg_dak", [token("得", "dak1"), token("未", "mei6"), token("呀", "aa3")], ["not-yet"]),
          sentence("l02-n09", "未睇完。", "还没看完。", "l02_neg_mei_tai", [token("未", "mei6"), token("睇", "tai2"), token("完", "jyun4")], ["not-yet"]),
          sentence("l02-n10", "未去過。", "还没去过。", "l02_neg_mei_heoi", [token("未", "mei6"), token("去", "heoi3"), token("過", "gwo3")], ["not-yet"]),
        ],
      },
      {
        word: { ...token("咪", "mai5"), meaning: "别／不要" },
        examples: [
          sentence("l02-n11", "咪客氣。", "别客气。", "c03_s06", [token("咪", "mai5"), token("客", "haak3"), token("氣", "hei3")], ["negative-command"]),
          sentence("l02-n12", "咪行咁快。", "别走那么快。", "c03_s07", [token("咪", "mai5"), token("行", "haang4"), token("咁", "gam3"), token("快", "faai3")], ["negative-command"]),
        ],
      },
    ],

    extraWords: [
      phrase("去", "heoi3", "去", [token("去", "heoi3")], "去"),
      phrase("每一件", "mui5 jat1 gin6", "l02_word_each", [token("每", "mui5"), token("一", "jat1"), token("件", "gin6")], "每一件；通常后接名词"),
    ],
  };
})();
