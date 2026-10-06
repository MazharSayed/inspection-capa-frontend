const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: 'UTC',
})

export const formatDate = (iso) => (iso ? dateFormat.format(new Date(iso)) : '-')

export const formatTime = (iso) => (iso ? timeFormat.format(new Date(iso)).replace(' ', '') : '-')