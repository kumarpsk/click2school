"use client";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import { updateCourse } from "@/utils/courseAPI";
import * as React from "react";

function RichText({ content, title, courseId, id }) {
  const [readOnly, setReadOnly] = React.useState(true);
  const [titleInput, setTitleInput] = React.useState(title);
  const [error, setError] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const editAction = () => {
    setReadOnly(false);
  };

  let rteObj;

  React.useEffect(() => {
    if (rteObj) {
      let answerElement = rteObj.contentModule.getEditPanel();
      answerElement.innerHTML = content;
    }
  }, []);

  const handleTitleChange = (e) => {
    if (e.target.value) {
      setError(false);
    }
    setTitleInput(e.target.value);
  };

  const handleSave = async () => {
    if (!titleInput) {
      setError(true);
    } else {
      const description = rteObj.getHtml();
      const postData = {
        title: titleInput,
        description,
        uid: courseId,
        chapters: [],
        organization: 1,
      };
      const response = await updateCourse(id, postData);
      if (response) {
        window.scrollTo(0, 0);
        setShowSuccess(true);
      }
    }
  };

  const handleShowSuccess = () => {
    setReadOnly(true);
    setShowSuccess(false);
  }

  return (
    <div className="App">
      {showSuccess && (
        <div
          id="alert-3"
          className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">
            Course updated successfully!
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-3"
            aria-label="Close"
            onClick={handleShowSuccess}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold text-gray-800">Id: {courseId}</h3>
        {readOnly && (
          <button
            type="button"
            onClick={editAction}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{" "}
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        )}
      </div>
      {readOnly && (
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Title: {title}
        </h2>
      )}
      {!readOnly && (
        <div className="flex mb-2 align-center">
          <label for="title" className="text-2xl font-bold mb-2 text-gray-800">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className={
              error
                ? `bg-red-50 border border-red-500 text-red-900 placeholder-red-700 ml-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
                : `ml-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
            }
            placeholder="Title"
            value={titleInput}
            onChange={(e) => handleTitleChange(e)}
            required
          />
        </div>
      )}
      <p>Description:</p>
      <RichTextEditorComponent
        ref={(richtexteditor) => {
          rteObj = richtexteditor;
        }}
        readonly={readOnly}
      >
        {content}
        <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
      </RichTextEditorComponent>
      {!readOnly && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSave}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
export default RichText;
