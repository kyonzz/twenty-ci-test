import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  Center,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../../hooks/auth";

interface IProps {}

type FormData = {
  username: string;
  password: string;
};

const LoginPage: React.FC<IProps> = () => {
  const { handleSubmit, errors, register, formState } = useForm<FormData>();
  let auth = useAuth();
  let history = useHistory();
  let location = useLocation<{ from: string }>();

  let { from } = location.state || { from: { pathname: "/" } };

  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  function onSubmit({ username, password }: FormData) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (username !== "demo" || password !== "demo") {
          alert("wrong");
        } else {
          login();
        }
        resolve();
      }, 1000);
    });
  }

  return (
    <Center h="100vh" w="100vw">
      <Box w="md" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl isRequired id="username">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input name="username" placeholder="Username" ref={register} />

              {/* <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage> */}
            </FormControl>

            <FormControl isRequired id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                name="password"
                placeholder="Password"
                ref={register}
                type="password"
              />

              {/* <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage> */}
            </FormControl>
          </Stack>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default LoginPage;
