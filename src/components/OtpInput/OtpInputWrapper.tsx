import { FC } from "react";
import useOtpInputWrapperLogic from "./useOtpInputWrapperLogic";



const OtpInputWrapper: FC<{ inputsQuantity: number }> = ({ 
  inputsQuantity,
}) => {
  const { handleInputChange, otpValues, inputRefs } = useOtpInputWrapperLogic({
    inputsQuantity,
  });

  return (
    <div className="otpinput-wrapper">
      {otpValues.map((value, index) => (
        <input
          autoFocus={index === 0}
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
