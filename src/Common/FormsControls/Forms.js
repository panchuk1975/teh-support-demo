import React from "react";
import s from "./Forms.module.css";
import { Field } from "redux-form";

//-------------META WAS DISTRUCTION--------------------//
export const Element = Element => 
({ input, meta:{touched, error}, children, ...props }) => {
  const hasError = touched && error;
  return (
    // - meta.error from validator !!!
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <Element {...input} {...props} />
      {hasError && <span>{error}</span>}
    </div>
  );
};

// -------------META WAS NOT DISTRUCTION----------------//
export const ElementInput = ElementInput => 
({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    // - meta.error from validator !!!
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <ElementInput {...input} {...props} />
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const CreateField = 
(placeholder, name, component, validators, type, text = "", props = {}) => {
  const InputElement = Element(component);
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        component={InputElement}
        validate={validators}
        type={type}
        {...props}
      /> {text}
    </div>
  );
};
