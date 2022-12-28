/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from 'mongodb';

export default async function(connectionString, app){
    const client = new MongoClient(connectionString)

    try{
        await client.connect()
        app.locals.db = client.db("phonicdb")//variable qui permet d'avoir un accès à la base de données
        console.log("Connected to Database")
    } catch(error){
        await client.close()
        throw new Error("Could not connect to database")
    }
}