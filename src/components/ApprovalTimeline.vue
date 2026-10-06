<script setup>
import { formatDate, formatTime } from '../utils/date'

defineProps({
  approvals: { type: Array, default: () => [] },
})

const avatarColors = ['#e11d48', '#475569', '#b45309', '#0f766e']

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const pillLabel = { approved: 'Approved', rejected: 'Rejected', pending: 'Pending' }
</script>

<template>
  <ol class="timeline">
    <li v-for="(approval, index) in approvals" :key="approval.id" class="step">
      <span class="node" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="10" height="10">
          <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>

      <article class="approval-card">
        <header class="top">
          <div class="person">
            <img v-if="approval.avatar_url" class="avatar" :src="approval.avatar_url" alt="" />
            <span
              v-else
              class="avatar initials"
              :style="{ background: avatarColors[index % avatarColors.length] }"
            >
              {{ initials(approval.approver_name) }}
            </span>

            <div>
              <p class="role">{{ approval.role }}</p>
              <p class="name">{{ approval.approver_name }}</p>
            </div>
          </div>

          <span class="pill" :class="approval.status">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path
                v-if="approval.status === 'approved'"
                d="M8 12.5l2.7 2.7L16 9.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                v-else-if="approval.status === 'rejected'"
                d="M9 9l6 6M15 9l-6 6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <path v-else d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            {{ pillLabel[approval.status] }}
          </span>
        </header>

        <p v-if="approval.acted_at" class="when">
          <span>
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path d="M4 10h16M9 3v4M15 3v4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            {{ formatDate(approval.acted_at) }}
          </span>
          <span>
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            {{ formatTime(approval.acted_at) }}
          </span>
        </p>

        <template v-if="approval.comment">
          <p class="comment-label">Comment</p>
          <p class="comment">{{ approval.comment }}</p>
        </template>
      </article>
    </li>
  </ol>
</template>

<style scoped>
.timeline {
  position: relative;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 12px;
  bottom: 12px;
  width: 3px;
  background: #111827;
}

.step {
  position: relative;
}

.node {
  position: absolute;
  left: -32px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #111827;
  border: 2px solid var(--card-bg);
}

.approval-card {
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card-bg);
}

.top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.person {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
}

.initials {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}

.role {
  font-size: 11px;
  color: var(--text-muted);
}

.name {
  font-size: 15px;
  font-weight: 600;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

.pill.approved {
  background: var(--success);
}

.pill.rejected {
  background: var(--danger);
}

.pill.pending {
  background: var(--warning);
}

.when {
  display: flex;
  gap: 18px;
  margin-top: 10px;
  font-size: 12px;
  color: var(--text);
}

.when span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.comment-label {
  margin-top: 10px;
  font-weight: 600;
}

.comment {
  margin-top: 4px;
  font-size: 12px;
  font-style: italic;
  color: var(--text-muted);
}
</style>