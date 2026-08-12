export type Job = {
  title: string
  emoji: string
  company: string
  place: string
  salary: string
  tags: string[]
  isNew?: boolean
}

// 求人はこの配列に追記するだけでカードが増えます。
export const JOBS: Job[] = [
  {
    title: '倉庫内ピッキングスタッフ',
    emoji: '📦',
    company: '大手EC物流センター',
    place: '千葉県市川市',
    salary: '月給 23.5万円〜',
    tags: ['未経験OK', '学歴不問', '週休2日', '空調完備'],
    isNew: true,
  },
  {
    title: 'フォークリフトオペレーター(資格取得支援あり)',
    emoji: '🚜',
    company: '飲料メーカー系倉庫',
    place: '埼玉県戸田市',
    salary: '月給 26万円〜',
    tags: ['資格費用会社負担', '昇給年2回', '男女活躍中'],
    isNew: true,
  },
  {
    title: '物流センターの在庫管理・事務',
    emoji: '🧮',
    company: 'アパレル物流センター',
    place: '神奈川県厚木市',
    salary: '月給 24万円〜',
    tags: ['未経験OK', 'デスクワーク中心', '服装自由'],
  },
  {
    title: '仕分け・梱包の軽作業スタッフ',
    emoji: '🎁',
    company: '宅配大手ハブセンター',
    place: '東京都大田区',
    salary: '月給 22.8万円〜(夜勤手当あり)',
    tags: ['日勤/夜勤 選べる', '週払いOK', '友達と応募OK'],
  },
  {
    title: 'ITサポートデスク',
    emoji: '💻',
    company: 'ITサービス企業',
    place: '東京都江東区(豊洲)',
    salary: '月給 25万円〜',
    tags: ['研修3ヶ月', 'リモート併用', '第二新卒歓迎'],
  },
  {
    title: 'ECサイト運営アシスタント',
    emoji: '🛒',
    company: '生活雑貨メーカー',
    place: 'フルリモート可(本社:東京都渋谷区)',
    salary: '月給 23万円〜',
    tags: ['未経験OK', 'フレックス', '私服OK'],
  },
]
