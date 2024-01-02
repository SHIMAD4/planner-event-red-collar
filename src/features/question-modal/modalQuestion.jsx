import './ModalQuestion.scss';
import Modal from '../modal/Modal.jsx';

export default function ModalQuestion({ onClose, isOpen, answer }) {
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            id="modal-question"
            title="Передумали создавать событие?"
        >
            <div className="modal-question__buttons">
                <button
                    className="modal-question__button--first"
                    onClick={() => {
                        answer(true);
                    }}
                >
                    Нет
                </button>
                <button
                    className="modal-question__button--second"
                    onClick={() => {
                        onClose();
                        answer(false);
                    }}
                >
                    Да
                </button>
            </div>
        </Modal>
    );
}
