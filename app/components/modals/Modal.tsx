"use client";
//this model fron now exist for login and renting and searching model

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) {
  const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    //check if model is disabled
    if (disabled) {
      return;
    }
    setShowModal(false);
    //1sec for amination then to close the app
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  //check if model is disable and break the function c...
  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  //c...
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/*  */}
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-700/60">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* Content comes here 
               duration of this div should be sync to handleClose 
              if model is going to be shown */}
          <div
            className={`duration-300 h-full${
              showModal ? "translate-y-0" : "translate-y-100"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div>
                {/* body */}
                <div className="relative p-6 flex-auto">{body}</div>
              </div>
              <div>
                {/* footer */}
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center gap-4 w-full justify-center">
                    {/* Primary Buttons of Modal */}
                    {/* secondaryAction */}
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        outline
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                      />
                    )}
                    {/* Primary */}
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                    />
                  </div>
                  {/* footer */}
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
