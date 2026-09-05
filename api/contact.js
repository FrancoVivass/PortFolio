const allowedServices = ['landing', 'institutional', 'catalog', 'system'];

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método no permitido' });
  const body = request.body || {};
  if (body.website) return response.status(200).json({ ok: true });
  if (!body.name || !body.email || !body.message || body.message.length < 20 || !allowedServices.includes(body.service)) {
    return response.status(400).json({ error: 'Datos incompletos' });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return response.status(503).json({ error: 'Servicio no configurado' });
  }

  const record = {
    name: String(body.name).slice(0, 120), company: String(body.company || '').slice(0, 160),
    email: String(body.email).slice(0, 180), phone: String(body.phone || '').slice(0, 80),
    service: body.service, budget: String(body.budget || '').slice(0, 80), deadline: String(body.deadline || '').slice(0, 120),
    message: String(body.message).slice(0, 5000), source: 'portfolio'
  };
  const dbResponse = await fetch(`${process.env.SUPABASE_URL}/rest/v1/portfolio_inquiries`, {
    method: 'POST', headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(record)
  });
  if (!dbResponse.ok) return response.status(500).json({ error: 'No se pudo guardar la consulta' });

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: ['francovivasa@gmail.com'], reply_to: record.email, subject: `Nueva consulta: ${record.service} — ${record.name}`, text: `Nombre: ${record.name}\nEmpresa: ${record.company}\nEmail: ${record.email}\nWhatsApp: ${record.phone}\nServicio: ${record.service}\nFecha: ${record.deadline}\n\n${record.message}` })
  });
  if (!emailResponse.ok) return response.status(500).json({ error: 'La consulta se guardó, pero falló la notificación' });
  return response.status(200).json({ ok: true });
}
