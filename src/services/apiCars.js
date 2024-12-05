import supabase, { supabaseUrl } from "./supabase";

export async function getCars(){

    const {data, error} = await supabase.from("cars").select('*');

    if(error){
        console.log(error);
        throw new Error("Cabines could not loaded")
    }
    return data;
}

export async function createEditCar(newCar, id){
    const hasImagePath = newCar.image?.startWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${newCar.image.name}`.replaceAll("/","");

    const imagePath = hasImagePath 
    ? newCar.image
    : `${supabaseUrl}/storage/v1/object/public/car-image/${imageName}`;

    //1, Create or edit cars

    let query = supabase.from("cars")

    //A Create the cars data

    if(!id) query = query.insert([{...newCar,image:imagePath}]);

    //Edit the cars tabel

    if(id) query = query.update([{...newCar,image:imagePath}]).eq("id",id);

    const {data, error }= await query.select().single();

    if(error){
        console.log(error)
        throw new Error("Cars could not created")
    }

    //2 upload the image for the cars

    if(hasImagePath) return data;

    const {error:storageError}= await supabase.storage
    .from("car-image")
    .upload(imageName,newCar.image);

    //3 Delete the cars ifthere was an erro uploading the image

    if(storageError){
        await supabase.from("cars").delete().eq("id", data.id);
        console.log(storageError);
        throw new Error(
            "Cabines could not be uploaded and the cabin was not created"
        );
    }
    return data;

}

export async function deleteCar(id) {
    const { data, error } = await supabase.from("cars").delete().eq("id", id);
  
    if (error) {
      console.error(error);
      throw new Error("Cars could not be deleted");
    }
  
    return data;
  }

