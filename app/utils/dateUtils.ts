export default function dateDifferenceInHours(first: Date, second: Date) {
  const differenceInSeconds = (second.getTime() - first.getTime()) / 1000;
  return differenceInSeconds / 3600;
}
