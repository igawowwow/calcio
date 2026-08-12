import { useState } from 'react'
import { ARTICLES, AUTHORS, type Article } from './articles'
import { Portrait, type Variant } from './characters'
import { articleToCode, bodyToText, estimateReadMin, parseBodyText } from './storage'

const TONES = [
  { value: 'pink', label: 'ピンク' },
  { value: 'teal', label: 'ミント' },
  { value: 'yellow', label: 'イエロー' },
  { value: 'purple', label: 'ラベンダー' },
] as const

type Form = {
  id: string
  title: string
  category: string
  emoji: string
  tone: Article['tone']
  date: string
  lead: string
  author: Variant
  tags: string
  bodyText: string
}

function today(): string {
  const d = new Date()
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function emptyForm(): Form {
  return {
    id: '',
    title: '',
    category: 'コラム',
    emoji: '📝',
    tone: 'pink',
    date: today(),
    lead: '',
    author: 'mio',
    tags: '',
    bodyText: '## はじめに\n\n本文をここに書きます。空行で段落を区切ります。\n\n## 見出しはこの形式\n\n・箇条書きは「・」ではじめる\n・連続する行はひとつのリストになります',
  }
}

function toForm(a: Article): Form {
  return {
    id: a.id,
    title: a.title,
    category: a.category,
    emoji: a.emoji,
    tone: a.tone,
    date: a.date,
    lead: a.lead,
    author: a.author,
    tags: a.tags.join('、'),
    bodyText: bodyToText(a.sections),
  }
}

type Props = {
  all: Article[]
  custom: Article[]
  onSave: (a: Article) => void
  onDelete: (id: string) => void
}

export default function AdminPage({ all, custom, onSave, onDelete }: Props) {
  const [form, setForm] = useState<Form | null>(null)
  const [message, setMessage] = useState('')
  const [exportCode, setExportCode] = useState('')
  const [copied, setCopied] = useState(false)

  const isCustom = (id: string) => custom.some((c) => c.id === id)
  const isBuiltin = (id: string) => ARTICLES.some((b) => b.id === id)

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => (f ? { ...f, [key]: value } : f))
    setMessage('')
  }

  const buildArticle = (f: Form): Article | string => {
    if (!f.title.trim()) return 'タイトルを入力してください'
    if (!f.lead.trim()) return 'リード文(冒頭のまとめ)を入力してください'
    const sections = parseBodyText(f.bodyText)
    if (!sections.length) return '本文を入力してください'
    const base = {
      lead: f.lead.trim(),
      sections,
    }
    return {
      id: f.id.trim() || `article-${Date.now().toString(36)}`,
      title: f.title.trim(),
      category: f.category.trim() || 'コラム',
      emoji: f.emoji.trim() || '📝',
      tone: f.tone,
      date: f.date.trim() || today(),
      readMin: estimateReadMin(base),
      author: f.author,
      authorName: AUTHORS[f.author].name,
      authorRole: AUTHORS[f.author].role,
      tags: f.tags
        .split(/[、,\s#]+/)
        .map((t) => t.trim())
        .filter(Boolean),
      ...base,
    }
  }

  const save = (): Article | null => {
    if (!form) return null
    const result = buildArticle(form)
    if (typeof result === 'string') {
      setMessage(`⚠️ ${result}`)
      return null
    }
    onSave(result)
    setForm({ ...form, id: result.id })
    setExportCode(articleToCode(result))
    setCopied(false)
    setMessage('✅ 保存しました!このブラウザのサイトにはもう公開されています。')
    return result
  }

  const saveAndPreview = () => {
    const a = save()
    if (a) window.location.hash = `#/article/${a.id}`
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(exportCode)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="admin">
      <div className="sec-head">
        <span className="sec-eyebrow">EDITOR</span>
        <h2 className="sec-title">記事の編集画面</h2>
        <p className="sec-sub">記事を書いて「保存」すると、このブラウザで見るサイトにすぐ公開されます。</p>
      </div>

      <div className="admin-note">
        <strong>📌 みんなに公開するには:</strong>
        保存後に出てくる「書き出しコード」を <code>src/articles.ts</code> の ARTICLES
        配列に貼り付けてコミットしてください(保存だけの場合は、このブラウザ限定の公開になります)。
      </div>

      <div className="admin-grid">
        {/* 記事リスト */}
        <aside className="admin-list">
          <button className="btn btn--pink admin-new" onClick={() => setForm(emptyForm())}>
            ＋ 新しい記事を書く
          </button>
          {all.map((a) => (
            <div className="admin-row" key={a.id}>
              <span className="admin-row-emoji" aria-hidden="true">
                {a.emoji}
              </span>
              <div className="admin-row-main">
                <p className="admin-row-title">{a.title}</p>
                <p className="admin-row-meta">
                  {a.date}
                  {isCustom(a.id) && <span className="admin-badge admin-badge--custom">このブラウザで編集済み</span>}
                  {!isCustom(a.id) && <span className="admin-badge">コードで公開中</span>}
                </p>
                <div className="admin-row-actions">
                  <button className="admin-mini" onClick={() => setForm(toForm(a))}>
                    ✏️ 編集
                  </button>
                  <a className="admin-mini" href={`#/article/${a.id}`}>
                    👀 開く
                  </a>
                  {isCustom(a.id) && (
                    <button
                      className="admin-mini admin-mini--danger"
                      onClick={() => {
                        onDelete(a.id)
                        setMessage(isBuiltin(a.id) ? '編集を破棄して、コード版に戻しました。' : '記事を削除しました。')
                      }}
                    >
                      🗑 {isBuiltin(a.id) ? '編集を破棄' : '削除'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* エディタ */}
        {form ? (
          <div className="admin-editor">
            <div className="admin-fields">
              <label className="field field--wide">
                <span>タイトル</span>
                <input
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="例:未経験から物流・倉庫で働くリアル"
                />
              </label>
              <label className="field">
                <span>カテゴリ</span>
                <input value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="業界研究" />
              </label>
              <label className="field">
                <span>アイコン絵文字</span>
                <input value={form.emoji} onChange={(e) => set('emoji', e.target.value)} placeholder="📦" />
              </label>
              <label className="field">
                <span>カードの色</span>
                <select value={form.tone} onChange={(e) => set('tone', e.target.value as Article['tone'])}>
                  {TONES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>公開日</span>
                <input value={form.date} onChange={(e) => set('date', e.target.value)} placeholder="2026.08.12" />
              </label>
              <label className="field">
                <span>書いた人</span>
                <select value={form.author} onChange={(e) => set('author', e.target.value as Variant)}>
                  {(Object.keys(AUTHORS) as Variant[]).map((v) => (
                    <option key={v} value={v}>
                      {AUTHORS[v].name}({AUTHORS[v].role})
                    </option>
                  ))}
                </select>
              </label>
              <div className="field admin-author-preview" aria-hidden="true">
                <span>プレビュー</span>
                <div className="admin-author-face">
                  <Portrait variant={form.author} id="admin-author" title="" />
                </div>
              </div>
              <label className="field field--wide">
                <span>タグ(「、」区切り)</span>
                <input value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="物流、未経験OK、例文あり" />
              </label>
              <label className="field field--wide">
                <span>リード文(冒頭のまとめ・2〜3文)</span>
                <textarea
                  className="admin-lead"
                  value={form.lead}
                  onChange={(e) => set('lead', e.target.value)}
                  placeholder="記事の冒頭に大きく表示される要約です。"
                />
              </label>
              <label className="field field--wide">
                <span>
                  本文 <small>「## 見出し」で章、空行で段落、「・」で箇条書き</small>
                </span>
                <textarea
                  className="admin-body"
                  value={form.bodyText}
                  onChange={(e) => set('bodyText', e.target.value)}
                />
              </label>
            </div>

            <div className="admin-actions">
              <button className="btn btn--pink" onClick={save}>
                💾 保存(このブラウザに公開)
              </button>
              <button className="btn btn--yellow" onClick={saveAndPreview}>
                保存してプレビュー →
              </button>
              <button className="btn btn--ghost" onClick={() => setForm(null)}>
                とじる
              </button>
            </div>
            {message && <p className="admin-message">{message}</p>}

            {exportCode && (
              <details className="admin-export" open>
                <summary>📤 みんなに公開する用の書き出しコード</summary>
                <p className="admin-export-help">
                  下のコードをコピーして、リポジトリの <code>src/articles.ts</code> にある ARTICLES
                  配列の先頭に貼り付けてコミット&プッシュすると、全員に公開されます。
                </p>
                <button className="admin-mini" onClick={copyCode}>
                  {copied ? '✅ コピーしました' : '📋 コードをコピー'}
                </button>
                <textarea className="admin-code" readOnly value={exportCode} />
              </details>
            )}
          </div>
        ) : (
          <div className="admin-editor admin-editor--empty">
            <p>
              👈 左のリストから記事を選んで「編集」するか、
              <br />
              「＋ 新しい記事を書く」で書きはじめてください。
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
