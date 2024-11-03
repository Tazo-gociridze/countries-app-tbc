import { useRef, useState } from "react";

const useOtpInputWrapperLogic = ({
  inputsQuantity,
}: {
  inputsQuantity: number;
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(inputsQuantity).fill(null),
  );
  const [otpValues, setOtpValues] = useState(Array(inputsQuantity).fill(""));

  const handleInputChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, "");

    if (sanitizedValue.length > 1) {
      const digits = sanitizedValue.split("");
      const newOtpValues = [...otpValues];
      digits.forEach((digit, i) => {
        if (i + index < inputsQuantity) {
          newOtpValues[i + index] = digit;
          inputRefs.current[i + index]?.focus();
        }
      });
      setOtpValues(newOtpValues);
      return;
    }

    setOtpValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = sanitizedValue;
      return newValues;
    });

    if (sanitizedValue && index < inputsQuantity - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!sanitizedValue && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (index === inputsQuantity - 1) {
      inputRefs.current[index]?.blur();
    }
  };

  return {
    handleInputChange,
    otpValues,
    inputRefs,
  };
};

export default useOtpInputWrapperLogic;
