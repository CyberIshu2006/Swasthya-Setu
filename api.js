javascript
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  'https://medlink-8vbl.onrender.com'
).replace(/\/$/, '');

async function apiRequest(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  } catch {
    throw new Error(
      'Cannot connect to the server. Please check your internet connection or try again later.'
    );
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      payload.message ||
      payload.error ||
      `Request failed (${response.status})`
    );
  }

  return payload;
}

// Check backend health
export async function getApiHealth() {
  return apiRequest('/api/health');
}

// Saathi health assistant
export async function sendSaathiMessage(message, history = []) {
  if (!message || !message.trim()) {
    throw new Error('Please enter a message.');
  }

  const payload = await apiRequest('/api/saathi/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message.trim(),
      history,
    }),
  });

  const data = payload.data ?? payload;

  if (!data.reply) {
    throw new Error(
      'Saathi could not generate a response. Please try again.'
    );
  }

  return data;
}

// Prescription analysis
export async function analyzePrescription(file) {
  if (!file) {
    throw new Error('Please select a prescription file.');
  }

  const form = new FormData();
  form.append('prescription', file);

  const payload = await apiRequest(
    '/api/ai/analyze-prescription',
    {
      method: 'POST',
      body: form,
    }
  );

  return payload.data ?? payload;
}

