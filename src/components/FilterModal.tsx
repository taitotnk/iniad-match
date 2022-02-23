import Modal from "react-modal";
import { useState } from "react";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "500px",
    height: "300px",
    transform: "translate(-50%, -50%)",
  },
};

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
        style={customStyles}
      >
        <div className="relative">
          <div>hello</div>
          <div className="text-center">
            <button
              onClick={closeModal}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full"
            >
              絞り込む
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FilterModal;
