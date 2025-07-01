"use client";

import { useId } from "react";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { CreateNoteType } from "@/types/note";
import { useRouter } from "next/navigation";

const OrderSchema = Yup.object().shape({
  title: Yup.string()
    .required("This field is required!")
    .min(3, "Too short")
    .max(50, "Too long"),
  content: Yup.string().max(500, "Too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("This field is required!"),
});

// const initialValues: CreateNoteType = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

const NoteForm = () => {
  const router = useRouter();
  const onClose = () => router.push("/notes/filter/all");

  const fieldId = useId();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteList"] });
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: CreateNoteType = {
      title: formData.get("title") as string,
      content: (formData.get("content") ?? "") as string,
      tag: formData.get("tag") as CreateNoteType["tag"],
    };

    await OrderSchema.validate(values, { abortEarly: false });

    await mutation.mutateAsync(values);
    e.currentTarget.reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          required
          minLength={3}
          maxLength={50}
          id={`${fieldId}-title`}
          name="title"
          className={css.input}
        />
      </fieldset>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          className={css.textarea}
          maxLength={500}
        />
      </fieldset>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          required
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </fieldset>
      <fieldset className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </fieldset>
    </form>
  );
};
export default NoteForm;

//  <Formik
//       validationSchema={OrderSchema}
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//     >
//       <Form className={css.form}>
//         <fieldset className={css.formGroup}>
//           <label htmlFor={`${fieldId}-title`}>Title</label>
//           <Field id={`${fieldId}-title`} name="title" className={css.input} />
//           <ErrorMessage component="span" className={css.error} name="title" />
//         </fieldset>
//         <fieldset className={css.formGroup}>
//           <label htmlFor={`${fieldId}-content`}>Content</label>
//           <Field
//             as="textarea"
//             id={`${fieldId}-content`}
//             name="content"
//             className={css.textarea}
//             rows={8}
//           />
//           <ErrorMessage component="span" className={css.error} name="content" />
//         </fieldset>
//         <fieldset className={css.formGroup}>
//           <label htmlFor={`${fieldId}-tag`}>Tag</label>
//           <Field
//             as="select"
//             id={`${fieldId}-tag`}
//             name="tag"
//             className={css.select}
//           >
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Meeting">Meeting</option>
//             <option value="Shopping">Shopping</option>
//           </Field>
//           <ErrorMessage component="span" className={css.error} name="tag" />
//         </fieldset>
//         <fieldset className={css.actions}>
//           <button onClick={onClose} type="button" className={css.cancelButton}>
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className={css.submitButton}
//             disabled={mutation.isPending}
//           >
//             {mutation.isPending ? "Creating..." : "Create note"}
//           </button>
//         </fieldset>
//       </Form>
//     </Formik>
