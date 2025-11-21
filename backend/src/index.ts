import { TripStore } from './TripStore';

export { TripStore };

interface Env {
  TRIP_STORE: DurableObjectNamespace;
}

interface Trip {
  id?: string;
  title: string;
  destination: string;
  country: string;
  notes?: string;
  startDate: string;
  endDate: string;
  flexible: boolean;
  totalBudget: number;
  expenses: Array<{ id: string; name: string; amount: number }>;
  activities: Array<{
    id: string;
    title: string;
    day?: number;
    cost?: number;
    notes?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

function jsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}

function errorResponse(message: string, status = 500): Response {
  return jsonResponse({ error: message }, status);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // POST /trip - Create new trip
      if (path === '/trip' && request.method === 'POST') {
        const tripData: Trip = await request.json();
        
        // Validate required fields
        if (!tripData.title || !tripData.destination || !tripData.country) {
          return errorResponse('Missing required fields', 400);
        }

        const id = crypto.randomUUID();
        const durableId = env.TRIP_STORE.idFromName(id);
        const stub = env.TRIP_STORE.get(durableId);

        const now = new Date().toISOString();
        const trip: Trip = {
          ...tripData,
          id,
          createdAt: now,
          updatedAt: now,
        };

        await stub.fetch('http://internal/save', {
          method: 'POST',
          body: JSON.stringify(trip),
        });

        return jsonResponse({ id, message: 'Trip created successfully' }, 201);
      }

      // GET /trip/:id - Get trip by ID
      if (path.startsWith('/trip/') && request.method === 'GET') {
        const id = path.split('/')[2];
        
        if (!id) {
          return errorResponse('Trip ID required', 400);
        }

        const durableId = env.TRIP_STORE.idFromName(id);
        const stub = env.TRIP_STORE.get(durableId);

        const response = await stub.fetch('http://internal/get');
        const trip = await response.json();

        if (!trip || Object.keys(trip).length === 0) {
          return errorResponse('Trip not found', 404);
        }

        return jsonResponse(trip);
      }

      // PUT /trip/:id - Update trip
      if (path.startsWith('/trip/') && request.method === 'PUT') {
        const id = path.split('/')[2];
        
        if (!id) {
          return errorResponse('Trip ID required', 400);
        }

        const tripData: Trip = await request.json();
        const durableId = env.TRIP_STORE.idFromName(id);
        const stub = env.TRIP_STORE.get(durableId);

        // Check if trip exists
        const existingResponse = await stub.fetch('http://internal/get');
        const existingTrip = await existingResponse.json();

        if (!existingTrip || Object.keys(existingTrip).length === 0) {
          return errorResponse('Trip not found', 404);
        }

        const updatedTrip: Trip = {
          ...tripData,
          id,
          createdAt: existingTrip.createdAt,
          updatedAt: new Date().toISOString(),
        };

        await stub.fetch('http://internal/save', {
          method: 'POST',
          body: JSON.stringify(updatedTrip),
        });

        return jsonResponse({ 
          message: 'Trip updated successfully',
          trip: updatedTrip 
        });
      }

      // DELETE /trip/:id - Delete trip
      if (path.startsWith('/trip/') && request.method === 'DELETE') {
        const id = path.split('/')[2];
        
        if (!id) {
          return errorResponse('Trip ID required', 400);
        }

        const durableId = env.TRIP_STORE.idFromName(id);
        const stub = env.TRIP_STORE.get(durableId);

        await stub.fetch('http://internal/delete', { method: 'DELETE' });

        return jsonResponse({ message: 'Trip deleted successfully' });
      }

      // GET /health - Health check
      if (path === '/health' && request.method === 'GET') {
        return jsonResponse({ 
          status: 'ok', 
          timestamp: new Date().toISOString() 
        });
      }

      return errorResponse('Not Found', 404);
    } catch (error) {
      console.error('Error:', error);
      return errorResponse(
        error instanceof Error ? error.message : 'Internal Server Error',
        500
      );
    }
  },
};
