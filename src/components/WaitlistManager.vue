<template>
  <div class="waitlist-manager">
    <q-card class="manager-card">
      <q-card-section class="manager-header">
        <h2 class="manager-title">Waitlist Manager</h2>
        <p class="manager-subtitle">Manage your waitlist subscribers and data</p>
      </q-card-section>

      <q-card-section class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ stats.totalCount }}</div>
            <div class="stat-label">Total Subscribers</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ stats.completionRate }}%</div>
            <div class="stat-label">Form Completion</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ stats.avgPracticeFreq }}</div>
            <div class="stat-label">Avg Practice/Week</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ stats.topStruggle }}</div>
            <div class="stat-label">Top Struggle</div>
          </div>
        </div>
      </q-card-section>

      <!-- Analytics Section -->
      <q-card-section class="analytics-section">
        <h3 class="analytics-title">User Insights</h3>
        
        <!-- Practice & Match Frequency Charts -->
        <div class="charts-grid">
          <div class="chart-card">
            <h4 class="chart-title">Practice Frequency</h4>
            <div class="frequency-chart">
              <div 
                v-for="(data, freq) in analytics.practiceFrequency" 
                :key="`practice-${freq}`"
                class="frequency-bar"
                v-if="freq !== 'unknown'"
              >
                <div class="bar-label">{{ freq }} times/week</div>
                <div class="bar-container">
                  <div 
                    class="bar-fill practice-bar" 
                    :style="{ width: data.percentage + '%' }"
                  ></div>
                  <span class="bar-text">{{ data.count }} ({{ data.percentage }}%)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-card">
            <h4 class="chart-title">Match Frequency</h4>
            <div class="frequency-chart">
              <div 
                v-for="(data, freq) in analytics.matchFrequency" 
                :key="`match-${freq}`"
                class="frequency-bar"
                v-if="freq !== 'unknown'"
              >
                <div class="bar-label">{{ freq }} times/week</div>
                <div class="bar-container">
                  <div 
                    class="bar-fill match-bar" 
                    :style="{ width: data.percentage + '%' }"
                  ></div>
                  <span class="bar-text">{{ data.count }} ({{ data.percentage }}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Keywords Analysis -->
        <div class="keywords-grid">
          <div class="keywords-card">
            <h4 class="keywords-title">Top Struggles Keywords</h4>
            <div class="keywords-list">
              <span 
                v-for="(count, keyword) in analytics.strugglesKeywords" 
                :key="`struggle-${keyword}`"
                class="keyword-tag struggle-tag"
              >
                {{ keyword }} ({{ count }})
              </span>
            </div>
          </div>

          <div class="keywords-card">
            <h4 class="keywords-title">Top Expectations Keywords</h4>
            <div class="keywords-list">
              <span 
                v-for="(count, keyword) in analytics.expectationsKeywords" 
                :key="`expectation-${keyword}`"
                class="keyword-tag expectation-tag"
              >
                {{ keyword }} ({{ count }})
              </span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="actions-section">
        <div class="action-buttons">
          <q-btn
            label="Export JSON"
            color="primary"
            icon="download"
            @click="exportData('json')"
            class="action-btn"
          />
          <q-btn
            label="Export CSV"
            color="secondary"
            icon="table_chart"
            @click="exportData('csv')"
            class="action-btn"
          />
          <q-btn
            label="Refresh Data"
            color="info"
            icon="refresh"
            @click="refreshData"
            class="action-btn"
          />
          <q-btn
            label="Import JSON"
            color="warning"
            icon="upload"
            @click="importData"
            class="action-btn"
          />
          <q-btn
            label="Clear All Data"
            color="negative"
            icon="delete"
            @click="confirmClear"
            class="action-btn"
          />
        </div>
      </q-card-section>

      <q-card-section class="subscribers-section">
        <h3 class="section-title">Recent Subscribers</h3>
        <div class="subscribers-list">
          <div
            v-for="subscriber in stats.recentEntries"
            :key="subscriber.id"
            class="subscriber-card"
          >
            <div class="subscriber-info">
              <div class="subscriber-name">{{ subscriber.name }}</div>
              <div class="subscriber-email">{{ subscriber.email }}</div>
              <div class="subscriber-meta">
                <span class="subscriber-date">{{ formatDate(subscriber.createdAt) }}</span>
                <span v-if="subscriber.priorityAccess" class="priority-badge">Priority</span>
                <span v-if="subscriber.emailSent || subscriber.status === 'joined'" class="email-sent-badge">Email Sent</span>
              </div>
            </div>
            <div class="subscriber-details">
              <div class="detail-item">
                <strong>Language:</strong> {{ subscriber.language || 'en' }}
              </div>
              <div class="detail-item">
                <strong>Experience:</strong> {{ subscriber.experienceLevel || 'Not specified' }}
              </div>
              <div class="detail-item">
                <strong>Goals:</strong> {{ (subscriber.financialGoals || []).join(', ') || 'None' }}
              </div>
              <div class="detail-item">
                <strong>Features:</strong> {{ (subscriber.futureFeatures || []).join(', ') || 'None' }}
              </div>
              <div class="detail-item" v-if="subscriber.confirmationCode || subscriber.code">
                <strong>Confirmation Code:</strong> {{ subscriber.confirmationCode || subscriber.code }}
              </div>
              <div class="detail-item" v-if="subscriber.mainConcerns">
                <strong>Main Concerns:</strong> {{ subscriber.mainConcerns }}
              </div>
              <div class="detail-item" v-if="subscriber.platformUsage">
                <strong>Platform Usage:</strong> {{ subscriber.platformUsage }}
              </div>
            </div>
            <div class="subscriber-actions" v-if="!subscriber.emailSent && subscriber.status !== 'joined'">
              <q-btn
                label="Mark Email Sent"
                color="positive"
                size="sm"
                outline
                @click="markEmailAsSent(subscriber.id)"
                class="mark-sent-btn"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="analytics-section">
        <h3 class="section-title">Analytics</h3>
        <div class="analytics-grid">
          <div class="analytics-card">
            <h4>Experience Level Distribution</h4>
            <div class="distribution-list">
              <div
                v-for="(count, level) in stats.byExperienceLevel"
                :key="level"
                class="distribution-item"
              >
                <span class="level-name">{{ level }}</span>
                <span class="level-count">{{ count }}</span>
              </div>
            </div>
          </div>
          
          <div class="analytics-card">
            <h4>Financial Goals</h4>
            <div class="distribution-list">
              <div
                v-for="(count, goal) in stats.byFinancialGoals"
                :key="goal"
                class="distribution-item"
              >
                <span class="goal-name">{{ goal.replace('_', ' ').toUpperCase() }}</span>
                <span class="goal-count">{{ count }}</span>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Clear Confirmation Dialog -->
    <q-dialog v-model="showClearDialog">
      <q-card class="confirmation-dialog">
        <q-card-section>
          <div class="text-h6">Clear All Data</div>
          <div class="text-subtitle2">Are you sure you want to clear all waitlist data? This action cannot be undone.</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Clear All" color="negative" @click="clearAllData" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getWaitlistEntries, getWaitlistAnalytics } from '../config/api.js'
import { config, validateConfig } from '../config/env.js'

const API_BASE    = config.API_BASE
const ADMIN_TOKEN = config.ADMIN_TOKEN

// Validate configuration on component mount
onMounted(() => {
  validateConfig()
})

const showClearDialog = ref(false)
const loading = ref(false)
const analytics = ref({})

const waitlistData = ref({ entries: [], lastUpdated: null, totalCount: 0 })
const stats = ref({
  totalCount: 0, 
  emailSentCount: 0, 
  pendingCount: 0, 
  priorityAccessCount: 0,
  lastUpdated: null, 
  recentEntries: [],
  byExperienceLevel: {}, 
  byFinancialGoals: {}
})

async function apiList() {
  const res = await fetch(`${API_BASE}/api/waitlist-list.php`, {
    headers: { 'X-Admin-Token': ADMIN_TOKEN }
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error || 'List failed')
  return data
}
async function apiMarkSent(id) {
  const res = await fetch(`${API_BASE}/api/waitlist-mark-sent.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Token': ADMIN_TOKEN },
    body: JSON.stringify({ id })
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data?.ok) throw new Error(data?.error || 'Mark-sent failed')
  return data
}
async function apiClear() {
  const res = await fetch(`${API_BASE}/api/waitlist-clear.php`, {
    method: 'POST',
    headers: { 'X-Admin-Token': ADMIN_TOKEN }
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data?.ok) throw new Error(data?.error || 'Clear failed')
  return data
}
async function apiImport(entries) {
  const res = await fetch(`${API_BASE}/api/waitlist-import.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Token': ADMIN_TOKEN },
    body: JSON.stringify({ entries })
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data?.ok) throw new Error(data?.error || 'Import failed')
  return data
}

function calculateStats() {
  const entries = waitlistData.value.entries || []
  const byExp = {}, byGoals = {}
  
  entries.forEach(e => {
    const lvl = e.experienceLevel || 'Not specified'
    byExp[lvl] = (byExp[lvl] || 0) + 1
    ;(e.financialGoals || []).forEach(g => { byGoals[g] = (byGoals[g] || 0) + 1 })
  })
  
  // Calculate email sent count based on status or emailSent field
  const emailSentCount = entries.filter(e => 
    e.emailSent === true || 
    e.status === 'joined' || 
    e.status === 'verified'
  ).length
  
  stats.value = {
    totalCount: entries.length,
    emailSentCount: emailSentCount,
    pendingCount: entries.length - emailSentCount,
    priorityAccessCount: entries.filter(e => e.priorityAccess === true).length,
    lastUpdated: waitlistData.value.lastUpdated,
    recentEntries: [...entries].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,10),
    byExperienceLevel: byExp,
    byFinancialGoals: byGoals
  }
}

const refreshData = async () => {
  loading.value = true
  try {
    // Load both waitlist entries and analytics
    const [data, analyticsData] = await Promise.all([
      getWaitlistEntries(),
      getWaitlistAnalytics()
    ])
    
    waitlistData.value = data
    analytics.value = analyticsData
    calculateStats()
  } catch (e) {
    console.error(e)
    // Fallback to old API
    try {
      const data = await apiList()
      waitlistData.value = data
      calculateStats()
    } catch (fallbackErr) {
      console.error('Fallback failed:', fallbackErr)
    }
  } finally {
    loading.value = false
  }
}

const markEmailAsSent = async (entryId) => {
  try {
    await apiMarkSent(entryId)
    await refreshData()
  } catch (e) {
    console.error(e)
  }
}

const confirmClear = () => { showClearDialog.value = true }
const clearAllData = async () => {
  try {
    await apiClear()
    await refreshData()
  } catch (e) {
    console.error(e)
  } finally {
    showClearDialog.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const exportData = (format) => {
  const entries = waitlistData.value.entries || []
  if (format === 'json') {
    const blob = new Blob([JSON.stringify(waitlistData.value, null, 2)], { type:'application/json' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a')
    a.href = url; a.download = `waitlist-data-${new Date().toISOString().slice(0,10)}.json`; a.click()
    URL.revokeObjectURL(url)
  } else {
    const headers = ['ID','Name','Email','Language','LinkedIn','Priority Access','Experience Level','Financial Goals','Future Features','Main Concerns','Platform Usage','Confirmation Code','Status','Email Sent','Created At']
    const rows = entries.map(e=>[
      e.id, 
      `"${e.name||''}"`, 
      e.email, 
      e.language||'', 
      e.linkedin||'',
      e.priorityAccess ? 'Yes':'No', 
      e.experienceLevel||'',
      `"${(e.financialGoals||[]).join('; ')}"`, 
      `"${(e.futureFeatures||[]).join('; ')}"`,
      `"${e.mainConcerns||''}"`,
      `"${e.platformUsage||''}"`,
      e.confirmationCode || e.code || '',
      e.status || '',
      (e.emailSent || e.status === 'joined') ? 'Yes':'No', 
      e.createdAt||''
    ].join(','))
    const blob = new Blob([[headers.join(',')].concat(rows).join('\n')], { type:'text/csv' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a')
    a.href = url; a.download = `waitlist-data-${new Date().toISOString().slice(0,10)}.csv`; a.click()
    URL.revokeObjectURL(url)
  }
}

const importData = () => {
  const input = document.createElement('input'); input.type = 'file'; input.accept = '.json'
  input.onchange = async (e)=>{
    const file = e.target.files?.[0]; if (!file) return
    const text = await file.text()
    try {
      const json = JSON.parse(text)
      const entries = Array.isArray(json.entries) ? json.entries : []
      if (!entries.length) throw new Error('No entries')
      await apiImport(entries)
      await refreshData()
    } catch (err) { console.error('Import error:', err) }
  }
  input.click()
}

onMounted(()=>{ refreshData() })
</script>


<style scoped>
.waitlist-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.manager-card {
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.manager-header {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border-radius: 16px 16px 0 0;
}

.manager-title {
  font-size: 2rem;
  font-weight: 700;
  color: #122E4F;
  margin-bottom: 0.5rem;
}

.manager-subtitle {
  color: #64748B;
  font-size: 1.1rem;
  margin: 0;
}

.stats-section {
  padding: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #122E4F;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748B;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Analytics Section */
.analytics-section {
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
  padding-top: 2rem;
}

.analytics-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

/* Charts */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.frequency-chart {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.frequency-bar {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.bar-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.bar-container {
  position: relative;
  background: #e5e7eb;
  height: 1.5rem;
  border-radius: 0.375rem;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.bar-fill {
  height: 100%;
  border-radius: 0.375rem;
  transition: width 0.5s ease;
}

.practice-bar {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.match-bar {
  background: linear-gradient(90deg, #10b981, #059669);
}

.bar-text {
  position: absolute;
  left: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Keywords */
.keywords-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.keywords-card {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.keywords-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.keyword-tag {
  background: #e5e7eb;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.struggle-tag {
  background: #fef3c7;
  color: #92400e;
}

.expectation-tag {
  background: #d1fae5;
  color: #065f46;
}

/* Responsive */
@media (max-width: 768px) {
  .charts-grid,
  .keywords-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.actions-section {
  padding: 1rem 2rem;
  border-top: 1px solid #E2E8F0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.action-btn {
  min-width: 140px;
}

.subscribers-section,
.analytics-section {
  padding: 2rem;
  border-top: 1px solid #E2E8F0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #122E4F;
  margin-bottom: 1.5rem;
}

.subscribers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.subscriber-card {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.subscriber-info {
  flex: 1;
  margin-bottom: 1rem;
}

.subscriber-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.mark-sent-btn {
  min-width: 120px;
}

.subscriber-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #122E4F;
  margin-bottom: 0.25rem;
}

.subscriber-email {
  color: #64748B;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.subscriber-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.subscriber-date {
  color: #64748B;
  font-size: 0.8rem;
}

.priority-badge {
  background: #26A69A;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.email-sent-badge {
  background: #4CAF50;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.subscriber-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.detail-item {
  font-size: 0.85rem;
  color: #64748B;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.analytics-card {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.analytics-card h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #122E4F;
  margin-bottom: 1rem;
}

.distribution-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.distribution-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #F8FAFC;
  border-radius: 6px;
}

.level-name,
.goal-name {
  font-weight: 500;
  color: #374151;
  text-transform: capitalize;
}

.level-count,
.goal-count {
  background: #122E4F;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.confirmation-dialog {
  min-width: 300px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .waitlist-manager {
    padding: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .subscriber-details {
    grid-template-columns: 1fr;
  }
  
  .analytics-grid {
    grid-template-columns: 1fr;
  }
  
  .subscriber-card {
    flex-direction: column;
    align-items: stretch;
  }
  
  .subscriber-actions {
    margin-top: 1rem;
    justify-content: center;
  }
}
</style>
