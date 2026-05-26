"use client";
import { createContext, useContext, useState, useCallback } from "react";
import EnquiryPopup from "@/components/forms/EnquiryPopup";
import CallbackRequestPopup from "@/components/forms/CallbackRequestPopup";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [defaultLoanType, setDefaultLoanType] = useState("");

  const openEnquiry = useCallback((loanType = "") => {
    setDefaultLoanType(loanType);
    setEnquiryOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setEnquiryOpen(false);
    setDefaultLoanType("");
  }, []);

  const openCallback = useCallback(() => {
    setCallbackOpen(true);
  }, []);

  const closeCallback = useCallback(() => {
    setCallbackOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ openEnquiry, closeEnquiry, openCallback, closeCallback, enquiryOpen, callbackOpen, defaultLoanType }}>
      {children}
      <EnquiryPopup isOpen={enquiryOpen} onClose={closeEnquiry} defaultLoanType={defaultLoanType} />
      <CallbackRequestPopup isOpen={callbackOpen} onClose={closeCallback} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
