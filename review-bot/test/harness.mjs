import worker from '../dist/index.js'
export default {
  async fetch(request, env) {
    const tasks = []
    const context = { waitUntil(promise) { tasks.push(promise) } }
    const response = new URL(request.url).pathname === '/test-tick'
      ? (await worker.scheduled({}, env, context), new Response('OK'))
      : await worker.fetch(request, env, context)
    await Promise.all(tasks)
    return response
  },
}
