type CanEditPredictionInput = {
  kickoffAt: Date;
  now?: Date;
};

export function canEditPrediction({
  kickoffAt,
  now = new Date(),
}: CanEditPredictionInput) {
  return now.getTime() < kickoffAt.getTime();
}
