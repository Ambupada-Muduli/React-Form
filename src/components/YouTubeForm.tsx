import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues= {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string,
    facebook: string,
  };
  phoneNumbers: string [];

}

export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Sambar",
      email: "",
      channel: "",
      social:{
        facebook: "",
        twitter: "",
      },
      phoneNumbers: ["",""],
    }
  });
  const { register , control , handleSubmit , formState} = form;
  const { errors } = formState;
  //const { name , ref , onChange , onBlur } = register("username");

  const onSubmit = (data: FormValues) =>{
    console.log("Form is submitted", data);
  }

  renderCount++;
  return (
    <div>
      <h1>YouTube Form ({renderCount/2}) </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='form-control'>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' {...register("username", { required: { value: true, message: "username is required",}})} />
            <p className='error'>{errors.username?.message}</p>
          </div>

          <div className='form-control'>
            <label htmlFor='email'>E-mail</label>
            <input type='email' id='email' {...register("email", { pattern: { value : /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm, message: "Invalid E-mail format"},
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" || "Enter a different  email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") || "This is not a valid domain"
                );
              },
            },
          
          })} />
            <p className='error'>{errors.email?.message}</p>
          </div>

          <div className='form-control'>
            <label htmlFor='channel'>Channel</label>
            <input type='text' id='channel' {...register("channel", { required: "Channel name is also mandatory."})} />
            <p className='error'>{errors.channel?.message}</p>
          </div>

          <div className='form-control'>
            <label htmlFor='twitter'>Twitter</label>
            <input type='text' id='twitter' {...register("social.twitter")} />
          </div>

          <div className='form-control'>
            <label htmlFor='facebook'>Facebook</label>
            <input type='text' id='facebook' {...register("social.facebook")} />
          </div>

          <div className='form-control'>
            <label htmlFor='primary-phone'>Primary PhoneNumbers</label>
            <input type='text' id='primary-phone' {...register("phoneNumbers.0")} />
          </div>

          <div className='form-control'>
            <label htmlFor='secondary-phone'>Secondary PhoneNumbers</label>
            <input type='text' id='secondary-phone' {...register("phoneNumbers.1")} />
          </div>

            <button>Submit</button>
        </form>
        <DevTool control={control} />
    </div>
  );
};
