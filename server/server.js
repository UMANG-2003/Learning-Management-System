import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import courseRoute from "./routes/courseRoute.js";

const app = express()
await connectDB()
await connectCloudinary()

const allowedOrigins = [
  "http://localhost:5173",
  "https://lms-frontend-nu-seven.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(clerkMiddleware()) 

app.get('/', (req, res) => {
  res.send("API is Working")
})

app.post('/clerk', express.json(), clerkWebhooks)

app.use('/api/educator', express.json(), educatorRouter)

app.use("/api/course", courseRoute);

app.use('/api/user', express.json(), userRouter)

app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
