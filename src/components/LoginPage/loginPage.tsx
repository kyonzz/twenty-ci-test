import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  Center,
  Stack,
  Text,
  VStack,
  useToast,
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
  const toast = useToast();

  const {
    handleSubmit,
    errors,
    register,
    formState,
    setError,
  } = useForm<FormData>();
  let auth = useAuth();
  let history = useHistory();
  let location = useLocation<{ from: string }>();

  let { from } = location.state || { from: { pathname: "/" } };

  function onSubmit({ username, password }: FormData) {
    auth
      .signin(username, password)
      .then((data: any) => {
        console.log("data: ", data);

        toast.closeAll();
        history.replace(from);
      })
      .catch((err: any) => {
        console.log("err: ", err);

        toast({
          position: "top-right",
          title: "Login Failure",
          description: err,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <Center h="80vh" w="100vw">
      <VStack spacing={4}>
        <Text fontSize="6xl">Login</Text>

        <Box w="md" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <FormControl
                isRequired
                id="username"
                isInvalid={!!errors.username}
              >
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input name="username" placeholder="Username" ref={register} />

                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                id="password"
                isInvalid={!!errors.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  name="password"
                  placeholder="Password"
                  ref={register}
                  type="password"
                />

                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
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
      </VStack>
    </Center>
  );
};

export default LoginPage;
