import { prisma } from '@/config';

async function getBooking(userId: number) {
  const booking = await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
  return booking;
}

async function getRoomById(id: number) {
  const room = await prisma.room.findFirst({
    where: {
      id,
    },
    include: {
      Booking: true,
    },
  });
  return room;
}

async function getBookingsByRoomId(roomId: number) {
  const bookings = await prisma.booking.findMany({
    where: {
      roomId,
    },
  });
  return bookings;
}

async function createBooking(roomId: number, userId: number) {
  return await prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

export default {
  getBooking,
  getRoomById,
  getBookingsByRoomId,
  createBooking,
  updateBooking,
};
