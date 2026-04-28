"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Loader2, Lock, Edit2, X, ChevronUp, ChevronDown, Eye, EyeOff, Server, Github, Mail, Globe, Cloud, BarChart3, Database, MessageCircle, ExternalLink, Upload, Image as ImageIcon, CheckCircle2, Move } from "lucide-react"
import { Footer } from "@/components/footer"
import { Modal } from "@/components/ui/modal"
import { m, LazyMotion, domAnimation } from "framer-motion"
import { useRef } from "react"



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
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isAdjusting, setIsAdjusting] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, pos: { x: 50, y: 50 } })
  const previewRef = useRef<HTMLDivElement>(null)

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

  // Calcula o estilo de zoom+pan para renderizar a imagem corretamente.
  // Usa um div wrapper maior que o container + background-size: cover
  // para garantir que o pan funcione em AMBOS os eixos.
  function getZoomPanStyle(position: string, zoom: string) {
    const z = parseFloat(zoom || '1')
    const [posXStr, posYStr] = (position || '50% 50%').split(' ')
    const posX = parseFloat(posXStr) / 100
    const posY = parseFloat(posYStr) / 100
    return {
      width: `${z * 100}%`,
      height: `${z * 100}%`,
      left: `${-(posX * (z - 1) * 100)}%`,
      top: `${-(posY * (z - 1) * 100)}%`,
    }
  }

  // Handlers globais para arraste (permite arrastar mesmo fora da imagem)
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (!isAdjusting || !previewRef.current) return
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY
      
      const deltaX = clientX - dragStart.x
      const deltaY = clientY - dragStart.y
      
      const rect = previewRef.current.getBoundingClientRect()
      const zoom = parseFloat(newData.imageZoom || '1')
      
      // O range total de pan em pixels é (zoom - 1) * containerWidth
      // Se zoom=1, não há pan. Se zoom=2, o pan range = 1 * containerWidth.
      const panRangeX = (zoom - 1) * rect.width
      const panRangeY = (zoom - 1) * rect.height
      
      // Converte o delta do mouse em delta de porcentagem (0-100)
      const deltaPctX = panRangeX > 0 ? (deltaX / panRangeX) * 100 : 0
      const deltaPctY = panRangeY > 0 ? (deltaY / panRangeY) * 100 : 0
      
      // Arrastar para a direita = ver o lado esquerdo da imagem = diminuir posX
      const nX = Math.max(0, Math.min(100, dragStart.pos.x - deltaPctX))
      const nY = Math.max(0, Math.min(100, dragStart.pos.y - deltaPctY))
      
      setNewData(prev => ({
        ...prev,
        imagePosition: `${nX.toFixed(1)}% ${nY.toFixed(1)}%`
      }))
    }

    const handleGlobalUp = () => {
      setIsAdjusting(false)
    }

    if (isAdjusting) {
      window.addEventListener('mousemove', handleGlobalMove)
      window.addEventListener('mouseup', handleGlobalUp)
      window.addEventListener('touchmove', handleGlobalMove)
      window.addEventListener('touchend', handleGlobalUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove)
      window.removeEventListener('mouseup', handleGlobalUp)
      window.removeEventListener('touchmove', handleGlobalMove)
      window.removeEventListener('touchend', handleGlobalUp)
    }
  }, [isAdjusting, dragStart, newData.imageZoom])


  // Modal states
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: "info" | "success" | "error" | "confirm"
    title: string
    description: string
    onConfirm?: () => void
  }>({
    isOpen: false,
    type: "info",
    title: "",
    description: "",
  })

  function showModal(type: "info" | "success" | "error" | "confirm", title: string, description: string, onConfirm?: () => void) {
    setModalState({ isOpen: true, type, title, description, onConfirm })
  }

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
    if (!password) return 
    setIsActionLoading(true)
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (res.ok) {
        setIsAuthenticated(true)
        showModal("success", "Login Realizado", "Bem-vindo ao painel administrativo da Intelekta.")
        fetchAnnouncements()
      } else {
        setLoginError(false) // Reset first to ensure animation re-triggers if already true
        setTimeout(() => setLoginError(true), 10)
        showModal("error", "Senha Incorreta", "A senha digitada não coincide com nossos registros. Tente novamente.")
      }
    } catch (err) {
      showModal("error", "Erro de Conexão", "Não foi possível conectar ao servidor. Verifique sua internet.")
    } finally {
      setIsActionLoading(false)
    }
  }

  function handleLogout() {
    showModal("confirm", "Sair da Conta", "Tem certeza que deseja sair do painel administrativo?", async () => {
      try {
        await fetch('/api/admin/verify', { method: 'DELETE' })
      } catch (err) {
        console.error("Logout error:", err)
      }
      setIsAuthenticated(false)
      setPassword("")
      setModalState(prev => ({ ...prev, isOpen: false }))
    })
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
        showModal("success", isEditing ? "Atualizado" : "Publicado", `A novidade foi ${isEditing ? 'atualizada' : 'publicada'} com sucesso no site.`)
        fetchAnnouncements()
      } else {
        showModal("error", "Erro na Operação", "Não foi possível salvar as alterações. Sua sessão pode ter expirado.")
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

  async function processUpload(file: File) {
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
        showModal("error", "Erro de Upload", "Houve um problema ao carregar sua imagem. Tente uma imagem menor.")
      }
    } catch (err) {
      showModal("error", "Erro de Conexão", "Não foi possível enviar a imagem.")
    } finally {
      setIsUploading(false)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processUpload(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      processUpload(file)
    } else if (file) {
      showModal("error", "Arquivo Inválido", "Por favor, arraste apenas arquivos de imagem.")
    }
  }

  const handleAdjustStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!newData.imageUrl && !previewUrl) return
    e.preventDefault() // Evita scroll/seleção durante arraste
    setIsAdjusting(true)
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    
    const currentPos = newData.imagePosition || '50% 50%'
    const [currX, currY] = currentPos.split(' ').map(v => {
      const val = parseFloat(v.replace('%', ''))
      return isNaN(val) ? 50 : val
    })
    
    setDragStart({ 
      x: clientX, 
      y: clientY, 
      pos: { x: currX, y: currY } 
    })
  }

  const handleAdjustEnd = () => {
    setIsAdjusting(false)
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    setIsActionLoading(true)
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        body: JSON.stringify({ action: 'move', data: { index, direction } })
      })
      if (res.ok) {
        fetchAnnouncements()
      } else {
        showModal("error", "Erro ao Mover", "Não foi possível alterar a ordem. Tente novamente.")
      }
    } finally {
      setIsActionLoading(false)
    }
  }

  async function handleDelete(index: number) {
    showModal("confirm", "Excluir Novidade", "Tem certeza que deseja remover esta publicação permanentemente?", async () => {
      setIsActionLoading(true)
      try {
        const res = await fetch('/api/admin/announcements', {
          method: 'POST',
          body: JSON.stringify({ action: 'delete', data: { index } })
        })
        if (res.ok) {
          showModal("success", "Excluído", "A publicação foi removida com sucesso.")
          fetchAnnouncements()
        } else {
          showModal("error", "Erro ao Excluir", "Não foi possível excluir a publicação. Tente novamente.")
        }
      } finally {
        setIsActionLoading(false)
      }
    })
  }

  if (!isAuthenticated) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6">
          <div className="w-full max-w-md border border-border bg-card/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="text-primary w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold">Acesso Restrito</h2>
              <p className="text-muted-foreground text-sm mt-2">Digite a senha administrativa da Intelekta</p>
            </div>
            <m.form 
              onSubmit={handleLogin} 
              className="space-y-4"
              animate={loginError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="hidden">
                <input 
                  type="text" 
                  value={botField} 
                  onChange={e => setBotField(e.target.value)} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />
              </div>
              <div className="relative group/pass">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Senha" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (loginError) setLoginError(false)
                  }}
                  className={`bg-background/50 h-12 pr-12 transition-colors ${loginError ? 'border-destructive ring-1 ring-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {loginError && (
                <m.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-xs font-bold text-center"
                >
                  Senha incorreta. Tente novamente.
                </m.p>
              )}
              <Button type="submit" className="w-full h-12 text-base" disabled={isActionLoading}>
                {isActionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar no Painel"}
              </Button>
            </m.form>
          </div>
        </div>
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation}>
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

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-12 sm:space-y-20">
          
          {/* CENTRAL DE FERRAMENTAS */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Acesso Rápido às Ferramentas
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Planilha", desc: "Leads e Acessos", icon: Database, url: "https://sheets.google.com/", color: "bg-green-500" },
                { name: "Telegram", desc: "Notificações", icon: MessageCircle, url: "https://web.telegram.org/", color: "bg-blue-500" },
                { name: "Vercel", desc: "Hospedagem", icon: Server, url: "https://vercel.com/", color: "bg-neutral-800" },
                { name: "GitHub", desc: "Código-Fonte", icon: Github, url: "https://github.com/", color: "bg-slate-700" },
                { name: "Gmail", desc: "E-mail Principal", icon: Mail, url: "https://mail.google.com/", color: "bg-red-500" },
                { name: "Registro.br", desc: "Domínio", icon: Globe, url: "https://registro.br/", color: "bg-yellow-600" },
                { name: "Google Cloud", desc: "Console de APIs", icon: Cloud, url: "https://console.cloud.google.com/", color: "bg-blue-600" },
                { name: "Search Console", desc: "Desempenho Google", icon: BarChart3, url: "https://search.google.com/search-console", color: "bg-indigo-500" },
              ].map((tool, i) => (
                <a 
                  key={i} 
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col p-4 rounded-2xl border border-border bg-card/40 hover:bg-card/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
                >
                  <div className={`w-10 h-10 rounded-xl ${tool.color} flex items-center justify-center text-white mb-3 shadow-inner`}>
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
                  <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
            
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
              <Lock className="w-4 h-4 text-primary mt-0.5" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                <strong className="text-primary uppercase tracking-wider">Aviso de Segurança:</strong> As credenciais de acesso para todas as ferramentas acima (Vercel, Google, Registro.br, etc) estão listadas no <strong>documento confidencial de credenciais</strong> entregue pelo desenvolvedor. Mantenha esses dados em local seguro.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">
            {/* FORM ADD */}
            <section className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-6 h-6 text-primary" />
                {editingIndex !== null ? "Editar Publicação" : "Nova Publicação"}
              </h2>
              <div className="border border-border bg-card/30 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 sm:p-8">
                  <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex justify-between items-center">
                        Imagem de Fundo
                        {newData.imageUrl && (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            IMAGEM CARREGADA
                          </span>
                        )}
                      </label>
                      <div 
                        className="relative group"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <label className={`
                          flex flex-col items-center justify-center w-full h-32 
                          border-2 border-dashed rounded-xl cursor-pointer
                          transition-all duration-300
                          ${isUploading ? 'border-primary/50 bg-primary/5 cursor-wait' : 'border-border bg-background/50 hover:bg-background/80 hover:border-primary/40'}
                          ${newData.imageUrl ? 'border-emerald-500/30 bg-emerald-500/5' : ''}
                          ${isDragging ? 'border-primary ring-4 ring-primary/10 scale-[1.02] bg-primary/5' : ''}
                        `}>
                          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                            {isUploading ? (
                              <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                            ) : newData.imageUrl ? (
                              <ImageIcon className="w-8 h-8 text-emerald-500 mb-2" />
                            ) : (
                              <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                            )}
                            <p className="text-xs text-muted-foreground font-medium">
                              {isUploading ? "Fazendo upload para o servidor..." : newData.imageUrl ? "Clique aqui para trocar a imagem" : "Clique ou arraste a imagem aqui"}
                            </p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase tracking-widest">
                              PNG, JPG ou WebP (Máx. 4MB)
                            </p>
                          </div>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={isUploading}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-2 p-6 bg-primary/5 rounded-2xl border border-primary/10 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Ajuste de Enquadramento</h3>
                          <p className="text-[10px] text-muted-foreground italic">Clique e "puxe" a imagem abaixo para ajustar o centro.</p>
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="h-8 text-[9px] uppercase font-bold"
                          onClick={() => setNewData({...newData, imagePosition: "50% 50%", imageZoom: "1"})}
                        >
                          Resetar
                        </Button>
                      </div>

                      {/* AREA DE AJUSTE INTERATIVA */}
                      <div className="relative group/adjust">
                        <div 
                          ref={previewRef}
                          className={`relative w-full aspect-video rounded-xl overflow-hidden bg-background border border-border shadow-inner transition-shadow ${isAdjusting ? 'ring-2 ring-primary cursor-grabbing' : 'cursor-grab'}`}
                          onMouseDown={handleAdjustStart}
                          onTouchStart={handleAdjustStart}
                        >
                          {previewUrl || newData.imageUrl ? (
                            <>
                              <div 
                                className="absolute select-none pointer-events-none transition-all duration-150" 
                                style={{ 
                                  backgroundImage: `url(${previewUrl || newData.imageUrl})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  ...getZoomPanStyle(newData.imagePosition || '50% 50%', newData.imageZoom || '1'),
                                }}
                              />
                              {/* Overlay de ajuda */}
                              {!isAdjusting && (
                                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover/adjust:opacity-100 transition-opacity pointer-events-none">
                                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
                                    <Move className="w-4 h-4" />
                                  </div>
                                </div>
                              )}
                              {/* Grid de enquadramento */}
                              <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute inset-x-0 top-1/3 h-px bg-white/20" />
                                <div className="absolute inset-x-0 top-2/3 h-px bg-white/20" />
                                <div className="absolute inset-y-0 left-1/3 w-px bg-white/20" />
                                <div className="absolute inset-y-0 left-2/3 w-px bg-white/20" />
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] uppercase tracking-widest font-medium bg-muted/50">
                              Selecione uma imagem primeiro
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex justify-between">
                            Zoom / Aproximação
                            <span className="text-primary font-mono font-bold">{newData.imageZoom || '1'}x</span>
                          </label>
                          <input 
                            type="range"
                            min="1"
                            max="3"
                            step="0.01"
                            value={parseFloat(newData.imageZoom || '1')}
                            onChange={e => setNewData({...newData, imageZoom: e.target.value})}
                            className="w-full accent-primary h-1.5 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
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
                        {editingIndex !== null ? "Salvar Alterações" : "Publicar Agora no Painel"}
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
            <section className="lg:sticky lg:top-28 space-y-6 order-1 lg:order-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <span className="w-4 h-px bg-primary" />
                Pré-visualização (Hero)
              </h2>
              
              <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-2xl ring-1 ring-border">
                {/* Mock do Hero Background */}
                {previewUrl || newData.imageUrl ? (
                  <div 
                    className="absolute transition-all duration-300" 
                    style={{ 
                      backgroundImage: `url(${previewUrl || newData.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      ...getZoomPanStyle(newData.imagePosition || '50% 50%', newData.imageZoom || '1'),
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center p-12 text-center text-slate-500">
                    <p className="text-sm">Pré-visualização do Hero</p>
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
              <div className="text-center p-12 sm:p-20 bg-muted/10 rounded-2xl border-2 border-dashed border-border/50 text-muted-foreground">
                <Plus className="w-8 h-8 mx-auto mb-4 opacity-20" />
                <p className="text-sm font-medium">Nenhuma novidade publicada no momento.</p>
                <p className="text-xs mt-1 opacity-60">Use o formulário acima para criar o primeiro destaque.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {announcements.map((item, i) => (
                  <div key={i} className="group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border border-white/5 bg-card/40 hover:bg-card/60 transition-all hover:shadow-xl hover:-translate-y-0.5">
                    <div className="relative h-40 sm:h-24 w-full sm:w-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted border border-white/10 shadow-inner">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt="" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          style={{ 
                            objectPosition: item.imagePosition || '50% 50%',
                            transform: `scale(${item.imageZoom || 1})`
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground bg-slate-800">SEM FOTO</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-sm">{item.category}</span>
                        <span className="text-[10px] text-muted-foreground font-medium italic border-l border-border pl-2">{item.date}</span>
                      </div>
                      <h4 className="font-serif text-lg font-bold truncate pr-0 sm:pr-10">{item.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1 font-light">{item.description}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2 border-t sm:border-t-0 pt-4 sm:pt-0">
                      <div className="flex sm:flex-row flex-1 gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-1 sm:flex-none w-auto sm:w-10 h-10 sm:h-10 rounded-xl text-muted-foreground hover:bg-primary/10 border border-border sm:border-transparent hover:border-primary/20 transition-all"
                          onClick={() => handleMove(i, 'up')}
                          disabled={isActionLoading || i === 0}
                          title="Mover para cima"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-1 sm:flex-none w-auto sm:w-10 h-10 sm:h-10 rounded-xl text-muted-foreground hover:bg-primary/10 border border-border sm:border-transparent hover:border-primary/20 transition-all"
                          onClick={() => handleMove(i, 'down')}
                          disabled={isActionLoading || i === announcements.length - 1}
                          title="Mover para baixo"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex sm:flex-row flex-1 gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-1 sm:flex-none w-auto sm:w-10 h-10 sm:h-10 rounded-xl text-primary hover:bg-primary/10 border border-border sm:border-transparent hover:border-primary/20 transition-all gap-2"
                          onClick={() => handleEdit(i)}
                          disabled={isActionLoading}
                          title="Editar destaque"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span className="sm:hidden text-[10px] font-bold uppercase tracking-widest">Editar</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-1 sm:flex-none w-auto sm:w-10 h-10 sm:h-10 rounded-xl text-destructive hover:bg-destructive/10 border border-border sm:border-transparent hover:border-destructive/20 transition-all gap-2"
                          onClick={() => handleDelete(i)}
                          disabled={isActionLoading}
                          title="Excluir destaque"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sm:hidden text-[10px] font-bold uppercase tracking-widest">Excluir</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
        <Footer />

        <Modal
          isOpen={modalState.isOpen}
          onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
          type={modalState.type}
          title={modalState.title}
          description={modalState.description}
          onConfirm={modalState.onConfirm}
          isConfirmLoading={isActionLoading}
        />
      </div>
    </LazyMotion>
  );
}

