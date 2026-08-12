import { useEffect, useState } from 'react'
import { Portrait, PALETTES, type Palette, type Variant } from './characters'
import { ARTICLES, type Article } from './articles'
import { JOBS } from './jobs'

/* ---------- データ ---------- */

const NAV = [
  { href: '#about', label: 'ヴィレキャリアとは' },
  { href: '#advisors', label: 'アドバイザー' },
  { href: '#jobs', label: '求人情報' },
  { href: '#articles', label: 'お役立ち記事' },
  { href: '#faq', label: 'よくある質問' },
]

const WORRIES = [
  { text: 'スキルも資格もない私に、できる仕事なんてあるのかな…', who: 'mio' as Variant },
  { text: '履歴書に書けることが、なにもない気がする…', who: 'ren' as Variant },
  { text: '今の仕事、「なんとなく」で続けていていいのかな?', who: 'akari' as Variant },
  { text: '面接ってなにを話せばいいの?こわい!', who: 'jin' as Variant },
]

const FEATURES = [
  {
    emoji: '🔍',
    title: '未経験OK求人だけを厳選',
    body: '「経験3年以上」みたいな求人は出しません。研修・教育制度が整った未経験ウェルカムな求人だけを、アドバイザーが実際に企業へ足を運んで厳選しています。',
    tone: 'pink',
  },
  {
    emoji: '🤝',
    title: '専属アドバイザーと二人三脚',
    body: '登録した瞬間からあなた専属の担当がつきます。キャリアの棚卸しから「そもそも何がしたいか分からない」の整理まで、雑談レベルからとことん付き合います。',
    tone: 'teal',
  },
  {
    emoji: '🎁',
    title: '書類も面接も、ぜんぶ無料',
    body: '履歴書・職務経歴書の添削、模擬面接、日程調整、条件交渉、入社後フォローまで全部コミコミで0円。企業から紹介料をいただく仕組みなので、あなたの負担はありません。',
    tone: 'yellow',
  },
]

const ADVISORS: {
  variant: Variant
  name: string
  kana: string
  role: string
  tags: string[]
  comment: string
}[] = [
  {
    variant: 'ren',
    name: '蒼井 蓮',
    kana: 'AOI REN',
    role: 'キャリアアドバイザー',
    tags: ['IT・Web業界', '物流・倉庫'],
    comment: '「やりたいこと」がなくても大丈夫。一緒に見つけるのが僕の仕事です。',
  },
  {
    variant: 'mio',
    name: '桜井 美桜',
    kana: 'SAKURAI MIO',
    role: '未経験転職サポーター',
    tags: ['第二新卒', 'はじめての転職'],
    comment: '不安なことは全部吐き出してくださいね。雑談から始めましょっ♪',
  },
  {
    variant: 'akari',
    name: '日向 朱莉',
    kana: 'HINATA AKARI',
    role: '書類添削のプロ',
    tags: ['履歴書・職務経歴書', '自己PR発掘'],
    comment: '「書くことがない」は思い込み!あなたの強み、私が見つけます!',
  },
  {
    variant: 'jin',
    name: '白瀬 仁',
    kana: 'SHIRASE JIN',
    role: '面接対策コーチ',
    tags: ['模擬面接', '逆質問対策'],
    comment: '面接は暗記より作戦。緊張しやすい人ほど、伸びますよ。',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'かんたん登録',
    time: '30秒',
    body: 'お名前と連絡先だけでOK。履歴書はまだいりません。LINEでもWebでもどちらからでも。',
    emoji: '📱',
  },
  {
    num: '02',
    title: 'ゆるっとキャリア面談',
    time: '約60分',
    body: 'オンラインOK・服装自由。「なにがしたいか分からない」状態のままで来てください。',
    emoji: '☕',
  },
  {
    num: '03',
    title: '求人紹介&選考対策',
    time: '並走します',
    body: 'あなたに合う未経験OK求人をご紹介。書類添削と模擬面接で、自信がつくまで練習できます。',
    emoji: '✍️',
  },
  {
    num: '04',
    title: '内定&入社後フォロー',
    time: '平均1.8ヶ月',
    body: '条件交渉や退職の手続きもお手伝い。入社後も定期的に面談して、新生活を見守ります。',
    emoji: '🎉',
  },
]

// 体験談用の別キャラ(髪型は使い回し・色替えで別人に)
const VOICE_BROWN: Palette = {
  ...PALETTES.ren,
  hairA: '#8a6247',
  hairB: '#6f4c36',
  hairHi: '#c09a77',
  eye1: '#b9835f',
  eye2: '#5d3a2e',
  outfitA: '#5b8def',
  outfitB: '#fff',
  bg: '#d9f3ee',
}

const VOICES: {
  variant: Variant
  palette: Palette
  name: string
  route: string
  age: string
  text: string
}[] = [
  {
    variant: 'mio',
    palette: {
      ...PALETTES.mio,
      hairA: '#4a4458',
      hairB: '#38334a',
      hairHi: '#8d84a6',
      eye1: '#c98d5f',
      eye2: '#7c4a24',
      outfitA: '#fff',
      outfitB: '#cfe8ff',
      bg: '#ffeccf',
    },
    name: 'ゆずさん',
    route: 'アパレル販売 → ITサポート',
    age: '24歳',
    text: 'PCすらまともに触ったことがなくて不安でしたが、美桜さんが「販売で培った傾聴力が武器になる」と言い切ってくれて。研修が手厚い会社を紹介してもらい、今ではお客様対応が楽しいです!',
  },
  {
    variant: 'ren',
    palette: VOICE_BROWN,
    name: 'だいちさん',
    route: 'フリーター → 物流センター',
    age: '26歳',
    text: '職歴に空白があって書類で落ち続けていました。空白期間の伝え方を変えて、資格支援ありの倉庫求人へ。入社半年でフォークリフトの資格を取り、時給も気持ちも上がりました。',
  },
  {
    variant: 'akari',
    palette: {
      ...PALETTES.akari,
      hairA: '#6d4a86',
      hairB: '#57396c',
      hairHi: '#a98cc4',
      eye1: '#63c8ff',
      eye2: '#2470b8',
      outfitA: '#ff8fb7',
      outfitB: '#fff',
      bg: '#e3f2ff',
    },
    name: 'かえでさん',
    route: '営業 → 人事',
    age: '28歳',
    text: 'ノルマに疲れて「もう働きたくない」状態で相談したのに、誰も転職を急かさなかったのが意外でした。仁さんとの模擬面接を重ねるうちに、自分の言葉で話せるように。今は採用する側です!',
  },
]

const FAQS = [
  {
    q: '本当に全部無料なんですか?',
    a: 'はい、登録から内定・入社後フォローまで、求職者の方は完全無料です。採用が決まった企業から紹介料をいただくビジネスモデルのため、あとから費用を請求することは一切ありません。',
  },
  {
    q: '学歴や職歴にまったく自信がありません…',
    a: 'ヴィレキャリアの利用者の約7割が「未経験・職歴に自信なし」からのスタートです。学歴・経歴不問の求人を多数扱っており、書類の書き方や空白期間の伝え方から一緒に作戦を立てます。',
  },
  {
    q: '地方在住でも利用できますか?',
    a: 'できます!面談はすべてオンライン対応。全国の求人に加え、リモートワーク可の求人も多数ご紹介できます。',
  },
  {
    q: '在職中で、転職するか迷っている段階でもいい?',
    a: 'むしろ大歓迎です。「転職しない」という結論になっても大丈夫。現状の整理だけの面談も多いので、キャリアの健康診断くらいの気持ちで来てください。',
  },
  {
    q: '強引に転職をすすめられたりしませんか?',
    a: 'しません。ヴィレキャリアではアドバイザーの評価を「内定数」ではなく「入社後の定着・満足度」で決めています。急かす理由がそもそもないんです。',
  },
]

const TICKER = ['未経験OK', '完全無料', '倉庫・物流の求人が得意', '相談満足度98%', '内定まで平均1.8ヶ月', 'オンライン面談OK', '服装自由', '19時以降・土日も対応']

/* ---------- パーツ ---------- */

function SectionHead({ en, ja, sub }: { en: string; ja: string; sub?: string }) {
  return (
    <div className="sec-head">
      <span className="sec-eyebrow">{en}</span>
      <h2 className="sec-title">{ja}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  )
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1 C13 8 16 11 23 12 C16 13 13 16 12 23 C11 16 8 13 1 12 C8 11 11 8 12 1 Z" fill="currentColor" />
    </svg>
  )
}

function Wave({ fill, flip }: { fill: string; flip?: boolean }) {
  return (
    <div className={`wave${flip ? ' wave--flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none">
        <path d="M0 28 C180 56 360 0 540 22 C720 44 900 8 1080 22 C1260 36 1360 20 1440 30 L1440 56 L0 56 Z" fill={fill} />
      </svg>
    </div>
  )
}

// 段ボールのマスコット「ハコまる」
function BoxBuddy() {
  return (
    <svg viewBox="0 0 150 124" aria-hidden="true">
      {/* 上の箱 */}
      <rect x="30" y="12" width="46" height="40" rx="6" fill="#ffc531" stroke="#33254e" strokeWidth="3" />
      <path d="M30 24 H76" stroke="#33254e" strokeWidth="2.4" />
      <path d="M38 34 H68 M38 42 H58" stroke="#e8a20c" strokeWidth="3" strokeLinecap="round" />
      {/* メインの箱(顔つき) */}
      <rect x="14" y="52" width="70" height="60" rx="7" fill="#e8b97e" stroke="#33254e" strokeWidth="3" />
      <rect x="42" y="52" width="14" height="60" fill="#f6d7a8" stroke="#33254e" strokeWidth="2" />
      <circle cx="32" cy="80" r="2.8" fill="#33254e" />
      <circle cx="66" cy="80" r="2.8" fill="#33254e" />
      <path d="M43 88 Q49 94 55 88" stroke="#33254e" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <ellipse cx="25" cy="88" rx="5" ry="2.6" fill="#ff9ebc" opacity="0.75" />
      <ellipse cx="73" cy="88" rx="5" ry="2.6" fill="#ff9ebc" opacity="0.75" />
      {/* 横の箱 */}
      <rect x="92" y="68" width="42" height="44" rx="6" fill="#8d7bfa" stroke="#33254e" strokeWidth="3" />
      <path d="M100 84 H126 M100 94 H118" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
      {/* 星 */}
      <path
        d="M120 26 L123 35 L132 36 L125.5 42.5 L127.5 51 L120 46.5 L112.5 51 L114.5 42.5 L108 36 L117 35 Z"
        fill="#ffc531"
        stroke="#e8a20c"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Header() {
  return (
    <header className="header">
      <a className="logo" href="#top">
        <span className="logo-mark">ヴィレ</span>
        <span className="logo-text">キャリア</span>
      </a>
      <nav className="nav">
        {NAV.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <a className="btn btn--pink btn--sm" href="#cta">
        無料相談してみる
      </a>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <a className="logo logo--footer" href="#top">
        <span className="logo-mark">ヴィレ</span>
        <span className="logo-text">キャリア</span>
      </a>
      <nav className="footer-nav">
        {NAV.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <p className="footer-copy">運営:ヴィレヴィレ株式会社 / © 2026 Ville Ville Inc.</p>
    </footer>
  )
}

function ArticleCard({ a, idPrefix }: { a: Article; idPrefix: string }) {
  return (
    <a className="art-card" href={`#/article/${a.id}`}>
      <div className={`art-thumb art-thumb--${a.tone}`}>
        <span className="art-emoji" aria-hidden="true">
          {a.emoji}
        </span>
        <span className="art-cat">{a.category}</span>
      </div>
      <div className="art-body">
        <h3>{a.title}</h3>
        <p className="art-meta">
          <span className="art-author">
            <Portrait variant={a.author} id={`${idPrefix}-${a.id}`} title="" />
          </span>
          <span>
            {a.authorName}・{a.date}・約{a.readMin}分
          </span>
        </p>
      </div>
    </a>
  )
}

/* ---------- 記事ページ ---------- */

function ArticleBody({ body }: { body: string[] }) {
  return (
    <>
      {body.map((par, i) =>
        par.trimStart().startsWith('・') ? (
          <ul key={i}>
            {par.split('\n').map((line) => (
              <li key={line}>{line.replace(/^・/, '')}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{par}</p>
        ),
      )}
    </>
  )
}

function ArticlePage({ article }: { article: Article }) {
  const related = ARTICLES.filter((a) => a.id !== article.id)
  return (
    <div className="page">
      <Header />
      <article className="article">
        <div className={`article-hero article-hero--${article.tone}`}>
          <div className="article-hero-inner">
            <a className="article-back" href="#articles">
              ← 記事一覧へもどる
            </a>
            <p className="article-cat">
              <span aria-hidden="true">{article.emoji}</span> {article.category}
            </p>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-meta">
              {article.date}・読了目安 約{article.readMin}分
            </p>
            <ul className="article-tags">
              {article.tags.map((t) => (
                <li key={t}>#{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="article-body">
          <p className="article-lead">{article.lead}</p>
          {article.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <ArticleBody body={s.body} />
            </section>
          ))}
          <aside className="article-author">
            <div className="article-author-face">
              <Portrait variant={article.author} id={`author-${article.id}`} title={`${article.authorName}のイラスト`} />
            </div>
            <div>
              <p className="article-author-label">この記事を書いた人</p>
              <p className="article-author-name">
                {article.authorName} <span>{article.authorRole}</span>
              </p>
              <a className="btn btn--pink btn--sm" href="#cta">
                この人に相談してみる →
              </a>
            </div>
          </aside>
        </div>
        <div className="article-related">
          <h2 className="article-related-title">あわせて読みたい</h2>
          <div className="articles articles--related">
            {related.map((a) => (
              <ArticleCard key={a.id} a={a} idPrefix="rel" />
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </div>
  )
}

/* ---------- トップページ ---------- */

function Home() {
  return (
    <div className="page">
      <Header />

      {/* ヒーロー */}
      <section className="hero" id="top">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-badge">＼ 未経験からの転職に、いちばん寄りそう ／</p>
            <h1 className="hero-title">
              経験ゼロは、
              <br />
              <span className="hero-title-accent">伸びしろ∞</span>。
            </h1>
            <p className="hero-lead">
              ヴィレキャリアは、はじめての転職・未経験からのチャレンジ専門のキャリア支援サービス。
              あなたの「好き」と「向いてる」から、ぴったりの仕事を一緒に見つけます。
            </p>
            <div className="hero-actions">
              <a className="btn btn--pink btn--lg" href="#cta">
                無料でキャリア相談 <span aria-hidden="true">→</span>
              </a>
              <a className="btn btn--ghost btn--lg" href="#jobs">
                求人をのぞいてみる
              </a>
            </div>
            <ul className="hero-stats">
              <li>
                <strong>98%</strong>
                <span>相談満足度</span>
              </li>
              <li>
                <strong>1.8ヶ月</strong>
                <span>内定まで平均</span>
              </li>
              <li>
                <strong>12,000+</strong>
                <span>未経験OK求人</span>
              </li>
            </ul>
          </div>
          <div className="hero-art" aria-hidden="true">
            <Star className="deco deco-star deco-star--1" />
            <Star className="deco deco-star deco-star--2" />
            <Star className="deco deco-star deco-star--3" />
            <div className="hero-card hero-card--back">
              <Portrait variant="ren" id="hero-ren" title="アドバイザー 蓮" />
            </div>
            <div className="hero-card hero-card--front">
              <Portrait variant="mio" id="hero-mio" title="アドバイザー 美桜" />
            </div>
            <span className="hero-bubble hero-bubble--1">未経験、大歓迎!</span>
            <span className="hero-bubble hero-bubble--2">ぜんぶ無料です♪</span>
          </div>
        </div>
      </section>

      {/* ティッカー */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((i) => (
            <div className="ticker-group" key={i}>
              {TICKER.map((t) => (
                <span key={t}>
                  {t} <Star className="ticker-star" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* お悩み */}
      <section className="section section--cream" id="about">
        <SectionHead en="MOYAMOYA" ja="こんなモヤモヤ、ありませんか?" />
        <div className="worries">
          {WORRIES.map((w) => (
            <figure className="worry" key={w.text}>
              <div className="worry-face">
                <Portrait variant={w.who} id={`worry-${w.who}`} title="" />
              </div>
              <blockquote>{w.text}</blockquote>
            </figure>
          ))}
        </div>
        <div className="worry-answer">
          <span className="worry-arrow" aria-hidden="true">
            ▼
          </span>
          <p>
            そのモヤモヤ、<strong>ぜんぶヴィレキャリアに投げてOK</strong>。
            <br />
            「何がしたいか分からない」は、相談に来る理由として100点です。
          </p>
        </div>
      </section>

      <Wave fill="#fff" />

      {/* 特徴 */}
      <section className="section section--white">
        <SectionHead en="FEATURES" ja="ヴィレキャリアが選ばれる3つの理由" />
        <div className="features">
          {FEATURES.map((f, i) => (
            <article className={`feature feature--${f.tone}`} key={f.title}>
              <span className="feature-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="feature-emoji" aria-hidden="true">
                {f.emoji}
              </span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <Wave fill="#ffe3ef" flip />

      {/* アドバイザー */}
      <section className="section section--pink" id="advisors">
        <SectionHead
          en="ADVISORS"
          ja="あなたの専属アドバイザーたち"
          sub="転職のプロであり、いちばんの味方。推しを見つけてください。"
        />
        <div className="advisors">
          {ADVISORS.map((a) => (
            <article className="advisor" key={a.name}>
              <div className="advisor-portrait">
                <Portrait variant={a.variant} id={`adv-${a.variant}`} title={`${a.name}のイラスト`} />
              </div>
              <p className="advisor-kana">{a.kana}</p>
              <h3 className="advisor-name">{a.name}</h3>
              <p className="advisor-role">{a.role}</p>
              <ul className="advisor-tags">
                {a.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="advisor-comment">{a.comment}</p>
            </article>
          ))}
        </div>
      </section>

      <Wave fill="#fff7ec" />

      {/* 流れ */}
      <section className="section section--cream" id="flow">
        <SectionHead en="FLOW" ja="内定までの4ステップ" sub="登録から内定まで、ずっとタダ。ずっと一緒。" />
        <ol className="steps">
          {STEPS.map((s) => (
            <li className="step" key={s.num}>
              <span className="step-num">{s.num}</span>
              <span className="step-emoji" aria-hidden="true">
                {s.emoji}
              </span>
              <div className="step-body">
                <h3>
                  {s.title} <small>{s.time}</small>
                </h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Wave fill="#fff1cf" flip />

      {/* 求人 */}
      <section className="section section--sun" id="jobs">
        <div className="jobs-mascot" aria-hidden="true">
          <BoxBuddy />
          <span className="jobs-mascot-line">倉庫のお仕事、あるよ〜</span>
        </div>
        <SectionHead
          en="JOBS"
          ja="未経験OKのおすすめ求人"
          sub="いま人気の倉庫・物流のお仕事から在宅ワークまで、ぜんぶ未経験スタートOK。"
        />
        <div className="jobs">
          {JOBS.map((j) => (
            <article className="job" key={j.title}>
              <header className="job-head">
                <span className="job-emoji" aria-hidden="true">
                  {j.emoji}
                </span>
                <div>
                  <h3>
                    {j.title}
                    {j.isNew && <span className="job-new">NEW</span>}
                  </h3>
                  <p className="job-company">{j.company}</p>
                </div>
              </header>
              <dl className="job-facts">
                <div>
                  <dt>勤務地</dt>
                  <dd>{j.place}</dd>
                </div>
                <div>
                  <dt>給与</dt>
                  <dd className="job-salary">{j.salary}</dd>
                </div>
              </dl>
              <ul className="job-tags">
                {j.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a className="btn btn--pink btn--sm job-btn" href="#cta">
                この求人について相談する
              </a>
            </article>
          ))}
        </div>
        <p className="jobs-note">
          ※ 掲載しているのはほんの一部。会員限定の非公開求人は、無料相談でご紹介しています。
        </p>
      </section>

      <Wave fill="#e8f8f4" />

      {/* 先輩の声 */}
      <section className="section section--teal" id="voices">
        <SectionHead en="VOICES" ja="未経験から飛び立った先輩たち" />
        <div className="voices">
          {VOICES.map((v) => (
            <article className="voice" key={v.name}>
              <header className="voice-head">
                <div className="voice-avatar">
                  <Portrait variant={v.variant} palette={v.palette} id={`voice-${v.name}`} title={`${v.name}のイラスト`} />
                </div>
                <div>
                  <p className="voice-route">{v.route}</p>
                  <p className="voice-name">
                    {v.name} <span>{v.age}</span>
                  </p>
                </div>
              </header>
              <p className="voice-text">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Wave fill="#fff" />

      {/* お役立ち記事 */}
      <section className="section section--white" id="articles">
        <SectionHead
          en="MAGAZINE"
          ja="お役立ち記事"
          sub="業界のリアルや選考のコツを、アドバイザーがゆるっと解説。"
        />
        <div className="articles">
          {ARTICLES.map((a) => (
            <ArticleCard key={a.id} a={a} idPrefix="home" />
          ))}
        </div>
      </section>

      <Wave fill="#fff7ec" flip />

      {/* FAQ */}
      <section className="section section--cream" id="faq">
        <SectionHead en="FAQ" ja="よくある質問" />
        <div className="faqs">
          {FAQS.map((f) => (
            <details className="faq" key={f.q}>
              <summary>
                <span className="faq-q" aria-hidden="true">
                  Q
                </span>
                {f.q}
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="cta">
        <div className="cta-card">
          <div className="cta-chars" aria-hidden="true">
            <div className="cta-char">
              <Portrait variant="akari" id="cta-akari" title="" />
            </div>
            <div className="cta-char">
              <Portrait variant="jin" id="cta-jin" title="" />
            </div>
          </div>
          <p className="cta-eyebrow">＼ まずは、雑談からはじめよう ／</p>
          <h2 className="cta-title">
            未経験のあなたを、
            <br />
            アドバイザー一同お待ちしてます!
          </h2>
          <p className="cta-note">30秒で登録完了・しつこい電話なし・もちろん無料</p>
          <a className="btn btn--yellow btn--xl" href="mailto:career@ville-ville.com?subject=無料キャリア相談の申し込み">
            無料キャリア相談を予約する <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ---------- ルーティング ---------- */

export default function App() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const article = hash.startsWith('#/article/')
    ? ARTICLES.find((a) => a.id === hash.slice('#/article/'.length))
    : undefined

  // 記事を開いたら先頭へ / 記事から戻ったらアンカー位置へ
  useEffect(() => {
    if (article) {
      window.scrollTo(0, 0)
      return
    }
    if (hash && !hash.startsWith('#/')) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    }
  }, [hash, article])

  return article ? <ArticlePage article={article} /> : <Home />
}
