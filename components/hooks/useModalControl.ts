import { useState } from 'react';

function useModalControl(): {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}

export default useModalControl;
