export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const validUser = process.env.AUTH_USER || 'admin';
    const validPassword = process.env.AUTH_PASSWORD || 'orangepeel2025';

    if (user === validUser && pwd === validPassword) {
      return new Response(null, {
        status: 200,
        headers: { 'x-middleware-next': '1' },
      });
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
