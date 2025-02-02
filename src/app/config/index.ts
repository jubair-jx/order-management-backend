import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT,
  saltKey: process.env.SALT_KEY,
}
