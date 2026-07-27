// 电子教材内容。每课 = {num,title,sub,html}。html 里 <span class="au" data-a="音频名">…</span> 点击发音。
// [[CHART]] 占位 = 渲染九声调表网格。音频名同 audio/<名>.mp3。
const LESSONS = [
{
  num:'第一课', title:'九声（声调）', sub:'调表 · 入声 · 口诀',
  html:`
<p>粤语有 <b>6 个调型</b> + 3 个<b>入声</b>（短促、收 -p/-t/-k）合称"九声"。入声和 1/3/6 共享音高，所以<b>音高只有 6 档</b>。这一课的核心就是把下面这张表听熟、读准。</p>

<h3>一、九声调表（先背熟这张）</h3>
<p class="cap">点任意字听单字；点「🔊 整行」听整行 1→9 调一条龙。<b>si 系</b>和<b>数字</b>行是最准的听辨阶梯。</p>
[[CHART]]

<div class="note warm">🍜 <b>记调口诀</b>：你老师的「番茄酱牛腩面，一百碟」<span class="au chip" data-a="番茄醬牛腩麵一百碟">🔊 听</span> —— 9 个字正好排成 1→9 调！「番茄酱牛腩面」= 6 个舒声调，「一百碟」= 3 个入声（一/百/碟，收塞音、短促）。</div>
<div class="note">⚠️ 两个小注（已查 words.hk）：① <b>茄</b> 本调 ke4，但「番茄」里变调读 <b>ke2</b>（落第 2 列）；② <b>發</b> 香港标准 <b>faat3</b>（口诀图上写 fat3 不准，fat1 是台山话）。</div>

<h3>二、入声 -p / -t / -k</h3>
<p class="cap">韵尾收一个不爆破的塞音（嘴型到位就停住），<b>短、收得住</b>，别拖长成"食=sí"。</p>
<p><b>-p（收唇）</b>　<span class="au" data-a="十">十 sap6</span>　<span class="au" data-a="急">急 gap1</span>　<span class="au" data-a="濕">濕 sap1</span>　<span class="au" data-a="入">入 jap6</span></p>
<p><b>-t（收舌尖）</b>　<span class="au" data-a="一">一 jat1</span>　<span class="au" data-a="七">七 cat1</span>　<span class="au" data-a="八">八 baat3</span>　<span class="au" data-a="熱">熱 jit6</span>　<span class="au" data-a="發">發 faat3</span></p>
<p><b>-k（收喉）</b>　<span class="au" data-a="六">六 luk6</span>　<span class="au" data-a="食">食 sik6</span>　<span class="au" data-a="學">學 hok6</span>　<span class="au" data-a="國">國 gwok3</span>　<span class="au" data-a="白">白 baak6</span></p>

<h3>三、六声调精练（si 系）</h3>
<p class="cap">同一个音 si，走完 6 个调（点字听）：</p>
<p>
<span class="au" data-a="詩">詩 si1</span>·高平　<span class="au" data-a="史">史 si2</span>·高升　<span class="au" data-a="試">試 si3</span>·中平　<span class="au" data-a="時">時 si4</span>·低降　<span class="au" data-a="市">市 si5</span>·低升　<span class="au" data-a="事">事 si6</span>·低平
</p>
<p class="cap">普通话人最易混：<span class="au" data-a="試">試 si3</span> ↔ <span class="au" data-a="事">事 si6</span>（都平，3中6低）；<span class="au" data-a="史">史 si2</span> ↔ <span class="au" data-a="市">市 si5</span>（都升，2高5低）。</p>

<div class="note">🎯 <b>第一课目标</b>：能指着调表任一格读出它的调；能听出 si 系 6 个调谁高谁低。</div>
`
},
{
  num:'第二课', title:'代词', sub:'人称 · 指示 · 疑问 + 例句',
  html:`
<p>第二课 = 代词系统：<b>人称 → 指示 → 疑问</b>。教材原页用"广州话拼音"(néi⁶、kêu⁵…)，这里统一<b>粤拼 Jyutping</b>（你=nei5），免得查词典对不上。</p>

<h3>一、人称代词</h3>
<p class="cap">公式：单数 + <b>哋 dei6（们）</b> → 复数</p>
<table>
<tr><th>字</th><th>粤拼</th><th>意思</th></tr>
<tr><td><span class="au" data-a="我">我</span></td><td>ngo5</td><td>我</td></tr>
<tr><td><span class="au" data-a="你">你</span></td><td>nei5</td><td>你</td></tr>
<tr><td><span class="au" data-a="佢">佢</span></td><td>keoi5</td><td>他/她/它</td></tr>
<tr><td><span class="au" data-a="哋">哋</span></td><td>dei6</td><td>们（词尾）</td></tr>
</table>
<p>→ <span class="au" data-a="我哋">我哋 ngo5 dei6 我们</span>　<span class="au" data-a="你哋">你哋 你们</span>　<span class="au" data-a="佢哋">佢哋 他们</span></p>

<h3>二、指示代词</h3>
<p class="cap">呢/嗰/邊（哪类）+ 個/度/啲（个/处/些）→ 九个组合，点格听：</p>
<table>
<tr><th></th><th>個（个）</th><th>度（里）</th><th>啲（些）</th></tr>
<tr><th>呢 ni1<br>这</th><td><span class="au" data-a="呢個">呢個</span></td><td><span class="au" data-a="呢度">呢度</span></td><td><span class="au" data-a="呢啲">呢啲</span></td></tr>
<tr><th>嗰 go2<br>那</th><td><span class="au" data-a="嗰個">嗰個</span></td><td><span class="au" data-a="嗰度">嗰度</span></td><td><span class="au" data-a="嗰啲">嗰啲</span></td></tr>
<tr><th>邊 bin1<br>哪</th><td><span class="au" data-a="邊個">邊個</span></td><td><span class="au" data-a="邊度">邊度</span></td><td><span class="au" data-a="邊啲">邊啲</span></td></tr>
</table>
<p class="cap">💡 邊個 bin1 go3 = 哪个 / <b>谁</b>；邊度 = 哪里。</p>

<h3>三、疑问代词</h3>
<p><span class="au" data-a="乜嘢">乜嘢 mat1 je5</span> = 什么 = 口语 <span class="au" data-a="咩">咩 me1</span>（<b>最常用！</b>）　<span class="au" data-a="點樣">點樣 dim2 joeng2 怎么样</span>　<span class="au" data-a="點解">點解 dim2 gaai2 为什么</span></p>

<div class="note">⚠️ <b>一个关键坑：係 vs 喺</b>　两个字发音和意思都不同：<br><b>係 hai6 = 是</b>（呢個係咩 = 这个<b>是</b>什么）；<b>喺 hai2 = 在</b>（你喺呢度 = 你<b>在</b>这里）。</div>

<h3>四、例句（点粤语听）</h3>
<table>
<tr><th>粤语</th><th>普通话</th></tr>
<tr><td><span class="au" data-a="cy01_1">我哋食咩啊</span></td><td>我们吃什么（咩=什么）</td></tr>
<tr><td><span class="au" data-a="cy01_2">你哋做緊咩啊</span></td><td>你们在做什么</td></tr>
<tr><td><span class="au" data-a="cy01_3">佢哋去做咩啊</span></td><td>他们去做什么</td></tr>
<tr><td><span class="au" data-a="cy01_4">呢個係咩啊</span></td><td>这个是什么</td></tr>
<tr><td><span class="au" data-a="cy01_5">你喺呢度做咩啊</span></td><td>你<b>在</b>这里做什么（喺=在）</td></tr>
<tr><td><span class="au" data-a="c02_1">呢啲係咩啊</span></td><td>这些是什么</td></tr>
<tr><td><span class="au" data-a="cy01_6">嗰個人係邊個</span></td><td>那个人是谁</td></tr>
<tr><td><span class="au" data-a="c02_2">嗰度有個人</span></td><td>那里有个人</td></tr>
<tr><td><span class="au" data-a="cy01_7">嗰啲嘢係邊個嘅</span></td><td>那些东西是谁的</td></tr>
<tr><td><span class="au" data-a="c02_3">你係邊個</span></td><td>你是谁</td></tr>
<tr><td><span class="au" data-a="cy01_8">你喺邊度</span></td><td>你在哪里</td></tr>
<tr><td><span class="au" data-a="c02_4">邊啲嘢係我嘅</span></td><td>哪些东西是我的</td></tr>
<tr><td><span class="au" data-a="cy01_9">呢個係乜嘢</span></td><td>这个是什么</td></tr>
<tr><td><span class="au" data-a="cy01_10">你點樣啊</span></td><td>你怎么样</td></tr>
<tr><td><span class="au" data-a="cy01_11">你點解噉講嘅</span></td><td>你为什么这么说</td></tr>
</table>
`
},
{
  num:'第三课', title:'否定词', sub:'唔 · 冇 · 未 · 咪',
  html:`
<p>第三课学四个高频否定词：<b>唔 / 冇 / 未 / 咪</b>。它们不能互换；关键不是死背中文翻译，而是先判断：<b>一般不、过去没、还没，还是叫人别做</b>。</p>

<h3>一、一眼选对</h3>
<table>
<tr><th>词</th><th>粤拼</th><th>什么时候用</th><th>教材例子</th></tr>
<tr><td><b>唔</b></td><td>m4</td><td>一般的“不”</td><td>唔知、唔使</td></tr>
<tr><td><b>冇</b></td><td>mou5</td><td>没有 / 过去没发生</td><td>冇意見、冇睇過</td></tr>
<tr><td><b>未</b></td><td>mei6</td><td>还没、尚未</td><td>未睇完、未去過</td></tr>
<tr><td><b>咪</b></td><td>mai5</td><td>别、不要（命令）</td><td>咪客氣、咪行咁快</td></tr>
</table>

<h3>二、同一个“食”，四种否定</h3>
<div class="note warm">
<span class="au" data-a="c03_cmp_m4"><b>我唔食</b> ngo5 m4 sik6</span>　= 我不吃 / 不会吃<br>
<span class="au" data-a="c03_cmp_mou5"><b>我冇食</b> ngo5 mou5 sik6</span>　= 我没吃（过去没发生）<br>
<span class="au" data-a="c03_cmp_mei6"><b>我未食</b> ngo5 mei6 sik6</span>　= 我还没吃（之后可能吃）<br>
<span class="au" data-a="c03_cmp_mai5"><b>咪食</b> mai5 sik6</span>　= 别吃（命令）
</div>

<h3>三、咩 / 咪 / 係咪，别再混</h3>
<table>
<tr><th>词</th><th>粤拼</th><th>意思</th></tr>
<tr><td><span class="au" data-a="咩">咩</span></td><td>me1</td><td>什么</td></tr>
<tr><td><span class="au" data-a="c03_cmp_mai5">咪</span></td><td>mai5</td><td>别、不要</td></tr>
<tr><td><span class="au" data-a="c03_hai6mai6">係咪</span></td><td>hai6 mai6</td><td>是不是（这里咪读 mai6）</td></tr>
</table>
<div class="note">⚠️ 第二课旧稿曾把“我们吃什么”写成「我哋食咪啊」，现已纠正为 <b>我哋食咩啊</b>。<b>咩 me1</b> 和 <b>咪 mai5</b> 不是同一个词。</div>

<h3>四、教材例句（点粤语听）</h3>
<table>
<tr><th>粤语</th><th>普通话</th></tr>
<tr><td><span class="au" data-a="c03_s01">我唔知</span></td><td>我不知道</td></tr>
<tr><td><span class="au" data-a="c03_s02">你唔使客氣</span></td><td>你不用客气</td></tr>
<tr><td><span class="au" data-a="c03_s03">我冇意見</span></td><td>我没有意见</td></tr>
<tr><td><span class="au" data-a="c03_s04">我冇睇過</span></td><td>我没看过</td></tr>
<tr><td><span class="au" data-a="c03_s05">你睇完未呀</span></td><td>你看完了吗</td></tr>
<tr><td><span class="au" data-a="c03_s06">咪客氣</span></td><td>别客气</td></tr>
<tr><td><span class="au" data-a="c03_s07">咪行咁快</span></td><td>别走这么快</td></tr>
</table>

<div class="note">🎯 <b>第三课目标</b>：看到一个情境，能在 2 秒内选出唔 / 冇 / 未 / 咪；能听懂并说出“我唔食 / 我冇食 / 我未食 / 咪食”。</div>
<button class="showbtn" onclick="startDeckReview(['neg','negSent'],'第三课 · 否定词复习')">🔁 直接复习本课（12 张）</button>
`
},
{
  num:'🎬 金句', title:'彩蛋（好玩）', sub:'学过的词，藏在周星驰金句里',
  html:`
<p class="cap">用周星驰<b>说话金句</b>（机器音读，跟着读就行）把学过的词记牢。点 🔊 听，跟住读。</p>

<div class="note warm">🎬 <b>少林足球</b> <span class="au chip" data-a="jc1">🔊 跟读</span><br>
做人如果冇梦想，同条咸鱼有 <b>咩</b> 分别？<br>
<span class="cap">zou6 jan4 jyu4 gwo2 mou5 mung6 soeng2，tung4 tiu4 haam4 jyu2 jau5 <b>me1</b> fan1 bit6</span><br>
= 做人没梦想，跟咸鱼有<b>什么</b>分别？　👉 学过的 <b>咩 me1（什么）</b></div>

<div class="note warm">🎬 <b>九品芝麻官</b> <span class="au chip" data-a="jc2">🔊 跟读</span><br>
<b>邊個</b> 應我就鬧 <b>邊個</b> 囉！<br>
<span class="cap">bin1 go3 jing3 ngo5 zau6 naau6 bin1 go3 lo1</span><br>
= 谁应我我就骂谁！　👉 学过的 <b>邊個 bin1 go3（谁/哪个）</b></div>

<div class="note warm">🎬 <b>九品芝麻官</b> <span class="au chip" data-a="jc3">🔊 跟读</span><br>
你 <b>啲</b> 咁 <b>嘅</b> 嗜好<br>
<span class="cap">nei5 <b>di1</b> gam2 <b>ge3</b> si3 hou3</span><br>
= 你这种嗜好（咁嘅=这种的）　👉 学过的 <b>啲 di1（些）· 嘅 ge3（的）</b></div>

<div class="note warm">🎬 <b>食神</b> <span class="au chip" data-a="jc4">🔊 跟读</span><br>
請問你 <b>係 邊位</b> 呀？<br>
<span class="cap">cing2 man6 nei5 <b>hai6 bin1 wai2</b> aa3</span><br>
= 请问你是哪位？（超实用礼貌问法）　👉 学过的 <b>係 hai6（是）· 邊位 bin1 wai2（邊個的礼貌版）</b></div>

<p class="cap">想加哪句金句？告诉我你喜欢的，我查证原文+配音加进来（只走说话台词，不走唱歌）。</p>
`
},
];
