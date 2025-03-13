import { useUserContext } from "@/context/user/User.context";
import { chatRoomService } from "@/services/chatRoom.service";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface JoinModalProps {
  isOpen: boolean;
  handleIsOpenModal: (isOpen: boolean) => void;
}

export function JoinRoomModal({ isOpen, handleIsOpenModal }: JoinModalProps) {
  const [roomCode, setRoomCode] = useState("");
  const {user: {email}} = useUserContext()

  const joinRoom = async () => {
    const joinRoomResponse = await chatRoomService.join(roomCode,email);
    if(!joinRoomResponse.success) {
      return toast.error(joinRoomResponse.error)
    }
    handleIsOpenModal(false)
    toast.success("Se ha creado la sala correctamente!")
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-custom-main-color rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-white">Unirme a sala</h2>

        <p>
          <input
            type="text"
            name="username"
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Código de la sala"
            className="bg-[#27272A80] w-full py-3 ps-2 rounded-lg"
            required
          />
        </p>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => handleIsOpenModal(false)}
            className="px-4 py-2 text-sm border border-custom-border-color rounded-md text-white hover:bg-custom-secondary-color transition-all"
          >
            Cerrar
          </button>
          <button
            onClick={joinRoom}
            className="px-4 py-2 text-sm text-custom-main-color bg-custom-resalt-color rounded-md hover:bg-blue-600 transition-all"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
