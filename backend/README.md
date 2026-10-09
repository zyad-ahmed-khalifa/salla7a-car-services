# Car Services Backend

## Setup
1. Open a terminal inside this `backend` folder.
2. Make sure `.env` exists and contains your MongoDB connection and port.
3. Run:

```bash
npm install
npm start
```

The API runs on port `5000` unless `port` is changed in `.env`.

## Main collections
- User
- cars
- spareParts
- orders
- emergencyRequest

## Emergency API
Base path: `/emergency`

Customer:
- `POST /emergency/create`
- `GET /emergency/get/my`

Technician:
- `GET /emergency/available`
- `PUT /emergency/accept/:id`
- `PUT /emergency/status/:id`

Admin:
- `GET /emergency/all`
- `DELETE /emergency/delete/:id`

Authenticated lookup/edit:
- `GET /emergency/get/:id`
- `PUT /emergency/edit/:id`
