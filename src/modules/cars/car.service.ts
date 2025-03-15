import { Car } from "./car.interface"
import { CarModel } from "./car.model"





const createCarIntoDB = async (cardata: Car ) =>{
    const result = await CarModel.create(cardata)
    return result; 
}

const getAllCarsInfoFromDB = async (query: Record <string, unknown>) =>{
    
 
    // const queryObj = {...query}


    // let searchTerm= ' '

    // // check searchTerm have or not? 
    // if(query?.searchTerm){
    //     searchTerm = query?.searchTerm as string
    // }


    // const searchField = ["brand", "model", "category"]

    // const searchQuery = CarModel.find({
    //     $or: searchField.map((field)=>(
    //         {
    //             [field]:{$regex:searchTerm, $options:"i"}
    //         }
    //     ))
    // })

    // const excludeFields = ["searchTerm" ]

    // excludeFields.forEach( (el) => delete queryObj[el] )

    // console.log("base query2", query, queryObj);

    
    
    // const result = await searchQuery.find(queryObj)
    
    
    
    
   
    const searchField = ["brand", "model", "category"]

    const result = query? await  CarModel.find({
        $or: 
            searchField.map((field)=>(
                {
                    [field]:{$regex:query.searchTerm, $options:"i"}
                }
            ))
        
    }) : await CarModel.find()
    
    return result; 
}

const getOneCarInfoFromDB = async (id:string) =>{
    const result = await CarModel.findOne({_id:id})
  

    return result;
}

const updatedCarInfoInDB = async(id:string,  updateData:Car) =>{
    const updateInfo = await CarModel.updateOne(
        {_id: id}, 
        {
            $set: {
                brand: updateData.brand, 
                model:  updateData.model, 
                year: updateData.year, 
                price: updateData.price, 
                category:  updateData.category, 
                description:  updateData.description, 
                quantity: updateData.quantity, 
                inStock:  updateData.inStock, 


            }
        }
    )
    const result = await CarModel.findOne({_id:id})
    return result;
    
}

const deleteCarinfoFromDB = async(id:string) =>{
   
    const result = await CarModel.findByIdAndDelete({_id:id})
    return result; 
}



export const carServices = {
    createCarIntoDB,
    getAllCarsInfoFromDB,
    getOneCarInfoFromDB,
    updatedCarInfoInDB,
    deleteCarinfoFromDB
} 