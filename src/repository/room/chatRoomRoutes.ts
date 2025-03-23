export const chatRoomRoutes = {
    getRoom: (roomCode: string, page:number, size:number) => `/api/chatRoom/${roomCode}?page=${page}&limit=${size}`,
    join: () => `/api/chatRoom`,
    create: () => `/api/chatRoom`
};