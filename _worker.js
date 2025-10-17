export default {
  async fetch(request, env, ctx) {
    try {
      // Primero intenta servir el asset estático
      return await env.ASSETS.fetch(request);
    } catch (err) {
      // Fallback SPA: devolver index.html para rutas no encontradas
      const url = new URL(request.url);
      const indexUrl = new URL('/index.html', url.origin);
      return await env.ASSETS.fetch(new Request(indexUrl, request));
    }
  }
};


