import conf from "../conf/conf";
import {Client,ID,Databases,Storage,Query} from 'appwrite'

export class Service{
    client = new Client();
    databses;
    bucket;
    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.databses = new Databases(this.client);
        this.bucket = new Storage(this.client)   
    }


    async createPost({titel,slug,content,content,featuredImage,status,userId}){
        try {
            return this.databses.createDocument(
                conf.appwriteDatbaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    titel,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite servie :: creatpost:: error",error);
        }
    }

    async updatePost(slug,{titel,content,content,featuredImage,status}){
        try {
            return this.databses.updateDocument(
                conf.appwriteDatbaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    titel,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite servie :: updatepost:: error",error);
        }
    }

    async deletePost(slug){
        try {
            return this.databses.deleteDocument(
                conf.appwriteDatbaseId,
                conf.appwriteCollectionId,
                slug
                
            )
            return true;
        } catch (error) {
            console.log("Appwrite servie :: deletepost:: error",error);
            return false;
        }
    }

    async getPost(slug){

        try {
            return await this.databses.getDocument(
                conf.appwriteDatbaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getpost::",error);
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databses.listDocuments(
                conf.appwriteDatbaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getposts::",error);
        }
    }

    //file upoad service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadfile::",error);
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: deletefile::",error);               
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    
}

const service = new Service();
export default service;