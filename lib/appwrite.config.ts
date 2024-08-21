import * as sdk from 'node-appwrite'
export const {
PROJECT_ID, API_KEY , DATABASE_ID , PATIENT_COLLECTION_ID, DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID, NEXT_PUBLIC_BUCKET_ID: BUCKET_ID , NEXT_PUBLIC_ENDPOINT:ENDPOINT,
}=process.env;


const client= new sdk.Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('668a6643003371d8c5e7')
    .setKey('ef07fb33ca28b134b84ce89758d7f0ee9288e66f16c542f7b21b754da279701f0e20c9f5d7b6095f624b0d33d3bacc9a14faea668336c0c9b63274faa97a35f9a9d4b2ebc1e005bdc596bc334007e02570ef051c99a094f1d38f176e1bef482b529781a9cb5fe6cd9e2cd1965874c2e7144b7500fa547bbad7eaae6b3451f15c');

export const databases= new sdk.Databases(client);
export const storage= new sdk.Storage(client);
export const messaging =new sdk.Messaging(client);
export const users=new sdk.Users(client);


