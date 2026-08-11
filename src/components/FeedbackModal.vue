<script setup>
import { ref, computed } from 'vue'
import { supabase, isSupabaseConfigured } from '../supabase'

const props = defineProps({
  userEmail: { type: String, default: '' },
  userName: { type: String, default: '' },
  slideNumber: { type: Number, default: 0 },
  slideFile: { type: String, default: '' }
})

const emit = defineEmits(['close'])

const feedbackText = ref('')
const status = ref('idle')   // idle | submitting | success | error
const errorMsg = ref('')

const canSubmit = computed(() => feedbackText.value.trim().length > 0 && status.value !== 'submitting')

async function submitFeedback() {
  if (!canSubmit.value) return

  if (!isSupabaseConfigured) {
    status.value = 'error'
    errorMsg.value = 'Supabase environment variables are missing or unconfigured. Please restart your dev server.'
    return
  }

  status.value = 'submitting'
  errorMsg.value = ''

  const payload = {
    user_email: props.userEmail || 'anonymous',
    user_name: props.userName || 'Anonymous',
    slide_number: props.slideNumber || 1,
    slide_file: props.slideFile || '',
    feedback_text: feedbackText.value.trim()
  }

  console.log('[FeedbackModal] Submitting payload to Supabase:', payload)

  try {
    const { data, error } = await supabase.from('feedback').insert(payload)

    if (error) {
      console.error('[FeedbackModal] Supabase Insert Error:', error)
      throw error
    }

    console.log('[FeedbackModal] Insert successful:', data)
    status.value = 'success'
    feedbackText.value = ''

    // Auto-close after brief success message
    setTimeout(() => emit('close'), 3000)
  } catch (err) {
    console.error('[FeedbackModal] Caught Error:', err)
    status.value = 'error'
    if (err?.message?.includes('Failed to fetch') || err?.name === 'TypeError') {
      errorMsg.value = 'Network error reaching Supabase. Please check internet or restart dev server (npm run dev).'
    } else {
      errorMsg.value = err?.message || 'Something went wrong. Please try again.'
    }
  }
}

function handleBackdropClick() {
  if (status.value !== 'submitting') emit('close')
}
</script>

<template>
  <transition name="fb-fade">
    <div class="fb-backdrop" @click.self="handleBackdropClick">
      <div class="fb-modal" @click.stop>
        <!-- Header -->
        <div class="fb-header">
          <div class="fb-header-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fb-header-icon">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span class="fb-title">Report issues</span>
          </div>
          <button class="fb-close-btn" @click="emit('close')" :disabled="status === 'submitting'" title="Close">
            &times;
          </button>
        </div>

        <!-- Context badge -->
        <div class="fb-context">
          <span class="fb-context-label">Slide {{ slideNumber }}</span>
          <span class="fb-context-sep">&middot;</span>
          <span class="fb-context-user">{{ userName || userEmail }}</span>
        </div>

        <!-- Body -->
        <div class="fb-body">
          <!-- Success state -->
          <div v-if="status === 'success'" class="fb-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="fb-success-icon">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>Thank you for your feedback!</span>
          </div>

          <!-- Form state -->
          <template v-else>
            <textarea
              v-model="feedbackText"
              class="fb-textarea"
              placeholder="Share suggestions, report issues, or tell us what you liked..."
              rows="5"
              :disabled="status === 'submitting'"
              @keydown.meta.enter="submitFeedback"
              @keydown.ctrl.enter="submitFeedback"
            ></textarea>

            <!-- Error message -->
            <div v-if="status === 'error'" class="fb-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fb-error-icon">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ errorMsg }}
            </div>

            <!-- Footer -->
            <div class="fb-footer">
              <span class="fb-hint">⌘+Enter to submit</span>
              <div class="fb-actions">
                <button class="fb-cancel-btn" @click="emit('close')" :disabled="status === 'submitting'">Cancel</button>
                <button class="fb-submit-btn" @click="submitFeedback" :disabled="!canSubmit">
                  <svg v-if="status === 'submitting'" class="fb-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="31.4 31.4" stroke-linecap="round"/>
                  </svg>
                  <span v-if="status === 'submitting'">Sending...</span>
                  <span v-else>Submit</span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* ── Backdrop ─────────────────────────────────────────────────────────────── */
.fb-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* ── Modal ────────────────────────────────────────────────────────────────── */
.fb-modal {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18), 0 1px 3px rgba(0, 0, 0, 0.06);
  width: 390px;
  max-width: 92vw;
  overflow: hidden;
  animation: fb-pop 0.22s ease-out;
}

@keyframes fb-pop {
  from { transform: scale(0.92) translateY(8px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
}

/* ── Header ───────────────────────────────────────────────────────────────── */
.fb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 8px;
  border-bottom: 1px solid #f1f5f9;
}

.fb-header-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.fb-header-icon {
  width: 14px;
  height: 14px;
  color: #ef5050;
}

.fb-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1e293b;
  font-family: 'Inter', system-ui, sans-serif;
}

.fb-close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #94a3b8;
  cursor: pointer;
  padding: 0 3px;
  border-radius: 4px;
  transition: color 0.15s;
  line-height: 1;
}

.fb-close-btn:hover { color: #ef4444; }
.fb-close-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Context Badge ────────────────────────────────────────────────────────── */
.fb-context {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  background: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.65rem;
  font-weight: 500;
  color: #64748b;
  font-family: 'Inter', system-ui, sans-serif;
}

.fb-context-label {
  background: #ef505015;
  color: #ef5050;
  padding: 1px 6px;
  border-radius: 3px;
  font-weight: 600;
}

.fb-context-sep { color: #cbd5e1; }

/* ── Body ─────────────────────────────────────────────────────────────────── */
.fb-body {
  padding: 12px 14px 14px;
}

.fb-textarea {
  width: 100%;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.75rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #1e293b;
  background: #ffffff;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.fb-textarea:focus {
  outline: none;
  border-color: #ef5050;
  box-shadow: 0 0 0 3px rgba(239, 80, 80, 0.1);
}

.fb-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.fb-textarea::placeholder { color: #94a3b8; }

/* ── Footer ───────────────────────────────────────────────────────────────── */
.fb-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.fb-hint {
  font-size: 0.62rem;
  color: #94a3b8;
  font-family: 'Inter', system-ui, sans-serif;
}

.fb-actions {
  display: flex;
  gap: 6px;
}

.fb-cancel-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #475569;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Inter', system-ui, sans-serif;
}

.fb-cancel-btn:hover { background: #e2e8f0; }
.fb-cancel-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.fb-submit-btn {
  background: #ef5050;
  border: none;
  color: #ffffff;
  padding: 5px 14px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Inter', system-ui, sans-serif;
  box-shadow: 0 1px 3px rgba(239, 80, 80, 0.3);
}

.fb-submit-btn:hover:not(:disabled) { filter: brightness(1.08); }

.fb-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Spinner ──────────────────────────────────────────────────────────────── */
.fb-spinner {
  width: 12px;
  height: 12px;
  animation: fb-spin 0.8s linear infinite;
}

@keyframes fb-spin { to { transform: rotate(360deg); } }

/* ── Success ──────────────────────────────────────────────────────────────── */
.fb-success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 22px 14px;
  color: #16a34a;
  font-size: 0.78rem;
  font-weight: 600;
  font-family: 'Inter', system-ui, sans-serif;
}

.fb-success-icon {
  width: 18px;
  height: 18px;
  color: #16a34a;
}

/* ── Error ────────────────────────────────────────────────────────────────── */
.fb-error {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
  padding: 6px 10px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #dc2626;
  font-size: 0.68rem;
  font-weight: 500;
  font-family: 'Inter', system-ui, sans-serif;
}

.fb-error-icon {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

/* ── Transition ───────────────────────────────────────────────────────────── */
.fb-fade-enter-active,
.fb-fade-leave-active {
  transition: opacity 0.2s ease;
}
.fb-fade-enter-from,
.fb-fade-leave-to {
  opacity: 0;
}
</style>
