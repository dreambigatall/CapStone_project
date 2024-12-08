import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

export async function getCars(){

    const {data, error} = await supabase.from("cars").select('*');

    if(error){
        console.log(error);
        throw new Error("Cabines could not loaded")
    }
    return data;
}

// export async function createEditCar(newCar, id){
//     const hasImagePath = newCar.image?.startWith?.(supabaseUrl)

//     const imageName = `${Math.random()}-${newCar.image.name}`.replaceAll("/","");
//   console.log("from",newCar.image.name)
//     const imagePath = hasImagePath 
//     ? newCar.image
//     : `${supabaseUrl}/storage/v1/object/public/car-image/${imageName}`;

//     //1, Create or edit cars

//     let query = supabase.from("cars")

//     //A Create the cars data

//     if(!id) query = query.insert([{...newCar,image:imagePath}]);

//     //Edit the cars tabel

//     if(id) query = query.update([{...newCar,image:imageName}]).eq("id",id);

//     const {data, error }= await query.select().single();

//     if(error){
//         console.log(error)
//         throw new Error("Cars could not created")
//     }

//     //2 upload the image for the cars

//     if(hasImagePath) return data;
   
//     const {error:storageError}= await supabase.storage
//     .from("car-image")
//     .upload(imageName,newCar.image);

//     //3 Delete the cars ifthere was an erro uploading the image

//     // if(storageError){
//     //     await supabase.from("cars").delete().eq("id", data.id);
//     //     console.log(storageError);
//     //     throw new Error(
//     //         "Cabines could not be uploaded and the cabin was not created"
//     //     );
//     // }
//     return data;

// }

export async function createEditCar(newCar, id) {
    const isFile = newCar.image instanceof File;

    if (!newCar.image) {
        console.error("No image provided:", newCar.image);
        throw new Error("The image is missing.");
    }

    // Generate a unique file name using UUID
    const fileName = isFile
        ? `${Math.random()}-${uuidv4()}.${newCar.image.name.split('.').pop()}`
        : null;

    const imagePath = isFile
        ? `${supabaseUrl}/storage/v1/object/public/car-image/${fileName}`
        : newCar.image; // Use the URL directly if it's not a File

    // Create or edit car in the database
    let query = supabase.from("cars");

    // A) Insert new car
    if (!id) query = query.insert([{ ...newCar, image: imagePath }]);

    // B) Update existing car
    if (id) query = query.update({ ...newCar, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();
    if (error) {
        console.error("Error creating/editing car:", error);
        throw new Error("Car could not be created or updated.");
    }

    // Upload the image to Supabase storage if it's a file
    if (isFile) {
        const { error: storageError } = await supabase.storage
            .from("car-image")
            .upload(fileName, newCar.image);

        if (storageError) {
            // Delete the car record if the image upload fails
            await supabase.from("cars").delete().eq("id", data.id);
            console.error("Supabase upload error:", storageError);
            throw new Error("Image could not be uploaded, and the car was not created.");
        }
    }

    return data; // Return the car data
}

export async function deleteCar(id) {
    const { data, error } = await supabase.from("cars").delete().eq("id", id);
  
    if (error) {
      console.error(error);
      throw new Error("Cars could not be deleted");
    }
  
    return data;
  }

