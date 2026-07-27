// 粤语卡片数据（浓缩版：只含已上的两节课）
// 第一课 = 九声（调表 + 六声调 + 入声）；第二课 = 代词（系统 + 例句）
// 字段：hk=粤语, jy=粤拼Jyutping, cn=普通话/意思, a=音频名(默认=hk)。音频在 audio/<a>.mp3
const DECKS = [

// ★ 第一课重点：九声调表（特殊网格视图）
{
  id:'chart', type:'chart', num:'★', name:'九声调表（第一课）', desc:'点格听 · 先背熟这张',
  tones:[
    {col:'1', nm:'阴平', tp:'高平', val:'55'},
    {col:'2', nm:'阴上', tp:'高升', val:'35'},
    {col:'3', nm:'阴去', tp:'中平', val:'33'},
    {col:'4', nm:'阳平', tp:'低平', val:'11'},
    {col:'5', nm:'阳上', tp:'低升', val:'13'},
    {col:'6', nm:'阳去', tp:'低平', val:'22'},
    {col:'入1', nm:'阴入', tp:'高切', val:'5'},
    {col:'入3', nm:'中入', tp:'中切', val:'3'},
    {col:'入6', nm:'阳入', tp:'低切', val:'2'},
  ],
  rows:[
    {label:'fan 系', rowAudio:'row_fan', cells:[
      {hk:'分',jy:'fan1'},{hk:'粉',jy:'fan2'},{hk:'訓',jy:'fan3'},{hk:'焚',jy:'fan4'},{hk:'奮',jy:'fan5'},{hk:'份',jy:'fan6'},{hk:'忽',jy:'fat1'},{hk:'發',jy:'faat3'},{hk:'佛',jy:'fat6'} ]},
    {label:'si 系', rowAudio:'row_si', cells:[
      {hk:'詩',jy:'si1'},{hk:'史',jy:'si2'},{hk:'試',jy:'si3'},{hk:'時',jy:'si4'},{hk:'市',jy:'si5'},{hk:'事',jy:'si6'},{hk:'色',jy:'sik1'},{hk:'錫',jy:'sek3'},{hk:'食',jy:'sik6'} ]},
    {label:'数字', rowAudio:'row_num', cells:[
      {hk:'三',jy:'saam1'},{hk:'九',jy:'gau2'},{hk:'四',jy:'sei3'},{hk:'零',jy:'ling4'},{hk:'五',jy:'ng5'},{hk:'二',jy:'ji6'},{hk:'七',jy:'cat1'},{hk:'八',jy:'baat3'},{hk:'六',jy:'luk6'} ]},
    {label:'口诀 番茄酱牛腩面一百碟', rowAudio:'row_mnem', cells:[
      {hk:'番',jy:'faan1'},{hk:'茄',jy:'ke2'},{hk:'醬',jy:'zoeng3'},{hk:'牛',jy:'ngau4'},{hk:'腩',jy:'naam5'},{hk:'麵',jy:'min6'},{hk:'一',jy:'jat1'},{hk:'百',jy:'baak3'},{hk:'碟',jy:'dip6'} ]},
  ],
},

// 第一课 · 六声调（si 系逐字精练）
{ id:'tones', num:'①', name:'第一课 · 六声调', desc:'同一个 si 走完 1→6',
  cards:[
    {hk:'詩',jy:'si1',cn:'① 阴平·高平 — 拉最高、平住'},
    {hk:'史',jy:'si2',cn:'② 阴上·高升 — 像普通话二声往上挑'},
    {hk:'試',jy:'si3',cn:'③ 阴去·中平 — 普通话没有，中音放平'},
    {hk:'時',jy:'si4',cn:'④ 阳平·低降 — 压到最低、像叹气'},
    {hk:'市',jy:'si5',cn:'⑤ 阳上·低升 — 从低再往上升'},
    {hk:'事',jy:'si6',cn:'⑥ 阳去·低平 — 低音放平'},
  ]},

// 第一课 · 入声（九声里的 3 个入声调）
{ id:'rusheng', num:'②', name:'第一课 · 入声 -p/-t/-k', desc:'九声里的 3 个入声调，短促收住',
  cards:[
    {hk:'十',jy:'sap6',cn:'十（-p 收唇）'},{hk:'急',jy:'gap1',cn:'急（-p）'},{hk:'濕',jy:'sap1',cn:'湿（-p）'},{hk:'入',jy:'jap6',cn:'进/入（-p）'},
    {hk:'一',jy:'jat1',cn:'一（-t 收舌尖）'},{hk:'七',jy:'cat1',cn:'七（-t）'},{hk:'八',jy:'baat3',cn:'八（-t）'},{hk:'熱',jy:'jit6',cn:'热（-t）'},{hk:'發',jy:'faat3',cn:'发（-t）'},
    {hk:'六',jy:'luk6',cn:'六（-k 收喉）'},{hk:'食',jy:'sik6',cn:'吃（-k）'},{hk:'學',jy:'hok6',cn:'学（-k）'},{hk:'國',jy:'gwok3',cn:'国（-k）'},{hk:'白',jy:'baak6',cn:'白（-k）'},
  ]},

// 第二课 · 代词系统
{ id:'pron', num:'③', name:'第二课 · 代词系统', desc:'人称/指示/疑问 三套搭法',
  cards:[
    {hk:'我哋',jy:'ngo5 dei6',cn:'我们（单数 + 哋 dei6 = 们）'},
    {hk:'你哋',jy:'nei5 dei6',cn:'你们'},
    {hk:'佢哋',jy:'keoi5 dei6',cn:'他们（佢 keoi5 = 他/她/它）'},
    {hk:'呢個',jy:'ni1 go3',cn:'这个（呢 ni1=这）'},
    {hk:'呢度',jy:'ni1 dou6',cn:'这里（度 dou6=处/里）'},
    {hk:'呢啲',jy:'ni1 di1',cn:'这些（啲 di1=些）'},
    {hk:'嗰個',jy:'go2 go3',cn:'那个（嗰 go2=那）'},
    {hk:'嗰度',jy:'go2 dou6',cn:'那里'},
    {hk:'嗰啲',jy:'go2 di1',cn:'那些'},
    {hk:'邊個',jy:'bin1 go3',cn:'哪个 / 谁（邊 bin1=哪）'},
    {hk:'邊度',jy:'bin1 dou6',cn:'哪里'},
    {hk:'邊啲',jy:'bin1 di1',cn:'哪些'},
    {hk:'咩',jy:'me1',cn:'什么（口语最常用，=乜嘢 mat1 je5）'},
    {hk:'乜嘢',jy:'mat1 je5',cn:'什么（书面些）'},
    {hk:'點樣',jy:'dim2 joeng2',cn:'怎么样'},
    {hk:'點解',jy:'dim2 gaai2',cn:'为什么'},
  ]},

// 第二课 · 代词例句
{ id:'pronSent', num:'④', name:'第二课 · 代词例句', desc:'15 张去重卡，点 🔊 跟读（係=是 / 喺=在）',
  cards:[
    {hk:'我哋食咩啊',jy:'ngo5 dei6 sik6 me1 aa3',cn:'我们吃什么啊（咩=什么）',a:'cy01_1'},
    {hk:'你哋做緊咩啊',jy:'nei5 dei6 zou6 gan2 me1 aa3',cn:'你们在做什么',a:'cy01_2'},
    {hk:'佢哋去做咩啊',jy:'keoi5 dei6 heoi3 zou6 me1 aa3',cn:'他们去做什么',a:'cy01_3'},
    {hk:'呢個係咩啊',jy:'ni1 go3 hai6 me1 aa3',cn:'这个是什么（係=是）',a:'cy01_4'},
    {hk:'你喺呢度做咩啊',jy:'nei5 hai2 ni1 dou6 zou6 me1 aa3',cn:'你在这里做什么（喺 hai2=在）',a:'cy01_5'},
    {hk:'呢啲係咩啊',jy:'ni1 di1 hai6 me1 aa3',cn:'这些是什么',a:'c02_1'},
    {hk:'嗰個人係邊個',jy:'go2 go3 jan4 hai6 bin1 go3',cn:'那个人是谁',a:'cy01_6'},
    {hk:'嗰度有個人',jy:'go2 dou6 jau5 go3 jan4',cn:'那里有个人',a:'c02_2'},
    {hk:'嗰啲嘢係邊個嘅',jy:'go2 di1 je5 hai6 bin1 go3 ge3',cn:'那些东西是谁的',a:'cy01_7'},
    {hk:'你係邊個',jy:'nei5 hai6 bin1 go3',cn:'你是谁（係=是）',a:'c02_3'},
    {hk:'你喺邊度',jy:'nei5 hai2 bin1 dou6',cn:'你在哪里（喺=在）',a:'cy01_8'},
    {hk:'邊啲嘢係我嘅',jy:'bin1 di1 je5 hai6 ngo5 ge3',cn:'哪些东西是我的',a:'c02_4'},
    {hk:'呢個係乜嘢',jy:'ni1 go3 hai6 mat1 je5',cn:'这个是什么（书面些）',a:'cy01_9'},
    {hk:'你點樣啊',jy:'nei5 dim2 joeng2 aa3',cn:'你怎么样',a:'cy01_10'},
    {hk:'你點解噉講嘅',jy:'nei5 dim2 gaai2 gam2 gong2 ge3',cn:'你为什么这么说（噉=这么）',a:'cy01_11'},
  ]},

// 第三课 · 否定词四向对比
{ id:'neg', num:'⑤', name:'第三课 · 否定词怎么选', desc:'唔 / 冇 / 未 / 咪 + 係咪',
  cards:[
    {hk:'我唔食',jy:'ngo5 m4 sik6',cn:'我不吃 / 不会吃 · 唔 m4 = 一般“不”',a:'c03_cmp_m4'},
    {hk:'我冇食',jy:'ngo5 mou5 sik6',cn:'我没吃 · 冇 mou5 = 没有 / 过去没发生',a:'c03_cmp_mou5'},
    {hk:'我未食',jy:'ngo5 mei6 sik6',cn:'我还没吃 · 未 mei6 = 还没 / 尚未',a:'c03_cmp_mei6'},
    {hk:'咪食',jy:'mai5 sik6',cn:'别吃 · 咪 mai5 = 别 / 不要（命令）',a:'c03_cmp_mai5'},
    {hk:'係咪',jy:'hai6 mai6',cn:'是不是 · 这里“咪”读 mai6；不是咩 me1',a:'c03_hai6mai6'},
  ]},

// 第三课 · 教材例句
{ id:'negSent', num:'⑥', name:'第三课 · 否定词例句', desc:'7 句，把四个否定词放进语境',
  cards:[
    {hk:'我唔知',jy:'ngo5 m4 zi1',cn:'我不知道',a:'c03_s01'},
    {hk:'你唔使客氣',jy:'nei5 m4 sai2 haak3 hei3',cn:'你不用客气',a:'c03_s02'},
    {hk:'我冇意見',jy:'ngo5 mou5 ji3 gin3',cn:'我没有意见',a:'c03_s03'},
    {hk:'我冇睇過',jy:'ngo5 mou5 tai2 gwo3',cn:'我没看过',a:'c03_s04'},
    {hk:'你睇完未呀',jy:'nei5 tai2 jyun4 mei6 aa3',cn:'你看完了吗',a:'c03_s05'},
    {hk:'咪客氣',jy:'mai5 haak3 hei3',cn:'别客气',a:'c03_s06'},
    {hk:'咪行咁快',jy:'mai5 haang4 gam3 faai3',cn:'别走这么快',a:'c03_s07'},
  ]},

];
