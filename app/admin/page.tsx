"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Loader2, Lock, Edit2, X } from "lucide-react"
import { Footer } from "@/components/footer"

interface Announcement {
  date: string
  category: string
  title: string
  description: string
  imageUrl?: string
  linkUrl?: string
  imagePosition?: string
  imageZoom?: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [botField, setBotField] = useState("") // Honey Pot
  
  const [newData, setNewData] = useState<Announcement>({
    date: "15 de Abril",
    category: "WORKSHOP",
    title: "Título da Novidade",
    description: "Uma breve descrição do que será apresentado nesta novidade para os usuários.",
    imageUrl: "",
    linkUrl: "",
    imagePosition: "50% 50%",
    imageZoom: "1"
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/verify')
      if (res.ok) {
        setIsAuthenticated(true)
        fetchAnnouncements()
      }
    } catch (err) {
      console.error("Session check error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchAnnouncements() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/announcements')
      if (res.ok) {
        const data = await res.json()
        setAnnouncements(data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!password || botField) return // Honey pot check
    setIsActionLoading(true)
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (res.ok) {
        setIsAuthenticated(true)
        fetchAnnouncements()
      } else {
        alert("Senha incorreta.")
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.")
    } finally {
      setIsActionLoading(false)
    }
  }

  function handleLogout() {
    // Session is handled by cookie, but we can clear local state
    setIsAuthenticated(false)
    setPassword("")
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setIsActionLoading(true)
    const isEditing = editingIndex !== null
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: isEditing ? 'update' : 'add', 
          data: isEditing ? { ...newData, index: editingIndex } : newData 
        })
      })
      if (res.ok) {
        setNewData({ date: "15 de Abril", category: "WORKSHOP", title: "Título da Novidade", description: "", imageUrl: "", linkUrl: "", imagePosition: "50% 50%", imageZoom: "1" })
        setPreviewUrl(null)
        setEditingIndex(null)
        fetchAnnouncements()
      } else {
        alert("Erro na operação. Sua sessão pode ter expirado.")
        if (res.status === 401) setIsAuthenticated(false)
      }
    } finally {
      setIsActionLoading(false)
    }
  }

  function handleEdit(index: number) {
    const item = announcements[index]
    setNewData(item)
    setPreviewUrl(item.imageUrl || null)
    setEditingIndex(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setNewData({ date: "15 de Abril", category: "WORKSHOP", title: "Título da Novidade", description: "", imageUrl: "", linkUrl: "", imagePosition: "50% 50%" })
    setPreviewUrl(null)
    setEditingIndex(null)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview local
    const localUrl = URL.createObjectURL(file)
    setPreviewUrl(localUrl)

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        const data = await res.json()
        setNewData({ ...newData, imageUrl: data.url })
      } else {
        alert("Erro no upload da imagem.")
      }
    } finally {
      setIsUploading(false)
    }
  }

  async function handleDelete(index: number) {
    if (!confirm("Tem certeza que deseja excluir esta novidade?")) return
    setIsActionLoading(true)
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        body: JSON.stringify({ action: 'delete', data: { index } })
      })
      if (res.ok) {
        fetchAnnouncements()
      } else {
        alert("Erro ao excluir. Verifique a senha.")
      }
    } finally {
      setIsActionLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-md border border-border bg-card/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-primary w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold">Acesso Restrito</h2>
            <p className="text-muted-foreground text-sm mt-2">Digite a senha administrativa da Intelekta</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="hidden">
              <input 
                type="text" 
                value={botField} 
                onChange={e => setBotField(e.target.value)} 
                tabIndex={-1} 
                autoComplete="off" 
              />
            </div>
            <Input 
              type="password" 
              placeholder="Senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50 h-12"
            />
            <Button type="submit" className="w-full h-12 text-base">
              Entrar no Painel
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-xl border-b border-primary/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="transition-transform hover:scale-105 duration-300">
              <Image 
                src="/images/logo-intelekta.webp" 
                alt="Intelekta" 
                width={140} 
                height={46}
                className="h-10 w-auto" 
              />
            </Link>
            <div className="h-8 w-px bg-primary/20 hidden sm:block" />
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-primary leading-none">Portal Admin</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Gestão de Conteúdo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">Sessão Ativa</span>
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href="/" 
                target="_blank"
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-all px-4 py-2.5 rounded-xl border border-border/50 hover:border-primary/30"
              >
                Ver Site
              </a>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="rounded-xl hover:bg-destructive/10 hover:text-destructive text-[10px] uppercase font-bold tracking-widest h-10 px-5 transition-all"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-16">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* FORM ADD */}
          <section className="space-y-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Plus className="w-6 h-6 text-primary" />
              Nova Publicação
            </h2>
            <div className="border border-border bg-card/30 rounded-xl overflow-hidden shadow-sm">
              <div className="p-8">
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Título</label>
                    <Input 
                      required 
                      placeholder="Ex: Novo Workshop" 
                      value={newData.title}
                      onChange={e => setNewData({...newData, title: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Categoria</label>
                    <Input 
                      required 
                      placeholder="Ex: WORKSHOP" 
                      value={newData.category}
                      onChange={e => setNewData({...newData, category: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Data para Exibição</label>
                    <Input 
                      required 
                      placeholder="Ex: 15 de Abril" 
                      value={newData.date}
                      onChange={e => setNewData({...newData, date: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Link de Destino</label>
                    <Input 
                      placeholder="https://..." 
                      value={newData.linkUrl}
                      onChange={e => setNewData({...newData, linkUrl: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Imagem de Fundo</label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="h-12 pt-2.5 cursor-pointer bg-background/50 hover:bg-background/80 transition-colors"
                        />
                      </div>
                      {isUploading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                    </div>
                  </div>

                  <div className="md:col-span-2 p-4 bg-primary/5 rounded-lg border border-primary/10 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-wider text-primary">
                      <span>Foco Horizontal (X)</span>
                      <span>Foco Vertical (Y)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={parseInt((newData.imagePosition?.split(' ')[0] || '50%').replace('%', ''))}
                        onChange={e => {
                          const x = e.target.value + '%';
                          const y = (newData.imagePosition?.split(' ')[1]) || '50%';
                          setNewData({...newData, imagePosition: `${x} ${y}`})
                        }}
                        className="w-full accent-primary h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={parseInt((newData.imagePosition?.split(' ')[1] || '50%').replace('%', ''))}
                        onChange={e => {
                          const x = (newData.imagePosition?.split(' ')[0]) || '50%';
                          const y = e.target.value + '%';
                          setNewData({...newData, imagePosition: `${x} ${y}`})
                        }}
                        className="w-full accent-primary h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div className="space-y-2 pt-2 border-t border-primary/10">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-primary flex justify-between">
                        Zoom da Imagem
                        <span className="text-primary/60">{newData.imageZoom || '1'}x</span>
                      </label>
                      <input 
                        type="range"
                        min="1"
                        max="3"
                        step="0.05"
                        value={parseFloat(newData.imageZoom || '1')}
                        onChange={e => setNewData({...newData, imageZoom: e.target.value})}
                        className="w-full accent-primary h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Descrição Curta</label>
                    <textarea 
                      required 
                      placeholder="Texto que aparecerá no card..." 
                      value={newData.description}
                      onChange={e => setNewData({...newData, description: e.target.value})}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="md:col-span-2 pt-4 border-t border-border mt-4 flex gap-4">
                    <Button type="submit" size="lg" className="flex-1 md:flex-none h-14 px-10" disabled={isActionLoading || isUploading}>
                      {isActionLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {editingIndex !== null ? "Salvar Alterações" : "Publicar Agora no Hero"}
                    </Button>
                    {editingIndex !== null && (
                      <Button type="button" variant="outline" size="lg" className="h-14 px-6" onClick={cancelEdit}>
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* PREVIEW SIDEBAR */}
          <section className="sticky top-28 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span className="w-4 h-px bg-primary" />
              Pré-visualização (Hero)
            </h2>
            
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-2xl ring-1 ring-border">
              {/* Mock do Hero Background */}
              {previewUrl || newData.imageUrl ? (
                <img 
                  src={previewUrl || newData.imageUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover transition-all duration-300" 
                  style={{ 
                    objectPosition: newData.imagePosition || '50% 50%',
                    transform: `scale(${newData.imageZoom || 1})`
                  }}
                  onError={() => console.error("Erro ao carregar prévia da imagem")}
                />
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center p-12 text-center text-slate-500">
                  <p className="text-sm">Selecione uma imagem para ver como ficará o fundo</p>
                </div>
              )}
              
              {/* Hero Content Overlay Mockup */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-primary text-[10px] font-bold tracking-widest text-primary-foreground rounded-sm uppercase">
                    {newData.category || "CATEGORIA"}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-white leading-tight">
                    {newData.title || "Título da Novidade"}
                  </h3>
                  <p className="text-white/70 text-sm font-light line-clamp-3">
                    {newData.description || "A descrição aparecerá aqui..."}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-primary flex items-center gap-2">
                    Saiba mais
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Taglet de Data */}
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-[10px] text-white/90 font-medium">
                {newData.date || "Data"}
              </div>
            </div>
            
            <p className="text-[10px] text-center text-muted-foreground italic px-4">
              *A prévia reflete o layout exato que será exibido no desktop. No mobile, o layout se adapta automaticamente.
            </p>
          </section>
        </div>

        {/* LIST */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Publicações Ativas ({announcements.length})
            </h2>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary/40" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Sincronizando dados...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center p-20 bg-muted/10 rounded-2xl border-2 border-dashed border-border/50 text-muted-foreground">
              <Plus className="w-8 h-8 mx-auto mb-4 opacity-20" />
              <p className="text-sm font-medium">Nenhuma novidade publicada no momento.</p>
              <p className="text-xs mt-1 opacity-60">Use o formulário acima para criar o primeiro destaque.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {announcements.map((item, i) => (
                <div key={i} className="group relative flex items-center gap-6 p-5 rounded-2xl border border-white/5 bg-card/40 hover:bg-card/60 transition-all hover:shadow-xl hover:-translate-y-0.5">
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-white/10 shadow-inner">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground bg-slate-800">SEM FOTO</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-sm">{item.category}</span>
                      <span className="text-[10px] text-muted-foreground font-medium italic border-l border-border pl-2">{item.date}</span>
                    </div>
                    <h4 className="font-serif text-lg font-bold truncate pr-10">{item.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1 font-light">{item.description}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-12 h-12 rounded-xl text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
                      onClick={() => handleEdit(i)}
                      disabled={isActionLoading}
                      title="Editar destaque"
                    >
                      <Edit2 className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-12 h-12 rounded-xl text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all"
                      onClick={() => handleDelete(i)}
                      disabled={isActionLoading}
                      title="Excluir destaque"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
