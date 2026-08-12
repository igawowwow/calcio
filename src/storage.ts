import type { Article } from './articles'

const KEY = 'ville-career-custom-articles-v1'

export function loadCustomArticles(): Article[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr: unknown = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    return arr.filter(
      (a): a is Article =>
        !!a && typeof a === 'object' && typeof (a as Article).id === 'string' && typeof (a as Article).title === 'string',
    )
  } catch {
    return []
  }
}

export function saveCustomArticles(list: Article[]) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

// カスタム記事(このブラウザで書いたもの)が同じidの標準記事を上書きする
export function mergeArticles(builtin: Article[], custom: Article[]): Article[] {
  const overridden = new Set(custom.map((c) => c.id))
  return [...custom, ...builtin.filter((b) => !overridden.has(b.id))]
}

/*
 * 編集画面の本文フォーマット:
 *   ## 見出し   … 新しい章のはじまり
 *   空行        … 段落の区切り
 *   ・ではじまる行 … 箇条書き(連続する行はひとつのリストに)
 */

export function parseBodyText(src: string): { heading: string; body: string[] }[] {
  const sections: { heading: string; body: string[] }[] = []
  let current: { heading: string; body: string[] } | null = null
  let lines: string[] = []

  const flush = () => {
    if (!lines.length) return
    if (!current) {
      current = { heading: '', body: [] }
      sections.push(current)
    }
    const isList = lines[0].trimStart().startsWith('・')
    current.body.push(lines.join(isList ? '\n' : ''))
    lines = []
  }

  for (const raw of src.split('\n')) {
    const line = raw.trimEnd()
    if (line.startsWith('## ')) {
      flush()
      current = { heading: line.slice(3).trim(), body: [] }
      sections.push(current)
    } else if (!line.trim()) {
      flush()
    } else {
      lines.push(line)
    }
  }
  flush()
  return sections.filter((s) => s.heading || s.body.length)
}

export function bodyToText(sections: { heading: string; body: string[] }[]): string {
  return sections.map((s) => [`## ${s.heading}`, ...s.body].join('\n\n')).join('\n\n')
}

// src/articles.ts に貼り付けられる TypeScript コードを生成
export function articleToCode(a: Article): string {
  const json = JSON.stringify(a, null, 2)
  return `// ↓ このオブジェクトを src/articles.ts の ARTICLES 配列の先頭に追加すると、全員に公開されます\n${json},`
}

export function estimateReadMin(a: Pick<Article, 'lead' | 'sections'>): number {
  const chars =
    a.lead.length + a.sections.reduce((n, s) => n + s.heading.length + s.body.reduce((m, p) => m + p.length, 0), 0)
  return Math.max(2, Math.round(chars / 500))
}
