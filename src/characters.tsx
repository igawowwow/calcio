// アニメ・漫画風キャラクターのSVGポートレート
// 4人のアドバイザー(蓮・美桜・朱莉・仁)+ パレット差し替えで体験談用の別人物も生成できる

export type Palette = {
  skin: string
  shade: string
  hairA: string // 髪ベース
  hairB: string // 髪シェード(後ろ髪)
  hairHi: string // 天使の輪ハイライト
  eye1: string // 虹彩(上)
  eye2: string // 虹彩(下)
  outfitA: string
  outfitB: string
  bg: string
}

export type Variant = 'ren' | 'mio' | 'akari' | 'jin'

const LASH = '#372b47'
const LINE = '#5d3a2e'

export const PALETTES: Record<Variant, Palette> = {
  ren: {
    skin: '#ffe6d2',
    shade: '#f4bd97',
    hairA: '#3f4a86',
    hairB: '#333c6e',
    hairHi: '#7d89c9',
    eye1: '#79aaff',
    eye2: '#2f55c8',
    outfitA: '#414868',
    outfitB: '#2ec8b4',
    bg: '#dceaff',
  },
  mio: {
    skin: '#ffe9d8',
    shade: '#f6c3a0',
    hairA: '#ff9ec6',
    hairB: '#f27fae',
    hairHi: '#ffd2e6',
    eye1: '#5fd8c8',
    eye2: '#1f9c8d',
    outfitA: '#fff6f9',
    outfitB: '#ffd7e6',
    bg: '#ffe3ef',
  },
  akari: {
    skin: '#ffe9d6',
    shade: '#f6c39e',
    hairA: '#ffb45e',
    hairB: '#f09a3e',
    hairHi: '#ffdba6',
    eye1: '#ffb648',
    eye2: '#e0761c',
    outfitA: '#ffc531',
    outfitB: '#fffdf5',
    bg: '#fff1cf',
  },
  jin: {
    skin: '#ffe6d2',
    shade: '#f2bb96',
    hairA: '#c3c9dd',
    hairB: '#a7aec9',
    hairHi: '#eef1fa',
    eye1: '#b29dff',
    eye2: '#6a4fd8',
    outfitA: '#33304a',
    outfitB: '#8d7bfa',
    bg: '#e9e4ff',
  },
}

type Props = {
  variant: Variant
  palette?: Palette
  id: string // gradient id の重複を避けるためのプレフィックス
  className?: string
  title?: string
}

/* ---------- 顔のパーツ ---------- */

function Head({ p }: { p: Palette }) {
  return (
    <g>
      {/* 首 */}
      <path d="M91 132 L91 161 C91 166 109 166 109 161 L109 132 Z" fill={p.skin} />
      <path d="M91 138 C94 144 106 144 109 138 L109 132 L91 132 Z" fill={p.shade} opacity="0.55" />
      {/* 耳 */}
      <ellipse cx="62" cy="101" rx="6.5" ry="9" fill={p.skin} />
      <ellipse cx="138" cy="101" rx="6.5" ry="9" fill={p.skin} />
      {/* 輪郭 */}
      <path
        d="M100 33 C73 33 60 52 60 79 C60 108 71 131 87 140 C92 143 96 145 100 145 C104 145 108 143 113 140 C129 131 140 108 140 79 C140 52 127 33 100 33 Z"
        fill={p.skin}
      />
    </g>
  )
}

function Eye({
  cx,
  p,
  id,
  side,
  style,
}: {
  cx: number
  p: Palette
  id: string
  side: 'l' | 'r'
  style: 'f' | 'm'
}) {
  const cy = style === 'f' ? 106 : 105
  const ry = style === 'f' ? 11 : 8.6
  const iry = style === 'f' ? 10.4 : 8.2
  const flip = side === 'l' ? -1 : 1
  const gid = `${id}-iris-${side}`
  return (
    <g>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.eye2} />
          <stop offset="0.45" stopColor={p.eye1} />
          <stop offset="1" stopColor={p.eye2} />
        </linearGradient>
      </defs>
      {/* 白目 */}
      <ellipse cx={cx} cy={cy} rx="9.6" ry={ry} fill="#fff" />
      {/* 虹彩 */}
      <ellipse cx={cx} cy={cy - 0.5} rx="8" ry={iry} fill={`url(#${gid})`} />
      <ellipse cx={cx} cy={cy + 1} rx="3.3" ry={style === 'f' ? 4.8 : 4} fill="#241a33" />
      {/* ハイライト */}
      <circle cx={cx + flip * 3.2} cy={cy - 3.6} r="2.9" fill="#fff" />
      <circle cx={cx - flip * 3.4} cy={cy + 4.4} r="1.5" fill="#fff" opacity="0.85" />
      {/* 上まつげ */}
      {style === 'f' ? (
        <path
          d={`M${cx + flip * 11} ${cy - 5.5} C${cx + flip * 8} ${cy - 12.5} ${cx - flip * 6} ${cy - 12.5} ${cx - flip * 10} ${cy - 6.5}`}
          stroke={LASH}
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <path
          d={`M${cx + flip * 10.5} ${cy - 6} C${cx + flip * 7} ${cy - 10.5} ${cx - flip * 6} ${cy - 10.5} ${cx - flip * 9.5} ${cy - 6.5}`}
          stroke={LASH}
          strokeWidth="3.1"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {style === 'f' && (
        <path
          d={`M${cx + flip * 10.6} ${cy - 5.8} L${cx + flip * 13.6} ${cy - 9.2}`}
          stroke={LASH}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      )}
      {/* 下まぶた */}
      <path
        d={`M${cx - 6.5} ${cy + ry - 0.5} C${cx - 3} ${cy + ry + 2} ${cx + 3} ${cy + ry + 2} ${cx + 6.5} ${cy + ry - 0.5}`}
        stroke={LASH}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </g>
  )
}

function Face({
  p,
  id,
  style,
  mouth,
  blush,
  browTone,
}: {
  p: Palette
  id: string
  style: 'f' | 'm'
  mouth: 'smile' | 'grin' | 'soft'
  blush: boolean
  browTone: string
}) {
  return (
    <g>
      <Eye cx={81} p={p} id={id} side="l" style={style} />
      <Eye cx={119} p={p} id={id} side="r" style={style} />
      {/* 眉 */}
      <path
        d="M71 88 C76 84.5 86 84.5 90 87"
        stroke={browTone}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M110 87 C114 84.5 124 84.5 129 88"
        stroke={browTone}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* 鼻 */}
      <path d="M99.6 116 Q101.6 118.5 100 121" stroke={LINE} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* 口 */}
      {mouth === 'smile' && (
        <path d="M92 127 Q100 136 108 127 Q100 131.5 92 127 Z" fill="#e2557b" />
      )}
      {mouth === 'grin' && (
        <g>
          <path d="M90 126 Q100 140 110 126 Q100 132 90 126 Z" fill="#d84a71" />
          <path d="M93 127.2 Q100 131 107 127.2 Q100 129.6 93 127.2 Z" fill="#fff" />
        </g>
      )}
      {mouth === 'soft' && (
        <path d="M93 129 Q100 134.5 107 129" stroke="#b5566a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      )}
      {/* ほっぺ */}
      {blush && (
        <g>
          <ellipse cx="71" cy="118" rx="6.8" ry="3.6" fill="#ff9ebc" opacity="0.55" />
          <ellipse cx="129" cy="118" rx="6.8" ry="3.6" fill="#ff9ebc" opacity="0.55" />
        </g>
      )}
      {!blush && (
        <g>
          <path d="M66 118 L73 115" stroke="#f09a92" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
          <path d="M127 115 L134 118" stroke="#f09a92" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        </g>
      )}
    </g>
  )
}

/* ---------- 髪型 ---------- */

// 蓮:ツンツン短髪
function HairRen({ p }: { p: Palette }) {
  return (
    <g>
      <path
        d="M63 110 C58 92 57 76 59 62 C63 38 79 25 100 25 C121 25 137 38 141 62 C143 76 142 92 137 110
           L131 88 L127 100 L121 72 L114 92 L107 66 L100 90 L93 65 L86 88 L79 70 L74 100 L69 82 Z"
        fill={p.hairA}
      />
      <path d="M73 42 C82 33 118 33 127 42" stroke={p.hairHi} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.55" />
      {/* アホ毛 */}
      <path d="M96 26 C94 18 100 12 108 13 C101 16 100 21 101 26 Z" fill={p.hairA} />
    </g>
  )
}

// 美桜:ロングヘア(後ろ髪+横の房+ぱっつん前髪)
function HairMioBack({ p }: { p: Palette }) {
  return (
    <path
      d="M100 22 C63 22 46 52 48 94 C49 128 43 154 34 172 L52 179 L60 164 L68 181 L80 168 L89 183 L100 172
         L111 183 L120 168 L132 181 L140 164 L148 179 L166 172 C157 154 151 128 152 94 C154 52 137 22 100 22 Z"
      fill={p.hairB}
    />
  )
}

function HairMioFront({ p, id }: { p: Palette; id: string }) {
  return (
    <g>
      {/* 横の房 */}
      <path d="M61 66 C53 84 51 110 55 136 C57 152 53 162 46 170 C56 174 65 168 68 156 C72 138 71 108 69 90 Z" fill={p.hairA} />
      <path d="M139 66 C147 84 149 110 145 136 C143 152 147 162 154 170 C144 174 135 168 132 156 C128 138 129 108 131 90 Z" fill={p.hairA} />
      {/* 前髪 */}
      <path
        d="M62 98 C57 66 63 40 82 31 C88 28 94 27 100 27 C106 27 112 28 118 31 C137 40 143 66 138 98
           L132 99 L128 70 L121 93 L114 63 L106 90 L100 65 L94 90 L86 63 L79 93 L72 70 L68 99 Z"
        fill={p.hairA}
      />
      <path d="M72 46 C82 35 118 35 128 46" stroke={p.hairHi} strokeWidth="6.5" strokeLinecap="round" fill="none" opacity="0.7" />
      {/* リボン */}
      <g transform="translate(133 52) rotate(18)">
        <path d="M0 0 L-13 -7 C-16 -2 -16 4 -13 8 Z" fill="#ff5f8e" />
        <path d="M0 0 L13 -7 C16 -2 16 4 13 8 Z" fill="#ff5f8e" />
        <circle cx="0" cy="0" r="3.6" fill="#ffd23e" />
      </g>
      <SparkleTiny id={id} x={64} y={40} />
    </g>
  )
}

// 朱莉:ボブ+サイド流し前髪
function HairAkariBack({ p }: { p: Palette }) {
  return (
    <path
      d="M100 24 C64 24 50 52 53 92 C55 124 62 144 73 155 L80 142 L88 155 L96 144 L104 155 L112 144 L120 155 L127 142
         C138 132 145 116 147 92 C150 52 136 24 100 24 Z"
      fill={p.hairB}
    />
  )
}

function HairAkariFront({ p }: { p: Palette }) {
  return (
    <g>
      <path
        d="M63 100 C58 64 64 36 84 29 C89 27 95 26 101 26 C124 26 141 46 138 94
           L132 96 L128 66 L119 90 L111 61 L99 88 L88 59 L81 94 L74 66 L69 101 Z"
        fill={p.hairA}
      />
      <path d="M74 43 C84 33 118 33 127 43" stroke={p.hairHi} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.65" />
      {/* 星のヘアピン */}
      <path
        d="M129 62 L131.6 68 L138 68.6 L133.2 72.8 L134.6 79 L129 75.6 L123.4 79 L124.8 72.8 L120 68.6 L126.4 68 Z"
        fill="#ffd23e"
        stroke="#e8a20c"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </g>
  )
}

// 仁:ミディアム無造作ヘア
function HairJinBack({ p }: { p: Palette }) {
  return (
    <path
      d="M100 23 C65 23 50 50 53 88 C55 112 60 128 69 139 L75 122 L82 138 L89 124 L96 139 L104 124 L111 139 L118 124 L125 138
         C134 128 143 112 146 88 C150 50 135 23 100 23 Z"
      fill={p.hairB}
    />
  )
}

function HairJinFront({ p }: { p: Palette }) {
  return (
    <g>
      <path
        d="M62 108 C56 88 56 70 59 58 C64 36 80 24 100 24 C120 24 136 36 141 58 C144 70 144 88 138 108
           L131 84 L126 104 L119 70 L112 96 L104 64 L97 94 L90 64 L83 92 L77 68 L72 104 L67 84 Z"
        fill={p.hairA}
      />
      <path d="M72 40 C82 31 118 31 128 40" stroke={p.hairHi} strokeWidth="5.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M104 24 C106 15 114 12 121 15 C114 16 110 20 109 26 Z" fill={p.hairA} />
    </g>
  )
}

/* ---------- 衣装 ---------- */

// スーツ(蓮)
function OutfitSuit({ p }: { p: Palette }) {
  return (
    <g>
      <path d="M38 202 C41 172 58 155 79 151 L100 159 L121 151 C142 155 159 172 162 202 Z" fill={p.outfitA} />
      {/* シャツ */}
      <path d="M85 149 L100 165 L115 149 L115 147 L85 147 Z" fill="#fff" />
      {/* ネクタイ */}
      <path d="M95.5 157 L104.5 157 L106 165 L100 186 L94 165 Z" fill={p.outfitB} />
      {/* 襟 */}
      <path d="M84 148 L100 165 L92 172 L79 152 Z" fill={p.outfitA} stroke="#2c3050" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M116 148 L100 165 L108 172 L121 152 Z" fill={p.outfitA} stroke="#2c3050" strokeWidth="1.6" strokeLinejoin="round" />
    </g>
  )
}

// ブレザー(美桜)
function OutfitBlazer({ p }: { p: Palette }) {
  return (
    <g>
      <path d="M40 202 C44 172 61 154 81 150 L100 157 L119 150 C139 154 156 172 160 202 Z" fill={p.outfitA} />
      <path d="M83 149 C86 161 114 161 117 149 L117 147 L83 147 Z" fill={p.outfitB} />
      <path d="M81 150 C79 168 78 184 78 202 M119 150 C121 168 122 184 122 202" stroke="#f2b7cd" strokeWidth="2" fill="none" />
      <circle cx="100" cy="170" r="3" fill="#ffd23e" stroke="#e8a20c" strokeWidth="1" />
    </g>
  )
}

// カーディガン(朱莉)
function OutfitCardigan({ p }: { p: Palette }) {
  return (
    <g>
      <path d="M40 202 C44 172 61 154 81 150 L100 157 L119 150 C139 154 156 172 160 202 Z" fill={p.outfitA} />
      <path d="M86 148 L100 162 L114 148 L114 146 L86 146 Z" fill={p.outfitB} />
      <path d="M100 162 L100 202" stroke="#e8a20c" strokeWidth="2" />
      <circle cx="100" cy="172" r="2.2" fill="#e8a20c" />
      <circle cx="100" cy="184" r="2.2" fill="#e8a20c" />
    </g>
  )
}

// タートルネック(仁)
function OutfitTurtleneck({ p }: { p: Palette }) {
  return (
    <g>
      <path d="M40 202 C44 172 61 154 81 150 L100 156 L119 150 C139 154 156 172 160 202 Z" fill={p.outfitA} />
      <rect x="85" y="141" width="30" height="16" rx="7" fill={p.outfitA} />
      <path d="M87 148 C93 151 107 151 113 148" stroke="#211f33" strokeWidth="1.6" fill="none" opacity="0.6" />
      <path d="M60 168 C74 176 126 176 140 168" stroke={p.outfitB} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.9" />
    </g>
  )
}

function Glasses() {
  return (
    <g>
      <rect x="68" y="96" width="26" height="19" rx="8.5" fill="#fff" opacity="0.14" stroke="#3d3a55" strokeWidth="2.4" />
      <rect x="106" y="96" width="26" height="19" rx="8.5" fill="#fff" opacity="0.14" stroke="#3d3a55" strokeWidth="2.4" />
      <path d="M94 103 C97 101 103 101 106 103" stroke="#3d3a55" strokeWidth="2.4" fill="none" />
      <path d="M68 102 L62 100 M132 102 L138 100" stroke="#3d3a55" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  )
}

function SparkleTiny({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <path
      key={id}
      d={`M${x} ${y - 6} C${x + 1.2} ${y - 1.8} ${x + 1.8} ${y - 1.2} ${x + 6} ${y} C${x + 1.8} ${y + 1.2} ${x + 1.2} ${y + 1.8} ${x} ${y + 6} C${x - 1.2} ${y + 1.8} ${x - 1.8} ${y + 1.2} ${x - 6} ${y} C${x - 1.8} ${y - 1.2} ${x - 1.2} ${y - 1.8} ${x} ${y - 6} Z`}
      fill="#fff"
      opacity="0.9"
    />
  )
}

/* ---------- ポートレート本体 ---------- */

export function Portrait({ variant, palette, id, className, title }: Props) {
  const p = palette ?? PALETTES[variant]
  const female = variant === 'mio' || variant === 'akari'
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={title ?? 'キャラクターイラスト'}
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect x="0" y="0" width="200" height="200" rx="28" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="200" height="200" fill={p.bg} />
        <circle cx="100" cy="210" r="120" fill="#fff" opacity="0.35" />
        {variant === 'mio' && <HairMioBack p={p} />}
        {variant === 'akari' && <HairAkariBack p={p} />}
        {variant === 'jin' && <HairJinBack p={p} />}
        <Head p={p} />
        <Face
          p={p}
          id={id}
          style={female ? 'f' : 'm'}
          mouth={variant === 'akari' ? 'grin' : variant === 'mio' ? 'smile' : 'soft'}
          blush={female}
          browTone={p.hairB}
        />
        {variant === 'ren' && <OutfitSuit p={p} />}
        {variant === 'mio' && <OutfitBlazer p={p} />}
        {variant === 'akari' && <OutfitCardigan p={p} />}
        {variant === 'jin' && <OutfitTurtleneck p={p} />}
        {variant === 'ren' && <HairRen p={p} />}
        {variant === 'mio' && <HairMioFront p={p} id={id} />}
        {variant === 'akari' && <HairAkariFront p={p} />}
        {variant === 'jin' && (
          <g>
            <HairJinFront p={p} />
            <Glasses />
          </g>
        )}
      </g>
    </svg>
  )
}
