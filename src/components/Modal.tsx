import React from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
