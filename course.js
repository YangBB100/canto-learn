// 单一课程数据源（SSOT）。
// audio 对应 audio/<audio>.mp3；所有粤拼按具体语境保存，不能由单字本调自动推断句中读音。
window.CANTO_COURSE = {
  meta: {
    id: "lesson-01-pronunciation",
    version: "2026-09-15",
    title: "第一课 · 发音基础",
    romanization: "LSHK Jyutping 1–6",
    audioStatus: "machine-generated-practice-audio",
    source: "PhD_OS/粤语课堂记录 + LSHK Jyutping + CUHK/words.hk 逐项核音",
  },

  tones: [
    { tone: 1, name: "高平", chineseName: "陰平", contour: [5, 5], char: "詩", jyutping: "si1", audio: "詩", cue: "最高，平住" },
    { tone: 2, name: "高升", chineseName: "陰上", contour: [3, 5], char: "史", jyutping: "si2", audio: "史", cue: "中高起，再上升" },
    { tone: 3, name: "中平", chineseName: "陰去", contour: [3, 3], char: "試", jyutping: "si3", audio: "試", cue: "中间，平住" },
    { tone: 4, name: "低降", chineseName: "陽平", contour: [2, 1], char: "時", jyutping: "si4", audio: "時", cue: "低起，轻轻落" },
    { tone: 5, name: "低升", chineseName: "陽上", contour: [1, 3], char: "市", jyutping: "si5", audio: "市", cue: "最低起，再上升" },
    { tone: 6, name: "低平", chineseName: "陽去", contour: [2, 2], char: "事", jyutping: "si6", audio: "事", cue: "低处，平住" },
  ],

  phraseDrills: [
    {
      id: "six-tone-ladder",
      text: "詩史試時市事",
      jyutping: "si1 si2 si3 si4 si5 si6",
      sentenceAudio: "tone_si",
      sourceStatus: "verified-practice-sequence",
      tokens: [
        { char: "詩", contextualJyutping: "si1", charAudio: "詩" },
        { char: "史", contextualJyutping: "si2", charAudio: "史" },
        { char: "試", contextualJyutping: "si3", charAudio: "試" },
        { char: "時", contextualJyutping: "si4", charAudio: "時" },
        { char: "市", contextualJyutping: "si5", charAudio: "市" },
        { char: "事", contextualJyutping: "si6", charAudio: "事" },
      ],
    },
  ],

  contrastGroups: [
    {
      id: "1-3",
      label: "平调 · 高低",
      hint: "1 高，3 中",
      left: { char: "詩", jyutping: "si1", audio: "詩" },
      right: { char: "試", jyutping: "si3", audio: "試" },
      sequence: ["詩", "試"],
    },
    {
      id: "3-6",
      label: "平调 · 中低",
      hint: "3 中，6 低",
      left: { char: "試", jyutping: "si3", audio: "試" },
      right: { char: "事", jyutping: "si6", audio: "事" },
      pairAudio: "t_36",
    },
    {
      id: "4-6",
      label: "低区 · 走向",
      hint: "4 稍降，6 平",
      left: { char: "時", jyutping: "si4", audio: "時" },
      right: { char: "事", jyutping: "si6", audio: "事" },
      sequence: ["時", "事"],
    },
    {
      id: "2-5",
      label: "升调 · 起点",
      hint: "2 起得高，5 起得低",
      left: { char: "史", jyutping: "si2", audio: "史" },
      right: { char: "市", jyutping: "si5", audio: "市" },
      pairAudio: "t_25",
    },
    {
      id: "5-6",
      label: "低区 · 升或平",
      hint: "5 上升，6 平",
      left: { char: "市", jyutping: "si5", audio: "市" },
      right: { char: "事", jyutping: "si6", audio: "事" },
      sequence: ["市", "事"],
    },
  ],

  checkedGroups: [
    {
      ending: "-p",
      action: "双唇合拢",
      detail: "像要发 p，但停在闭唇处。",
      examples: [
        { char: "急", jyutping: "gap1", audio: "急" },
        { char: "接", jyutping: "zip3", audio: "接" },
        { char: "十", jyutping: "sap6", audio: "十" },
      ],
    },
    {
      ending: "-t",
      action: "舌尖抵齿龈",
      detail: "像要发 t，但不弹开、不送气。",
      examples: [
        { char: "一", jyutping: "jat1", audio: "一" },
        { char: "八", jyutping: "baat3", audio: "八" },
        { char: "熱", jyutping: "jit6", audio: "熱" },
      ],
    },
    {
      ending: "-k",
      action: "舌根贴软腭",
      detail: "舌面后部贴软腭形成闭塞，到位即停、不释放。",
      examples: [
        { char: "色", jyutping: "sik1", audio: "色" },
        { char: "國", jyutping: "gwok3", audio: "國" },
        { char: "食", jyutping: "sik6", audio: "食" },
      ],
    },
  ],

  soundGroups: [
    {
      title: "aa / a",
      hint: "长短与舌位",
      note: "aa [aː] 较长、舌位较低；a [ɐ] 较短、舌位较中央。先听同声母、同韵尾、同声调的对比。",
      examples: [
        { char: "三", jyutping: "saam1", audio: "三" },
        { char: "心", jyutping: "sam1", audio: "心" },
      ],
    },
    {
      title: "ng- 与成音节鼻音",
      hint: "鼻腔",
      note: "粤语可以用 ng 开头；m、ng 也能自己成为完整音节。本课先练标准对立，香港口语中的 ng- 脱落变体以后再讲。",
      examples: [
        { char: "我", jyutping: "ngo5", audio: "我" },
        { char: "唔", jyutping: "m4", audio: "唔" },
        { char: "吳", jyutping: "ng4", audio: "吳" },
      ],
    },
    {
      title: "-m / -n / -ng",
      hint: "三种鼻尾",
      note: "分别在双唇、舌尖和舌根收尾；不要都读成普通话的 n/ng。",
      examples: [
        { char: "三", jyutping: "saam1", audio: "三" },
        { char: "山", jyutping: "saan1", audio: "山" },
        { char: "生", jyutping: "saang1", audio: "生" },
      ],
    },
    {
      title: "oe / eo",
      hint: "两个圆唇元音",
      note: "oe [œː] 是前圆唇元音；eo [ɵ] 是中央圆唇元音，常见于 eoi / eon / eot。",
      examples: [
        { char: "靴", jyutping: "hoe1", audio: "靴" },
        { char: "出", jyutping: "ceot1", audio: "出" },
        { char: "想", jyutping: "soeng2", audio: "想" },
      ],
    },
    {
      title: "z / c / s",
      hint: "舌尖前",
      note: "z 不送气，c 送气，s 是摩擦音；不要直接套普通话 zh/ch/sh。",
      examples: [
        { char: "知", jyutping: "zi1", audio: "知" },
        { char: "痴", jyutping: "ci1", audio: "痴" },
        { char: "思", jyutping: "si1", audio: "思" },
      ],
    },
    {
      title: "j- / gw- / kw-",
      hint: "起音组合",
      note: "j 像短促的 y；gw、kw 要把软腭音和圆唇动作合在一个起音里。",
      examples: [
        { char: "也", jyutping: "jaa5", audio: "也" },
        { char: "廣", jyutping: "gwong2", audio: "廣" },
        { char: "規", jyutping: "kwai1", audio: "規" },
      ],
    },
  ],

  quizPool: [
    { char: "詩", jyutping: "si1", tone: 1, audio: "詩", family: "si" },
    { char: "史", jyutping: "si2", tone: 2, audio: "史", family: "si" },
    { char: "試", jyutping: "si3", tone: 3, audio: "試", family: "si" },
    { char: "時", jyutping: "si4", tone: 4, audio: "時", family: "si" },
    { char: "市", jyutping: "si5", tone: 5, audio: "市", family: "si" },
    { char: "事", jyutping: "si6", tone: 6, audio: "事", family: "si" },
    { char: "分", jyutping: "fan1", tone: 1, audio: "分", family: "fan" },
    { char: "粉", jyutping: "fan2", tone: 2, audio: "粉", family: "fan" },
    { char: "訓", jyutping: "fan3", tone: 3, audio: "訓", family: "fan" },
    { char: "墳", jyutping: "fan4", tone: 4, audio: "墳", family: "fan" },
    { char: "憤", jyutping: "fan5", tone: 5, audio: "憤", family: "fan" },
    { char: "份", jyutping: "fan6", tone: 6, audio: "份", family: "fan" },
    { char: "三", jyutping: "saam1", tone: 1, audio: "三", family: "number" },
    { char: "九", jyutping: "gau2", tone: 2, audio: "九", family: "number" },
    { char: "四", jyutping: "sei3", tone: 3, audio: "四", family: "number" },
    { char: "零", jyutping: "ling4", tone: 4, audio: "零", family: "number" },
    { char: "五", jyutping: "ng5", tone: 5, audio: "五", family: "number" },
    { char: "二", jyutping: "ji6", tone: 6, audio: "二", family: "number" },
  ],

  futureSentenceSchema: {
    id: "stable-sentence-id",
    originalText: "课堂原句",
    meaning: "普通话释义",
    sentenceAudio: "natural-sentence-recording-key",
    source: { lesson: "课次", date: "YYYY-MM-DD", status: "teacher-verified" },
    tokens: [
      { char: "逐", contextualJyutping: "zuk6", charAudio: "isolated-character-key" },
      { char: "字", contextualJyutping: "zi6", charAudio: "isolated-character-key" },
    ],
  },
};
