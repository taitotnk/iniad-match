import Modal from "react-modal";
import { useState } from "react";

const FilterModal: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const afterOpenModal = () => {
    // モーダルが開いたあとの処理
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <button
        onClick={openModal}
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Likeから絞り込む
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div>hello</div>
        <button onClick={closeModal}>close</button>
      </Modal>
    </>
  );
};

export default FilterModal;
