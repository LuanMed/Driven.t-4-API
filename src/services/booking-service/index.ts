import hotelsService from '../hotels-service';
import { forbiddenError, notFoundError } from '@/errors';
import boookingRepository from '@/repositories/boooking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getBooking(userId: number) {
  const booking = await boookingRepository.getBooking(userId);

  if (!booking) throw notFoundError();

  return booking;
}

async function createBooking(roomId: number, userId: number) {
  await hotelsService.listHotels(userId);

  const room = await boookingRepository.getRoomById(roomId);
  if (!room) throw notFoundError();

  //const bookings = await boookingRepository.getBookingsByRoomId(roomId);

  if (room.Booking.length >= room.capacity) throw forbiddenError();

  const booking = await boookingRepository.createBooking(roomId, userId);
  return booking;
}

async function updateBooking(bookingId: number, roomId: number, userId: number) {
  const booking = await boookingRepository.getBooking(userId);
  if (!booking) throw forbiddenError();

  if (booking.id !== bookingId) throw forbiddenError();

  const room = await boookingRepository.getRoomById(roomId);
  if (!room) throw notFoundError();

  //const bookings = await boookingRepository.getBookingsByRoomId(roomId);
  if (room.Booking.length >= room.capacity) throw forbiddenError();

  const updatedBooking = await boookingRepository.updateBooking(bookingId, roomId);
  return updatedBooking;
}

export default {
  getBooking,
  createBooking,
  updateBooking,
};
