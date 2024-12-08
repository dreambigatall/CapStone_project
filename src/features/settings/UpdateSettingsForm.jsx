import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSetting } from './useSetting';
import { useUpdateSetting } from './useSettingUpdate';

function UpdateSettingsForm() {
  const{
    isLoading,
    setting:{
      minimumRentLength,
      maxRentingLength,
      driverPrice
    }={},
  }= useSetting();

  const {isUpdatting,updateSetting} =useUpdateSetting();
  console.log(driverPrice)
   if(isLoading) return <Spinner/>;

   function handleUpdate(e,filed){
    const {value} = e.target;

    if(!value) return;
    updateSetting({[filed]:value})
   }


  return (
    <Form>
      <FormRow label='Minimum rent/booking length'>
        <Input type='number' id='min-nights'
        defaultValue={minimumRentLength}
        disabled={isUpdatting} 
        onBlur={(e)=>handleUpdate(e, "minimumRentLength")}/>
      </FormRow>
      <FormRow label='Maximum Rent/booking length'>
        <Input type='number' id='max-nights'
        disabled={isUpdatting}
        defaultValue={maxRentingLength}
        onBlur={(e)=>handleUpdate(e, "maxRentingLength")} />
      </FormRow>
      
      <FormRow label='Driver price'>
        <Input type='number' id='breakfast-price'
        defaultValue={driverPrice}
        disabled={isUpdatting} 
        onBlur={(e)=>handleUpdate(e, "driverPrice")}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
