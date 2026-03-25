"use client"

import * as React from "react"
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion"
import { X, AlertCircle, CheckCircle2, HelpCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children?: React.ReactNode
  type?: "info" | "success" | "error" | "confirm"
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  isConfirmLoading?: boolean
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  type = "info",
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  isConfirmLoading = false,
}: ModalProps) {
  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const icons = {
    info: <Info className="w-6 h-6 text-blue-500" />,
    success: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
    error: <AlertCircle className="w-6 h-6 text-destructive" />,
    confirm: <HelpCircle className="w-6 h-6 text-primary" />,
  }

  const bgColors = {
    info: "bg-blue-500/10 border-blue-500/20",
    success: "bg-emerald-500/10 border-emerald-500/20",
    error: "bg-destructive/10 border-destructive/20",
    confirm: "bg-primary/10 border-primary/20",
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <div className="p-6 sm:p-8">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className={cn("mb-4 p-3 rounded-full border", bgColors[type])}>
                    {icons[type]}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold mb-2">{title}</h3>
                  {description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>

                {children && <div className="mt-6">{children}</div>}

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  {type === "confirm" ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 h-12 rounded-xl"
                        disabled={isConfirmLoading}
                      >
                        {cancelLabel}
                      </Button>
                      <Button
                        onClick={onConfirm}
                        className="flex-1 h-12 rounded-xl"
                        isLoading={isConfirmLoading}
                      >
                        {confirmLabel}
                      </Button>
                    </>
                  ) : (
                    <Button onClick={onClose} className="w-full h-12 rounded-xl">
                      Entendi
                    </Button>
                  )}
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
