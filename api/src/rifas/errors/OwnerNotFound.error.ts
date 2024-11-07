export class OwnerNotFoundError extends Error {
  constructor() {
    super('This user is not a owner.');
  }
}
