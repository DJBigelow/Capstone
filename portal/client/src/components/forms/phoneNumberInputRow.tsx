import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { FC, useState, useEffect } from "react";
import { has } from "immer/dist/internal";

export interface PhoneNumberInputControl {
  value: string;
  setValue: (i: string) => void;
  error: string;
}

export const usePhoneNumberInput = (
  initialValue: string
): PhoneNumberInputControl => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isPossiblePhoneNumber(value)) {
      setError("Invalid phone number");
    } else {
      setError("");
    }
  }, [value, setError]);

  return { value, setValue, error };
};

interface Props {
  label: string;
  control: PhoneNumberInputControl;
  labelColSize?: string;
  inputClassName?: string;
  displayLabel?: boolean;
}

export const PhoneNumberInputRow: FC<Props> = ({
  label,
  control,
  labelColSize = "2",
  inputClassName,
  displayLabel = true,
}) => {
  const computedLabel = label.toLocaleLowerCase().replace(" ", "");
  const labelClasses = `col-md-${labelColSize} text-end my-auto`;

  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const validationClasses =
    hasBeenTouched && control.error
      ? "is-invalid"
      : hasBeenTouched
      ? "is-valid"
      : "";

  return (
    <div className="form-group row">
      {displayLabel && (
        <div className={labelClasses}>
          <label
            htmlFor={computedLabel}
            className={`col-form-label ${validationClasses}`}
          >
            {label}:
          </label>
        </div>
      )}
      <div className={inputClassName ? `my-auto ${inputClassName}` : `col-md my-auto`}>
        <div
          className={
            inputClassName
              ? `my-auto ${inputClassName} ${validationClasses}`
              : `col-md my-auto ${validationClasses}`
          }
        >
          <PhoneInput
            className={`form-control ${validationClasses}`}
            defaultCountry="US"
            value={control.value}
            onChange={control.setValue}
            onBlur={() => setHasBeenTouched(true)}
          />
        </div>
        {control.error && hasBeenTouched && (
          <div className="invalid-feedback" id={`${computedLabel}feedback`}>
            {control.error}
          </div>
        )}
      </div>
    </div>
  );
};
