import conf from "../conf/conf";

import {Client,Account,ID} from "appwrite";

export class AuthService{

    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            
            const userAccount = await this.account.create(ID.unique() ,email,password,name)

            if(userAccount){
                // call another method
                return this.login(email,password);
            }else{
                return userAccount;
            }

        } catch (error) {
            console.log("Error in creatAccount ",error );
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            console.log("Error in login  ",error );
            throw error;
        }
    }
    
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite service:getCurrrentUser::error",error);
        }
        return null;
    }

    async logout(){
        try {
            return this.account.deleteSession();
        } catch (error) {
            console.log("appwrite service:logout::error",error);
        }
    }

}
const authService = new AuthService();

export default authService;
