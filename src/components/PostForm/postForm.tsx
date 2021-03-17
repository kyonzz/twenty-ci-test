import { Input, Textarea } from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";

type Post = {
  title: string;
  content: string;
};

interface IProps {
  onSubmit: (data: Post) => void;
  initData?: Post;
}

const PostForm = React.forwardRef<{ submit: any }, IProps>(
  ({ onSubmit, initData }, ref) => {
    const { register, handleSubmit } = useForm<Post>({
      defaultValues: {
        title: initData?.title,
        content: initData?.content,
      },
    });

    const submit = handleSubmit(onSubmit);

    React.useImperativeHandle(ref, () => ({
      submit() {
        submit();
      },
    }));

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Title"
          maxLength={40}
          mb={4}
          isRequired
          name="title"
          ref={register}
        />
        <Textarea
          isRequired
          // value={value}
          // onChange={handleInputChange}
          maxLength={200}
          // noOfLines={5}
          resize="none"
          placeholder="Content"
          size="sm"
          name="content"
          ref={register}
        />
      </form>
    );
  }
);

export default PostForm;
