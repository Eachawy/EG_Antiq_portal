# HTTP Client Configuration

This folder contains the HTTP client configuration with interceptors for making API calls.

## Files

- **http-client.ts** - Axios instance with request/response interceptors
- **api.ts** - API utility class with clean methods (GET, POST, PUT, PATCH, DELETE)
- **api-types.ts** - TypeScript interfaces for API responses
- **example-usage.ts** - Example services showing how to use the API utility

## Setup

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 2. Features

#### Request Interceptor
- Automatically adds authentication token from localStorage
- Adds locale to Accept-Language header
- Logs requests in development mode

#### Response Interceptor
- Logs responses in development mode
- Handles common HTTP errors (401, 403, 404, 500)
- Automatically redirects on unauthorized access
- Provides consistent error handling

## Usage

### Basic Usage

```tsx
import API from '@/config/api'

// GET request
const sites = await API.get('/sites')

// POST request
const newSite = await API.post('/sites', {
  name: 'Pyramids of Giza',
  location: 'Cairo'
})

// PUT request
const updated = await API.put('/sites/123', {
  name: 'Updated Name'
})

// DELETE request
await API.delete('/sites/123')

// Upload files
const formData = new FormData()
formData.append('image', file)
await API.upload('/sites/123/images', formData)
```

### Creating a Service

```tsx
import API from '@/config/api'

interface Site {
  id: string
  name: string
  description: string
}

export class SitesService {
  static async getAll(): Promise<Site[]> {
    return API.get<Site[]>('/sites')
  }

  static async getById(id: string): Promise<Site> {
    return API.get<Site>(`/sites/${id}`)
  }

  static async create(data: Omit<Site, 'id'>): Promise<Site> {
    return API.post<Site>('/sites', data)
  }
}
```

### Using in Components

```tsx
'use client'

import { useEffect, useState } from 'react'
import { SitesService } from '@/services/sites'

export default function SitesPage() {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSites() {
      try {
        const data = await SitesService.getAll()
        setSites(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSites()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {sites.map(site => (
        <div key={site.id}>{site.name}</div>
      ))}
    </div>
  )
}
```

## Authentication

The HTTP client automatically includes the authentication token from localStorage:

```tsx
// Store token after login
localStorage.setItem('auth_token', 'your-jwt-token')

// All subsequent API calls will include:
// Authorization: Bearer your-jwt-token
```

## Error Handling

Errors are automatically handled by the response interceptor:

- **401 Unauthorized** - Clears token and optionally redirects to login
- **403 Forbidden** - Logs access denied
- **404 Not Found** - Logs not found
- **500 Server Error** - Logs server error
- **Network Error** - Logs network issues

## Customization

### Change Base URL

Update the environment variable:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

### Change Timeout

Edit `http-client.ts`:
```tsx
const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds
})
```

### Add Custom Headers

Edit the request interceptor in `http-client.ts`:
```tsx
config.headers['X-Custom-Header'] = 'value'
```
