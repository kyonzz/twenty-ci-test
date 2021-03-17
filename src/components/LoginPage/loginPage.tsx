import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";

interface IProps {}

type FormData = {
  username: string;
  password: string;
};

const LoginPage: React.FC<IProps> = () => {
  const { handleSubmit, errors, register, formState } = useForm<FormData>();

  function onSubmit({ username, password }: FormData) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (username !== "demo" || password !== "demo") {
          alert("wrong");
        } else {
          alert("cool");
        }
        resolve();
      }, 1000);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor="name">First name</FormLabel>
          <Input name="username" placeholder="Username" ref={register} />
          <Input name="password" placeholder="Password" ref={register} />
          {/* <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage> */}
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
