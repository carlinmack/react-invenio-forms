// This file is part of React-Invenio-Forms
// Copyright (C) 2025 CERN.
//
// React-Invenio-Forms is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

export function flattenAndCategorizeErrors(obj, prefix = "") {
  let flattenedErrors = {}; // Store primitive errors
  let severityChecks = {}; // Store errors with severity (e.g., warnings, errors)


  // Handle cases where the input object itself contains message and severity
  if ("message" in obj && "severity" in obj) {
    severityChecks[prefix || "error"] = obj;
    return { flattenedErrors, severityChecks };
  }

  for (let key in obj) {
    let newKey = prefix ? `${prefix}.${key}` : key; // Create a new key with the prefix
    let value = obj[key];

    if (value && typeof value === "object") {
      // If the value contains 'message' and 'severity', it's a severity-based error
      if ("message" in value && "severity" in value) {
        severityChecks[newKey] = value;
      } else if (Array.isArray(value)) {
        // If the value is an array, process each item individually
        value.forEach((item, index) => {
          let arrayKey = `${newKey}[${index}]`;
          if (typeof item === "string") {
            flattenedErrors[arrayKey] = item; // Directly store string items
          } else {
            // If the array item is an object, recurse and flatten
            let nested = flattenAndCategorizeErrors(item, arrayKey);
            Object.assign(flattenedErrors, nested.flattenedErrors);
            Object.assign(severityChecks, nested.severityChecks);
          }
        });
      } else {
        // If the value is a nested object, recurse and flatten
        let nested = flattenAndCategorizeErrors(value, newKey);
        Object.assign(flattenedErrors, nested.flattenedErrors);
        Object.assign(severityChecks, nested.severityChecks);
      }
    } else {
      // For primitive values, directly add them to the flattened errors
      flattenedErrors[newKey] = value;
    }
  }

  return { flattenedErrors, severityChecks };
}
