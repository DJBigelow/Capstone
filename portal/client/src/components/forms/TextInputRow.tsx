import { FC, useEffect, useState } from "react";
import { Rules, validate } from "./formValidation";

export interface TextInputControl {
  value: string;
  setValue: (i: string) => void;
  error: string;
  hasRules?: boolean;
}
export const useTextInput = (
  initialValue: string,
  rules?: Rules
): TextInputControl => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setError(validate(value, rules));
  }, [value, setError, rules]);
  const hasRules = !!rules;
  return { value, setValue, error, hasRules };
};

interface Props {
  label: string;
  control: TextInputControl;
  labelColSize?: string;
  inputClassName?: string;
  displayLabel?: boolean;
  isTextArea?: boolean;
  rows?: number;
}
export const TextInputRow: FC<Props> = ({
  label,
  control,
  labelColSize = "2",
  inputClassName,
  displayLabel = true,
  isTextArea = false,
  rows = 4,
}) => {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const validationClasses =
    hasBeenTouched && control.error
      ? "is-invalid"
      : hasBeenTouched
      ? "is-valid"
      : "";

  const computedLabel = label.toLowerCase().replace(" ", "");
  const labelClasses = `col-md-${labelColSize} text-end my-auto`;

  return (
    <div className="form-group row">
      {displayLabel && (
        <div className={labelClasses}>
          <label htmlFor={computedLabel} className="col-form-label">
            {label}:
          </label>
        </div>
      )}
      <div
        className={
          inputClassName ? `my-auto ${inputClassName}` : "col-md my-auto"
        }
      >
        {isTextArea ? (
          <textarea
            name={computedLabel}
            id={computedLabel}
            value={control.value}
            className={"form-control " + validationClasses}
            onChange={(e) => control.setValue(e.target.value)}
            onBlur={() => setHasBeenTouched(!!control.hasRules)}
            rows={rows}
          />
        ) : (
          <input
            type="text"
            name={computedLabel}
            id={computedLabel}
            value={control.value}
            className={"form-control " + validationClasses}
            onChange={(e) => control.setValue(e.target.value)}
            onBlur={() => setHasBeenTouched(!!control.hasRules)}
          />
        )}
        {control.error && hasBeenTouched && (
          <div
            v-if=""
            className="invalid-feedback"
            id={`${computedLabel}Feedback`}
          >
            {control.error}
          </div>
        )}
      </div>
    </div>
  );
};
