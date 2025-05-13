import OtpInput from "react-otp-input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  otp: string;
  setOtp: (value: string) => void;
  loading?: boolean;
  handleVerify: () => void;
  email?: string;
  onClose: () => void;
}

const Otp: React.FC<Props> = ({
  otp,
  email,
  setOtp,
  loading,
  handleVerify,
  onClose,
}) => {
  const inputStyle = {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(16, 58, 97, 0.75)",
    padding: "0.5rem",
    width: "3rem",
    height: "3rem",
    borderRadius: "0.125rem",
    margin: "1.2rem 0",
  };
  //JSX
  return (
    <section className="!item-center fixed top-0 left-0 z-40 !mt-0 flex h-screen w-full items-center !justify-center bg-[#00000084]">
      <div className="flex-col-center relative w-[92%] gap-4 rounded-lg bg-white p-10 md:w-[26.75rem] 2xl:w-[32.625rem]">
        <Button
          disabled={loading}
          onClick={onClose}
          className="absolute top-3 right-3 h-10 w-10 rounded-full"
          variant={"outline"}
        >
          <X />
        </Button>
        <h1 className="text-foreground-tertiary text-center text-base">
          Your code has been sent to{" "}
          <span className="text-primary font-bold"> {email}</span>
        </h1>
        <div className="flex flex-col items-center justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus
            inputStyle={inputStyle}
          />
          <Button
            disabled={loading}
            onClick={handleVerify}
            className="h-full w-full md:w-1/2"
          >
            Verify OTP
          </Button>
        </div>
      </div>
      <style>
        {`
        input:focus {
            outline: none;
        }
        `}
      </style>
    </section>
  );
};

export default Otp;
