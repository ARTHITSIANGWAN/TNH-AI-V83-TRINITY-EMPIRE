// 🌱 [TNH-AI-V83-TRINITY-EMPIRE | DIY-WAF] 🫟

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';
    const path = url.pathname.toLowerCase();

    // 1. DISTINGUISH: Block dangerous paths immediately (The "4xx" Hunter)
    const dangerousPaths = ['/.env', '/.git', '/config.json', '/wp-admin', '/admin'];
    if (dangerousPaths.some(p => path.includes(p))) {
      return new Response('Access Denied: You are being monitored.', { status: 403 });
    }

    // 2. THINK: Block known bot signatures
    if (userAgent.includes('python-requests') || userAgent.includes('sqlmap')) {
      return new Response('Access Denied: Suspicious Agent', { status: 403 });
    }

    // 3. ANALYZE & ROUTE: Send legitimate requests to Go Engine (Port 2026)
    return fetch("http://127.0.0.1:2026" + path, request);
  }
}
// 🫟 [TNH-AI-V83-TRINITY-EMPIRE | END] 🌱
