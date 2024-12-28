import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

//import { useCreateCabin } from "./useCreateCabin";
//import { useEditCabin } from "./useEditCabin";
import { useEditCar } from "./useEditCar";
import { useCreateCars } from "./useCreateCar";


function CreateCabinForm({ cabinToEdit = {} , onCloseModal}) {
  const { isCreating, createCar} = useCreateCars();
  const { isEditing, editCar } = useEditCar();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  
  function onSubmit(data) {
    // Ensure we handle the image correctly
    const image = typeof data.image === "string" ? data.image : data.image[0];
  
    if (!image) {
      console.error("Image is missing or invalid.");
      return;
    }
  
    console.log("Uploading Image:", image);
  
    if (isEditSession) {
      editCar(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCar(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }
  
  function onError(errors) {
    // console.log(errors);
  }

  return (
    // <Form onSubmit={handleSubmit(onSubmit, onError)}>
    <Form
    onSubmit={handleSubmit(onSubmit, onError)}
    type={onCloseModal ? "modal" : "regular"}
  >
      <FormRow label="Truck name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacityInTone"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for Truck"
        error={errors?.discription?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Truck photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onCloseModal()}>
          Cancel
        </Button>
        <Button disabled={isWorking} >
          {isEditSession ? "Edit Truck" : "Create new Truck"}
        </Button>
      </FormRow>
      
    </Form>
    
  );
}

export default CreateCabinForm;