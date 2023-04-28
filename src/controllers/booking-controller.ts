import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId: number = req.body.roomId;

  try {
    if (!roomId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const booking = await bookingService.createBooking(roomId, userId);
    return res.status(200).send({ bookingId: booking.id });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotListHotelsError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const bookingId = Number(req.params.bookingId);
  const roomId: number = req.body.roomId;
  try {
    if (!roomId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const updatedBooking = await bookingService.updateBooking(bookingId, roomId, userId);
    return res.status(httpStatus.OK).send({ bookingId: updatedBooking.id });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotListHotelsError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
