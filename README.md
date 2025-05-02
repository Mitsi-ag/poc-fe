# RealtyMate API Documentation

This document provides a comprehensive guide to the API endpoints for the RealtyMate application. It is designed for backend developers who need to implement these endpoints in a production environment.

## Overview

RealtyMate's frontend is built with Next.js and currently uses a mock API implementation with static data. This document outlines the expected behavior and data structures for each endpoint to facilitate a smooth transition to a real backend.

## Authentication

All API endpoints should require authentication except for public pages (landing, login, signup). The authentication method should be JWT-based with the token provided in the Authorization header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## API Endpoints

### Listings

#### GET /api/listings

Fetches a list of property listings with filtering, sorting, and pagination.

**Query Parameters:**

- `suburb` (string): Filter by suburb name
- `propertyType` (string): Filter by property type (house, apartment, townhouse, land, other)
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `minBedrooms` (number): Minimum number of bedrooms
- `minBathrooms` (number): Minimum number of bathrooms
- `status` (string): Filter by status (active, under-offer, sold, leased, withdrawn)
- `agentId` (string): Filter by agent ID
- `agencyId` (string): Filter by agency ID
- `limit` (number): Number of results per page
- `offset` (number): Pagination offset

**Response:**
\`\`\`json
{
"data": [
{
"id": "string",
"address": "string",
"suburb": "string",
"state": "string",
"postcode": "string",
"price": "number",
"bedrooms": "number",
"bathrooms": "number",
"carSpaces": "number",
"propertyType": "string",
"features": ["string"],
"description": "string",
"agentId": "string",
"agencyId": "string",
"status": "string",
"listingDate": "string (ISO date)",
"lastUpdated": "string (ISO date)",
"inspectionTimes": ["string (ISO date)"],
"images": ["string (URL)"],
"floorplanUrl": "string (URL)",
"videoUrl": "string (URL)",
"latitude": "number",
"longitude": "number"
}
],
"meta": {
"total": "number",
"limit": "number",
"offset": "number",
"count": "number"
}
}
\`\`\`

#### GET /api/listings/:id

Fetches a single listing by ID.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Same structure as individual listing above
}
}
\`\`\`

#### POST /api/listings

Creates a new listing.

**Request Body:** Listing object without ID, listingDate, and lastUpdated fields.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Created listing with ID and timestamps
}
}
\`\`\`

#### PUT /api/listings/:id

Updates an existing listing.

**Request Body:** Partial listing object with fields to update.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Updated listing
}
}
\`\`\`

#### DELETE /api/listings/:id

Deletes a listing.

**Response:**
\`\`\`json
{
"success": true,
"message": "Listing successfully deleted"
}
\`\`\`

### Agents

#### GET /api/agents

Fetches a list of agents with filtering options.

**Query Parameters:**

- `agencyId` (string): Filter by agency ID
- `name` (string): Search by agent name
- `area` (string): Filter by area of operation
- `specialization` (string): Filter by specialization
- `limit` (number): Number of results per page
- `offset` (number): Pagination offset

**Response:**
\`\`\`json
{
"data": [
{
"id": "string",
"name": "string",
"email": "string",
"phone": "string",
"photo": "string (URL)",
"bio": "string",
"agencyId": "string",
"position": "string",
"licenseNumber": "string",
"specializations": ["string"],
"areas": ["string"],
"languages": ["string"],
"socialMedia": {
"linkedin": "string (URL)",
"facebook": "string (URL)",
"instagram": "string (URL)",
"twitter": "string (URL)"
},
"stats": {
"totalSales": "number",
"averageDaysOnMarket": "number",
"listingsCount": "number",
"totalValue": "number"
}
}
],
"meta": {
"total": "number",
"limit": "number",
"offset": "number",
"count": "number"
}
}
\`\`\`

#### GET /api/agents/:id

Fetches a single agent by ID.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Same structure as individual agent above
}
}
\`\`\`

### Agencies

#### GET /api/agencies

Fetches a list of agencies with filtering options.

**Query Parameters:**

- `name` (string): Search by agency name
- `area` (string): Filter by area of operation
- `specialization` (string): Filter by specialization
- `limit` (number): Number of results per page
- `offset` (number): Pagination offset

**Response:**
\`\`\`json
{
"data": [
{
"id": "string",
"name": "string",
"logo": "string (URL)",
"address": "string",
"suburb": "string",
"state": "string",
"postcode": "string",
"phone": "string",
"email": "string",
"website": "string (URL)",
"description": "string",
"establishedYear": "number",
"areas": ["string"],
"specializations": ["string"],
"socialMedia": {
"facebook": "string (URL)",
"instagram": "string (URL)",
"linkedin": "string (URL)",
"twitter": "string (URL)"
}
}
],
"meta": {
"total": "number",
"limit": "number",
"offset": "number",
"count": "number"
}
}
\`\`\`

#### GET /api/agencies/:id

Fetches a single agency by ID.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Same structure as individual agency above
}
}
\`\`\`

### Users

#### GET /api/users

Fetches a list of users with filtering options.

**Query Parameters:**

- `agencyId` (string): Filter by agency ID
- `role` (string): Filter by role (agent, admin, manager)
- `name` (string): Search by user name
- `limit` (number): Number of results per page
- `offset` (number): Pagination offset

**Response:**
\`\`\`json
{
"data": [
{
"id": "string",
"name": "string",
"email": "string",
"role": "string",
"agentId": "string",
"agencyId": "string",
"avatar": "string (URL)",
"phone": "string",
"created": "string (ISO date)",
"lastLogin": "string (ISO date)",
"preferences": {
"darkMode": "boolean",
"emailNotifications": "boolean",
"pushNotifications": "boolean",
"defaultDashboard": "string",
"defaultListingView": "string"
},
"subscription": {
"plan": "string",
"status": "string",
"expiresAt": "string (ISO date)"
}
}
],
"meta": {
"total": "number",
"limit": "number",
"offset": "number",
"count": "number"
}
}
\`\`\`

#### GET /api/users/:id

Fetches a single user by ID.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Same structure as individual user above
}
}
\`\`\`

#### PUT /api/users/:id

Updates an existing user.

**Request Body:** Partial user object with fields to update.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Updated user
}
}
\`\`\`

### Calendar

#### GET /api/calendar

Fetches a list of calendar events with filtering options.

**Query Parameters:**

- `userId` (string): Filter by user ID
- `startDate` (string): Filter by start date (ISO format)
- `endDate` (string): Filter by end date (ISO format)
- `type` (string): Filter by event type
- `status` (string): Filter by status
- `listingId` (string): Filter by listing ID

**Response:**
\`\`\`json
{
"success": true,
"data": [
{
"id": "string",
"title": "string",
"description": "string",
"start": "string (ISO date)",
"end": "string (ISO date)",
"allDay": "boolean",
"location": "string",
"type": "string",
"status": "string",
"color": "string",
"userId": "string",
"listingId": "string",
"contactIds": ["string"],
"recurrence": {
"frequency": "string",
"interval": "number",
"endDate": "string (ISO date)",
"count": "number",
"weekDays": ["number"]
},
"reminders": [
{
"time": "number",
"type": "string"
}
],
"notes": "string",
"private": "boolean",
"externalCalendarId": "string",
"createdAt": "string (ISO date)",
"updatedAt": "string (ISO date)"
}
]
}
\`\`\`

#### GET /api/calendar/:id

Fetches a single calendar event by ID.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Same structure as individual event above
}
}
\`\`\`

#### POST /api/calendar

Creates a new calendar event.

**Request Body:** Calendar event object without ID, createdAt, and updatedAt fields.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Created event with ID and timestamps
}
}
\`\`\`

#### PUT /api/calendar/:id

Updates an existing calendar event.

**Request Body:** Partial calendar event object with fields to update.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Updated event
}
}
\`\`\`

#### DELETE /api/calendar/:id

Deletes a calendar event.

**Response:**
\`\`\`json
{
"success": true,
"message": "Event successfully deleted"
}
\`\`\`

### Contacts

#### GET /api/contacts

Fetches a list of contacts with filtering, sorting, and pagination.

**Query Parameters:**

- `assignedTo` (string): Filter by user ID (assigned to)
- `agencyId` (string): Filter by agency ID
- `type` (string): Filter by contact type
- `stage` (string): Filter by stage
- `search` (string): Search in name, email, phone
- `tag` (string): Filter by tag
- `limit` (number): Number of results per page
- `offset` (number): Pagination offset

**Response:**
\`\`\`json
{
"data": [
{
"id": "string",
"type": "string",
"firstName": "string",
"lastName": "string",
"email": "string",
"phone": "string",
"address": "string",
"suburb": "string",
"state": "string",
"postcode": "string",
"notes": "string",
"source": "string",
"stage": "string",
"assignedTo": "string",
"agencyId": "string",
"tags": ["string"],
"preferences": {
"propertyTypes": ["string"],
"minPrice": "number",
"maxPrice": "number",
"minBedrooms": "number",
"minBathrooms": "number",
"locations": ["string"],
"features": ["string"]
},
"history": [
{
"id": "string",
"date": "string (ISO date)",
"type": "string",
"description": "string",
"listingId": "string"
}
],
"created": "string (ISO date)",
"updated": "string (ISO date)",
"lastContact": "string (ISO date)",
"nextFollowUp": "string (ISO date)"
}
],
"meta": {
"total": "number",
"limit": "number",
"offset": "number",
"count": "number"
}
}
\`\`\`

#### GET /api/contacts/:id

Fetches a single contact by ID.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Same structure as individual contact above
}
}
\`\`\`

#### POST /api/contacts

Creates a new contact.

**Request Body:** Contact object without ID, created, and updated fields.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Created contact with ID and timestamps
}
}
\`\`\`

#### PUT /api/contacts/:id

Updates an existing contact.

**Request Body:** Partial contact object with fields to update.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Updated contact
}
}
\`\`\`

#### DELETE /api/contacts/:id

Deletes a contact.

**Response:**
\`\`\`json
{
"success": true,
"message": "Contact successfully deleted"
}
\`\`\`

### Competitors

#### GET /api/competitors

Fetches a list of competitors with filtering options.

**Query Parameters:**

- `agencyId` (string): Filter by agency ID
- `area` (string): Filter by area of operation
- `specialization` (string): Filter by specialization
- `strength` (string): Filter by strength level

**Response:**
\`\`\`json
{
"success": true,
"data": [
{
"id": "string",
"name": "string",
"agencyId": "string",
"logo": "string (URL)",
"location": "string",
"website": "string (URL)",
"phone": "string",
"email": "string",
"establishedYear": "number",
"size": "string",
"marketShare": "number",
"areas": ["string"],
"specializations": ["string"],
"strength": "string",
"topAgents": [
{
"name": "string",
"photo": "string (URL)",
"specialization": "string",
"recentSales": "number",
"averageSalePrice": "number"
}
],
"recentListings": [
{
"address": "string",
"price": "number",
"listedDate": "string (ISO date)",
"status": "string",
"soldDate": "string (ISO date)",
"soldPrice": "number",
"daysOnMarket": "number",
"link": "string (URL)"
}
],
"marketingStrategies": ["string"],
"notes": "string"
}
]
}
\`\`\`

#### GET /api/competitors/:id

Fetches a single competitor by ID.

**Response:**
\`\`\`json
{
"success": true,
"data": {
// Same structure as individual competitor above
}
}
\`\`\`

## Page-Specific Backend Requirements

### Dashboard Page

- Requires: User data, listing metrics, recent listings, calendared events for the day, lead metrics
- Endpoints: `/api/users/:id`, `/api/listings` (with filters), `/api/calendar`, `/api/contacts` (with stage filter)
- Performance considerations: Cache dashboard metrics for faster load times

### Listings Page

- Requires: All listings with filtering, sorting, map data
- Endpoints: `/api/listings` with comprehensive filtering
- Performance considerations: Implement pagination, consider using geospatial indexing for map performance

### Calendar Page

- Requires: All calendar events for a user or agency, recurring events
- Endpoints: `/api/calendar` with date range filtering
- Performance considerations: Implement efficient handling of recurring events, batch loading for date ranges

### CRM Page

- Requires: Contacts, lead and client management, history tracking
- Endpoints: `/api/contacts` with filtering, history updates
- Performance considerations: Implement activity logging, consider webhooks for real-time updates

### Competitors Page

- Requires: Competitor data, market analysis, recent competitor listings
- Endpoints: `/api/competitors`, external data integrations
- Performance considerations: Schedule regular updates from external sources, cache analysis data

### AI Assistant Page

- Requires: Access to all data types for AI analysis
- Endpoints: All endpoints plus additional AI-specific endpoints
- Performance considerations: Implement middleware for AI processing, consider privacy/security filters for data access

### Settings Page

- Requires: User preferences, agency settings, subscription management
- Endpoints: `/api/users/:id` (PUT)
- Performance considerations: Validate settings changes, implement permission checks

## Database Recommendations

The API structure is designed to work well with:

- PostgreSQL for relational data (users, listings, contacts)
- MongoDB for flexible schema data (AI analysis, market reports)
- Redis for caching and real-time features

## Security Considerations

- Implement role-based access control (RBAC) for all endpoints
- Sanitize all user inputs to prevent injection attacks
- Use HTTPS for all API communications
- Implement rate limiting to prevent abuse
- Consider data privacy regulations (GDPR, CCPA) for user data handling

## Deployment Recommendations

- Use containerization (Docker) for consistent environments
- Implement CI/CD for automated testing and deployment
- Consider a microservices architecture for scalability
- Use a CDN for static assets and image caching

## Development Process

1. Begin with database schema design based on the data structures in this document
2. Implement authentication and basic CRUD operations
3. Add business logic and filtering capabilities
4. Integrate with external services (calendar syncing, email providers)
5. Implement search functionality with full-text search
6. Add analytics and reporting capabilities
7. Perform load testing and optimization

## Monitoring and Maintenance

- Implement comprehensive logging for debugging
- Set up performance monitoring
- Create automated backups
- Establish an error tracking system
- Develop a regular update schedule for dependencies

## Conclusion

This document provides a foundation for implementing the backend services required by the RealtyMate application. While the frontend currently uses mock data, transitioning to a real backend following these specifications should be straightforward.

For any questions or clarifications, please contact the development team.
