const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export async function analyzePrescription(file) {
  const form = new FormData();
  form.append('prescription', file);
  const response = await fetch(`${API_BASE_URL}/api/ai/analyze-prescription`, {
    method: 'POST',
    body: form,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || payload.error || `Request failed (${response.status})`);
  }
  return payload.data ?? payload;
}

export async function getApiHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) throw new Error('Backend health check failed');
  return response.json();
}


export async function sendSaathiMessage(message, history = []) {
  const response = await fetch(`${API_BASE_URL}/api/saathi/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || payload.error || `Saathi request failed (${response.status})`);
  }
  if (!payload.success || !payload.data?.reply) {
    throw new Error('Saathi returned an unexpected response. Please try again.');
  }
  return payload.data;
}
