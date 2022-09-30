// This file is part of React-Invenio-Forms
// Copyright (C) 2020 CERN.
// Copyright (C) 2020 Northwestern University.
//
// React-Invenio-Forms is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import PropTypes from "prop-types";
import React from "react";
import { Form } from "semantic-ui-react";
import { FieldLabel } from "../../FieldLabel";
import { RadioField } from "../../RadioField";
import { useField } from "formik";

export default function BooleanInput({
  description,
  icon,
  falseLabel,
  fieldPath,
  label,
  trueLabel,
  required,
}) {
  const [meta] = useField(fieldPath);
  console.log(meta);
  return (
    <>
      <Form.Group inline className="mb-0" required>
        <Form.Field required={required} error={meta.error}>
          <FieldLabel htmlFor={fieldPath} icon={icon} label={label} />
        </Form.Field>
        <RadioField
          fieldPath={fieldPath}
          label={trueLabel}
          checked={meta.value === true}
          value
          optimized
        />
        <RadioField
          fieldPath={fieldPath}
          label={falseLabel}
          checked={meta.value === false}
          value={false}
          optimized
        />
      </Form.Group>
      {description && <label className="helptext">{description}</label>}
    </>
  );
}

BooleanInput.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  trueLabel: PropTypes.string.isRequired,
  falseLabel: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string,
  required: PropTypes.bool,
};

BooleanInput.defaultProps = {
  icon: undefined,
  required: false,
};
