import { FC, useEffect } from "react";
import OtpInputWrapperLogic from "./OtpInputWrapperLogic";

const OtpInputWrapper: FC<{ inputsQuantity: number }> = ({
  inputsQuantity,
}) => {
  useEffect(() => {
    if (otpValues.every((value) => value === "")) {
      inputRefs.current[0]?.focus();
    }
  });

  const { handleInputChange, otpValues, inputRefs } = OtpInputWrapperLogic({
    inputsQuantity,
  });

  return (
    <div className="otpinput-wrapper">
      {otpValues.map((value, index) => (
        <input
          className="otp-input"
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && index > 0 && !value) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
        />
      ))}
    </div>
  );
};

export default OtpInputWrapper;
