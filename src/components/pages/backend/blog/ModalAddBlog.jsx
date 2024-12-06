import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import {
  InputPhotoUpload,
  InputSelect,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import { imgPath } from "@/components/helpers/functions-general";
import { setIsAdd } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { ImagePlusIcon, X } from "lucide-react";
import React from "react";
import * as Yup from "Yup";
import ModalWrapper from "../partials/modals/ModalWrapper";
import SpinnerButton from "../partials/spinners/SpinnerButton";

const ModalAddBlog = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();

  const { uploadPhoto, handleChangePhoto, photo } =
    useUploadPhoto("/v2/upload-photo");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v2/blog/${itemEdit.blog_aid}` : `/v2/blog`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });

      // show error box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage("Success"));
      } else {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    blog_title: itemEdit ? itemEdit.blog_title : "",
    blog_excerpt: itemEdit ? itemEdit.blog_excerpt : "",
    blog_content: itemEdit ? itemEdit.blog_content : "",
    blog_reading_time: itemEdit ? itemEdit.blog_reading_time : "",
    blog_published_date: itemEdit ? itemEdit.blog_published_date : "",
    blog_category: itemEdit ? itemEdit.blog_category : "",
    blog_author: itemEdit ? itemEdit.blog_author : "",

    blog_title_old: itemEdit ? itemEdit.blog_title : "",
  };
  const yupSchema = Yup.object({
    blog_title: Yup.string().required("required"),
    blog_excerpt: Yup.string().required("required"),
    blog_content: Yup.string().required("required"),
    blog_reading_time: Yup.string().required("required"),
    blog_published_date: Yup.string().required("required"),
    blog_category: Yup.string().required("required"),
    blog_blog_author: Yup.string().required("required"),
  });


  return (
    <ModalWrapper>
      <div className="modal-main bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[900px] w-full rounded-md border border-line">
        <div className="modal-header flex gap-2 p-2 items-center border-b border-line mb-2 ">
          <span className="text-body">Add Blog</span>
          <button className="ml-auto" onClick={handleClose}>
            <X />
          </button>
        </div>
        <div className="modal-body p-4 ">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                blog_image:
                  (itemEdit?.blog_image === "" && photo) ||
                  (!photo && "") ||
                  (photo === undefined && "") ||
                  (photo && itemEdit?.blog_image !== photo?.name)
                    ? photo?.name || ""
                    : itemEdit?.blog_image || "",
              });
              uploadPhoto();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="grid grid-cols-[1fr,_1.5fr] gap-5">
                    <div className="info">
                      <h3 className="mb-0">Information</h3>
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] mb-10 mt-5">
                        {itemEdit === null && photo === null ? (
                          <div className="w-full  rounded-md flex justify-center items-center flex-col h-[120%] border border-light opacity-70">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>
                        ) : (
                          <img
                            src={
                              photo
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.blog_image // check db
                            }
                            alt="ramen photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto ${
                              mutation.isPending
                                ? "opacity-40 pointer-events-none"
                                : ""
                            }`}
                          />
                        )}

                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto(e)}
                          onDrop={(e) => handleChangePhoto(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full ${
                            mutation.isPending ? "pointer-events-none" : ""
                          }`}
                        />
                      </div>

                      <div className="input-wrap">
                        <InputText
                          label="Title"
                          type="text"
                          name="blog_title"
                        />
                      </div>
                      
                      <div className="input-wrap">
                        <InputText label="Author" type="text" name="blog_author" />
                      </div>

                      <div className="input-wrap">
                        <InputSelect label="Category" name="blog_category">
                          <option value="" hidden>
                            Select Category
                          </option>
                          <option value="social">Social</option>
                          <option value="economics">Economics</option>
                          <option value="environmental">Environmental</option>
                        </InputSelect>
                      </div>
                      

                      <div className="input-wrap">
                        <InputText label="Date" type="text" name="blog_date" />
                      </div>
                    </div>

                    <div className="description">
                      <div className="input-wrap">
                        <h3>Contents</h3>
                        <InputTextArea
                          label="Author Information"
                          name="blog_information"
                          className="overflow-y-auto custom-scroll p-2 !h-[120px] outline-none  w-full rounded-md bg-primary text-body border border-line resize-none mb-5"
                        />
                      </div>
                      <div className="input-wrap">

                        <InputTextArea
                          label="Description"
                          name="blog_content"
                          className="overflow-y-auto custom-scroll p-2 !h-[300px]  outline-none  w-full rounded-md bg-primary text-body border border-line resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-5">
                    <button className="btn btn-accent" type="submit">
                      {mutation.isPending && <SpinnerButton />}
                      {itemEdit ? "Edit" : "Add"}
                    </button>
                    <button
                      className="btn btn-cancel"
                      onClick={handleClose}
                      type="reset"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ModalAddBlog;
