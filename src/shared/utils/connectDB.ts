/* eslint-disable no-undef */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

class DBConnection{
    static mongoose =  mongoose;
    static mongod: any;
    static dbUrl = '';

    private static connectForTest = async () => {
        if (process.env.NODE_ENV === 'test') {
            this.mongod = await MongoMemoryServer.create();
            this.dbUrl = this.mongod.getUri();
        }
    }

    static connect = async () => {
        try{
            this.dbUrl = process.env.MONGODB_URL!;
            await this.connectForTest();
            await this.mongoose.connect(this.dbUrl, { connectTimeoutMS: 3000 });
            this.mongoose.connection.once('open', (err) => {
                console.info(`${process.env.APP_NAME} database connected successfully`);
            })
        }catch(err){
            console.error(`Error: ${err}`);
            setTimeout(()=>{
                console.error('...retrying connection to database');
                this.connect();
            }, 5000);
        }
    }

    static close = async () => {
        try {
            await this.mongoose.connection.close();
            if (this.mongod) {
              await this.mongod.stop();
            }
          } catch (err) {
            console.log(err);
            process.exit(1);
          }
    }
}

export default DBConnection;