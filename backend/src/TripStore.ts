export class TripStore {
  state: DurableObjectState;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Save trip data
      if (path === '/save' && request.method === 'POST') {
        const trip = await request.json();
        await this.state.storage.put('trip', trip);
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Get trip data
      if (path === '/get' && request.method === 'GET') {
        const trip = await this.state.storage.get('trip');
        
        return new Response(JSON.stringify(trip || {}), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Delete trip data
      if (path === '/delete' && request.method === 'DELETE') {
        await this.state.storage.deleteAll();
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }
}
