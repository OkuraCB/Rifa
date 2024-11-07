export class OwnerFoundError extends Error {
  constructor() {
    super('This user is already a owner.');
  }
}
