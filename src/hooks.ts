import "dotenv/config";
const TOKEN = process.env.MAGIC_WORD;

export async function handle({ event, resolve }) {
  if (event.request.method !== 'GET' && event.request.headers.get("authorization") !== TOKEN) {
    return new Response(null, {status:403, statusText:"You do not have access to do updates"});
  }
  return  await resolve(event);
}