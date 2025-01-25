import conf from "../conf/conf.js";
import {Client, Account, ID} from 'appwrite'

// we have export AuthService class.
export class AuthService {
    client = new Client()
    account

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)  
            .setProject( conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
        // create Account method 
     async createAccount({email, password, name}){
        try {
            // here it is compulsory to pass unique id.
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                //call another method
                return this.login({email, password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            // throw error
            console.log("appwrite error :: creating account error", error);
            
            
        }
     }

    //  login method
     async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
            
        } catch (error) {
            // throw error
            console.log("appwrite error :: login method error", error);
            
            
        }
     }
        

    //  current user is login or not
     async getCurrentUser(){
        try {
            return await this.account.get()         
        } catch (error) {           
            console.log("appwrite service :: getCurrentUser :: error", error);                
        }

        return null
     }
     
                                    // logout method
     async logout(){
        try {
            await this.account.deleteSessions()
            
        } catch (error) {
            console.log("appwrite service :: logout :: error", error);
            
            
        }
     }

}


const authService = new AuthService()

// we have have export authService so anyone can access as object
export default authService