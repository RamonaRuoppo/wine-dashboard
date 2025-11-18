function Modal({ show, title, message, onConfirm, onClose, confirmText = "OK", cancelText = "Chiudi" }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-96 text-center">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <p className="mb-6 text-gray-700">{message}</p>
                <div className="flex justify-center gap-3">
                    {onConfirm && (
                        <button
                            className="text-gray-600 px-4 py-2 rounded hover:bg-[#5b252c]"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </button>
                    )}
                    <button
                        className="text-gray-900 px-4 py-2 rounded hover:bg-gray-300"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;