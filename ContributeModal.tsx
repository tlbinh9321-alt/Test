'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import clsx from 'clsx'
import { PROVINCES, HISTORY_PERIODS } from '@/lib/data'
import type { ContributeFormData, RoleOption } from '@/types'

const ROLES: RoleOption[] = [
  'Nhân chứng lịch sử',
  'Giáo viên',
  'Người thân nhân chứng',
  'Nhà nghiên cứu',
]

const STEP_LABELS = ['1 · Thông Tin', '2 · Nội Dung', '3 · Tệp Đính Kèm', '4 · Xác Nhận']

const NEXT_STEPS_LIST = [
  'Biên tập viên xem xét và liên hệ để xác nhận thông tin',
  'Ký ức được chuẩn hoá theo cấu trúc học liệu sư phạm',
  'Cố vấn lịch sử kiểm chứng tính xác thực',
  'Học liệu được xuất bản và thông báo cho bạn',
]

const INITIAL: ContributeFormData = {
  name: '',
  email: '',
  role: '',
  province: '',
  memoryTitle: '',
  period: HISTORY_PERIODS[4],
  content: '',
  files: [],
}

interface ContributeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContributeModal({ isOpen, onClose }: ContributeModalProps) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<ContributeFormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reset = () => {
    setStep(1)
    setForm(INITIAL)
    setSubmitted(false)
    setIsSubmitting(false)
    setError(null)
  }

  const handleClose = () => {
    onClose()
    setTimeout(reset, 300)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('role', form.role)
      formData.append('province', form.province)
      formData.append('memoryTitle', form.memoryTitle)
      formData.append('period', form.period)
      formData.append('content', form.content)
      
      form.files.forEach((file) => {
        formData.append('files', file)
      })

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api'
      console.log('Submitting to:', `${API_URL}/submissions/public`)
      
      const response = await fetch(`${API_URL}/submissions/public`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSubmitted(true)
        setStep(4)
      } else {
        const data = await response.json()
        throw new Error(data.message || `Lỗi: ${response.status}`)
      }
    } catch (err: any) {
      console.error('Submission error:', err)
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputCls =
    'w-full bg-cream border-[1.5px] border-navy/[0.12] rounded-[10px] px-4 py-[11px] font-sans text-sm text-navy outline-none transition-colors duration-300 focus:border-navy focus:bg-white appearance-none'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-5"
          style={{ background: 'rgba(10,15,28,0.85)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            className="bg-white rounded-[18px] w-full max-w-[640px] max-h-[90vh] overflow-y-auto p-8 md:p-10"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-1.5">
              <h2 className="font-serif text-[28px] font-bold text-navy">Đóng Góp Ký Ức</h2>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-navy transition-colors cursor-pointer bg-none border-none p-0 mt-1"
              >
                <X size={22} />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-7">
              Mỗi câu chuyện đều có giá trị. Cùng xây dựng kho di sản số Việt Nam.
            </p>

            {/* Steps bar */}
            {!submitted && (
              <div className="flex rounded-[10px] overflow-hidden border border-navy/[0.08] bg-cream mb-8">
                {STEP_LABELS.map((label, i) => (
                  <div
                    key={label}
                    className={clsx(
                      'flex-1 py-2.5 px-2 text-center text-[11px] font-semibold tracking-[0.05em]',
                      i + 1 === step
                        ? 'bg-navy text-white'
                        : i + 1 < step
                        ? 'bg-navy/[0.08] text-navy'
                        : 'text-slate-400'
                    )}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      Họ và tên <span className="text-red-vss">*</span>
                    </label>
                    <input
                      className={inputCls}
                      placeholder="Nguyễn Văn A"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      Email liên hệ <span className="text-red-vss">*</span>
                    </label>
                    <input
                      type="email"
                      className={inputCls}
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-navy mb-1.5">
                    Vai trò của bạn
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {ROLES.map((role) => (
                      <button
                        key={role}
                        onClick={() => setForm((f) => ({ ...f, role }))}
                        className={clsx(
                          'border-[1.5px] rounded-[10px] px-4 py-3 text-[13px] font-medium text-center cursor-pointer transition-all duration-300',
                          form.role === role
                            ? 'border-navy text-navy bg-navy/5'
                            : 'border-navy/12 text-slate-400 hover:border-navy hover:text-navy'
                        )}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[13px] font-semibold text-navy mb-1.5">
                    Địa phương liên quan
                  </label>
                  <select
                    className={inputCls}
                    value={form.province}
                    onChange={(e) => setForm((f) => ({ ...f, province: e.target.value }))}
                  >
                    <option value="">Chọn tỉnh / thành phố...</option>
                    {PROVINCES.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-red-vss text-white border-none rounded-full py-[15px] text-[15px] font-semibold cursor-pointer font-sans transition-all duration-300 hover:bg-red-light hover:-translate-y-px"
                >
                  Tiếp Theo →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-navy mb-1.5">
                    Tiêu đề ký ức <span className="text-red-vss">*</span>
                  </label>
                  <input
                    className={inputCls}
                    placeholder="Vd: Ký ức những ngày đầu giải phóng tại Biên Hoà"
                    value={form.memoryTitle}
                    onChange={(e) => setForm((f) => ({ ...f, memoryTitle: e.target.value }))}
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-navy mb-1.5">
                    Thời kỳ lịch sử
                  </label>
                  <select
                    className={inputCls}
                    value={form.period}
                    onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
                  >
                    {HISTORY_PERIODS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-[13px] font-semibold text-navy mb-1.5">
                    Nội dung chi tiết <span className="text-red-vss">*</span>
                  </label>
                  <textarea
                    className={clsx(inputCls, 'min-h-[120px] resize-y')}
                    placeholder="Hãy kể câu chuyện hoặc mô tả tư liệu bạn muốn đóng góp. Càng chi tiết càng tốt — thời gian, địa điểm, nhân vật, sự kiện..."
                    value={form.content}
                    maxLength={2000}
                    onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  />
                  <p className="text-[11px] text-slate-400 mt-1 text-right">
                    {form.content.length} / 2000 ký tự
                  </p>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-cream text-navy border-[1.5px] border-navy/15 rounded-full px-6 py-[15px] text-sm font-semibold cursor-pointer font-sans transition-all duration-300 hover:border-navy flex-shrink-0"
                  >
                    ← Quay lại
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-red-vss text-white border-none rounded-full py-[15px] text-[15px] font-semibold cursor-pointer font-sans transition-all duration-300 hover:bg-red-light"
                  >
                    Tiếp Theo →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <label
                  htmlFor="file-upload"
                  className="upload-zone block border-2 border-dashed border-gold rounded-[10px] p-8 text-center cursor-pointer bg-gold/[0.04] transition-all duration-300 mb-4"
                >
                  <div className="text-[32px] mb-2.5">📁</div>
                  <h4 className="text-sm font-semibold text-navy mb-1">Kéo &amp; thả tệp vào đây</h4>
                  <p className="text-[13px] text-slate-400">
                    Hoặc click để chọn tệp · PDF, JPG, PNG, MP4, MP3
                  </p>
                  <p className="text-[11px] text-slate-400 mt-3.5">Tối đa 50MB mỗi tệp</p>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.mp4,.mp3"
                  className="hidden"
                  onChange={(e) => {
                    const f = Array.from(e.target.files ?? [])
                    setForm((prev) => ({ ...prev, files: f }))
                  }}
                />
                {form.files.length > 0 ? (
                  <div className="mb-5 space-y-2">
                    {form.files.map((file, i) => (
                      <div key={i} className="flex items-center gap-3 bg-cream rounded-lg px-4 py-2.5 text-sm">
                        <span>📄</span>
                        <span className="text-navy font-medium truncate">{file.name}</span>
                        <span className="text-slate-400 text-xs ml-auto">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-[13px] text-slate-400 mb-5">
                    Không có tệp nào được chọn — bạn có thể bỏ qua bước này
                  </p>
                )}

                <div className="flex flex-col gap-3 mt-5">
                  {error && (
                    <p className="text-red-500 text-xs text-center bg-red-50 py-2 rounded-lg border border-red-100">{error}</p>
                  )}
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => setStep(2)}
                      className="bg-cream text-navy border-[1.5px] border-navy/15 rounded-full px-6 py-[15px] text-sm font-semibold cursor-pointer font-sans transition-all duration-300 hover:border-navy flex-shrink-0"
                    >
                      ← Quay lại
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={clsx(
                        "flex-1 bg-red-vss text-white border-none rounded-full py-[15px] text-[15px] font-semibold cursor-pointer font-sans transition-all duration-300 hover:bg-red-light",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Gửi Ký Ức'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — Success */}
            {step === 4 && submitted && (
              <div className="text-center py-6">
                <div className="text-[56px] mb-4">🎉</div>
                <h3 className="font-serif text-[28px] font-bold text-navy mb-2.5">
                  Cảm ơn bạn đã đóng góp!
                </h3>
                <p className="text-sm text-slate-500 max-w-[360px] mx-auto">
                  Ký ức của bạn đã được ghi nhận. Nhóm biên tập Việt Sử Số sẽ liên hệ trong vòng
                  3–5 ngày làm việc.
                </p>
                <div className="bg-cream rounded-[10px] p-[18px_20px] mt-6 text-left">
                  <h5 className="text-[12px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-3">
                    Tiếp Theo Sẽ Xảy Ra
                  </h5>
                  {NEXT_STEPS_LIST.map((s, i) => (
                    <div key={i} className="flex gap-2.5 mb-2 text-sm text-navy">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-[7px]" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleClose}
                  className="mt-6 w-full bg-red-vss text-white border-none rounded-full py-[15px] text-[15px] font-semibold cursor-pointer font-sans transition-all duration-300 hover:bg-red-light"
                >
                  Đóng
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
