"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useRef } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const handleClickOutside = useCallback(
    (e: React.MouseEvent) => {
      e.target === overlay.current && onDismiss();
    },
    [overlay, onDismiss],
  );

  return (
    <div className="modal" ref={overlay} onClick={handleClickOutside}>
      <button className="absolute right-8 top-4" onClick={onDismiss}>
        <Image
          src="/assets/images/close.svg"
          width={17}
          height={17}
          alt="close"
        />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Modal;
