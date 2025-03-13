export const chatRoomRoutes = {
    getRoom: (roomCode: string) => `/api/chatRoom/${roomCode}`,
    join: () => `/api/chatRoom`,
    create: () => `/api/chatRoom`
};