
# Email Service API (JavaScript)

## Features
- Retry with backoff
- Fallback provider
- Idempotency
- Rate limiting
- Status tracking

## Setup

```bash
npm install express
node src/index.js
```

## API

POST /send

```json
{
  "to": "abc@example.com",
  "subject": "Test",
  "body": "Hello",
  "requestId": "abc123"
}
```

# email-service-js
Mock email sending service with retry, fallback, and tracking

