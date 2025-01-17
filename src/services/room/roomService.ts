export const roomService = {
    create: async (name: string): Promise<any> => {
        try {
            const response = await fetch('/api/chatRoom', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error(`Error al crear la sala: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al crear la sala:', error);
            throw error;
        }
    },
};