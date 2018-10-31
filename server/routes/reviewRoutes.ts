import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import * as reviewController from '../controllers/reviewController';
import * as entryController from '../controllers/entryController';
import {
  getReviewsValidator,
  removeReviewValidator,
  reviewValidator,
} from '../utils';
import * as validatorsController from '../controllers/validatorsController';

const router = express.Router();

router.get(
  '/:username',
  getReviewsValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(entryController.withEntry),
  asyncHandler(reviewController.get)
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  reviewValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(validatorsController.createReview),
  asyncHandler(entryController.withEntry),
  asyncHandler(reviewController.withReview),
  asyncHandler(reviewController.create)
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  removeReviewValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(entryController.withEntry),
  asyncHandler(reviewController.withReview),
  asyncHandler(reviewController.remove)
);

export default router;