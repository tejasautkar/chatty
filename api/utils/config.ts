import "dotenv/config";
export const config = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    isProd: process.env.NODE_ENV === 'production',
    db: {
        url: process.env.NODE_ENV === 'production' ? process.env.MONGODB_STRING : `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.DB_NAME}`,
        name: process.env.DB_NAME
    }
}