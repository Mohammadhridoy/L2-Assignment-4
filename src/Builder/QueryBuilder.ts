import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>){
        this.modelQuery=modelQuery
        this.query=query
    }

    search(searchableFields:string[] ){
        const searchTerm = this?.query?.searchTerm
        if(searchTerm){
            this.modelQuery = this.modelQuery.find({
                $or:  searchableFields.map((field)=>({
                    [field]:{$regex: searchTerm, $options:'i'}
                }) as FilterQuery<T>
            )
            })
        }
        return this
    }


    // Filtering
    filter(){
        const queryObj = {...this.query}
        const excludeFields = ["searchTerm" ]


        excludeFields.forEach( (el) => delete queryObj[el] )

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
        return this
    }

    // price
    price(){
        
        if(this?.query?.price){
            
            const value = (this?.query?.price as string).split('-')
            
            const field = value.map(Number)
            
        
        this.modelQuery = this.modelQuery.find({
            price:{$gte:field[0] , $lte:field[1]}
        })



        }
        return this

        
    }


    



}

export default QueryBuilder